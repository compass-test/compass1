import { Environment, getEnvName } from '../../utils/environment';
import { createAvailableProductsProvider } from '../default-available-products-provider';

export const getTrelloOrigin = (env: Environment) =>
  env === Environment.Production
    ? 'https://api-gateway.trello.com'
    : 'https://api-gateway.trellis.coffee';

export const getAvailableProductsUrl = (env: Environment) =>
  `${getTrelloOrigin(
    env,
  )}/gateway/api/available-products/api/available-products`;

export const TrelloProductsProvider = createAvailableProductsProvider(
  getAvailableProductsUrl(getEnvName(location.origin)),
);
