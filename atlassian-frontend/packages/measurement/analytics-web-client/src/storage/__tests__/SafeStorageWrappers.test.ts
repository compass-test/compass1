import { InMemoryStore } from '../InMemoryStorage';
import SafeLocalStorage from '../SafeLocalStorage';
import SafeSessionStorage from '../SafeSessionStorage';
import SafeStorage from '../SafeStorage';

describe('SafeStorage with storage access denied', () => {
  const previousWindow = window;

  beforeEach(() => {
    // @ts-ignore
    delete global.window;
    // @ts-ignore
    global.window = new Proxy(previousWindow, {
      get: (obj: any, prop: string) => {
        // @ts-ignore
        if (['localStorage', 'sessionStorage'].includes(prop)) {
          throw new Error(
            "Uncaught DOMException: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.",
          );
        }
        if (prop in obj) {
          return obj[prop];
        }
        return undefined;
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    // @ts-ignore
    global.window = previousWindow;
  });

  describe('Ensure our test setup is correct', () => {
    test('localStorage throws', () => {
      expect(() => window.localStorage).toThrow();
    });
    test('sessionStorage throws', () => {
      expect(() => window.sessionStorage).toThrow();
    });
  });

  describe('Storage instantiates', () => {
    test('when localStorage throws', () => {
      const safeStorage = new SafeLocalStorage();
      expect(safeStorage instanceof SafeStorage).toBe(true);
      expect(safeStorage.getStore() instanceof InMemoryStore).toBe(true);
    });

    test('when sessionStorage throws', () => {
      const safeStorage = new SafeSessionStorage();
      expect(safeStorage instanceof SafeStorage).toBe(true);
      expect(safeStorage.getStore() instanceof InMemoryStore).toBe(true);
    });
  });
});

describe('SafeStorage with normal storage', () => {
  test('with localStorage', () => {
    const safeStorage = new SafeLocalStorage();
    expect(safeStorage instanceof SafeStorage).toBe(true);
    expect(safeStorage.getStore() instanceof InMemoryStore).toBe(false);
  });

  test('when sessionStorage throws', () => {
    const safeStorage = new SafeSessionStorage();
    expect(safeStorage instanceof SafeStorage).toBe(true);
    expect(safeStorage.getStore() instanceof InMemoryStore).toBe(false);
  });
});
