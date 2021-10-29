import { Environment } from '@atlassian/dragonfruit-tenant-context';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

export function convertToForgeEnvironment(
  environment: Environment,
): ProductEnvironment {
  if (environment === Environment.LOCAL) {
    return ProductEnvironment.DEVELOPMENT;
  } else if (environment === Environment.STAGING) {
    return ProductEnvironment.STAGING;
  } else {
    return ProductEnvironment.PRODUCTION;
  }
}
