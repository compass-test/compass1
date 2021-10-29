const PARTIAL_OBJECT_MATCHER = {
  products: { BITBUCKET: { label: 'Bitbucket' } },
};

describe('product-configuration-provider', () => {
  const fetchJsonWithNetworkRetries = jest.fn();

  jest.doMock('../../../utils/fetch', () => ({
    fetchJsonWithNetworkRetries,
  }));

  beforeEach(fetchJsonWithNetworkRetries.mockClear);

  test('should not call fetchJsonWithNetworkRetries if feature flag not provided', async () => {
    const {
      createProductConfigurationProvider,
    } = require('../../product-configuration-provider');

    const { fetchMethod } = createProductConfigurationProvider({});

    expect.assertions(2);

    const expectedResult = await fetchMethod();
    expect(fetchJsonWithNetworkRetries).not.toBeCalled();
    expect(expectedResult).toMatchObject(PARTIAL_OBJECT_MATCHER);
  });

  test('should create a provider whose fetchJsonWithNetworkRetries calls (/gateway) when feature flag provided', () => {
    const {
      createProductConfigurationProvider,
    } = require('../../product-configuration-provider');

    const { fetchMethod } = createProductConfigurationProvider({
      useRemoteProductConfiguration: true,
    });

    fetchMethod();
    expect(
      fetchJsonWithNetworkRetries,
    ).toBeCalledWith(
      '/gateway/api/available-products/api/product-configuration',
      { intervalsMS: [50, 200, 1000] },
    );
  });

  test('should allow to create a provider with custom endpoint url', () => {
    const {
      createProductConfigurationProvider,
    } = require('../../product-configuration-provider');

    const { fetchMethod } = createProductConfigurationProvider({
      url: 'http://my-api/api/content',
      useRemoteProductConfiguration: true,
    });

    fetchMethod();
    expect(fetchJsonWithNetworkRetries).toBeCalledWith(
      'http://my-api/api/content',
      {
        intervalsMS: [50, 200, 1000],
      },
    );
  });

  test('catch correct error status when fetchJsonWithNetworkRetries returns 500', async () => {
    fetchJsonWithNetworkRetries.mockImplementationOnce(() =>
      Promise.reject({ status: 500 }),
    );

    const {
      createProductConfigurationProvider,
    } = require('../../product-configuration-provider');

    const { fetchMethod } = createProductConfigurationProvider({
      url: 'http://my-api/experiment-api/content',
      useRemoteProductConfiguration: true,
    });

    try {
      await fetchMethod();
    } catch (e) {
      expect(e).toEqual({ status: 500 });
    }
  });
});

export {};
