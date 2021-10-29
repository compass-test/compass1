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
    const products = await fetchPermissions(sharedClient, [Products.jira]);

    expect(products).toEqual([Products.jira]);
    expect(sharedClient.getProductPermissions).not.toHaveBeenCalled();
  });

  it('calls back correctly given multiple products', async () => {
    (sharedClient.getProductPermissions as jest.Mock).mockImplementation(
      (products) => Promise.resolve(products),
    );
    const products = await fetchPermissions(sharedClient, [
      Products.jira,
      Products.confluence,
    ]);

    expect(products).toEqual([Products.jira, Products.confluence]);
    expect(sharedClient.getProductPermissions).toHaveBeenCalledWith([
      Products.confluence,
    ]);
  });

  it('calls back with primary product only if getProductPermissions throws error', async () => {
    (sharedClient.getProductPermissions as jest.Mock).mockImplementation(() =>
      Promise.reject(),
    );
    const products = await fetchPermissions(sharedClient, [
      Products.jira,
      Products.confluence,
    ]);

    expect(products).toEqual([Products.jira]);
    expect(sharedClient.getProductPermissions).toHaveBeenCalledWith([
      Products.confluence,
    ]);
  });
});
