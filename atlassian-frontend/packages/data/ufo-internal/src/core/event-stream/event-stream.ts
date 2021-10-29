import { ufolog } from '@atlassian/ufo-experimental/logger';
import {
  ExperienceData,
  SUBSCRIBE_ALL,
  SubscribeCallback,
  UFOGlobalEventStreamEvent,
  UFOGlobalEventStreamEventType,
} from '@atlassian/ufo-experimental/types';

export class UFOGlobalEventStream {
  __buffer_only__ = false;

  subscribers: { [key: string]: Array<SubscribeCallback> } = {};

  push(event: UFOGlobalEventStreamEvent) {
    ufolog('EVENT STREAM push', event.type, event.payload);
    if (event.type === UFOGlobalEventStreamEventType.EXPERIENCE_PAYLOAD) {
      this.publish(event.payload);
    }
    if (event.type === UFOGlobalEventStreamEventType.SUBSCRIBE) {
      this.subscribe(event.payload.experienceId, event.payload.callback);
    }
    if (event.type === UFOGlobalEventStreamEventType.UNSUBSCRIBE) {
      this.unsubscribe(event.payload.experienceId, event.payload.callback);
    }
  }

  private publish(eventPayload: ExperienceData) {
    if (this.subscribers[SUBSCRIBE_ALL]) {
      this.subscribers[SUBSCRIBE_ALL].forEach(fn => {
        fn(eventPayload);
      });
    }

    this.subscribers[eventPayload.id]?.forEach(fn => {
      fn(eventPayload);
    });
  }

  private subscribe(experienceId: string, fn: SubscribeCallback) {
    ufolog('EVENT STREAM subscribe', experienceId);
    if (!this.subscribers[experienceId]) {
      this.subscribers[experienceId] = [];
    }
    this.subscribers[experienceId].push(fn);
  }

  private unsubscribe(experienceId: string, fn: SubscribeCallback) {
    const index = this.subscribers[experienceId].findIndex(
      entry => entry === fn,
    );
    if (index !== -1) {
      this.subscribers[experienceId].splice(index, 1);
    }
  }
}
