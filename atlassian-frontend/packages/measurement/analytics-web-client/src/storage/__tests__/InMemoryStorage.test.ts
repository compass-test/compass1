import InMemoryStorage from '../InMemoryStorage';

describe('InMemoryStorage', () => {
  afterEach(() => {
    InMemoryStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('sets, gets and removes', () => {
    const KEY = 'key';
    const VALUE = 'value';

    InMemoryStorage.setItem(KEY, VALUE);
    expect(InMemoryStorage.length).toBe(1);
    expect(InMemoryStorage.key(0)).toBe(KEY);
    expect(InMemoryStorage.getItem(KEY)).toBe(VALUE);

    InMemoryStorage.removeItem('not the key');
    expect(InMemoryStorage.length).toBe(1);

    expect(InMemoryStorage.removeItem(KEY)).toBe(null);
    expect(InMemoryStorage.getItem(KEY)).toBe(null);
    expect(InMemoryStorage.length).toBe(0);
  });

  test('clears', () => {
    const KEY = 'key';
    const VALUE = 'value';

    InMemoryStorage.setItem(KEY, VALUE);
    expect(InMemoryStorage.length).toBe(1);

    InMemoryStorage.clear();
    expect(InMemoryStorage.getItem(KEY)).toBe(null);
    expect(InMemoryStorage.length).toBe(0);
  });
});
