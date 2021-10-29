import { AggregatorClient } from '../base-search-client';
import { Products } from '../../product-context';
import { utils } from '@atlaskit/util-service-support';

jest.mock('@atlaskit/util-service-support', () => ({
  utils: {
    requestService: jest.fn(),
  },
}));

jest.mock('lodash/debounce', () => ({
  __esModule: true,
  default: jest.fn((fn) => {
    let counter = 0;

    return () => {
      counter++;
      counter >= 2 ? fn() : null;
    };
  }),
}));

let client = new AggregatorClient({} as any);

describe('BaseSearchClient', () => {
  beforeEach(() => {
    client = new AggregatorClient({
      url: 'https://api.example.com',
      cloudId: 'abc123',
      siteMasterList: [],
    });

    (utils.requestService as jest.Mock).mockReset();
  });

  describe('getProductScopes', () => {
    it('makes the expected request when requesting a product', async () => {
      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {
          jira: ['some.scope'],
        },
      }));
      const response = await client.getProductScopes('jira', 'some-experience');

      expect(response).toEqual(['some.scope']);
      expect(utils.requestService).toHaveBeenCalledWith(
        {
          url: 'https://api.example.com',
        },
        {
          path: 'scopes/v1/abc123?experience=some-experience&productId=jira',
          requestInit: {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'GET',
          },
        },
      );
    });
  });

  describe('getProductPermissions', () => {
    it('does not make an http request when requesting no products', async () => {
      const response = await client.getProductPermissions(
        [],
        'some-experience',
      );

      expect(response).toEqual([]);
      expect(utils.requestService).not.toHaveBeenCalled();
    });

    it('does not return products if scopes are not returned', async () => {
      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {
          jira: ['some.scope'],
          confluence: [],
        },
      }));
      const response = await client.getProductPermissions(
        [Products.jira, Products.confluence],
        'some-experience',
      );

      expect(response).toEqual([Products.jira]);
    });
  });

  describe('batchedGetExtensibleProductPermission', () => {
    it('batches requests', () => {
      expect.assertions(2);

      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {
          jira: ['some.scope'],
          confluence: ['some.otherscope'],
        },
      }));
      const response = client.batchedGetExtensibleProductPermission('jira', {
        productIds: ['jira'],
        experience: 'some-experience',
      });

      const response2 = client.batchedGetExtensibleProductPermission(
        'confluence',
        {
          productIds: ['confluence'],
          experience: 'some-experience',
        },
      );

      return Promise.all([response, response2]).then((values) => {
        expect(values[0]).toEqual(['some.scope']);
        expect(values[1]).toEqual(['some.otherscope']);
      });
    });
  });

  describe('GET product permission implementation', () => {
    beforeEach(() => {
      client = new AggregatorClient({
        url: 'https://api.example.com',
        cloudId: 'abc123',
        siteMasterList: [],
        useGetForScopesAPI: true,
      });
    });

    it('makes the expected request when requesting some products', async () => {
      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {
          jira: ['some.scope'],
          confluence: ['some.otherscope'],
        },
      }));
      const response = await client.getProductPermissions(
        [Products.jira, Products.confluence],
        'some-experience',
      );

      expect(response).toEqual([Products.jira, Products.confluence]);
      expect(utils.requestService).toHaveBeenCalledWith(
        {
          url: 'https://api.example.com',
        },
        {
          path:
            'scopes/v1/abc123?experience=some-experience&productId=jira&productId=confluence',
          requestInit: {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'GET',
          },
        },
      );
    });
  });
});
