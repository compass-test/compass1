import DuplicateEventDetector from './DuplicateEventDetector';
import getMetricsCollector, { MetricsCollector } from './Metrics';
import Scheduler from './scheduler';
import {
  BatchableQueue,
  BatchFlushCallback,
  ResilienceMechanism,
  RetryQueueOptions,
} from './types';

declare const require: any;

const Queue = require('@segment/localstorage-retry');

const DEFAULT_FLUSH_BATCH_SIZE = 7;

// These must all be 1. If they are 0, they will not be truthy and in built defaults will be used.
const QUEUE_RETRY_OPTION_OVERRIDES = {
  minRetryDelay: 1,
  maxRetryDelay: 1,
  backoffFactor: 1,
  // Do not change this key, localstorage-retry has no types
  backoffJitter: 0,
};

/**
 * Create a queue, backed by localstorage, in which items are processed by the queue in batches
 *
 * @param {Object} options queue options,
 * @param {Function} batchProcessFunc the function to process a batch of items from the queue
 */
export default class PushBatchableQueue implements BatchableQueue<any> {
  batchProcessFunc?: BatchFlushCallback<any>;

  currentBatch: any[];

  private metrics: MetricsCollector

  duplicateEventDetector: DuplicateEventDetector;

  flushBatchSize: number;

  maxQueueSize: number;

  messageFailedAttemptCounter: { [key: string]: number };

  queue: any;

  scheduler: Scheduler;

  constructor(
    retryQueuePrefix: string,
    retryQueueOptions?: RetryQueueOptions,
  ) {
    this.maxQueueSize = retryQueueOptions?.maxItems || 500;
    this.queue = new Queue(
      retryQueuePrefix,
      {
        ...retryQueueOptions,
        ...QUEUE_RETRY_OPTION_OVERRIDES,
      },
      this._processSingleElement,
    );
    this.flushBatchSize = retryQueueOptions?.batchFlushSize || DEFAULT_FLUSH_BATCH_SIZE;
    this.duplicateEventDetector = new DuplicateEventDetector();

    this.currentBatch = [];

    this.scheduler = new Scheduler(
      {
        ...retryQueueOptions,
        waitInterval: retryQueueOptions?.flushWaitMs,
      },
      this._flush,
    );

    if (retryQueueOptions?.flushBeforeUnload) {
      window.addEventListener("beforeunload", () => {
        this.scheduler.schedule({ immediate: true });
      });
    }

    this.metrics = getMetricsCollector();
    this.metrics.setResilienceMechanism(ResilienceMechanism.LOCALSTORAGE);

    this.queue.on('discard', this._onDiscardedEvent);
    this.queue.on('overflow', this._onOverflowEvent);
    this.queue.on('duplication', this._onLocalstorageDuplicateEvent);
    this.messageFailedAttemptCounter = {};
  }

  start = (flushCallback: BatchFlushCallback<any>) => {
    this.batchProcessFunc = flushCallback;
    this.queue.start();
  };

  getGlobalRetryCount = () => this.scheduler.getFailureCount();

  _flush = (done: any) => {
    if (this.currentBatch.length !== 0) {
      if (this.batchProcessFunc) {
        const batchedQueuedObjects = this.currentBatch.splice(
          0,
          this.flushBatchSize,
        );
        const batchedItems = batchedQueuedObjects.map(
          (queuedItem: any) => queuedItem.item,
        );
        batchedItems.forEach((item: any) => {
          /* eslint-disable no-underscore-dangle */
          if (item.msg && item.msg._metadata && item.msg.messageId && this.messageFailedAttemptCounter[item.msg.messageId]) {
            item.msg._metadata.failedAttempts = this.messageFailedAttemptCounter[item.msg.messageId];
          }
          /* eslint-enable no-underscore-dangle */
        });
        const messageIds = batchedItems.map((item: any) => item.msg.messageId);

        this.batchProcessFunc(batchedItems, (error: any, response: any) => {
          // Important to remove the events from the detector before calling done,
          // otherwise we could accidentally mark it as duplicated
          this.duplicateEventDetector.done(error, batchedItems);
          batchedQueuedObjects.forEach((item: any) => item.done(error, response));
          done(error);
          if (!error) {
            this._resetMessageIdCounters(messageIds);
          } else {
            this._incrementMessageIdCounters(messageIds);
          }
          if (this.currentBatch.length > 0) {
            this._schedule();
          }
        });
      } else {
        throw new Error('batchFlushCallback has not been set. Call PushBatchableQueue#start first.');
      }
    } else {
      done();
    }
  };

  _incrementMessageIdCounters = (messageIds: any) => {
    messageIds.forEach((id: any) => {
      if (this.messageFailedAttemptCounter[id]) {
        this.messageFailedAttemptCounter[id] += 1;
      } else {
        this.messageFailedAttemptCounter[id] = 1;
      }
    });
  };

  _resetMessageIdCounters = (messageIds: any) => {
    messageIds.forEach(
      (id: any) => delete this.messageFailedAttemptCounter[id],
    );
  };

  _onDiscardedEvent = (item: any) => {
    this.metrics.addToItemsDiscardedByRetryCounter();
    delete this.messageFailedAttemptCounter[item.msg.messageId];
  };

  _onOverflowEvent = (item: any) => {
    this.metrics.addToItemsDiscardedByOverflowCounter();
    delete this.messageFailedAttemptCounter[item.msg.messageId];
  };

  _onLocalstorageDuplicateEvent = (item: any) => {
    this.metrics.addToLocalstorageDuplicateCount();
    delete this.messageFailedAttemptCounter[item.msg.messageId];
  };

  _schedule = () => {
    this.scheduler.schedule({
      immediate: this.currentBatch.length >= this.flushBatchSize,
    });
  };

  _processSingleElement = (item: any, done: any) => {
    if (this.duplicateEventDetector.hasEventBeenSeen(item)) {
      done();
      this.metrics.addToDuplicateEventCounter();
      return;
    }
    this.duplicateEventDetector.addItem(item);
    this.currentBatch.push({
      item,
      done,
    });

    if (this.currentBatch.length > this.maxQueueSize) {
      this.currentBatch.splice(0, this.currentBatch.length - this.maxQueueSize);
    }

    this._schedule();
  };

  addItem = (item: any) => {
    this.queue.addItem(item);
    this.metrics.addToEventCount();
  }

  stop = () => {
    this.scheduler.stop();
    this.queue.stop();
  };

  on = (eventName: any, callback: any) => this.queue.on(eventName, callback);
}
