import { XIDItem } from '@atlassian/atl-cross-domain-tracking/dist/esm';

import { PackagedEvent, SegmentEventTypes } from './integration/types';

export function attachXidToSingleEvent(item: PackagedEvent, xidCallback: () => XIDItem[]) {
  if (!(xidCallback && xidCallback instanceof Function)) {
    return item;
  }

  if (item.msg.type === SegmentEventTypes.PAGE || item.msg.type === SegmentEventTypes.TRACK) {
    const xid = xidCallback();

    if (xid && Array.isArray(xid)) {
        item.msg.properties = { ...item.msg.properties, xid };
    }
  } else if (item.msg.traits && item.msg.type === SegmentEventTypes.IDENTIFY) {
    const xid = xidCallback();

    if (xid && Array.isArray(xid)) {
      item.msg.traits = { ...item.msg.traits, xid };
    }
  }

  return item;
}

export function attachXidToMultipleEvents(items: PackagedEvent[], xidItemPromiseCallback: Promise<() => XIDItem[]>) {
  return xidItemPromiseCallback
    .then((xidCallback: any) => {
      if (Array.isArray(items)) {
        return items.map((item) => attachXidToSingleEvent(item, xidCallback));
      }
      return attachXidToSingleEvent(items, xidCallback);
    })
    .catch(() => items);
}

