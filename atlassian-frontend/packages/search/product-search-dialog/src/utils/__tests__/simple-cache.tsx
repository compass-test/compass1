import { SimpleCache } from '../simple-cache';

type SimpleCacheValue = ReturnType<SimpleCache<any>['get']>;

describe('simple-cache', () => {
  // Simple mock that mocks a function that returns the given value
  const createSupplier = (value: string) => {
    const mock = jest.fn();
    mock.mockReturnValue(value);
    return mock;
  };

  it('fetches value from supplier if no initial value', () => {
    const supplier = createSupplier('1');
    const cache = new SimpleCache(supplier, null);

    const result = cache.get();

    expect(supplier).toBeCalledTimes(1);
    expect(result).toEqual<SimpleCacheValue>({ fromCache: false, value: '1' });
  });

  it('uses initial value from supplier if initial value given', () => {
    const supplier = createSupplier('1');
    const cache = new SimpleCache(supplier, '2');

    const result = cache.get();

    expect(supplier).not.toBeCalled();
    expect(result).toEqual<SimpleCacheValue>({ fromCache: true, value: '2' });
  });

  it('does not fetch value again if cache is not stale from previous fetch', () => {
    const supplier = createSupplier('1');
    const cache = new SimpleCache(supplier, null);

    cache.get();
    const result = cache.get();

    expect(supplier).toBeCalledTimes(1);
    expect(result).toEqual<SimpleCacheValue>({ fromCache: true, value: '1' });
  });

  it('fetches value from supplier if cache invalidated', () => {
    const supplier = createSupplier('1');
    const cache = new SimpleCache(supplier, '2');

    cache.invalidate();
    const result = cache.get();

    expect(supplier).toBeCalledTimes(1);
    expect(result).toEqual<SimpleCacheValue>({ fromCache: false, value: '1' });
  });

  it('fetches value from supplier if cache is stale', () => {
    const supplier = createSupplier('1');
    const cache = new SimpleCache(supplier, '2', -1);

    const result = cache.get();

    expect(supplier).toBeCalledTimes(1);
    expect(result).toEqual<SimpleCacheValue>({ fromCache: false, value: '1' });
  });

  it('fetches value again from supplier if cache becomes stale', () => {
    const supplier = createSupplier('1');
    const cache = new SimpleCache(supplier, '2', -1);

    cache.get();
    const result = cache.get();

    expect(supplier).toBeCalledTimes(2);
    expect(result).toEqual<SimpleCacheValue>({ fromCache: false, value: '1' });
  });

  it('uses last known good value from supplier if supplier throws exception', () => {
    const supplier = jest.fn();
    supplier.mockImplementation(() => {
      throw new Error('123');
    });

    const cache = new SimpleCache(supplier, '2', -1);

    const result = cache.get();

    expect(supplier).toBeCalledTimes(1);
    expect(result).toEqual<SimpleCacheValue>({ fromCache: true, value: '2' });
  });

  it('cache throws if supplier returns empty value', () => {
    const supplier = jest.fn();
    const cache = new SimpleCache(supplier, '2', -1);

    try {
      cache.get();
      fail('get should throw exception');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
