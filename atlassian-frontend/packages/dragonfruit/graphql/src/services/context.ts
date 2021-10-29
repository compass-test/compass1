import { ApolloLink, InMemoryCacheConfig } from '@apollo/client';
import * as Sentry from '@sentry/react';
import Cookies from 'js-cookie';

import { TypedTypePolicies } from '../__generated__/apollo-helpers';
import fragmentMatcher from '../__generated__/fragment-matcher';

declare const __SERVER__: boolean;

export const xsrfLink = () =>
  new ApolloLink((operation, forward) => {
    operation.setContext((context: { headers: any }) => {
      const { headers } = context;
      // set empty xsrfToken for SSR as cookies are unavailable
      const xsrfToken =
        typeof __SERVER__ !== 'undefined' && __SERVER__
          ? ''
          : Cookies.get('atlassian.xsrf.token');

      if (!xsrfToken) {
        return context;
      }

      return {
        ...context,
        headers: {
          ...headers,
          'atl-xsrf-token': xsrfToken,
        },
      };
    });

    return forward(operation);
  });

export const customFetch = (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const body = init?.body ? JSON.parse(init.body as string) : null;
  return fetch(
    `${input}?operation=${body ? body.operationName : 'unknown'}`,
    init,
  );
};

// (1) This is to make sure we can cache DevOpsQueries as a separate object from ROOT_QUERY,
// as this object does not have an id field. If we let the DevOpsQueries object be cached under
// the parent ROOT_QUERY object, this causes updates to the cache to refetch all queries.
// e.g. when getTiers updates the cache, it causes getServices queries to refetch.
export const devopsCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    DevOpsQueries: {
      keyFields: ['__typename'], // (1)
    },
  },
};

// TypedTypePolicies is automatically generated with GraphQL codegen so
// that keys in this object will be validated against the schema.
// https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-identifier-generation-by-type
export const typePolicies: TypedTypePolicies = {
  CompassComponent: {
    keyFields: ['id'],
    fields: {
      _isOptimistic: { read: (existing) => existing ?? false },
      _isDeleted: { read: (existing) => existing ?? false },
    },
  },
  CompassAnnouncement: {
    keyFields: ['id'],
  },
  CompassComponentLabel: {
    keyFields: ['name'],
  },
  CompassLink: {
    keyFields: ['id'],
    fields: {
      _isDeleted: { read: (existing) => existing ?? false },
    },
  },
  CompassRelationship: {
    // GraphQL codegen doesn't currently support typechecking for nested keyFields
    // https://github.com/dotansimha/graphql-code-generator/issues/5025
    // Casting to `any` bypasses this
    keyFields: ['type', 'startNode', ['id'] as any, 'endNode', ['id'] as any],
    fields: {
      _isDeleted: { read: (existing) => existing ?? false },
    },
  },
  CompassFieldDefinition: {
    keyFields: ['id'],
  },
  CompassScorecard: {
    keyFields: ['id'],
    fields: {
      _isOptimistic: { read: (existing) => existing ?? false },
      _isDeleted: { read: (existing) => existing ?? false },
      appliedToComponents: {
        keyArgs: false,
        merge(existing = {}, incoming, { args }) {
          // We are only able to support paginating from the last result onwards,
          // so if `after` is `undefined`, then we are fetching from the beginning,
          // otherwise if `after` has a value, we are fetching the next page.
          const after = args?.query?.after;

          if (!after) {
            return incoming;
          }

          // If `after` has a value, it should always be equal to `existing.pageInfo.endCursor`.
          // In the event that it has a different value, default to keeping the incoming data and log an error.
          if (after !== existing.pageInfo.endCursor) {
            console.error(
              'Unexpected "after" query argument value. Only forward pagination is supported.',
            );

            Sentry.captureMessage(
              'Unexpected "after" query argument value.\n' +
                `Expected value: ${existing.pageInfo.endCursor} (equal to previous call's "pageInfo.endCursor")\n` +
                `Actual value: ${after}`,
              Sentry.Severity.Error,
            );

            return incoming;
          }

          // Note: `edges` will eventually be removed from the Compass API
          const existingEdges = existing.edges ?? [];
          const incomingEdges = incoming.edges ?? [];
          const existingNodes = existing.nodes ?? [];
          const incomingNodes = incoming.nodes ?? [];

          return {
            ...existing,
            ...incoming,
            edges: [...existingEdges, ...incomingEdges],
            nodes: [...existingNodes, ...incomingNodes],
          };
        },
      },
    },
  },
  CompassScorecardCriteria: {
    keyFields: ['id'],
  },
  CompassCatalogQueryApi: {
    // Persist `compass` singleton in cache.
    keyFields: [],
    fields: {
      searchComponents: {
        // Define subset of `searchComponents` query arguments to use as cache ID.
        // Using the entire query would be ideal, but we need to use a subset.
        // When we paginate, query.after will change. We still want to merge and cache the results under the same ID.
        keyArgs: (variables: any) => {
          if (variables?.query?.query) {
            // We also need to cache queries with 'query' string passed under separate results.
            // E.g, 'mango' results do not belong with 'pineapple' results, even for the same `fieldFilters` and `sort`.
            return ['query', ['query', 'fieldFilters', 'sort']];
          }
          return ['query', ['fieldFilters', 'sort']];
        },
        // Simpler solution to above, but we need apollo/client ^3.3.0 for optional args.
        // https://github.com/apollographql/apollo-client/pull/7109
        // keyArgs: ['query', ['query', 'fieldFilters', 'sort']],

        merge(existing = {}, incoming, { args }) {
          // We are only able to support paginating from the last result onwards,
          // so if `after` is `undefined`, then we are fetching from the beginning,
          // otherwise if `after` has a value, we are fetching the next page.
          const after = args?.query?.after;

          if (!after) {
            return incoming;
          }

          // If `after` has a value, it should always be equal to `existing.pageInfo.endCursor`.
          // In the event that it has a different value, default to keeping the incoming data and log an error.
          if (after !== existing.pageInfo.endCursor) {
            console.error(
              'Unexpected "after" query argument value. Only forward pagination is supported.',
            );

            Sentry.captureMessage(
              'Unexpected "after" query argument value.\n' +
                `Expected value: ${existing.pageInfo.endCursor} (equal to previous call's "pageInfo.endCursor")\n` +
                `Actual value: ${after}`,
              Sentry.Severity.Error,
            );

            return incoming;
          }

          // Note: `edges` will eventually be removed from the Compass API
          const existingEdges = existing.edges ?? [];
          const incomingEdges = incoming.edges ?? [];
          const existingNodes = existing.nodes ?? [];
          const incomingNodes = incoming.nodes ?? [];

          return {
            ...existing,
            ...incoming,
            edges: [...existingEdges, ...incomingEdges],
            nodes: [...existingNodes, ...incomingNodes],
          };
        },
      },
    },
  },
  CompassCatalogMutationApi: {
    // Provide an empty `keyFields` array to specify that the cache will only ever contain one
    // `CompassCatalogMutationApi` object. This prevents the `compass` field in the cache
    // from being overwritten every time a mutation is executed, and allows any incoming cache data
    // to be appended to the `CompassCatalogMutationApi` singleton.
    keyFields: [],
  },
  CompassTeamCheckin: {
    keyFields: ['id'],
    fields: {
      _isOptimistic: { read: (existing) => existing ?? false },
      _isDeleted: { read: (existing) => existing ?? false },
    },
  },
  DeleteCompassComponentPayload: {
    fields: {
      _isOptimistic: { read: (existing) => existing ?? false },
    },
  },
};

// https://www.apollographql.com/docs/react/data/fragments/#using-fragments-with-unions-and-interfaces
// In order for us to query unions, the Apollo client needs to
// understand the polymorphic relationship between the types.
//
// Since we're using GraphQL codegen, we can generate this automatically.
export const possibleTypes = fragmentMatcher.possibleTypes;

export const aggCacheConfig: InMemoryCacheConfig = {
  possibleTypes,
  typePolicies,
};
