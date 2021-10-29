import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';

import { PostEventPayload } from './types';

const SOURCE = 'growthKitIframePlugin';

export enum MonitoredEvents {
  Initialisation = 'initialised',
  InitialisationError = 'initialisationFailed',
  Handshake = 'handshake',
  HandshakeTimeout = 'handshakeTimeout',
  Ready = 'ready',
  ReadyTimeout = 'readyTimeout',
}

export class IframeEvents {
  private initTime?: number;
  private readonly appName: string;

  constructor(appName: string) {
    if (!appName) {
      throw new Error('Please pass through an appName');
    }

    this.appName = appName;
  }

  getAnalyticsEvent = (event: MonitoredEvents): PostEventPayload => {
    const attributes = {};
    if (this.isInitialisationEvent(event)) {
      this.startTimer();
    }
    if (this.isTimedEvent(event)) {
      Object.assign(attributes, this.getTimestamp(event));
    }
    return {
      context: [
        {
          source: SOURCE,
        },
      ],
      payload: {
        eventType: OPERATIONAL_EVENT_TYPE,
        action: event,
        actionSubject: 'spaParentClient',
        actionSubjectId: `${this.appName}SpaParentClient`,
        attributes: {
          appName: this.appName,
          ...attributes,
        },
      },
    };
  };

  private getTimestamp = (event: MonitoredEvents) => {
    const key =
      event === MonitoredEvents.Handshake ? 'timeToHandshake' : 'timeToReady';
    if (!this.initTime) {
      throw new Error('No initialisation time (missing initialisation event)');
    }
    return {
      [key]: Date.now() - this.initTime,
    };
  };

  private isInitialisationEvent = (event: MonitoredEvents) => {
    return [MonitoredEvents.Initialisation].indexOf(event) !== -1;
  };

  private isTimedEvent = (event: MonitoredEvents): boolean => {
    return (
      [MonitoredEvents.Handshake, MonitoredEvents.Ready].indexOf(event) !== -1
    );
  };

  private startTimer = () => {
    this.initTime = Date.now();
  };
}
