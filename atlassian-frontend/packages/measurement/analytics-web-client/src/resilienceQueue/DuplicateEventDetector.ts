/**
 * Only used by PushBatchableQueue due to duplication issues
 * Cause by the @segment/localstorage-retry resilienceMechanism
 */
export const MAX_EVENTID_LENGTH = 100;

export default class DuplicateEventDetector {
  inProgressEventIds: any;

  pastEventIds: any;

  constructor() {
    this.pastEventIds = [];
    this.inProgressEventIds = new Set();
  }

  addItem = (item: any) => this.inProgressEventIds.add(item.msg.messageId);

  done = (error: any, items: any) => {
    const messageIds = items.map((item: any) => item.msg.messageId);
    if (!error) {
      this.pastEventIds.push(...messageIds);
      if (this.pastEventIds.length > MAX_EVENTID_LENGTH) {
        this.pastEventIds.splice(
          0,
          this.pastEventIds.length - MAX_EVENTID_LENGTH,
        );
      }
    }
    messageIds.forEach((id: any) => this.inProgressEventIds.delete(id));
  };

  hasEventBeenSeen = (item: any) => this.pastEventIds.indexOf(item.msg.messageId) >= 0
    || this.inProgressEventIds.has(item.msg.messageId);
}
