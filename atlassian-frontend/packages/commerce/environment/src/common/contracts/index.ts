import { GATEWAY_URL } from '../../common/constants';

import { ContractScenarios, ServiceContractScenarios } from './types';

/**
 * List of a known providers
 * used to point into correct spec name and provide a link to the corresponding swagger/contract configuration
 * TODO: add extra field to override provider name (to CPP-gateway for example)
 */
export const KNOWN_PROVIDERS = {
  /**
   * @deprecated do not use API Gateway directly
   */
  'ccp-api-gateway-v2': {
    prefix: '/ccp/api/v1/',
    specName: 'default',
    contractLocation:
      'https://stash.atlassian.com/projects/CCP/repos/ccp-api-gateway-v2/browse/contract-testing.json',
  },
  'ccp-search': {
    prefix: '/ccp/api/v1/search',
    specName: 'default',
    contractLocation:
      'https://stash.atlassian.com/projects/CCP/repos/ccp-search/browse/contract-testing.json',
  },
  'entitlement-service': {
    // will NOT match entitlements/*/details
    prefix: new RegExp('/ccp/api/v1/entitlements$'),
    specName: 'default',
    contractLocation:
      'https://stash.atlassian.com/projects/CCP/repos/entitlement-service/browse/contract-testing.json',
  },
  'accounts-receivable': {
    prefix: '/ccp/api/v1/invoices',
    specName: 'internal',
    contractLocation:
      'https://stash.atlassian.com/projects/CCP/repos/accounts-receivable/browse/contract-testing.json',
  },
  'order-management-service': {
    prefix: '/ccp/api/v1/orders',
    specName: 'default',
    contractLocation:
      'https://stash.atlassian.com/projects/CCP/repos/order-management/browse/contract-testing.json',
  },
};

/**
 * defines a contract between given package and provider service
 * @param consumer - current package name
 * @param provider - one of the {@link KNOWN_PROVIDERS}
 * @param contracts - a list of mocks
 * @param [scope] - default scope for package-name
 */
export const defineContractMocks = (
  consumer: string,
  provider: keyof typeof KNOWN_PROVIDERS,
  contracts: ContractScenarios,
  scope = 'af-commerce',
): ServiceContractScenarios => ({
  consumer: `${scope}-${consumer}`,
  provider,
  specName: KNOWN_PROVIDERS[provider]?.specName,
  contracts,
  enabled: Boolean(KNOWN_PROVIDERS[provider]),
});

/**
 * Autofilters lists of scenarios for a given provider and defines a corresponding constract
 * @param consumer - current package name
 * @param expectedProvider - one of the {@link KNOWN_PROVIDERS}
 * @param contracts - a list of mocks
 * @param [scope] - default scope for package-name
 */
export const pickContractMocks = (
  consumer: string,
  expectedProvider: keyof typeof KNOWN_PROVIDERS,
  contracts: ContractScenarios,
  scope = 'af-commerce',
): ServiceContractScenarios => {
  const providerPrefix = KNOWN_PROVIDERS[expectedProvider].prefix;
  const requiredPrefix =
    typeof providerPrefix === 'string'
      ? new RegExp(`^${GATEWAY_URL}${providerPrefix}`)
      : providerPrefix;
  const filteredContracts = Object.fromEntries(
    Object.entries(contracts).filter(([key, value]) => {
      requiredPrefix.lastIndex = 0; // reset mask
      return value.request.url.match(requiredPrefix);
    }),
  );
  const givenKeys = Object.keys(contracts).length;
  const generatedKeys = Object.keys(filteredContracts).length;
  if (generatedKeys === 0) {
    throw new Error(
      `failed to find requests for ${expectedProvider} in the given list.`,
    );
  }
  if (generatedKeys === givenKeys) {
    throw new Error(
      `all scenarios matches single ${expectedProvider}. Please use defineContractMocks.`,
    );
  }
  return defineContractMocks(
    consumer,
    expectedProvider,
    filteredContracts,
    scope,
  );
};
