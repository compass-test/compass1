import React from 'react';

import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
} from '@apollo/client';

import { aggCacheConfig } from '../../services/context';

type ApolloLoadingProviderProps = {
  cache?: ApolloCache<any>;
  children: React.ReactNode;
};

export function ApolloLoadingProvider(props: ApolloLoadingProviderProps) {
  const { children, cache } = props;

  // This link never resolves, therefore forcing a loading state
  const link = new ApolloLink(() => {
    return new Observable(() => {});
  });

  const client = new ApolloClient({
    link,
    cache: cache || new InMemoryCache(aggCacheConfig),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
