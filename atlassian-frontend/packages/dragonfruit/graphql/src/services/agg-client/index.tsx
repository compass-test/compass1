import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { useMockableClient } from '../../common/utils/mockable-client';
import { aggCacheConfig, customFetch, xsrfLink } from '../context';

const aggExperimentalHeaderLink = () =>
  new ApolloLink((operation, forward) => {
    operation.setContext((context: { headers: any }) => {
      const { headers } = context;

      return {
        ...context,
        headers: {
          ...headers,
          'X-ExperimentalApi': 'compass-beta, compass-prototype',
        },
      };
    });

    return forward(operation);
  });

const client = new ApolloClient({
  link: ApolloLink.from([
    xsrfLink(),
    aggExperimentalHeaderLink(),
    new HttpLink({
      uri: '/gateway/api/graphql',
      credentials: 'same-origin',
      fetch: customFetch,
    }),
  ]),
  cache: new InMemoryCache(aggCacheConfig),
});

const useAggClient = () => useMockableClient(client);

export default useAggClient;
