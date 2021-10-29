import BrowserInteractionTime from 'browser-interaction-time';

import { validateDwellBaseEvent } from './eventValidation';

const DEFAULT_TIMING = {
  initialPollInterval: 5000,
  idleTimeout: 30000,
  multiplierCallback: (x: any) => x + x,
};

/**
 * Helper class to record the amount of time a user has spent on a page.
 *
 * Two kinds of dwell events are fired. Dwell milestone events are fired periodically while the
 * user is on the page, at increasing intervals (by default, 5s, 10s, 20s, 40s, etc.). A final
 * dwell event will also be fired when the user leaves the page.
 *
 * Note that the event data passed to this helper should be compatible with a 'track' event.
 * See https://extranet.atlassian.com/display/PData/Track+Events for more information.
 *
 * Example usage:
 *
 * const baseEventData = {
 *   actionSubject: 'page',
 *   actionSubjectId: 'aa4fd6c5-28f4-40fa-807a-765a39957cb5',
 *   source: 'page',
 *   containerType: 'space',
 *   containerId: '340f1acf-d15b-4677-88c6-4671d23fb131',
 * }
 *
 * const helper = new DwellTimeHelper(sendTrackEventFunction, baseEventData, searchSessionId)
 * helper.start();
 */
export default class DwellTimeHelper {
  _eventData: any;

  _searchSessionId: any;

  _timing: any;

  _trackCallback: any;

  browserInteractionTime: any;
  /**
   * Callback for sending a 'track' analytics event. This callback should either be the
   * 'sendTrackEvent' method on the AnalyticsWebClient, or a method that eventually delegates to it.
   * The data for the dwell event will be passed to this method for sending.
   *
   * @callback trackCallback
   * @param {Object} eventData - the base event data that will be added to the track event.
   */

  /**
   * Creates and initialises the DwellTimeHelper.
   *
   * @param {trackCallback} trackCallback - the track callback responsible for actually sending
   * the event.
   * @param {Object} eventData - the base data that will be added to the track event.
   * Additional dwell time attributes will be appended to this data. Note that you don't need to
   * include the 'action' property, as this will be added automatically.
   * @param {?string} searchSessionId - a unique identifier for the related search session.
   * @param {?Object} timingOptions - for the purpose of debugging, you can override the default
   * timing used for measuring dwell time. The following values are possible:
   * - initialPollInterval: how long to wait before the first dwell milestone event
   * is fired (in seconds). Default = 5.
   * - pollBackoffRate: how much to multiply the last poll interval by on each dwell milestone.
   * event. Default = 2.
   * - idleTimeout: how long to wait for no user activity before pausing
   * the dwell timer (in seconds). Default = 30s.
   */
  constructor(
    trackCallback?: any,
    eventData?: any,
    searchSessionId?: any,
    timingOptions?: any,
  ) {
    if (!trackCallback) {
      throw new Error('trackCallback is required for DwellTimeHelper');
    }
    validateDwellBaseEvent(eventData);

    this._trackCallback = trackCallback;
    this._eventData = eventData;
    this._searchSessionId = searchSessionId;
    this._timing = { ...DEFAULT_TIMING, ...timingOptions };
    this.browserInteractionTime = new BrowserInteractionTime({
      idleTimeoutMs: this._timing.idleTimeout,
      checkCallbacksIntervalMs: 500,
    });
  }

  /**
   * Starts the dwell timer. This method should be called upon the initial page load.
   */
  start = () => {
    this.browserInteractionTime.startTimer();
    this.browserInteractionTime.addTimeIntervalEllapsedCallback({
      callback: (timeInMilliseconds: any) => this._sendDwellEvent(
        this._eventData,
        this._searchSessionId,
        timeInMilliseconds,
        false,
      ),
      timeInMilliseconds: this._timing.initialPollInterval,
      multiplier: this._timing.multiplierCallback,
    });

    window.addEventListener('beforeunload', this._onBeforeUnload);
  };

  /**
   * Stops the dwell timer and sends the final dwell event. Call this method if you wish to
   * finalise a dwell measurement without starting a new one. When switching to a new page in a
   * single-page app, use newPage instead.
   */
  stop = () => {
    if (this.browserInteractionTime.isRunning()) {
      this._sendDwellEvent(
        this._eventData,
        this._searchSessionId,
        this.browserInteractionTime.getTimeInMilliseconds(),
        true,
      );
    }

    this.browserInteractionTime.stopTimer();
  };

  /**
   * Send the final dwell event and reinitialise the dwell timer for a new page.
   * This method should be called whenever a new page is switched to in a single-page app context.
   *
   * @param {Object} eventData - the base data that will be added to the track event.
   * @param {?string} searchSessionId - the new search session ID.
   */
  newPage = (eventData: any, searchSessionId: any) => {
    validateDwellBaseEvent(eventData);

    this.stop();
    this.browserInteractionTime.reset();
    this.setEventData(eventData);
    this.setSearchSessionId(searchSessionId);

    this.start();
  };

  setEventData = (eventData: any) => {
    this._eventData = eventData;
  };

  getEventData = () => this._eventData;

  setSearchSessionId = (searchSessionId: any) => {
    this._searchSessionId = searchSessionId;
  };

  getSearchSessionId = () => this._searchSessionId;

  destroy = () => {
    this.browserInteractionTime.destroy();
    window.removeEventListener('beforeunload', this._onBeforeUnload);
  };

  _onBeforeUnload = () => {
    this.stop();
    this.destroy();
  };

  _sendDwellEvent = (
    eventData: any,
    searchSessionId: any,
    timeInMilliseconds: any,
    isFinalDwellEvent: any,
  ) => {
    const dwellAttributes = {
      dwellTime: timeInMilliseconds,
      searchReferrer: searchSessionId,
      finalDwellEvent: isFinalDwellEvent,
    };

    this._trackCallback({
      action: 'dwelled',
      actionSubject: eventData.actionSubject,
      actionSubjectId: eventData.actionSubjectId,
      source: eventData.source,
      containerType: eventData.containerType,
      containerId: eventData.containerId,
      objectType: eventData.objectType,
      objectId: eventData.objectId,
      attributes: { ...dwellAttributes, ...eventData.attributes },
      tags: eventData.tags,
    });
  };
}
