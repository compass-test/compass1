import { fetchPermissions } from '../fetch-permissions';
import { SharedClient } from '../../../clients';
import { Products } from '../../../product-context';

const sharedClient = {
  getAbTestData: jest.fn(),
  getProductPermissions: jest.fn(),
} as SharedClient;

describe('fetchPermissions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns products list if given 0 products', async () => {
    const products = await fetchPermissions(sharedClient, []);

    expect(products).toEqual([]);
    expect(sharedClient.getProductPermissions).not.toHaveBeenCalled();
  });

  it('returns products list if given 1 products', async () => {
    const products = await fetchPermissions(sharedClient, [
      Products.confluence,
    ]);

    expect(products).toEqual([Products.confluence]);
    expect(sharedClient.getProductPermissions).not.toHaveBeenCalled();
  });
});
