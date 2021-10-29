import { Environment, getEnvName } from '../../utils/environment';
import { createProductConfigurationProvider } from '../product-configuration-provider';
import { getTrelloOrigin } from './products-provider';

export const getProductConfigurationUrl = (env: Environment) =>
  `${getTrelloOrigin(
    env,
  )}/gateway/api/available-products/api/product-configuration`;

export const TrelloProductConfigurationProvider = (
  useRemoteProductConfiguration: boolean,
) =>
  createProductConfigurationProvider({
    url: getProductConfigurationUrl(getEnvName(location.origin)),
    useRemoteProductConfiguration,
  });
