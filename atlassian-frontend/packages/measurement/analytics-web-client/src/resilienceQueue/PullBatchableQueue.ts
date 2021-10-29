import {
  purgeOrphanedQueues,
  reclaimEvents,
} from '../localstorage-retry';
import ResilienceDb, {
  BulkAddOption,
  CallbackProcessingErrorName,
  GuardPolicy,
  ItemWrapperType,
  ProcessItemsMetadata,
  Resilience,
} from '../resiliencedb';

import getMetricsCollector, { MetricsCollector } from './Metrics';
import NetworkStatus from './NetworkStatus';
import Scheduler from './scheduler';
import {
  BatchableQueue,
  BatchFlushCallback,
  NetworkStatusEnum,
  ResilienceMechanism,
  RetryQueueOptions,
  StrictRetryQueueOptions,
} from './types';

const ONE_MINUTE = 60_000;

const LONG_POLLING_OPTIONS: RetryQueueOptions = {
  backoffFactor: 0,
  backoffJitterPercentage: 0,
  flushWaitMs: ONE_MINUTE,
  minRetryDelay: ONE_MINUTE,
  maxRetryDelay: ONE_MINUTE,
};

export const DEFAULT_POLLING_OPTIONS: Required<RetryQueueOptions> = {
  backoffFactor: 2,
  backoffJitterPercentage: 0.2,
  batchFlushSize: 7,
  flushBeforeUnload: false,
  flushWaitMs: 500,
  maxAttempts: 10,
  // TODO figure out this number. For indexeddb we are sharing the queue with all tabs
  maxItems: 1000,
  maxRetryDelay: 30000,
  minRetryDelay: 1000,
  resilienceMechanism: ResilienceMechanism.INDEXEDDB,
};

type ScheduleDone = (error?: any) => void;

export default class PullBatchableQueue<T extends object> implements BatchableQueue<T> {

  private queuePrefix: string;

  private resilience: Resilience<T>;

  private batchFlushCallback?: BatchFlushCallback<T>;

  private options: StrictRetryQueueOptions;

  private scheduler: Scheduler;

  private longPollingScheduler: Scheduler;

  private metricsCollector: MetricsCollector;

  private networkStatus: NetworkStatus;

  constructor(queuePrefix: string, product: string, options: RetryQueueOptions) {
    this.queuePrefix = queuePrefix;
    // Avoiding using options in ResilienceDB at this stage as
    // the options are optimised for the PushBatchableQueue
    this.resilience = new ResilienceDb<T>(product);
    this.options = this.buildOptions(options);
    this.scheduler = new Scheduler({
        ...this.options,
        waitInterval: options.flushBeforeUnload ? 0 : this.options.flushWaitMs,
    }, this.scheduleCallback.bind(this));
    this.longPollingScheduler = new Scheduler({
      ...LONG_POLLING_OPTIONS,
      waitInterval: LONG_POLLING_OPTIONS.flushWaitMs,
    }, this.scheduleLongCallBack.bind(this));
    this.metricsCollector = getMetricsCollector();

    this.networkStatus = new NetworkStatus(status => {
      if (status === NetworkStatusEnum.OFFLINE) {
        this.scheduler.stop();
      } else {
        this.checkEventCountAndReschedule();
      }
    });
  }

  start(flushCallback: BatchFlushCallback<T>): void {
    this.batchFlushCallback = flushCallback;
    this.longPollingScheduler.schedule();
  }

  stop(): void {
    this.scheduler.stop();
    this.longPollingScheduler.stop();
  }

  async addItem(item: T): Promise<void> {
    // Since Jira and Confluence use `.toJSON` on objects that should be strings
    // And expect us to use `JSON.stringify` on these objects,
    // And indexeddb strips these functions from the objects when adding them to the DB,
    // We must run this silly stringify and parse before passing the event to the resilience meechanism.
    // Planning on removing this in v4
    const jsonStringifiedAndParsedItem: T = JSON.parse(JSON.stringify(item));
    const { numberOfEvictedItems } = await this.resilience.addItem(jsonStringifiedAndParsedItem, {}, GuardPolicy.EVICT);
    this.scheduler.schedule();
    this.metricsCollector.addToEventCount();
    if (numberOfEvictedItems > 0) {
      this.metricsCollector.addToItemsDiscardedByOverflowCounter(numberOfEvictedItems);
    }
  }

  getGlobalRetryCount(): number {
    return this.scheduler.getFailureCount();
  }

  private async scheduleCallback(done: ScheduleDone): Promise<void> {
    // Even though we stopped the scheduler, it can be restarted with a call to schedule.
    // This could be triggered by a new event or the longPollingScheduler
    if (this.networkStatus.getNetworkStatus() === NetworkStatusEnum.OFFLINE) {
      done();
      return;
    }

    try {
      await this.resilience.processItems(this.flush.bind(this), this.options.batchFlushSize);
    } catch (error) {
      if (error.name === CallbackProcessingErrorName) {
        done(error);
        return;
      }
      // TODO we can probably log here but throwing is useless as it will just be shallowed by the Scheduler
      // In theory something else should catch all other errors from indexeddb and this should never happen.
    } finally {
      await this.checkEventCountAndReschedule();
    }
    done();
  }

  private async checkEventCountAndReschedule(): Promise<void> {
    const eventWaitingCount = await this.resilience.getItemCount();
    if (eventWaitingCount > 0) {
      this.scheduler.schedule({ immediate: eventWaitingCount >= this.options.batchFlushSize });
    }
  }

  private async scheduleLongCallBack(done: ScheduleDone): Promise<void> {
    // Eventually we will want to send data about how many queues were purged
    const numberOfQueuesPurged = purgeOrphanedQueues(this.queuePrefix);
    this.metricsCollector.addToPurgedQueuesMetrics(numberOfQueuesPurged);
    // Eventually we will want to send data about how attempted reclaims and actual reclaims were made
    const reclaimMetrics = await reclaimEvents<T>(this.queuePrefix, async localStorageItems => {
      const itemsToAdd: BulkAddOption<T>[] = localStorageItems.map(localStorageItem => ({
        item: localStorageItem.item,
        retryAttempts: localStorageItem.attemptNumber,
        id: localStorageItem.id,
      }));
      const { items: addedEvents } = await this.resilience.bulkAddItem(
        itemsToAdd,
        GuardPolicy.IGNORE
      );
      if (addedEvents.length === itemsToAdd.length) {
        return {
          status: 'successful',
        };
      } else {
        return {
          status: 'partial',
          acceptedItemIds: addedEvents.map(event => event.id),
        };
      }
    });
    this.metricsCollector.addToReclaimMetrics(reclaimMetrics);

    // We dont want to flush events from here as there maybe issues with analytics-service
    // Scheduler has all the context and can schedule the next batch accordingly
    await this.checkEventCountAndReschedule();
    done();
    this.longPollingScheduler.schedule();
  }

  private flush(wrappedItems: ItemWrapperType<T>[], otherMetadata: ProcessItemsMetadata): Promise<void> {
    this.metricsCollector.setResilienceMechanism(this.resilience.storeType());
    const { batchFlushCallback } = this;
    if (!batchFlushCallback) {
      throw new Error('batchFlushCallback has not been set. Call PullBatchableQueue#start first.');
    }

    return new Promise((resolve, reject) => {
      if (wrappedItems.length <= 0) {
        resolve();
        return;
      }
      const items = wrappedItems.map(wrappedItem => {
        const item: any = wrappedItem.item;
        if (wrappedItem.retryAttempts > 0 && item.msg && item.msg._metadata && item.msg.messageId) {
          item.msg._metadata.failedAttempts = wrappedItem.retryAttempts;
        }
        return item;
      });
      batchFlushCallback(items, (error) => {
        if (error) {
          if (otherMetadata.numberOfDeletedItems > 0) {
            this.metricsCollector.addToItemsDiscardedByRetryCounter(otherMetadata.numberOfDeletedItems);
          }
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private buildOptions(options: RetryQueueOptions): StrictRetryQueueOptions {
    return {
      backoffFactor: options.backoffFactor || DEFAULT_POLLING_OPTIONS.backoffFactor,
      backoffJitterPercentage: options.backoffJitterPercentage !== undefined ?
        options.backoffJitterPercentage :
        DEFAULT_POLLING_OPTIONS.backoffJitterPercentage,
      batchFlushSize: options.batchFlushSize || DEFAULT_POLLING_OPTIONS.batchFlushSize,
      flushBeforeUnload: options.flushBeforeUnload || DEFAULT_POLLING_OPTIONS.flushBeforeUnload,
      flushWaitMs: options.flushWaitMs || DEFAULT_POLLING_OPTIONS.flushWaitMs,
      maxItems: options.maxItems || DEFAULT_POLLING_OPTIONS.maxItems,
      maxAttempts: options.maxAttempts || DEFAULT_POLLING_OPTIONS.maxAttempts,
      maxRetryDelay: options.maxRetryDelay || DEFAULT_POLLING_OPTIONS.maxRetryDelay,
      minRetryDelay: options.minRetryDelay || DEFAULT_POLLING_OPTIONS.minRetryDelay,
      resilienceMechanism: DEFAULT_POLLING_OPTIONS.resilienceMechanism,
    };
  }
}
