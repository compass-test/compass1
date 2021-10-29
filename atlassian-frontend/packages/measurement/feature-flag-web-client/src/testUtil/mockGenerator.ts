import Client from '../core';
import { EnvironmentType, FeatureFlagUser } from '../index';

export function createClient(
  apiKey: string,
  user: FeatureFlagUser,
  productKey: string,
  environment: EnvironmentType,
): Client {
  return new Client(
    apiKey,
    {
      sendOperationalEvent: (): void => {},
    },
    user,
    {
      productKey,
      environment,
      loggerOptions: {
        enabled: false,
      },
    },
  );
}
