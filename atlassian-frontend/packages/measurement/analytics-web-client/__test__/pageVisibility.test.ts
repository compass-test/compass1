/* eslint-disable no-underscore-dangle */
import PageVisibility from '../src/pageVisibility';

describe('PageVisibility', () => {
  describe('constructor', () => {
    beforeEach(() => {
      const propertyValue = { value: undefined, configurable: true };
      Object.defineProperty(document, 'hidden', propertyValue);
      Object.defineProperty(document, 'msHidden', propertyValue);
      Object.defineProperty(document, 'webkitHidden', propertyValue);
      Object.defineProperty(document, 'addEventListener', {
        value: jest.fn(),
        configurable: true,
      });
    });

    test('should init with document.hidden', () => {
      Object.defineProperty(document, 'hidden', {
        value: false,
        configurable: true,
      });
      const pageVisibility = new PageVisibility();

      pageVisibility._bindEventListeners = jest.fn();

      expect(pageVisibility._isHidden).toEqual(false);
      expect(pageVisibility._callbacks).toEqual(new Map());
      expect(pageVisibility._hidden).toEqual('hidden');
      expect(pageVisibility._visibilityChange).toEqual('visibilitychange');

      expect(document.addEventListener).toHaveBeenCalledTimes(1);
    });

    test('should init with document.msHidden', () => {
      Object.defineProperty(document, 'msHidden', {
        value: false,
        configurable: true,
      });
      const pageVisibility = new PageVisibility();
      expect(pageVisibility._isHidden).toEqual(false);
      expect(pageVisibility._callbacks).toEqual(new Map());
      expect(pageVisibility._hidden).toEqual('msHidden');
      expect(pageVisibility._visibilityChange).toEqual('msvisibilitychange');
    });

    test('should init with document.webkitHidden', () => {
      Object.defineProperty(document, 'webkitHidden', {
        value: false,
        configurable: true,
      });
      const pageVisibility = new PageVisibility();
      expect(pageVisibility._isHidden).toEqual(false);
      expect(pageVisibility._callbacks).toEqual(new Map());
      expect(pageVisibility._hidden).toEqual('webkitHidden');
      expect(pageVisibility._visibilityChange).toEqual(
        'webkitvisibilitychange',
      );
    });
  });

  describe('callbacks', () => {
    beforeEach(() => {
      Object.defineProperty(document, 'hidden', {
        value: false,
        configurable: true,
      });
    });

    describe('addCallback', () => {
      test('should throw if invalid callback name', () => {
        const pageVisibility = new PageVisibility();
        const testCallbackFn = jest.fn();
        expect(() => {
          pageVisibility.addCallback(undefined, testCallbackFn);
        }).toThrow('Invalid name, must be string');
      });

      test('should throw if invalid callback function', () => {
        const pageVisibility = new PageVisibility();
        expect(() => {
          pageVisibility.addCallback('testCallback', 'notAFunction');
        }).toThrow('Invalid callback, must be function');
      });

      test('should add callback', () => {
        const pageVisibility = new PageVisibility();
        const testCallbackFn = jest.fn();
        pageVisibility.addCallback('testCallback', testCallbackFn);

        expect(pageVisibility._callbacks.get('testCallback')).toEqual(
          testCallbackFn,
        );
        expect(pageVisibility._callbacks.size).toEqual(1);
      });
    });

    describe('removeCallback', () => {
      test('should remove callback', () => {
        const pageVisibility = new PageVisibility();
        const testCallbackFn = jest.fn();

        pageVisibility.addCallback('testCallback1', testCallbackFn);
        pageVisibility.removeCallback('testCallback3');

        expect(pageVisibility._callbacks.get('testCallback3')).toEqual(
          undefined,
        );
        expect(pageVisibility._callbacks.size).toEqual(1);

        pageVisibility.removeCallback('testCallback1');

        expect(pageVisibility._callbacks.get('testCallback1')).toEqual(
          undefined,
        );
        expect(pageVisibility._callbacks.size).toEqual(0);
      });
    });
  });

  describe('_handleVisibilityChange', () => {
    beforeEach(() => {
      Object.defineProperty(document, 'hidden', {
        value: false,
        configurable: true,
      });
    });

    test('', () => {
      const pageVisibility = new PageVisibility();
      const testCallbackFn = jest.fn();

      pageVisibility.addCallback('testCallback1', testCallbackFn);
      pageVisibility.addCallback('testCallback2', testCallbackFn);

      Object.defineProperty(document, 'hidden', {
        value: true,
        configurable: true,
      });

      pageVisibility._handleVisibilityChange();

      expect(pageVisibility._isHidden).toBeTruthy();
      expect(testCallbackFn).toHaveBeenCalledTimes(2);

      Object.defineProperty(document, 'hidden', {
        value: false,
        configurable: true,
      });

      pageVisibility.removeCallback('testCallback2');

      pageVisibility._handleVisibilityChange();

      expect(pageVisibility._isHidden).toEqual(false);
      expect(testCallbackFn).toHaveBeenCalledTimes(3);
    });
  });
});
