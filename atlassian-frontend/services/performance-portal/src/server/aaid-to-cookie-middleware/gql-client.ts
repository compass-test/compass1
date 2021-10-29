import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';

import nodeFetch from 'node-fetch';

const GQL_SERVER_URL = process.env.GQL_SERVER_URL;

const link = ApolloLink.from([
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new HttpLink({ uri: `${GQL_SERVER_URL}/graphql`, fetch: nodeFetch }),
]);

export const gqlClient = new ApolloClient({
  link,
  /*
    NOTE: resultCaching is turned off since this is a server side client
    if its turned on means all gql query will be cached forever.
    @apollo/client does not have a ttl feature just yet
    https://github.com/apollographql/apollo-client/issues/6484

    we'll be use node-cache for caching until apollo client support TTL
  */
  cache: new InMemoryCache({ resultCaching: false }),
});
