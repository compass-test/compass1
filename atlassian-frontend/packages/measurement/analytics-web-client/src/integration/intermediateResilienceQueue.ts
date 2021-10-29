import { eventType } from '../index';
import createBatchableQueue, { BatchableQueue, BatchFlushCallback, RetryQueueOptions } from '../resilienceQueue';

import { EVENT_MISMATCH } from './constants';
import EventProcessor from './eventProcessor';
import {
  EventMismatch,
  PackagedEvent,
} from './types';
import {
  compareEvents,
  getEventType,
  getTransformUUIDFromEvent,
} from './util';

const libraryVersion = process.env._PACKAGE_VERSION_ as string;

const EVENT_CHECK_TIMEOUT = 5000;

type EventMatcher = {
  segmentIntegration?: PackagedEvent;
  eventProcessor?: PackagedEvent;
};

export class IntermediateBatchableQueue implements BatchableQueue<PackagedEvent> {

  private resilienceQueue: BatchableQueue<PackagedEvent>;

  private eventMap: Map<string, EventMatcher>;

  private timeout?: ReturnType<typeof setTimeout>;

  private eventProcessor?: EventProcessor;

  constructor(
    retryQueuePrefix: string,
    product: string,
    options?: RetryQueueOptions
  ) {
    this.resilienceQueue = createBatchableQueue(retryQueuePrefix, product, options);
    this.eventMap = new Map();
  }

  setEventProcessor(eventProcessor: EventProcessor) {
    this.eventProcessor = eventProcessor;
  }

  start(flushCallback: BatchFlushCallback<PackagedEvent>) {
    return this.resilienceQueue.start(flushCallback);
  }

  stop() {
    return this.resilienceQueue.stop();
  }

  getGlobalRetryCount() {
    return this.resilienceQueue.getGlobalRetryCount();
  }

  addItem(event: PackagedEvent, addedFromNewTransformer: boolean = false) {
    const transformUUID = getTransformUUIDFromEvent(event);
    if (transformUUID) {

      const value: EventMatcher = {};
      if (addedFromNewTransformer) {
        value.eventProcessor = event;
      } else {
        value.segmentIntegration = event;
      }

      const oldValue = this.eventMap.get(transformUUID);
      if (oldValue) {
        this.eventMap.set(transformUUID, {
          ...oldValue,
          ...value,
        });
      } else {
        this.eventMap.set(transformUUID, value);
      }
      this.setTimer();
    }

    if (!addedFromNewTransformer) {
      return this.resilienceQueue.addItem(event);
    }
  }

  private setTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(
      this.compareEvents.bind(this),
      EVENT_CHECK_TIMEOUT
    );
  }

  private compareEvents() {
    this.timeout = undefined;
    const uuids = this.eventMap.keys();
    const mismatches: EventMismatch[] = [];

    for (let uuid of uuids) {
      const entry = this.eventMap.get(uuid);
      if (entry && entry.eventProcessor && entry.segmentIntegration) {
        const eventMismatch = compareEvents(entry.segmentIntegration, entry.eventProcessor);
        if (eventMismatch.mismatches.length > 0) {
          mismatches.push(eventMismatch);
        }
      } else if (entry) {
        // These really shouldnt happen but just in case
        if (entry.segmentIntegration) {
          mismatches.push({
            eventId: entry.segmentIntegration.msg.messageId,
            type: getEventType(entry.segmentIntegration),
            mismatches: [{
              path: '{entire_object}',
              type: 'missing',
            }],
          });
        } else if (entry.eventProcessor) {
          mismatches.push({
            eventId: entry.eventProcessor.msg.messageId,
            type: getEventType(entry.eventProcessor),
            mismatches: [{
              path: '{entire_object}',
              type: 'added',
              value: entry.eventProcessor.msg
            }],
          });
        }
      }
    }
    this.eventMap.clear();

    if (mismatches.length > 0) {
      this.sendMismathesEvent(mismatches);
    }
  }

  private sendMismathesEvent(mismatches: EventMismatch[]) {
    // eslint-disable-next-line no-console
    console.error('If seen, please report this to #mep-bundle-size-feedback', JSON.stringify(mismatches));
    if (this.eventProcessor) {
      // Typescript forgets that we have verified eventProcessor is set in deeper scopes
      const processor = this.eventProcessor;
      const chunks: EventMismatch[][] = [];
      const chunkSize = 20;
      for(let i = 0; i < mismatches.length; i += chunkSize) {
        chunks.push(mismatches.slice(i, i + chunkSize));
      }

      chunks.forEach(mismatchChunk => {
        // Remove this event when removing this file
        // https://data-portal.internal.atlassian.com/analytics/registry/39852
        processor.track(
          EVENT_MISMATCH,
          {
            env: 'stg',
            product: 'measurement',
            eventType: eventType.OPERATIONAL,
            action: 'mismatched',
            actionSubject: 'event',
            attributes: { mismatches: mismatchChunk },
            platform: 'web',
            origin: 'web',
            source: '@atlassiansox/analytics-web-client/integrations/eventProcessor'
          },
          {
            context: {
              screen: {},
              library: {
                name: 'analytics.js',
                version: libraryVersion,
              }
            }
          }
        );
      });
    } else {
      throw new Error('Event processor was not found, cannot send mismatches');
    }
  }
}

let batchableQueue: IntermediateBatchableQueue;

export default (
  retryQueuePrefix: string,
  product: string,
  options?: RetryQueueOptions
) => {
  if(!batchableQueue) {
    batchableQueue = new IntermediateBatchableQueue(
      retryQueuePrefix,
      product,
      options
    );
  }
  return batchableQueue;
}
