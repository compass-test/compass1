import { v4 as uuid } from 'uuid';

import {
  envType,
  eventType,
  isType,
  objectValues,
  originType,
  platformType,
  tenantType,
  userType,
} from './analyticsWebTypes';
import ApdexEvent from './apdexEvent';
import BeforeSendIntegration from './beforeSendIntegration';
import createGetter from './createGetter';
import {
  buildActionEvent,
  buildActionName,
  buildContext,
  buildScreenEvent,
} from './eventBuilder';
import EventDelayQueue from './eventDelayQueue';
import {
  validateContainers,
  validateIdentifyEvent,
  validateOperationalEvent,
  validatePlatform,
  validateScreenEvent,
  validateTrackEvent,
  validateUIEvent,
} from './eventValidation';
import EventProcessor from './integration';
import OriginTracing from './originTracing';
import PageVisibility from './pageVisibility';
import { ResilienceMechanism, RetryQueueOptions } from './resilienceQueue';
import SessionTracking from './sessionTracking';
import SafeSessionStorage from './storage/SafeSessionStorage';
import TabTracking from './tabTracking';
import TaskSessionStore from './taskSessionStore';
import TestingCache from './testingCache';
import {
  Context,
  InternalProductInfoType,
  OperationalEventPayload,
  ProductInfoType,
  SendScreenEventInput,
  SettingsType,
  TrackEventPayload,
  UIEventPayload,
  UserInfo,
} from './types';
import UIViewedEvent from './uiViewedEvent';
import { defaultHistoryReplaceFn } from './urlUtils';
import wrapCallback from './wrapCallback';
import { XIDPromise } from './XIDPromise';

const Analytics = require('@segment/analytics.js-core/lib/analytics');

const SegmentIO = require('./analytics.js-integration-segmentio');

const PROD_HOST = 'as.atlassian.com/api/v1';
const STARGATE_PROD_HOST = 'api-private.atlassian.com/gasv3/api/v1';
const STAGING_HOST = 'as.staging.atl-paas.net/api/v1';
const STARGATE_STAGING_HOST = 'api-private.stg.atlassian.com/gasv3/api/v1';

const STARGATE_PROXY_PATH = '/gateway/api/gasv3/api/v1';
const LAST_SCREEN_EVENT_STORAGE_KEY = 'last.screen.event';
const MAX_DELAY_TIMEOUT = 10000;

export default class AnalyticsWebClient {
  _analytics: any;

  _apdexEvent: any;

  _context: Context;

  _delayQueue: any;

  _delayTimeout: any;

  _historyReplaceFn: any;

  _isDelayingLowPriorityEvents: any;

  _orgInfo: any;

  _pageVisibility: any;

  _productInfo: InternalProductInfoType;

  _safeSessionStorage: SafeSessionStorage;

  _sessionTracking: any;

  _tabTracking: any;

  _tenantInfo: any;

  _testingCache: TestingCache;

  _uiViewedAttributes: any;

  _uiViewedEvent: any;

  _userInfo: UserInfo;

  originTracing: any;

  task: any;

  _pageLoadId: string;

  private eventProcessor: EventProcessor;

  constructor(productInfo: ProductInfoType, settings: SettingsType = {}) {
    if (!productInfo) {
      throw new Error('Missing productInfo');
    }

    if (!productInfo.env) {
      throw new Error('Missing productInfo.env');
    }

    if (!productInfo.product) {
      throw new Error('Missing productInfo.product');
    }

    if (!isType(envType, productInfo.env)) {
      throw new Error(
        `Invalid productInfo.env '${productInfo.env}', `
          + `must be an envType: [${objectValues(envType)}]`,
      );
    }

    if (!productInfo.origin) {
      productInfo.origin = originType.WEB;
    } else if (!isType(originType, productInfo.origin)) {
      throw new Error(
        `Invalid productInfo.origin '${productInfo.origin}', `
          + `must be an originType: [${objectValues(originType)}]`,
      );
    }

    if (!productInfo.platform) {
      productInfo.platform = productInfo.origin === originType.WEB
        ? platformType.WEB
        : platformType.DESKTOP;
    } else {
      validatePlatform(productInfo);
    }

    const analytics = new Analytics();
    this._productInfo = {
      ...productInfo,
      subproduct: this._createSubproductGetter(productInfo.subproduct),
      embeddedProduct: this._createEmbeddedProductGetter(productInfo.embeddedProduct),
    };
    this._tenantInfo = {};
    this._orgInfo = {};
    this._userInfo = {
      anonymousId: analytics.user().anonymousId(),
    };
    this._uiViewedAttributes = {};
    this._context = buildContext(this._productInfo);
    this._safeSessionStorage = new SafeSessionStorage();

    const useStargate = this._useStargate(settings.useStargate);
    const apiHost = settings.apiHost || this._selectHost({
      useStargate,
      env: productInfo.env,
      useLegacyUrl: settings.useLegacyUrl
    });

    const maxRetryAttempts = settings.maxRetryAttempts || 4;
    const minRetryDelay = settings.minRetryDelay || 1000;
    const resilienceMechanism: ResilienceMechanism = settings.resilienceMechanism || ResilienceMechanism.LOCALSTORAGE;

    const retryQueueOptions: RetryQueueOptions = {
      maxRetryDelay: 60000,
      minRetryDelay,
      backoffFactor: 2,
      maxAttempts: maxRetryAttempts,
      maxItems: 100,
      flushWaitMs: settings.flushWaitInterval,
      flushBeforeUnload: settings.flushBeforeUnload,
      resilienceMechanism,
    };

    const retryQueuePrefix = `awc-${productInfo.env}`;

    this.eventProcessor = new EventProcessor({
      apiHost,
      product: productInfo.product,
      retryQueuePrefix,
      retryQueueOptions,
    });

    analytics.use(BeforeSendIntegration);
    analytics.use(SegmentIO);
    analytics.init(
      {
        BeforeSend: {},
        'Segment.io': {
          apiKey: settings.apiKey || '',
          apiHost,
          retryQueue: true,
          retryQueuePrefix,
          addBundledMetadata: true,
          unbundledIntegrations: ['Amplitude'],
          retryQueueOptions,
          product: productInfo.product,
          xidPromiseGetter: () => XIDPromise(productInfo.env, settings.xidConsent),
        },
      },
      {
        cookie: {
          secure: window.location.protocol === 'https:',
        },
        user: {
          // Stop the userId from persisting even after the user has logged out
          persist: false,
          // Stop the userId from being loaded from cookies set by other Segment clients
          cookie: {},
          // Stop the userId from being loaded from localStorage set by other Segment clients
          localStorage: {},
          localStorageFallbackDisabled: true,
        },
      },
    );

    this._analytics = analytics;
    this._pageVisibility = new PageVisibility();
    this._tabTracking = new TabTracking();
    this._sessionTracking = new SessionTracking({
      sessionExpiryTime: settings.sessionExpiryTime,
    });

    this.task = new TaskSessionStore();
    this.originTracing = new OriginTracing();

    // Init Apdex
    this._apdexEvent = new ApdexEvent(
      this.sendOperationalEvent,
      this._pageVisibility,
    );

    this._historyReplaceFn = typeof settings.historyReplaceFn === 'function'
      ? settings.historyReplaceFn
      : defaultHistoryReplaceFn;

    this._delayQueue = new EventDelayQueue(
      this._fireDelayedEvent,
      settings.delayQueueCompressors,
    );
    this._testingCache = new TestingCache();

    this._pageLoadId = uuid();
  }

  _useStargate = (useStargate?: boolean): boolean => {
    if (useStargate == null) {
      return true;
    }
    return useStargate;
  };

  _selectHost = ({
    useStargate,
    env,
    useLegacyUrl,
  }: {
    useStargate: boolean;
    env: string;
    useLegacyUrl?: boolean;
  }) => {
    if (!useStargate) {
      return env === envType.PROD ? PROD_HOST : STAGING_HOST;
    }

    if (useLegacyUrl) {
      return env === envType.PROD ? STARGATE_PROD_HOST : STARGATE_STAGING_HOST;
    }

    /**
     * Stargate proxy path now needs to be the default to work around browser restrictions with cookies.
     * For more details, see:
     *  - https://experimentation-platform.atlassian.net/browse/MHD-326, and
     *  - https://hello.atlassian.net/wiki/spaces/I/pages/1217206437/api-private+is+broken+is+your+product+impacted
    */
    return window.location.host + STARGATE_PROXY_PATH;
  };

  _endsWith = (str: string, suffix: string) => str.indexOf(suffix, str.length - suffix.length) !== -1;

  _changeInternalUserId = (userId: string | undefined, anonymousId?: string) => {
    // Segment library workaround to change userId without triggering an identify call.
    if (this._analytics.user().id() !== userId) {
      this._analytics.user().id(userId);
    }
    // We have to always set user id. Its only in memory, so cheap to do.
    // Segment stores user in memory but can share over imports which can cause mismatches
    // when multiple instances of AWC are created.
    if (this._productInfo.env !== envType.PROD) {
      this.eventProcessor.getUser().setUserId(userId);
    }

    if (anonymousId && anonymousId !== this._analytics.user().anonymousId()) {
      // Setting anonymous id can take a long time. Reading is a lot faster.
      // Only update if it has changed.
      this._analytics.user().anonymousId(anonymousId);
    }
  };

  _createSubproductGetter = (subproduct: any) => createGetter(
    subproduct,
    'Cannot get subproduct from the callback. Proceeding without it.',
  );

  _createEmbeddedProductGetter = (embeddedProduct: any) => createGetter(
    embeddedProduct,
    'Cannot get embeddedProduct from the callback. Proceeding without it.',
  );

  _getLastScreenEvent = () => {
    try {
      return JSON.parse(
        this._safeSessionStorage.getItem(LAST_SCREEN_EVENT_STORAGE_KEY) || ''
      );
    } catch (err) {
      this._safeSessionStorage.removeItem(LAST_SCREEN_EVENT_STORAGE_KEY);
      return null;
    }
  };

  _setLastScreenEvent = (event: any) => {
    this._safeSessionStorage.setItem(
      LAST_SCREEN_EVENT_STORAGE_KEY,
      JSON.stringify({
        name: event.name,
        attributes: event.attributes,
      }),
    );
  };

  _shouldEventBeDelayed = (event: any) => {
    // TODO: this is a temporary restriction for the purposes of the Track All Changes project
    // The delay mechanism has a chance of event loss, which we can only accept for our own data at this point.
    // Once the delay queue implementation has been improved and measured to confirm that it is reliable enough,
    // then we will be able to open it up for other products to use by removing this check.
    if (!event.tags || event.tags.indexOf('measurement') === -1) {
      return false;
    }

    const isEventHighPriority = event.highPriority !== false; // defaults to true if excluded
    return this._isDelayingLowPriorityEvents && !isEventHighPriority;
  };

  _fireEvent = (
    identifier: string,
    builtEvent: any,
    context: Context,
    callback: any,
  ) => {
    if (this._productInfo.env !== envType.PROD) {
      builtEvent.transformUUID = uuid();
      this.fireEventWithProcessor(
        this.eventProcessor,
        identifier,
        builtEvent,
        context
        // TODO: For now, we will leave the callback to segment core
        //callback
      );
    }
    this.fireEventWithProcessor(
      this._analytics,
      identifier,
      builtEvent,
      context,
      callback
    );
  };

  private fireEventWithProcessor(
    processor: EventProcessor,
    identifier: string,
    builtEvent: any,
    context: Context,
    callback?: any
  ) {
    switch (builtEvent.eventType) {
      case eventType.UI:
      case eventType.OPERATIONAL:
      case eventType.TRACK:
        return processor.track(identifier, builtEvent, context, callback);
      case eventType.SCREEN:
        return processor.page(identifier, builtEvent, context, callback);
      case eventType.IDENTIFY:
        return processor.identify(
          identifier,
          builtEvent,
          context,
          callback,
        );
      default:
        throw new Error(
          `No handler has been defined for events of type ${builtEvent.eventType}`,
        );
    }
  }

  _fireDelayedEvent = (
    identifier: any,
    builtEvent: any,
    context: Context,
    userInfo: UserInfo,
  ) => {
    try {
      // User information can change while the delay period is active, so we need to restore the values that
      // were active when the event was originally fired.
      this._changeInternalUserId(userInfo.userId, userInfo.anonymousId);
      builtEvent.tags = [...(builtEvent.tags || []), 'sentWithDelay'];

      // The callbacks for delayed events are fired immediately, so there is nothing to pass through for this argument.
      this._fireEvent(identifier, builtEvent, context, undefined);
    } finally {
      this._changeInternalUserId(
        this._userInfo.userId,
        this._userInfo.anonymousId,
      );
    }
  };

  _delayEvent = (
    identifier: string,
    builtEvent: any,
    context: Context,
    userInfo: UserInfo,
    callback: any,
  ) => {
    this._delayQueue.push(identifier, builtEvent, context, userInfo);
    // Fire the callback immediately, as we can consider the event successfully processed at this point
    if (callback) {callback();}
  };

  _processEvent = (
    identifier: string,
    builtEvent: any,
    context: Context,
    callback: any,
  ) => {
    this._testingCache.saveEvent(builtEvent);
    if (this._shouldEventBeDelayed(builtEvent)) {
      this._delayEvent(
        identifier,
        builtEvent,
        context,
        this._userInfo,
        callback,
      );
    } else {
      this._fireEvent(identifier, builtEvent, context, callback);
    }
  };

  setEmbeddedProduct = (embeddedProduct: any) => {
    this._productInfo.embeddedProduct = this._createEmbeddedProductGetter(
      embeddedProduct,
    );
    this.resetUIViewedTimers();
  };

  clearEmbeddedProduct = () => {
    this._productInfo.embeddedProduct = this._createEmbeddedProductGetter(null);
  };

  setSubproduct = (subproduct: any) => {
    this._productInfo.subproduct = this._createSubproductGetter(subproduct);
    this.resetUIViewedTimers();
  };

  /**
   * Calling this function in the intialisation of the client in product
   * captures specified 'origin tracing' URL params and fires a single origin landed event
   * <p>
   * This function expects a mapping between the keys for any URL parameters
   *  that should be captured and removed for origin tracing
   * Multiple parameters may be captured simultaneously if multiple key: handler function pairs are provided
   * Each handler function should return an object with two items
   * a) 'originTracingAttributes' - an object that will be added to the 'origin landed' event's attributes under 'originTracing
   * b) 'taskSessionId' (optional) - an Id string that will be added to the tasksessions for any event that fires from the tab, with the key
   *    matching the URL parameter, for the purpose of attributing subsequent analytics event to the origin land.
   * </p>
   * The general use case for this feature is for allowing attributation of user behaviour to a out of product or cross product link,
   * e.g. from a share or email
   *
   * An example calling this function using an external decoding library, with taskSessionId specified to persist
   * analyticsWebClient.setOriginTracingHandlers({
        atlOrigin: encodedOrigin => {
            const { id, product } = OriginTracing.fromEncoded(encodedOrigin);
            return { originTracingAttributes: {'id': id, 'product': product}, taskSessionId: id };
        },
    });
   *
   * @param  {Object} originParamHandlerMapping a dictionary of mappings between origin url param keys and handler functions
   * @this {AnalyticsWebClient}
   */
  setOriginTracingHandlers = (originParamHandlerMapping: any) => {
    const capturedOriginTraces = this.originTracing.handleOriginParameters(
      originParamHandlerMapping,
      this._historyReplaceFn,
    );
    Object.keys(capturedOriginTraces).forEach((x) => {
      if (typeof capturedOriginTraces[x].taskSessionId !== 'undefined') {
        this.task.createTaskSessionWithProvidedId(
          x,
          capturedOriginTraces[x].taskSessionId,
        );
      }
    });
    const originAttributes: any = {};
    Object.keys(capturedOriginTraces).forEach((x) => {
      if (capturedOriginTraces[x].originTracingAttributes) {
        originAttributes[x] = capturedOriginTraces[x].originTracingAttributes;
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `Handling method for origin parameter ${x} has not returned any attributes`,
        );
      }
    });
    if (Object.keys(capturedOriginTraces).length > 0) {
      this.sendOperationalEvent(
        {
          action: 'landed',
          actionSubject: 'origin',
          source: 'webClient',
          attributes: { originTracesLanded: originAttributes },
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
      );
    }
  };

  setTenantInfo = (tenantIdType: any, tenantId: any) => {
    if (!tenantIdType) {
      throw new Error('Missing tenantIdType');
    }

    if (tenantIdType !== tenantType.NONE && !tenantId) {
      throw new Error('Missing tenantId');
    }

    if (!isType(tenantType, tenantIdType)) {
      throw new Error(
        `Invalid tenantIdType '${tenantIdType}', `
          + `must be an tenantType: [${objectValues(tenantType)}]`,
      );
    }

    this._tenantInfo = {
      tenantIdType,
      tenantId,
    };
  };

  clearTenantInfo = () => {
    this._tenantInfo = {};
  };

  setOrgInfo = (orgId: any) => {
    if (!orgId) {
      throw new Error('Missing orgId');
    }
    this._orgInfo = {
      orgId,
    };
  };

  clearOrgInfo = () => {
    this._orgInfo = {};
  };

  setUserInfo = (userIdType: string, userId: string) => {
    validateIdentifyEvent(userIdType, userId);
    this._changeInternalUserId(userId);
    this._userInfo = {
      userIdType: (userIdType as userType),
      userId,
      anonymousId: this._analytics.user().anonymousId(),
    };
  };

  clearUserInfo = () => {
    this._changeInternalUserId(undefined);
    this._userInfo = {
      anonymousId: this._analytics.user().anonymousId(),
    };
  };

  setUIViewedAttributes = (uiViewedAttributes: any) => {
    if (!uiViewedAttributes) {
      throw new Error('Missing uiViewedAttributes');
    }
    if (
      typeof uiViewedAttributes !== 'object'
      || Array.isArray(uiViewedAttributes)
    ) {
      throw new Error(
        'Invalid uiViewedAttributes type, should be a non array object',
      );
    }
    this._uiViewedAttributes = { ...uiViewedAttributes };
  };

  clearUIViewedAttributes = () => {
    this._uiViewedAttributes = {};
  };

  sendIdentifyEvent = (userIdType: string, userId: string, callback?: any) => {
    this.setUserInfo(userIdType, userId);
    const builtEvent = {
      userIdType,
      eventType: eventType.IDENTIFY,
    };

    this._processEvent(userId, builtEvent, this._context, callback);
  };

  /**
   * @deprecated
   * please use {@link sendScreenEvent instead)
   */
  sendPageEvent = (name: any, callback: any) => {
    this.sendScreenEvent(name, callback);
  };

  /**
   * send screen event
   * @param event The event / For retrocompatibility event name is still supported here.
   * @param callback
   * @param attributes. Deprecated, will get ignored if using an event object as first param.
   */
  sendScreenEvent = (event: SendScreenEventInput, callback?: any, attributes?: any) => {
    let screenName;
    let screenAttributes;
    let screenContainers;
    let screenTags;
    if (typeof event === 'object') {
      /* This is for retrocompatibility */
      screenName = event.name;
      screenAttributes = event.attributes;
      screenContainers = event.containers;
      screenTags = event.tags;
    } else {
      screenName = event;
      screenAttributes = attributes;
    }

    validateScreenEvent(screenName);
    validateContainers(screenContainers);
    const builtEvent = buildScreenEvent(
      this._productInfo,
      this._tenantInfo,
      this._userInfo,
      screenAttributes,
      // TODO: Remove the as any and move into a place where we know event is an object
      (event as any).nonPrivacySafeAttributes,
      screenTags,
      this._tabTracking.getCurrentTabId(),
      this._sessionTracking.getCurrentSessionId(),
      this.task.getAllTaskSessions(),
      this._orgInfo,
      this._pageLoadId,
      screenContainers,
    );

    const builtEventWithName = {
      name: screenName,
      ...builtEvent,
    };

    this._setLastScreenEvent(builtEventWithName);

    this._processEvent(
      screenName,
      builtEvent,
      this._context,
      wrapCallback(callback, builtEventWithName),
    );
  };

  sendTrackEvent = (event: TrackEventPayload, callback?: any) => {
    validateTrackEvent(event);
    const builtEvent = buildActionEvent(
      this._productInfo,
      this._tenantInfo,
      this._userInfo,
      event,
      eventType.TRACK,
      this._tabTracking.getCurrentTabId(),
      this._sessionTracking.getCurrentSessionId(),
      this.task.getAllTaskSessions(),
      this._orgInfo,
      this._pageLoadId,
    );

    this._processEvent(
      buildActionName(event),
      builtEvent,
      this._context,
      wrapCallback(callback, builtEvent),
    );
  };

  sendUIEvent = (event: UIEventPayload, callback?: any) => {
    validateUIEvent(event);
    const builtEvent = buildActionEvent(
      this._productInfo,
      this._tenantInfo,
      this._userInfo,
      event,
      eventType.UI,
      this._tabTracking.getCurrentTabId(),
      this._sessionTracking.getCurrentSessionId(),
      this.task.getAllTaskSessions(),
      this._orgInfo,
      this._pageLoadId,
    );

    this._processEvent(
      buildActionName(event),
      builtEvent,
      this._context,
      wrapCallback(callback, builtEvent),
    );
  };

  sendOperationalEvent = (event: OperationalEventPayload, callback?: any) => {
    validateOperationalEvent(event);
    const builtEvent = buildActionEvent(
      this._productInfo,
      this._tenantInfo,
      this._userInfo,
      event,
      eventType.OPERATIONAL,
      this._tabTracking.getCurrentTabId(),
      this._sessionTracking.getCurrentSessionId(),
      this.task.getAllTaskSessions(),
      this._orgInfo,
      this._pageLoadId,
    );

    this._processEvent(
      buildActionName(event),
      builtEvent,
      this._context,
      wrapCallback(callback, builtEvent),
    );
  };

  startUIViewedEvent = (callback?: any) => {
    this.stopUIViewedEvent();

    this._uiViewedEvent = new UIViewedEvent(
      this._productInfo,
      () => ({
        embeddedProduct: this._productInfo.embeddedProduct(),
        subproduct: this._productInfo.subproduct(),
        tenantIdType: this._tenantInfo.tenantIdType,
        tenantId: this._tenantInfo.tenantId,
        userId: this._userInfo.userId,
        lastScreenEvent: this._getLastScreenEvent(),
        attributes: this._uiViewedAttributes,
      }),
      (event: any) => this.sendUIEvent(event, callback),
    );
    this._uiViewedEvent.start();
  };

  stopUIViewedEvent = () => {
    if (this._uiViewedEvent) {
      this._uiViewedEvent.stop();
      this._uiViewedEvent = null;
    }
  };

  resetUIViewedTimers = () => {
    if (this._uiViewedEvent) {
      this._uiViewedEvent.resetTimers();
    }
  };

  startApdexEvent = (apdexEvent: any) => {
    this._apdexEvent.start(apdexEvent);
  };

  getApdexStart = (apdexEvent: any) => this._apdexEvent.getStart(apdexEvent);

  stopApdexEvent = (apdexEvent: any, callback?: any) => {
    this._apdexEvent.stop(apdexEvent, callback);
  };

  startLowPriorityEventDelay = (timeout: any) => {
    if (timeout !== undefined && (Number.isNaN(timeout) || timeout <= 0)) {
      throw new Error(
        `Invalid timeout period: ${timeout}, must be a number greater than 0`,
      );
    }

    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
    }

    const delayTimeoutPeriod = timeout
      ? Math.min(timeout, MAX_DELAY_TIMEOUT)
      : MAX_DELAY_TIMEOUT;
    this._delayTimeout = setTimeout(
      () => this.stopLowPriorityEventDelay(),
      delayTimeoutPeriod,
    );

    // If the queue is still flushing from a previous delay period, then we should cancel that flush
    // to stop it from negatively impacting the performance of the new critical section
    this._delayQueue.cancelFlush();

    this._isDelayingLowPriorityEvents = true;
  };

  stopLowPriorityEventDelay = () => {
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
      this._delayTimeout = null;
    }

    this._delayQueue.startFlush();
    this._isDelayingLowPriorityEvents = false;
  };

  onEvent = (analyticsId: any, analyticsData: any) => {
    if (!analyticsData) {
      throw new Error('Missing analyticsData');
    }

    if (!analyticsData.eventType) {
      throw new Error('Missing analyticsData.eventType');
    }

    if (!isType(eventType, analyticsData.eventType)) {
      throw new Error(
        `Invalid analyticsData.eventType '${analyticsData.eventType}', `
          + `must be an eventType: [${objectValues(eventType)}]`,
      );
    }

    if (analyticsData.eventType === eventType.TRACK) {
      this.sendTrackEvent(analyticsData);
    } else if (analyticsData.eventType === eventType.UI) {
      this.sendUIEvent(analyticsData);
    } else if (analyticsData.eventType === eventType.OPERATIONAL) {
      this.sendOperationalEvent(analyticsData);
    } else if (analyticsData.eventType === eventType.SCREEN) {
      this.sendScreenEvent(analyticsData.name, null, analyticsData.attributes);
    } else if (analyticsData.eventType === eventType.IDENTIFY) {
      this.sendIdentifyEvent(analyticsData.userIdType, analyticsData.userId);
    }
  };
}
