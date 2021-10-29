import { StoreType } from '../resiliencedb';

import { ResilienceMechanism } from './types';

type MetricsType = {
  itemsDiscardedByRetry: number;
  eventCount: number;
  itemsDiscardedByOverflow: number;
  resilienceMechanism: ResilienceMechanism | StoreType;

  // Localstorage specific
  duplicateEventCount: number;
  localstorageDuplicateCount: number;
  fullReclaims: number,
  partialReclaims: number,
  failedReclaims: number,
  localstorageQueuesPurged: number,
};

type ReclaimMetrics = {
  fullReclaims: number,
  partialReclaims: number,
  failedReclaims: number,
};

export class MetricsCollector {

  // Number of events discarded due to exceeding retry limits.
  private itemsDiscardedByRetry: number = 0;

  // Number of events created by the product in current tab.
  private eventCount: number = 0;

  // Number of events discarded due to reaching queue max size.
  private itemsDiscardedByOverflow: number = 0;

  // Will be used in the future when we get more resilience mechanisms
  private resilienceMechanism: ResilienceMechanism | StoreType = ResilienceMechanism.LOCALSTORAGE;

  /* --- LocalStorage specific metrics --- */

  // Emitted by PushBatbatchableQueue finding duplicate events.
  private duplicateEventCount: number = 0;

  // Emitted by @segment/localstorage-retry finding duplicate events.
  private localstorageDuplicateCount: number = 0;

  // Emitted by purgeOrphanedQueues to tell us how many queues we have had to clean up due to
  // https://github.com/segmentio/localstorage-retry/pull/17
  private localstorageNumberOfQueuesPurged: number = 0;

  // Emitted by reclaimEvents to tell us how many queues were seen in the process of reclaim.
  // We will only emit metrics for queues that are not currently being maintained (i.e. `ack` is not being updated).

  // Queue was found, all events removed and put into resilienceDb.
  private localstorageNumberOfFullReclaims: number = 0;

  // Queue was found but not all events were able to be put into resilienceDb.
  private localstorageNumberOfPartialReclaims: number = 0;

  // Reclaim failed for a queue and reclaim was abandonded.
  private localstorageNumberOfFailedReclaims: number = 0;

  addToItemsDiscardedByRetryCounter(numberOfDeletedEvents: number = 1) {
    this.itemsDiscardedByRetry += numberOfDeletedEvents;
  }

  addToEventCount() {
    this.eventCount++;
  }

  addToItemsDiscardedByOverflowCounter(numberOfDeletedEvents: number = 1) {
    this.itemsDiscardedByOverflow += numberOfDeletedEvents;
  }

  setResilienceMechanism(mechanism: ResilienceMechanism | StoreType) {
    this.resilienceMechanism = mechanism;
  }

  /* <Localstorage specific> */

  addToDuplicateEventCounter() {
    this.duplicateEventCount++;
  }

  addToLocalstorageDuplicateCount() {
    this.localstorageDuplicateCount++;
  }

  addToReclaimMetrics(reclaimMetrics: ReclaimMetrics) {
    this.localstorageNumberOfFullReclaims += reclaimMetrics.fullReclaims;
    this.localstorageNumberOfPartialReclaims += reclaimMetrics.partialReclaims;
    this.localstorageNumberOfFailedReclaims += reclaimMetrics.failedReclaims;
  }

  addToPurgedQueuesMetrics(numberOfQueuesPurged: number) {
    this.localstorageNumberOfQueuesPurged += numberOfQueuesPurged;
  }

  /* </Localstorage specific> */

  subtractFromMetrics(sentMetrics: Partial<MetricsType>) {
    this.itemsDiscardedByRetry = this.subtractFromCount(this.itemsDiscardedByRetry, sentMetrics.itemsDiscardedByRetry);
    this.eventCount = this.subtractFromCount(this.eventCount, sentMetrics.eventCount);
    this.itemsDiscardedByOverflow = this.subtractFromCount(this.itemsDiscardedByOverflow, sentMetrics.itemsDiscardedByOverflow);

    // Localstorage specific
    this.duplicateEventCount = this.subtractFromCount(this.duplicateEventCount, sentMetrics.duplicateEventCount);
    this.localstorageDuplicateCount = this.subtractFromCount(this.localstorageDuplicateCount, sentMetrics.localstorageDuplicateCount);
    this.localstorageNumberOfFullReclaims = this.subtractFromCount(this.localstorageNumberOfFullReclaims, sentMetrics.fullReclaims);
    this.localstorageNumberOfPartialReclaims = this.subtractFromCount(this.localstorageNumberOfPartialReclaims, sentMetrics.partialReclaims);
    this.localstorageNumberOfFailedReclaims = this.subtractFromCount(this.localstorageNumberOfFailedReclaims, sentMetrics.failedReclaims);
    this.localstorageNumberOfQueuesPurged = this.subtractFromCount(this.localstorageNumberOfQueuesPurged, sentMetrics.localstorageQueuesPurged);
  }

  private subtractFromCount(count: number, subtract?: number) {
    return Math.max(count - (subtract || 0), 0);
  }

  getMetricsPayload(): MetricsType {
    return {
      itemsDiscardedByRetry: this.itemsDiscardedByRetry,
      eventCount: this.eventCount,
      itemsDiscardedByOverflow: this.itemsDiscardedByOverflow,
      resilienceMechanism: this.resilienceMechanism,

      // Localstorage specific
      duplicateEventCount: this.duplicateEventCount,
      localstorageDuplicateCount: this.localstorageDuplicateCount,
      localstorageQueuesPurged: this.localstorageNumberOfQueuesPurged,
      fullReclaims: this.localstorageNumberOfFullReclaims,
      partialReclaims: this.localstorageNumberOfPartialReclaims,
      failedReclaims: this.localstorageNumberOfFailedReclaims,
    }
  }
}

let cachedMetricsClient: MetricsCollector | null = null;

export default (): MetricsCollector => {
  if (!cachedMetricsClient) {
    cachedMetricsClient = new MetricsCollector();
  }
  return cachedMetricsClient;
}
