import { envType } from '../../analyticsWebTypes';
import MemoryStorage, {
  InMemoryStore as InMemoryStorage,
} from '../InMemoryStorage';
import SafeStorage, {
  AWC_STORAGE_PREFIX,
  GLOBAL_IN_MEMORY_NAME,
  isQuotaExceeded,
  isSupported,
} from '../SafeStorage';

const globalAny: any = global;

type KeyValue = {
  [key: string]: any;
};

const getMockStorage = (mockStorage: Partial<Storage> = {}): Storage => ({
  length: 0,
  setItem: jest.fn(),
  getItem: jest.fn().mockReturnValueOnce('test_value'),
  removeItem: jest.fn(),
  key: jest.fn(),
  clear: jest.fn(),
  ...mockStorage,
});

describe('SafeStorage', () => {
  beforeEach(() => {
    globalAny.localStorage.clear();
    globalAny.sessionStorage.clear();
  });

  afterEach(() => {
    globalAny.localStorage.clear();
    globalAny.sessionStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();
    if (globalAny.window[GLOBAL_IN_MEMORY_NAME]) {
      // @ts-ignore
      delete globalAny.window[GLOBAL_IN_MEMORY_NAME];
    }
  });

  describe('isSupported', () => {
    test("storage doesn't exist", () => {
      // @ts-ignore Testing
      const supported = isSupported(null);
      expect(supported).toBe(false);
    });
    test('setItem fails', () => {
      const mockStorage = getMockStorage({
        setItem: jest.fn(() => {
          throw new Error();
        }),
      });
      const supported = isSupported(mockStorage);
      expect(supported).toBe(false);
    });
    test('getItem returns something different', () => {
      const mockStorage = getMockStorage({
        getItem: jest.fn().mockReturnValue('something_different'),
      });
      const supported = isSupported(mockStorage);
      expect(supported).toBe(false);
    });
    test('should return true for standard localStorage', () => {
      const supported = isSupported(globalAny.localStorage);
      expect(supported).toBe(true);
    });
  });

  describe('instantiates with', () => {
    test('our mocked storage when supported, and proxies all calls through', () => {
      const EXPECTED_VALUE = 'value';
      const KEY = 'key';
      const EXPECTED_KEY = `${AWC_STORAGE_PREFIX}.${KEY}`;
      const mockStorage = getMockStorage();

      const storageUnderTest = new SafeStorage(mockStorage);

      storageUnderTest.setItem(KEY, EXPECTED_VALUE);
      storageUnderTest.getItem(KEY);
      storageUnderTest.removeItem(KEY);
      storageUnderTest.key(0);
      storageUnderTest.clear();

      // First call to setItem, getItem and removeItem is use to check native storage support
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        EXPECTED_KEY,
        EXPECTED_VALUE,
      );
      expect(mockStorage.getItem).toHaveBeenCalledWith(EXPECTED_KEY);
      expect(mockStorage.removeItem).toHaveBeenCalledWith(EXPECTED_KEY);
      expect(mockStorage.key).toBeCalledWith(0);
      expect(mockStorage.clear).toHaveBeenCalledTimes(1);
      expect(storageUnderTest.getStore()).toBe(mockStorage);
    });
    test('localStorage', () => {
      const KEY = 'key';
      const VALUE = 'value';
      const EXPECTED_KEY = `${AWC_STORAGE_PREFIX}.${KEY}`;

      const storageUnderTest = new SafeStorage(globalAny.localStorage);
      storageUnderTest.setItem(KEY, VALUE);
      expect(globalAny.localStorage.getItem(EXPECTED_KEY)).toBe(VALUE);
    });
    test('sessionStorage', () => {
      const KEY = 'key';
      const VALUE = 'value';
      const EXPECTED_KEY = `${AWC_STORAGE_PREFIX}.${KEY}`;

      const storageUnderTest = new SafeStorage(globalAny.sessionStorage);
      storageUnderTest.setItem(KEY, VALUE);
      expect(globalAny.sessionStorage.getItem(EXPECTED_KEY)).toBe(VALUE);
    });
    test('with fallback InMemoryStorage when not supported', () => {
      // @ts-ignore Testing
      const storageUnderTest = new SafeStorage(null);

      expect(storageUnderTest.getStore() instanceof InMemoryStorage).toBe(true);
    });
  });

  describe('key generation', () => {
    test('usePrefix - use environment prefix false does not append environment', () => {
      const storageUnderTest = new SafeStorage(globalAny.localStorage, { envPrefix: undefined });

      expect(storageUnderTest.getPrefix()).toBe(AWC_STORAGE_PREFIX);
    });

    test('createKey - adds default prefix to event key', () => {
      const KEY = 'key';
      const EXPECTED_KEY = 'awc.key';

      const storageUnderTest = new SafeStorage(globalAny.localStorage, {});

      expect(storageUnderTest.createKey(KEY)).toBe(EXPECTED_KEY);
    });

    test('createKey - adds environment prefix to event key when provided (not prod)', () => {
      const KEY = 'key';
      const EXPECTED_KEY_DEV = 'awc-dev.key';

      const storageUnderTestDev = new SafeStorage(
        globalAny.localStorage,
        { envPrefix: envType.DEV }
      );

      expect(storageUnderTestDev.createKey(KEY)).toBe(EXPECTED_KEY_DEV);

      const EXPECTED_KEY_STG = 'awc-staging.key';

      const storageUnderTestStg = new SafeStorage(
        globalAny.localStorage,
        { envPrefix: envType.STAGING }
      );

      expect(storageUnderTestStg.createKey(KEY)).toBe(EXPECTED_KEY_STG);

      const EXPECTED_KEY_LOCAL = 'awc-local.key';

      const storageUnderTestLocal = new SafeStorage(
        globalAny.localStorage,
        { envPrefix: envType.LOCAL }
      );

      expect(storageUnderTestLocal.createKey(KEY)).toBe(EXPECTED_KEY_LOCAL);
    });

    test('createKey - does not add environment prefix to event key for prod', () => {
      const KEY = 'key';
      const EXPECTED_KEY = 'awc.key';

      const storageUnderTest = new SafeStorage(
        globalAny.localStorage,
        { envPrefix: envType.PROD }
      );

      expect(storageUnderTest.createKey(KEY)).toBe(EXPECTED_KEY);
    });

    test('createKey - does not use storage prefix when disabled', () => {
      const KEY = 'key';
      const EXPECTED_KEY = 'key';

      const storageUnderTest = new SafeStorage(
        globalAny.localStorage,
        { useStoragePrefix: false }
      );

      expect(storageUnderTest.createKey(KEY)).toBe(EXPECTED_KEY);
    });

    test('createKey - can prefix with env even when storage prefix disabled', () => {
      const KEY = 'key';
      const EXPECTED_KEY = 'dev.key';

      const storageUnderTest = new SafeStorage(
        globalAny.localStorage,
        { useStoragePrefix: false, envPrefix: envType.DEV }
      );

      expect(storageUnderTest.createKey(KEY)).toBe(EXPECTED_KEY);
    });
  });

  describe('swapToInMemory', () => {
    beforeEach(() => {
      globalAny.localStorage.clear();
      if (globalAny.window[GLOBAL_IN_MEMORY_NAME]) {
        // @ts-ignore
        delete globalAny.window[GLOBAL_IN_MEMORY_NAME];
      }
    });
    afterEach(() => {
      globalAny.localStorage.clear();
      if (globalAny.window[GLOBAL_IN_MEMORY_NAME]) {
        // @ts-ignore
        delete globalAny.window[GLOBAL_IN_MEMORY_NAME];
      }
    });

    test('copies all keys and values copy over correctly without deleting from localStorage', () => {
      const TO_STORE: KeyValue = {
        key1: 'value1',
        key2: 'value2',
      };
      const localStorageKeyBeforeSafeStorage = 'before.safe.storage';
      const valueUnaffectedBySwap = "shouldn't copy over";
      globalAny.localStorage.setItem(
        localStorageKeyBeforeSafeStorage,
        valueUnaffectedBySwap,
      );
      const storageUnderTest = new SafeStorage(globalAny.localStorage);

      expect(storageUnderTest.getStore() instanceof InMemoryStorage).toBe(
        false,
      );
      Object.keys(TO_STORE).forEach((key) => {
        storageUnderTest.setItem(key, TO_STORE[key]);
      });
      storageUnderTest.swapToInMemory();

      expect(storageUnderTest.getStore() instanceof InMemoryStorage).toBe(true);
      Object.keys(TO_STORE).forEach((key) => {
        expect(storageUnderTest.getItem(key)).toBe(TO_STORE[key]);
      });
      expect(storageUnderTest.getStore().length).toBe(2);
      expect(globalAny.localStorage.length).toBe(3);
      expect(
        globalAny.localStorage.getItem(localStorageKeyBeforeSafeStorage),
      ).toBe(valueUnaffectedBySwap);
    });

    test('copies all keys and values copy over correctly, when there are multiple instances of storage, without deleting from local storage', () => {
      const TO_STORE_1: KeyValue = {
        key1: 'value1',
        key2: 'value2',
      };
      const TO_STORE_2: KeyValue = {
        key3: 'value3',
        key4: 'value4',
      };
      const localStorageKeyBeforeSafeStorage = 'before.safe.storage';
      const valueUnaffectedBySwap = "shouldn't copy over";
      globalAny.localStorage.setItem(
        localStorageKeyBeforeSafeStorage,
        valueUnaffectedBySwap,
      );
      const storageUnderTest1 = new SafeStorage(globalAny.localStorage);
      const storageUnderTest2 = new SafeStorage(globalAny.localStorage);
      expect(storageUnderTest1.getStore() instanceof InMemoryStorage).toBe(
        false,
      );

      expect(storageUnderTest2.getStore() instanceof InMemoryStorage).toBe(
        false,
      );
      Object.keys(TO_STORE_1).forEach((key) => {
        storageUnderTest1.setItem(key, TO_STORE_1[key]);
      });
      Object.keys(TO_STORE_2).forEach((key) => {
        storageUnderTest2.setItem(key, TO_STORE_2[key]);
      });
      storageUnderTest1.swapToInMemory();
      storageUnderTest2.swapToInMemory();

      expect(storageUnderTest1.getStore() instanceof InMemoryStorage).toBe(
        true,
      );
      Object.keys(TO_STORE_1).forEach((key) => {
        expect(storageUnderTest1.getItem(key)).toBe(TO_STORE_1[key]);
      });
      Object.keys(TO_STORE_2).forEach((key) => {
        expect(storageUnderTest2.getItem(key)).toBe(TO_STORE_2[key]);
      });
      expect(globalAny.localStorage.length).toBe(5);
      expect(
        globalAny.localStorage.getItem(localStorageKeyBeforeSafeStorage),
      ).toBe(valueUnaffectedBySwap);
    });

    test('when storage is over quota swaps to InMemoryStorage and still saves', () => {
      const KEY = 'anything';
      const VALUE = 'to trigger over quota error';
      const mockStorageThatThrowsOverQuota: Storage = {
        length: 0,
        getItem: jest.fn().mockReturnValueOnce('test_value'),
        setItem: jest
          .fn()
          .mockImplementation(() => {
            const overQuotaError = new Error();
            (overQuotaError as any).code = 22;
            throw overQuotaError;
          })
          .mockImplementationOnce(() => true),
        removeItem: jest.fn(),
        clear: jest.fn(),
        key: jest.fn(),
      };
      const storageUnderTest = new SafeStorage(mockStorageThatThrowsOverQuota);

      expect(storageUnderTest.getStore() instanceof InMemoryStorage).toBe(
        false,
      );
      storageUnderTest.setItem(KEY, VALUE);

      expect(storageUnderTest.getStore() instanceof InMemoryStorage).toBe(true);
      expect(storageUnderTest.getItem(KEY)).toBe(VALUE);
    });

    test('when storage swaps it makes InMemoryStorage available global', () => {
      const storageUnderTest = new SafeStorage(localStorage);
      expect(globalAny.window[GLOBAL_IN_MEMORY_NAME]).toBeUndefined();
      storageUnderTest.swapToInMemory();
      expect(globalAny.window[GLOBAL_IN_MEMORY_NAME]).toBe(MemoryStorage);
    });

    test('when storage swaps if InMemoryStorage is already available global it should use it', () => {
      const storageUnderTest = new SafeStorage(localStorage);
      const mockStorage = {
        setItem: jest.fn(),
        getItem: jest.fn().mockReturnValueOnce('test_value'),
        removeItem: jest.fn(),
        key: jest.fn(),
        clear: jest.fn(),
      };
      globalAny.window[GLOBAL_IN_MEMORY_NAME] = mockStorage;
      storageUnderTest.swapToInMemory();

      storageUnderTest.setItem('a', 'b');
      storageUnderTest.getItem('a');
      expect(globalAny.window[GLOBAL_IN_MEMORY_NAME]).toBe(mockStorage);
      expect(mockStorage.setItem).toHaveBeenCalledWith('awc.a', 'b');
      expect(mockStorage.getItem).toHaveBeenCalledWith('awc.a');
    });
  });

  describe('isQuotaExceeded', () => {
    test('only errors on quota exceeded', () => {
      const randomError = new Error();
      expect(isQuotaExceeded(randomError)).toBe(false);
    });
    test('only errors on quota exceeded code', () => {
      const randomError = new Error();
      (randomError as any).code = 404;
      expect(isQuotaExceeded(randomError)).toBe(false);
    });
    test("doesn't catch Firefox non quota exceeded", () => {
      const quotaError = new Error();
      (quotaError as any).code = 1014;
      expect(isQuotaExceeded(quotaError)).toBe(false);
    });
    test('catches Chrome quota exceeded', () => {
      const quotaError = new Error();
      (quotaError as any).code = 22;
      expect(isQuotaExceeded(quotaError)).toBe(true);
    });
    test('catches Firefox quota exceeded', () => {
      const quotaError = new Error();
      (quotaError as any).code = 1014;
      quotaError.name = 'NS_ERROR_DOM_QUOTA_REACHED';
      expect(isQuotaExceeded(quotaError)).toBe(true);
    });
    test('catches IE8 quota exceeded', () => {
      const quotaError = new Error();
      (quotaError as any).number = -2147024882;
      expect(isQuotaExceeded(quotaError)).toBe(true);
    });
  });
});
