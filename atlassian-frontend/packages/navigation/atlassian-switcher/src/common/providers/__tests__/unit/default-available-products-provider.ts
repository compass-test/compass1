describe('default-available-products-provider', () => {
  const fetchJsonWithNetworkRetries = jest.fn();

  jest.doMock('../../../utils/fetch', () => ({
    fetchJsonWithNetworkRetries,
  }));

  test('should create a provider whose fetchJsonWithNetworkRetries calls (/gateway) by default', () => {
    const {
      createAvailableProductsProvider,
    } = require('../../default-available-products-provider');

    const { fetchMethod } = createAvailableProductsProvider();

    fetchMethod();

    expect(fetchJsonWithNetworkRetries).toBeCalledWith(
      '/gateway/api/available-products/api/available-products',
      {
        intervalsMS: [50, 200, 1000],
      },
    );
  });

  test('should allow to create a provider with custom endpoint url', () => {
    const {
      createAvailableProductsProvider,
    } = require('../../default-available-products-provider');

    const { fetchMethod } = createAvailableProductsProvider(
      'http://my-api/api/content',
    );

    fetchMethod();

    expect(fetchJsonWithNetworkRetries).toBeCalledWith(
      'http://my-api/api/content',
      {
        intervalsMS: [50, 200, 1000],
      },
    );
  });

  test('should return empty sites when querying experiment-api fetchJsonWithNetworkRetries returns 401', async () => {
    fetchJsonWithNetworkRetries.mockImplementationOnce(() =>
      Promise.reject({ status: 401 }),
    );

    const {
      createAvailableProductsProvider,
    } = require('../../default-available-products-provider');

    const { fetchMethod } = createAvailableProductsProvider(
      'http://my-api/experiment-api/content',
    );

    const expectedResult = await fetchMethod();

    expect(expectedResult).toEqual({ sites: [], links: [], isPartial: false });
  });

  test('should return a normal 401 when fetchJsonWithNetworkRetries returns 401 and not hitting experiment-api', async () => {
    fetchJsonWithNetworkRetries.mockImplementationOnce(() =>
      Promise.reject({ status: 401 }),
    );

    const {
      createAvailableProductsProvider,
    } = require('../../default-available-products-provider');

    const { fetchMethod } = createAvailableProductsProvider(
      'http://my-api/api/content',
    );

    try {
      await fetchMethod();
    } catch (e) {
      expect(e).toEqual({ status: 401 });
    }
  });

  test('should return an error when fetchJsonWithNetworkRetries returns 403 (user unverified)', async () => {
    fetchJsonWithNetworkRetries.mockImplementationOnce(() =>
      Promise.reject({ status: 403 }),
    );

    const {
      createAvailableProductsProvider,
    } = require('../../default-available-products-provider');

    const { fetchMethod } = createAvailableProductsProvider(
      'http://my-api/api/content',
    );

    try {
      await fetchMethod();
    } catch (e) {
      expect(e).toEqual({ status: 403 });
    }
  });

  afterEach(fetchJsonWithNetworkRetries.mockClear);
});

export {};
