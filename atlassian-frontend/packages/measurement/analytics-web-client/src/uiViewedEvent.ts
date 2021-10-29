import { tenantType } from './analyticsWebTypes';
import SafeLocalStorage from './storage/SafeLocalStorage';
import { ProductInfoType } from './types';

const DEFAULT_DELAY = 1000 * 2; // 2 seconds
const DEFAULT_THROTTLE = 1000 * 60 * 60; // 1 hour
const DEFAULT_STORAGE_KEY = 'ui.viewed.last.sent';

export default class UIViewedEvent {
  _blurListener: () => void;

  _delay: number;

  _focusListener: () => void;

  _getContext: any;

  _intervalId: any;

  _onEvent: any;

  _product: string;

  _productInfo: ProductInfoType;

  _safeLocalStorage: SafeLocalStorage;

  _storageKey: string;

  _throttle: number;

  constructor(
    productInfo: ProductInfoType,
    getContext: any,
    onEvent: any,
    settings: any = {},
  ) {
    if (!productInfo) {
      throw new Error('Missing productInfo');
    }

    if (!productInfo.product) {
      throw new Error('Missing productInfo.product');
    }

    if (!getContext) {
      throw new Error('Missing getContext callback');
    }

    if (typeof getContext !== 'function') {
      throw new Error('Invalid getContext, must be function');
    }

    if (!onEvent) {
      throw new Error('Missing onEvent callback');
    }

    if (typeof onEvent !== 'function') {
      throw new Error('Invalid onEvent, must be function');
    }

    this._productInfo = productInfo;
    this._product = productInfo.product;
    this._getContext = getContext;
    this._onEvent = onEvent;
    this._delay = settings.delay || DEFAULT_DELAY;
    this._throttle = settings.throttle || DEFAULT_THROTTLE;
    this._storageKey = settings.storageKey || DEFAULT_STORAGE_KEY;
    this._safeLocalStorage = new SafeLocalStorage({ envPrefix: this._productInfo.env });

    this._focusListener = () => {
      this._startInterval();
    };

    this._blurListener = () => {
      this._stopInterval();
    };
  }

  start = () => {
    this._startInterval();
    this._bindEventListeners();
  };

  stop = () => {
    this._stopInterval();
    this._unbindEventListeners();
  };

  resetTimers = () => {
    if (this._intervalId) {
      this.stop();
      this.start();
    }
  };

  _bindEventListeners = () => {
    window.addEventListener('focus', this._focusListener);
    window.addEventListener('blur', this._blurListener);
  };

  _unbindEventListeners = () => {
    window.removeEventListener('focus', this._focusListener);
    window.removeEventListener('blur', this._blurListener);
  };

  _startInterval = () => {
    clearInterval(this._intervalId);
    this._intervalId = setInterval(this._handleInterval, this._delay);
  };

  _stopInterval = () => {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  };

  _getProductKey = (product: string, subproduct: string) => {
    let productKey = product;
    if (subproduct) {
      productKey += `-${subproduct}`;
    }
    return productKey;
  };

  _getLastSentTimestamp = (productKey: string, tenantId: string, userId: string) => {
    const json = this._parseLocalStorageData() || {};

    const u = json[userId] || {};
    const t = u[tenantId] || {};
    const p = t[productKey] || null;

    return p;
  };

  _parseLocalStorageData = () => {
    const data = this._safeLocalStorage.getItem(this._storageKey);
    try {
      return JSON.parse(data || '');
    } catch (error) {
      this._safeLocalStorage.removeItem(this._storageKey);
      return null;
    }
  };

  _setLastSentTimestamp = (productKey: string, tenantId: string, userId: string) => {
    const json = this._parseLocalStorageData() || {}

    const u = json[userId] || {};
    const t = u[tenantId] || {};

    t[productKey] = Date.now();
    u[tenantId] = t;
    json[userId] = u;

    this._safeLocalStorage.setItem(this._storageKey, JSON.stringify(json));
  };

  _shouldSendEvent = (
    productKey: string,
    tenantIdType: string,
    tenantId: string,
    userId: string,
  ) => {
    if (!document.hasFocus()) {
      return false;
    }

    if ((tenantIdType !== tenantType.NONE && !tenantId) || !userId) {
      return false;
    }

    const sinceLastSent = Date.now() - this._getLastSentTimestamp(productKey, tenantId, userId);
    return sinceLastSent > this._throttle;
  };

  _handleInterval = () => {
    const { embeddedProduct, ...context } = this._getContext();
    this._sendEvent(this._product, context);

    if (embeddedProduct) {
      this._sendEvent(embeddedProduct, context, true);
    }
  };

  _sendEvent = (product: string, context: any, isEmbeddedProduct: boolean = false) => {
    const {
      subproduct,
      tenantIdType,
      tenantId,
      userId,
      lastScreenEvent,
      attributes,
    } = context;
    const productKey = this._getProductKey(product, subproduct);

    if (this._shouldSendEvent(productKey, tenantIdType, tenantId, userId)) {
      this._setLastSentTimestamp(productKey, tenantId, userId);
      const event = this._createEvent(
        product,
        subproduct,
        isEmbeddedProduct,
        lastScreenEvent,
        attributes,
      );
      this._onEvent(event);
    }
  };

  _createEvent = (
    product: string,
    subproduct: string,
    isEmbeddedProduct: boolean,
    lastScreenEvent: any,
    extraAttributes: any,
  ) => {
    const event: any = {
      product,
      source: 'ui',
      action: 'viewed',
      actionSubject: 'ui',
      attributes: extraAttributes,
    };

    if (isEmbeddedProduct) {
      // Clear the subproduct and version as they don't relate to the embedded product
      event.subproduct = null;
      event.version = null;
      event.attributes = {
        ...event.attributes,
        embeddedInEnv: this._productInfo.env,
        embeddedInProduct: this._productInfo.product,
        embeddedInSubproduct: subproduct,
        embeddedInVersion: this._productInfo.version,
        embeddedInOrigin: this._productInfo.origin,
        embeddedInPlatform: this._productInfo.platform,
      };
    }

    if (lastScreenEvent) {
      event.attributes = {
        ...event.attributes,
        lastScreenEvent: {
          name: lastScreenEvent.name,
          attributes: lastScreenEvent.attributes,
        },
      };
    }

    return event;
  };
}
