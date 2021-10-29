import { apdexType, isType } from './analyticsWebTypes';
import PageVisibility from './pageVisibility';
import Performance from './performance';


export default class ApdexEvent {
  _isActiveEvents: any;

  _onEvent: any;

  _pageVisibility: any;

  _performance: any;

  _startedEvents: any;

  _threshold: number;

  _wasPreviouslyHidden: any;

  constructor(onEvent?: any, pageVisibility?: any) {
    if (!onEvent) {
      throw new Error('Missing onEvent callback');
    }

    if (typeof onEvent !== 'function') {
      throw new Error('Invalid onEvent, must be function');
    }

    if (!(pageVisibility instanceof PageVisibility)) {
      throw new Error('Invalid pageVisibility, must be PageVisibility class');
    }

    this._startedEvents = new Map();
    this._performance = new Performance();
    this._onEvent = onEvent;
    this._threshold = 1000;
    this._wasPreviouslyHidden = pageVisibility.getIsHidden();
    this._isActiveEvents = new Map();
    this._pageVisibility = pageVisibility;
    this._pageVisibility.addCallback('apdexEvent', (isHidden: any) => {
      this.onVisibilityChange(!isHidden);
    });
  }

  start(event: any) {
    this._validateStartEvent(event);

    if (!this._performance.isAvailable()) {
      return;
    }

    const eventKey = this._getEventKey(event);
    const eventStartName = `${eventKey}-start`;

    this._startedEvents.set(eventKey, true);
    this._isActiveEvents.set(eventKey, !this._pageVisibility.getIsHidden());

    this._performance.clearMarks(eventStartName);
    this._performance.mark(eventStartName);
  }

  getStart(event: any) {
    this._validateStartEvent(event);

    if (!this._performance.isAvailable()) {
      return undefined;
    }

    const eventKey = this._getEventKey(event);
    const eventStartName = `${eventKey}-start`;

    return this._getEventTimingByName(eventStartName);
  }

  stop(event: any, callback?: any) {
    this._validateStopEvent(event);

    if (!this._performance.isAvailable()) {
      return;
    }

    const apdexFields = this._getApdexFields(event);
    const visibilityFields = this._getVisibilityFields(event);

    this._sendEvent(
      {
        ...event,
        ...apdexFields,
        ...visibilityFields,
      },
      callback,
    );
  }

  onVisibilityChange(isActive: any) {
    if (!isActive) {
      this._wasPreviouslyHidden = true;
      this._isActiveEvents.forEach((value: any, key: any) => this._isActiveEvents.set(key, false),);
    }
  }

  _getEventKey = ({ task, taskId }: { task: any; taskId?: string }) => (taskId ? `${task}.${taskId}` : task);

  _getEventTimingByName = (name: any) => {
    const eventTimings = this._performance.getEntriesByName(name);
    const eventTiming = eventTimings[eventTimings.length - 1];
    return eventTiming;
  };

  _getApdexFields = (event: any) => {
    const apdexTimings = this._getApdexTimings(event);
    const apdexScore = this._calculateApdex({
      duration: apdexTimings.duration,
      threshold: event.threshold,
    });
    return {
      ...apdexTimings,
      apdex: apdexScore,
    };
  };

  _getApdexTimings = (event: any) => {
    const eventKey = this._getEventKey(event);
    const eventStartName = `${eventKey}-start`;

    const startTime = event.startTime || this._getStartTime(event, eventStartName);
    const stopTime = event.stopTime || this._getStopTime();

    // We do some clean up of the marks and started events
    this._cleanApdexState(eventKey);

    return {
      startTime,
      stopTime,
      duration: stopTime - startTime,
    };
  };

  _getStartTime = (event: any, eventName: any) => {
    let startTime;
    const timeOrigin = this._performance.getTimeOrigin();
    if (event.type === apdexType.INITIAL_LOAD) {
      startTime = timeOrigin;
    } else {
      const eventTiming = this._getEventTimingByName(eventName);
      startTime = timeOrigin + eventTiming.startTime;
    }
    return startTime;
  };

  _getStopTime = () => this._performance.getTimeOrigin() + this._performance.now();

  _cleanApdexState = (eventKey: any) => {
    this._performance.clearMarks(`${eventKey}-start`);
    this._performance.clearMarks(`${eventKey}-stop`);
    this._startedEvents.delete(eventKey);
  };

  _getVisibilityFields = (event: any) => {
    let isActiveTab;
    /**
     * For initialLoad type:
     * 1. if tab was not ever hidden (!_wasPreviouslyHidden)
     *
     * For transition type:
     * 1. active status is tracked in active events map (_isActiveEvents)
     *
     * For any type, if startTime or stopTime is specified:
     * 1. If currently active (!_isHidden)
     */

    if (event.type === apdexType.INITIAL_LOAD) {
      isActiveTab = !this._wasPreviouslyHidden;
    } else if (event.type === apdexType.TRANSITION) {
      const eventKey = this._getEventKey(event);
      isActiveTab = this._isActiveEvents.get(eventKey);
    }

    if (event.startTime || event.stopTime) {
      isActiveTab = !this._pageVisibility.getIsHidden();
    }
    return { isActiveTab };
  };

  _calculateApdex = ({
    duration,
    threshold = this._threshold,
  }: {
    duration: number;
    threshold?: number;
  }) => {
    let apdex;
    const satisfiedThreshold = threshold;
    const tolerableThreshold = threshold * 4;

    if (duration <= satisfiedThreshold) {
      apdex = 1;
    } else if (duration <= tolerableThreshold) {
      apdex = 0.5;
    } else {
      apdex = 0;
    }

    return apdex;
  };

  _validateStartEvent = (event?: any) => {
    if (!event) {
      throw new Error('Missing "event" in Apdex start event');
    }

    if (!event.task) {
      throw new Error('Missing "task" in Apdex start event');
    }

    if (typeof event.task !== 'string') {
      throw new Error('Invalid "task" in Apdex start event');
    }

    if (event.taskId && typeof event.taskId !== 'string') {
      throw new Error('Invalid "taskId" in Apdex start event');
    }
  };

  _validateStopEvent = (event?: any) => {
    if (!event) {
      throw new Error('Missing "event" in Apdex stop event');
    }

    if (!event.task) {
      throw new Error('Missing "task" in Apdex stop event');
    }

    if (typeof event.task !== 'string') {
      throw new Error('Invalid "task" in Apdex stop event');
    }

    if (event.taskId && typeof event.taskId !== 'string') {
      throw new Error('Invalid "taskId" in Apdex stop event');
    }

    if (!event.type) {
      throw new Error('Missing "type" in Apdex stop event');
    }

    if (event.type && !isType(apdexType, event.type)) {
      throw new Error('Invalid "type" in Apdex stop event');
    }

    if (event.threshold && typeof event.threshold !== 'number') {
      throw new Error('Invalid "threshold" in Apdex stop event');
    }

    /*
     * For a transition, if the startTime was not specified,
     * the start event should have been present.
     */
    if (!event.startTime && event.type === apdexType.TRANSITION) {
      const eventKey = this._getEventKey(event);
      if (!this._startedEvents.has(eventKey)) {
        throw new Error(`Apdex event transition "${eventKey}" was not started`);
      }
    }

    if (
      event.startTime
      && !(typeof event.startTime === 'number' && event.startTime >= 0)
    ) {
      throw new Error('Invalid "startTime" in Apdex stop event');
    }

    if (event.stopTime && typeof event.stopTime !== 'number') {
      throw new Error('Invalid "stopTime" in Apdex stop event');
    }

    if (event.stopTime <= event.startTime) {
      throw new Error(
        '"stopTime" should be greater than "startTime" in Apdex stop event',
      );
    }
  };

  _shouldSendEvent = (event: any) => {
    if (!event) {
      return false;
    }

    if (typeof event.apdex !== 'number') {
      return false;
    }

    return true;
  };

  _sendEvent = (event: any, callback: any) => {
    if (this._shouldSendEvent(event)) {
      this._onEvent(
        {
          source: 'ui',
          action: 'readyForUser',
          actionSubject: 'ui',
          attributes: {
            ...event.additionalAttributes,
            task: event.task,
            taskId: event.taskId,
            type: event.type,
            threshold: event.threshold || this._threshold,
            apdex: event.apdex,
            startTime: event.startTime,
            stopTime: event.stopTime,
            duration: event.duration,
            isActiveTab: event.isActiveTab,
          },
        },
        callback,
      );
    }
  };
}
