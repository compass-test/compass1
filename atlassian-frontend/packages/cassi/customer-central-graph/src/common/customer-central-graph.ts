import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPH_API = '/api/1/graph';
const EXTERNAL_GRAPH_API_PROD =
  'https://cassi.internal.atlassian.com/api/1/graph';
const EXTERNAL_GRAPH_API_STG =
  'https://cassi.stg.internal.atlassian.com/api/1/graph';

const getBaseUrl = () => {
  if (shouldUseRelativePath()) {
    return GRAPH_API;
  }
  if (isProduction()) {
    return EXTERNAL_GRAPH_API_PROD;
  } else {
    return EXTERNAL_GRAPH_API_STG;
  }
};

const isProduction = () => {
  return window.__env__ && validProductionEnvironments.includes(window.__env__);
};

// If the component or portal application is currently within the CASSI application, should use relative path
const shouldUseRelativePath = () => {
  return !!window.__cassi__;
};

const validProductionEnvironments = ['prod-east', 'prod', 'production'];

/**
 * The common graph client will be available globally and added need be.
 *
 * Example:
 * 1. The CASSI app creates a client and adds it
 * 2. @cassi/salesforce-account-team is added to CASSI and needs a client, uses the client from 1.
 */
const CustomerCentralGraph = (function () {
  const client = new ApolloClient({
    uri: getBaseUrl(),
    credentials: shouldUseRelativePath() ? 'same-origin' : 'include',
    cache: new InMemoryCache(),
  });

  return {
    client,
  };
})();

export const CustomerCentralGraphClient = CustomerCentralGraph.client;
export const CustomerCentralGraphUrl = getBaseUrl();
