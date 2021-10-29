import { hash as md5 } from 'spark-md5';
import uuid from 'uuid/v4';

import {
  RetryQueueOptions,
} from '../resilienceQueue';
import { Context } from '../types';

import { EVENT_MISMATCH } from './constants';
import getIntermediateBatchableQueue, {
  IntermediateBatchableQueue
} from './intermediateResilienceQueue';
import {
  BaseSegmentEvent,
  PackagedEvent,
  SegmentEvent,
  SegmentEventTypes,
  SegmentIdentifyEventDef,
  SegmentIdentifyEventTraitsDef,
  SegmentMetadataDef,
  SegmentProperties,
  SegmentScreenEventDef,
  SegmentTrackEventDef,
  SegmentTrackPropertiesDef,
} from './types';
import User from './user';
import {
  buildContext,
  prepareEventProperties,
} from './util';

export type Options = {
  apiHost: string,
  retryQueueOptions?: RetryQueueOptions,
  retryQueuePrefix: string,
  product: string,
};

const BUNDLED_INTEGRATIONS = ['BeforeSend', 'Segment.io'];
const UNBUNDLED_INTEGRATIONS = ['Amplitude'];

export const METADATA: SegmentMetadataDef = {
  bundled: BUNDLED_INTEGRATIONS,
  unbundled: UNBUNDLED_INTEGRATIONS,
};

export default class EventProcessor {

  private user: User;
  private options: Options;

  private resilienceQueue: IntermediateBatchableQueue;

  constructor(options: Options) {
    this.user = new User();
    this.options = options;
    this.resilienceQueue = getIntermediateBatchableQueue(
      options.retryQueuePrefix,
      options.product,
      this.options.retryQueueOptions || {}
    );
    this.resilienceQueue.setEventProcessor(this);
    // Dont call start here yet, we dont want to flush events with this processor.
  }

  getUser(): User {
    return this.user;
  }

  track(eventName: string, builtEvent: SegmentTrackPropertiesDef, context: Context, callback?: () => void) {
    const baseEvent = this.buildBaseEvent(context, SegmentEventTypes.TRACK);
    const eventWithoutMessageId: Omit<SegmentTrackEventDef, 'messageId'> = {
      ...baseEvent,
      type: SegmentEventTypes.TRACK,
      properties: prepareEventProperties(builtEvent),
      event: eventName,
    };
    const event: SegmentTrackEventDef = {
      ...eventWithoutMessageId,
      messageId: this.createMessageId(eventWithoutMessageId),
    };
    const packagedEvent = this.packageEvent(event);

    // For event mismatches, we need to send the event through so we can recieive them in splunk.
    this.resilienceQueue.addItem(packagedEvent, eventName !== EVENT_MISMATCH);
    if (callback) {
      callback();
    }
  }

  page(eventName: string, builtEvent: SegmentProperties, context: Context, callback?: () => void) {
    const baseEvent = this.buildBaseEvent(context, SegmentEventTypes.PAGE);
    const eventWithoutMessageId: Omit<SegmentScreenEventDef, 'messageId'> = {
      ...baseEvent,
      type: SegmentEventTypes.PAGE,
      properties: {
        ...prepareEventProperties(builtEvent),
        name: eventName,
      },
      name: eventName,
      category: null,
    };
    const event: SegmentScreenEventDef = {
      ...eventWithoutMessageId,
      messageId: this.createMessageId(eventWithoutMessageId),
    };
    const packagedEvent = this.packageEvent(event);

    this.resilienceQueue.addItem(packagedEvent, true);
    if (callback) {
      callback();
    }
  }

  // Segment uses the identifier to update user id which we have already done in the analyticsWebClient.ts
  identify(_identifier: string, builtEvent: SegmentIdentifyEventTraitsDef, context: Context, callback?: () => void) {
    const baseEvent = this.buildBaseEvent(context, SegmentEventTypes.IDENTIFY);
    const eventWithoutMessageId: Omit<SegmentIdentifyEventDef, 'messageId'> = {
      ...baseEvent,
      type: SegmentEventTypes.IDENTIFY,
      traits: prepareEventProperties(builtEvent),
    };
    const event: SegmentIdentifyEventDef = {
      ...eventWithoutMessageId,
      messageId: this.createMessageId(eventWithoutMessageId),
    };
    const packagedEvent = this.packageEvent(event);
    this.resilienceQueue.addItem(packagedEvent, true);
    if (callback) {
      callback();
    }
  }

  private buildBaseEvent(
    context: Context,
    type: SegmentEventTypes,
  ): Omit<BaseSegmentEvent, 'messageId'> {
    const clonedContext = prepareEventProperties(context);
    const segmentContext = buildContext(clonedContext);
    return {
      context: segmentContext,
      timestamp: new Date().toISOString(),
      type,
      integrations: {},
      userId: this.user.getUserId(),
      anonymousId: this.user.getAnonymousId(),
      _metadata: METADATA,
    };
  }

  private createMessageId(
    event: object
  ): string {
    return `ajs-${md5(JSON.stringify(event) + uuid())}`;
  }

  private packageEvent(
    event: SegmentEvent
  ): PackagedEvent {
    const { apiHost } = this.options;
    return {
      headers: {
        'Content-Type': 'text/plain',
      },
      msg: event,
      url: `https://${apiHost}/${event.type.charAt(0)}`,
    };
  }
}
