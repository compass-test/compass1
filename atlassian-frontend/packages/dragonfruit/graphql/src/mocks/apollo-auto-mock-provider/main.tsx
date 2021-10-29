import React from 'react';

import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { mergeResolvers } from '@graphql-tools/merge';
import { addMocksToSchema } from '@graphql-tools/mock';
import { buildClientSchema } from 'graphql';

import { aggCacheConfig } from '../../services/context';
import { Mocks, Resolvers } from '../types';

import { defaultMockResolvers } from './mocks';
import { defaultResolvers } from './resolvers';

const introspectionResult = require('../../__generated__/schema.json');

type ApolloAutoMockProviderProps = {
  mocks?: Mocks;
  resolvers?: Resolvers;
  links?: ApolloLink[];
  cache?: ApolloCache<any>;
  children: React.ReactNode;
};

export type ApolloProviderMockProps = Pick<
  ApolloAutoMockProviderProps,
  'mocks' | 'resolvers'
>;

export function ApolloAutoMockProvider(props: ApolloAutoMockProviderProps) {
  const { links = [], cache, children } = props;

  const schema = buildClientSchema(introspectionResult);

  const mocks = props.mocks
    ? mergeResolvers([defaultMockResolvers, props.mocks])
    : defaultMockResolvers;

  const resolvers = props.resolvers
    ? mergeResolvers([defaultResolvers, props.resolvers])
    : defaultResolvers;

  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks,
    resolvers,
  });

  const link = ApolloLink.from([
    ...links,
    new SchemaLink({ schema: schemaWithMocks }),
  ]);

  const client = new ApolloClient({
    link: link,
    cache: cache || new InMemoryCache(aggCacheConfig),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
