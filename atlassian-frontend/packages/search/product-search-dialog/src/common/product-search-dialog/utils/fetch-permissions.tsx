import { Products } from '../../../common/product-context';
import { SharedClient } from '../../clients';

export const fetchPermissions = (
  sharedClient: SharedClient,
  products: Products[],
) => {
  // For MVP, it is assumed the user has permissions to the primary product
  // and ignoring the returned scopes
  if (products.length === 0 || products.length === 1) {
    return Promise.resolve(products);
  }

  return sharedClient
    .getProductPermissions(products.slice(1, products.length))
    .then((permissibleProducts) => [products[0], ...permissibleProducts])
    .catch(() => {
      return products.slice(0, 1);
    });
};
