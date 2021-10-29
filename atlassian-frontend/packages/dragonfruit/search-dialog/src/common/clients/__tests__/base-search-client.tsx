import { AggregatorClient } from '../base-search-client';
import { Products } from '../../product-context';
import { utils } from '@atlaskit/util-service-support';

jest.mock('@atlaskit/util-service-support', () => ({
  utils: {
    requestService: jest.fn(),
  },
}));

let client = new AggregatorClient({} as any);

describe('BaseSearchClient', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    client = new AggregatorClient({
      url: 'https://api.example.com',
      cloudId: 'abc123',
      siteMasterList: [],
    });
  });

  describe('#getProductPermissions', () => {
    it('does not make an http request when requesting no products', async () => {
      const response = await client.getProductPermissions(
        [],
        'some-experience',
      );

      expect(response).toEqual([]);
      expect(utils.requestService).not.toHaveBeenCalled();
    });

    it('makes the expected request when requesting some products', async () => {
      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {
          confluence: ['some.otherscope'],
        },
      }));
      const response = await client.getProductPermissions(
        [Products.confluence],
        'some-experience',
      );

      expect(response).toEqual([Products.confluence]);
      expect(utils.requestService).toHaveBeenCalledWith(
        {
          url: 'https://api.example.com',
        },
        {
          path: 'scopes/v1',
          requestInit: {
            body:
              '{"cloudId":"abc123","productIds":["confluence"],"experience":"some-experience"}',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        },
      );
    });

    it('does not return products if products are not returned', async () => {
      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {},
      }));
      const response = await client.getProductPermissions(
        [Products.confluence],
        'some-experience',
      );

      expect(response).toEqual([]);
    });

    it('does not return products if scopes are not returned', async () => {
      (utils.requestService as jest.Mock).mockImplementation(() => ({
        products: {
          confluence: [],
        },
      }));
      const response = await client.getProductPermissions(
        [Products.confluence],
        'some-experience',
      );

      expect(response).toEqual([]);
    });
  });
});
