import SafeStorage from '../src/storage/SafeStorage';
import UIViewedEvent from '../src/uiViewedEvent';

import { PRODUCT_INFO } from './util/commonTests';

jest.mock('../src/storage/SafeStorage');

declare let require: any;

const emptyFunction = () => {
  // do nothing
};

describe('constructor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should not throw if required values are passed', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new UIViewedEvent(PRODUCT_INFO, emptyFunction, emptyFunction);
    }).not.toThrow();
  });

  test('should throw if `productInfo` is missing', () => {
    expect(() => {
      // @ts-ignore for tests
      // eslint-disable-next-line no-new
      new UIViewedEvent();
    }).toThrow('Missing productInfo');
  });

  test('should throw if `productInfo.product` is missing', () => {
    expect(() => {
      // @ts-ignore for tests
      // eslint-disable-next-line no-new
      new UIViewedEvent({});
    }).toThrow('Missing productInfo.product');
  });

  test('should throw if `getContext` is missing', () => {
    expect(() => {
      // @ts-ignore for tests
      // eslint-disable-next-line no-new
      new UIViewedEvent(PRODUCT_INFO);
    }).toThrow('Missing getContext');
  });

  test('should throw if `getContext` is not a function', () => {
    expect(() => {
      // @ts-ignore for tests
      // eslint-disable-next-line no-new
      new UIViewedEvent(PRODUCT_INFO, 'blah');
    }).toThrow('Invalid getContext, must be function');
  });

  test('should throw if `onEvent` is missing', () => {
    expect(() => {
      // @ts-ignore for tests
      // eslint-disable-next-line no-new
      new UIViewedEvent(PRODUCT_INFO, emptyFunction);
    }).toThrow('Missing onEvent');
  });

  test('should throw if `onEvent` is not a function', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new UIViewedEvent(PRODUCT_INFO, emptyFunction, 'blah');
    }).toThrow('Invalid onEvent, must be function');
  });

  test('should default delay, throttle, and storageKey if none provided', () => {
    const event = new UIViewedEvent(PRODUCT_INFO, emptyFunction, emptyFunction);
    /* eslint-disable no-underscore-dangle */
    expect(event._delay).toEqual(2000);
    expect(event._throttle).toEqual(3600000);
    expect(event._storageKey).toEqual('ui.viewed.last.sent');
    /* eslint-disable no-underscore-dangle */
  });

  test('should override delay if provided', () => {
    const event = new UIViewedEvent(
      PRODUCT_INFO,
      emptyFunction,
      emptyFunction,
      {
        delay: 1,
      },
    );
    expect(event._delay).toEqual(1);
  });

  test('should override throttle if provided', () => {
    const event = new UIViewedEvent(
      PRODUCT_INFO,
      emptyFunction,
      emptyFunction,
      {
        throttle: 1,
      },
    );
    expect(event._throttle).toEqual(1);
  });

  test('should override storageKey if provided', () => {
    const event = new UIViewedEvent(
      PRODUCT_INFO,
      emptyFunction,
      emptyFunction,
      {
        storageKey: 'new.key',
      },
    );
    expect(event._storageKey).toEqual('new.key');
  });

  test('should create a new Storage and pass through env', () => {
    // eslint-disable-next-line global-require
    const UIViewedEventMockedStorage = require('../src/uiViewedEvent').default;
    const event = new UIViewedEventMockedStorage(
      PRODUCT_INFO,
      emptyFunction,
      emptyFunction,
      {},
    );
    expect(SafeStorage).toHaveBeenCalledWith(localStorage, { envPrefix: PRODUCT_INFO.env });
    expect(event._safeLocalStorage instanceof SafeStorage).toBe(true);
  });
});
