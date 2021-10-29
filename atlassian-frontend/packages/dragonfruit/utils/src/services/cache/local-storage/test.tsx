import { readJsonFromLocalStorage, writeToLocalStorage } from './index';

// Fake localStorage to have more control over errors
let store = new Map();
let localStorageMock = (function () {
  return {
    getItem: jest.fn().mockImplementation((key: string): string => {
      return store.get(key);
    }),
    setItem: jest.fn().mockImplementation((key: string, value: string) => {
      store.set(key, value);
    }),
    clear: jest.fn().mockImplementation(() => {
      store = new Map();
    }),
    removeItem: jest.fn().mockImplementation((key: string) => {
      store.delete(key);
    }),
  };
})();

describe('reading from local storage', () => {
  const originalWarn = console.warn;
  afterEach(() => (console.warn = originalWarn)); // restore original console.warn

  let consoleOutput: string[] = [];
  const mockedWarn = (output: string) => {
    consoleOutput.push(output);
  };

  beforeEach(() => {
    console.warn = mockedWarn;
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear();
  });

  it('should properly retrieve something that has been stored', () => {
    writeToLocalStorage('test key', 'test item');
    const item = readJsonFromLocalStorage('test key');

    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith('test key');
    expect(item).toEqual('test item');
  });

  it('should return null if no fallback is specified and we could not read from storage successfully', () => {
    const item = readJsonFromLocalStorage('test key that does not exist');
    expect(item).toEqual(null);
  });

  it('should return the fallback specified if we could not read from storage successfully', () => {
    const item = readJsonFromLocalStorage(
      'test key that does not exist',
      'fallback',
    );
    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(localStorageMock.getItem).toBeCalledWith(
      'test key that does not exist',
    );
    expect(item).toEqual('fallback');
  });

  it('should display a console warning when the item retrieved cannot be parsed properly', () => {
    // Scenario when someone has set something in localStorage that is invalid JSON but tries to read it using readJsonFromLocalStorage
    localStorage.setItem('test key', '{ first: "Jane", "last": "Doe" }'); // JSON with missing quotations around 'first' field
    const item = readJsonFromLocalStorage('test key', 'fallback');
    expect(consoleOutput[0]).toContain('Could not load from localStorage');
    expect(item).toEqual('fallback');
  });

  it('should read a value that has been written directly into storage', () => {
    store.set('test key', JSON.stringify('test value'));
    const item = readJsonFromLocalStorage('test key');
    expect(item).toEqual('test value');
  });
});

describe('writing to local storage', () => {
  const originalWarn = console.warn;
  afterEach(() => (console.warn = originalWarn));

  let consoleOutput: string[] = [];
  const mockedWarn = (output: string) => {
    consoleOutput.push(output);
  };

  beforeEach(() => {
    console.warn = mockedWarn;
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear();
  });

  it('should display a console warning when the item cannot be stored properly', () => {
    //eslint-disable-next-line
    const num = BigInt(494304948308405); // eslint disabled as BigInts are not compatible with Safari
    writeToLocalStorage('test key', num); // big integers not allowed
    expect(localStorageMock.setItem).toBeCalledTimes(0);
    expect(consoleOutput[0]).toContain('Error writing to localStorage');
  });

  it('should write a value that can be directly read from storage', () => {
    writeToLocalStorage('test key', 'test value');
    const item = JSON.parse(store.get('test key'));
    expect(item).toEqual('test value');
  });
});
