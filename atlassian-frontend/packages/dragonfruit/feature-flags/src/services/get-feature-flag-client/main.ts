import { useEffect, useState } from 'react';

import FeatureFlagWebClient, {
  AnalyticsClientInterface,
  ClientOptions,
  EnvironmentType,
  FeatureFlagUser,
  Identifiers,
  IdentifiersObject,
} from '@atlassiansox/feature-flag-web-client';

import { FeatureFlagClientState } from '../../types';

const getApiKeyForEnvironment = (environment: EnvironmentType) => {
  // These keys are taken from https://developer.atlassian.com/platform/frontend-feature-flags/resources/api-keys/
  const DEVELOPMENT_KEY = '002ebe96-29f1-45aa-bd3d-1a70b8957ccf'; // Note that the DEV environment (i.e. localhost:3000) uses our launchdarkly Staging settings, even though it has a different API key
  const STAGING_KEY = 'cfb179e6-7b5d-4152-a6ec-8637d854ebe6';
  const PRODUCTION_KEY = '4fbb7c7d-1206-4f19-9b3f-d83bd302d011';
  switch (environment) {
    case EnvironmentType.PROD:
      return PRODUCTION_KEY;
    case EnvironmentType.STAGING:
      return STAGING_KEY;
    case EnvironmentType.LOCAL:
      return DEVELOPMENT_KEY;
    default:
      /* eslint-disable no-console */
      console.warn(
        `Unknown feature flag environment: ${environment}. Falling back to PROD.`,
      );
      return PRODUCTION_KEY;
  }
};

function createClient(
  environment: EnvironmentType,
  analyticsWebClient: AnalyticsClientInterface,
  accountId: string,
  tenantId: string,
) {
  const apiKey = getApiKeyForEnvironment(environment);
  let additionalIdentifiers: IdentifiersObject = {};
  if (accountId) {
    additionalIdentifiers[Identifiers.ATLASSIAN_ACCOUNT_ID] = accountId;
  }
  const featureFlagUser: FeatureFlagUser = {
    // Compass uses the Cloud ID as the primary
    // identifier. As a result, we don't rely
    // on isAnonymous reflecting whether the end
    // user is authenticated or not, and setting
    // it to true maintains consistency with the
    // backend
    isAnonymous: true,
    identifier: {
      type: Identifiers.TENANT_ID,
      value: tenantId,
    },
    additionalIdentifiers,
  };
  const options: ClientOptions = {
    environment,
    productKey: 'compass',
  };
  return new FeatureFlagWebClient(
    apiKey,
    analyticsWebClient,
    featureFlagUser,
    options,
  );
}

const useFeatureFlagClient = ({
  environment,
  analyticsWebClient,
  accountId,
  tenantId,
}: {
  environment: string | undefined;
  analyticsWebClient: AnalyticsClientInterface | undefined;
  accountId: string | undefined;
  tenantId: string | undefined;
}) => {
  const [clientState, setClientState] = useState<FeatureFlagClientState>({
    client: undefined,
    loading: true,
    error: undefined,
  });

  useEffect(() => {
    if (clientState.client != null) {
      // Client already created, don't create again
      return;
    }
    if (
      environment == null ||
      analyticsWebClient == null ||
      accountId == null ||
      tenantId == null
    ) {
      // Required data not present. Don't create client yet.
      return;
    }

    const client = createClient(
      toFeatureFlagEnvironment(environment),
      analyticsWebClient,
      accountId,
      tenantId,
    );

    setClientState({
      client,
      loading: true, // Loading will remain true until client.ready() resolves
      error: undefined,
    });

    client
      .ready()
      .then(() => {
        setClientState({ client, loading: false, error: undefined });
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.error('Could not initialize FeatureFlagClient', error);
        setClientState({ client, loading: false, error });
      });
  }, [
    clientState.client,
    environment,
    analyticsWebClient,
    accountId,
    tenantId,
  ]);

  return clientState;
};

const toFeatureFlagEnvironment = (envString: string): EnvironmentType => {
  let envKey = getEnumKeyByEnumValue(EnvironmentType, envString);
  let env = envKey && EnvironmentType[envKey];

  if (env == null) {
    /* eslint-disable no-console */
    console.warn(
      `Unknown feature flag environment: ${envString}. Falling back to PROD.`,
    );
    env = EnvironmentType.PROD;
  }
  return env;
};

const getEnumKeyByEnumValue = <T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string,
): keyof T | null => {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
};

export default useFeatureFlagClient;
