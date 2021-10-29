import React from 'react';

import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { GraphQLError } from 'graphql';

import { aggCacheConfig } from '../../services/context';

type ApolloNetworkErrorProviderProps = {
  errors?: GraphQLError[];
  cache?: ApolloCache<any>;
  children: React.ReactNode;
};

export function ApolloNetworkErrorProvider(
  props: ApolloNetworkErrorProviderProps,
) {
  const { errors, cache, children } = props;

  // This link just returns the errors that you supply
  const link = new ApolloLink(() => {
    return new Observable((observer) => {
      observer.next({
        errors: errors || [new GraphQLError('Unspecified error')],
      });
      observer.complete();
    });
  });

  const client = new ApolloClient({
    link,
    cache: cache || new InMemoryCache(aggCacheConfig),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
