/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-classes-per-file */

import { buildActionFields } from './eventBuilder';
import {
  isActionEventType,
  validateActionEvent,
  validateActionEventType,
} from './eventValidation';
import { equals, omit, partition } from './objectUtils';

export class CompressionRule {
  _compressFn: any;

  _predicate: any;
  /**
   * @callback EventPredicate
   * @param {object} event An analytics event
   * @returns {boolean} A flag indicating whether or not the event matches the conditions
   */

  /**
   * @callback CompressionFunction
   * @param {Array.<Object>} events A collection of analytics events that match the predicate of this compression rule
   * @returns {Array.<Object>} compressedEvents The compressed analytics events to fire
   */

  /**
   * This constructor defines a new rule for compressing analytics events.
   * @param {EventPredicate} predicate
   * @param {CompressionFunction} compressFn
   */
  constructor(predicate: any, compressFn: any) {
    if (typeof predicate !== 'function') {
      throw new Error(
        'Invalid predicate, must be a function that accepts an event and returns a boolean',
      );
    }

    if (typeof compressFn !== 'function') {
      throw new Error(
        'Invalid compressFn, must be a function that both accepts and returns an array of events',
      );
    }

    this._predicate = predicate;
    this._compressFn = compressFn;
  }

  /**
   * This function returns a flag indicating whether or not this instance is capable of compressing the given event.
   * @param event
   * @returns {boolean}
   */
  canCompress = (event: any) => {
    try {
      return (
        event && isActionEventType(event.eventType) && this._predicate(event)
      );
    } catch (e) {
      return false;
    }
  };

  /**
   * This function compresses as many events in the given collection as possible.<p>
   * Any events in the given collection that do not match the conditions of {@link canCompress} will be left uncompressed and
   * appended to the end of the resulting array.
   *
   * @param events A collection of analytic events to compress
   * @returns {Array.<Object>} The action fields for the resulting compressed events
   */
  compress = (events: any) => {
    const [compatibleEvents, incompatibleEvents] = partition(
      events,
      (event: any) => this.canCompress(event),
    );
    const compressedEvents = this._compressFn(compatibleEvents);
    if (!compressedEvents) {
      throw new Error('No events were returned from the compression function');
    }

    compressedEvents.forEach((event: any) => {
      validateActionEventType(event.eventType);
      validateActionEvent(event);
    });

    return compressedEvents.concat(incompatibleEvents);
  };
}

export default class EventCompressor {
  _compressionRules: any;

  constructor(compressionRules: any = []) {
    if (!Array.isArray(compressionRules)) {
      throw new Error(
        'Event compressors must be constructed with an array of CompressionRules',
      );
    }

    if (
      !compressionRules.every((rule: any) => rule instanceof CompressionRule)
    ) {
      throw new Error(
        'Event compressors can only be constructed with instances of CompressionRule',
      );
    }

    this._compressionRules = compressionRules;
  }

  canCompress = (event: any) => this._compressionRules.some((compressionRule: any) => compressionRule.canCompress(event),);

  compress = (events: any) => {
    const groups = this._createGroups(events);
    return groups.reduce((allCompressedEvents: any, group: any) => {
      const groupCompressedEvents = this._compressGroup(group);
      groupCompressedEvents.forEach((compressedEvent: any) => allCompressedEvents.push(compressedEvent),);
      return allCompressedEvents;
    }, []);
  };

  _createGroups = (events: any) =>
    // Group events based on contextual fields. These fields are anything that is added by the client itself,
    // rather than passed in by the caller (eg. product, org. and tenant info)
    events.reduce((groups: any, event: any) => {
      let matchingCompressor = null;
      for (let i = 0; i < this._compressionRules.length; i++) {
        const compressor = this._compressionRules[i];
        if (compressor.canCompress(event)) {
          matchingCompressor = compressor;
          break;
        }
      }

      let contextFields;
      if (matchingCompressor) {
        const actionFields = buildActionFields(event, event.eventType);
        contextFields = omit(event, Object.keys(actionFields));
      }

      let matchingGroup = null;
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (
          matchingCompressor === group.compressor
          && equals(contextFields, group.contextFields)
        ) {
          matchingGroup = group;
          break;
        }
      }

      if (matchingGroup) {
        matchingGroup.events.push(event);
      } else {
        groups.push({
          contextFields,
          compressor: matchingCompressor,
          events: [event],
        });
      }

      return groups;
    }, []);

  _compressGroup = (group: any) => {
    // If this group doesn't have any compressor, then the event args are already in their final format
    if (!group.compressor) {
      return group.events;
    }

    try {
      // Run the compressor on the group to generate some new events.
      // The compression function is only expected to return the action fields for each
      // event that it generates, since all other fields are generated by the client.
      const compressedEventActionFields = group.compressor.compress(
        group.events,
      );

      // Add the context fields to each of the resulting events to inflate them into a full action event
      return compressedEventActionFields.map((actionFields: any) => ({
        ...actionFields,
        ...group.contextFields,
      }));
    } catch (e) {
      // If we fail to compress the events, then just fall back the uncompressed events
      // so that no data is lost. This can happen if the compression function throws an error
      // or returns some invalid event payloads.
      // eslint-disable-next-line no-console
      console.warn(
        'Failed to compress some analytics events. '
          + `Error: ${e.message}. Sending ${group.events.length} uncompressed events instead`,
      );
      return group.events;
    }
  };
}
