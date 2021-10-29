import { buildActionName } from './eventBuilder';
import EventCompressor from './eventCompressor';
import { equals, partition } from './objectUtils';

// We want to throttle the flush rate so that we don't have a huge upfront performance hit from starting the flush,
// and so that the underlying Segment client has some time to process some events in its queue before more are added.
const FLUSH_BATCH_SIZE = 7; // aligns with the default batch size of Segment's BatchableQueue
const FLUSH_BATCH_BACKOFF_PERIOD = 100;

export default class EventDelayQueue {
  _compressor: any;

  _eventArgs: any;

  _flushBatchTimeout: any;

  _processFn: any;

  constructor(processFn: any, compressionRules: any) {
    this._processFn = processFn;
    this._flushBatchTimeout = null;
    this._eventArgs = [];
    this._compressor = new EventCompressor(compressionRules);
  }

  push = (identifier: any, builtEvent: any, context: any, userInfo: any) => {
    this._eventArgs.push({
      identifier,
      builtEvent,
      context,
      userInfo,
    });
  };

  size = () => this._eventArgs.length;

  startFlush = () => {
    try {
      this._eventArgs = this._compressEventArgs(this._eventArgs);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        'Failed to perform compression on the delayed analytics events. '
          + `Error: ${e.message}. Sending ${this._eventArgs.length} uncompressed events instead`,
      );
    }

    this._flushNextBatch();
  };

  cancelFlush = () => {
    if (this._flushBatchTimeout) {
      clearTimeout(this._flushBatchTimeout);
      this._flushBatchTimeout = null;
    }
  };

  _flushNextBatch = () => {
    const batch = this._eventArgs.splice(0, FLUSH_BATCH_SIZE);
    batch.forEach((item: any) => this._processFn(
      item.identifier,
      item.builtEvent,
      item.context,
      item.userInfo,
    ),);
    if (this._eventArgs.length > 0) {
      this._flushBatchTimeout = setTimeout(
        () => this._flushNextBatch(),
        FLUSH_BATCH_BACKOFF_PERIOD,
      );
    } else {
      this._flushBatchTimeout = null;
    }
  };

  _compressEventArgs = (eventArgs: any) => {
    const [
      compressibleEventArgs,
      incompressibleEventArgs,
    ] = partition(eventArgs, (args: any) => this._compressor.canCompress(args.builtEvent),);

    // Events can only be compressed together if they share the same context and user info, since these are top-level
    // fields that need to exist on the fired event and can only be set to a single value.
    // We can achieve this by grouping our events by context prior to passing them to the compressor.
    const contextGroups = compressibleEventArgs.reduce(
      (groups: any, args: any) => {
        let matchingGroup = null;
        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          if (
            equals(group.userInfo, args.userInfo)
            && equals(group.context, args.context)
          ) {
            matchingGroup = group;
            break;
          }
        }

        if (matchingGroup) {
          matchingGroup.eventArgs.push(args);
        } else {
          groups.push({
            userInfo: args.userInfo,
            context: args.context,
            eventArgs: [args],
          });
        }
        return groups;
      },
      [],
    );

    // Run the compressor on each group
    const allCompressedEventArgs = contextGroups.reduce(
      (acc: any, group: any) => {
        try {
          const events = group.eventArgs.map((args: any) => args.builtEvent);
          const compressedEvents = this._compressor.compress(events);
          const compressedEventArgs = compressedEvents.map(
            (compressedEvent: any) => ({
              identifier: buildActionName(compressedEvent),
              builtEvent: compressedEvent,
              userInfo: group.userInfo,
              context: group.context,
            }),
          );

          compressedEventArgs.forEach((args: any) => acc.push(args));
          return acc;
        } catch (e) {
          // If anything goes wrong while compressing this group, then just fall back on the
          // uncompressed events instead. The event compressor already handles errors with invalid
          // generator functions or results, but this is an extra layer of defense to prevent data
          // loss in the event of an unexpected error.
          // eslint-disable-next-line no-console
          console.warn(
            'Failed to compress some analytics events. '
              + `Error: ${e.message}. Sending ${group.eventArgs.length} uncompressed events instead`,
          );
          return group.eventArgs;
        }
      },
      [],
    );

    incompressibleEventArgs.forEach((args: any) => allCompressedEventArgs.push(args),);
    return allCompressedEventArgs;
  };
}
