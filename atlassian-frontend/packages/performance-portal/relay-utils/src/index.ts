import { useEffect, useRef, useState } from 'react';

import {
  loadQuery,
  LoadQueryOptions,
  PreloadedQuery,
  RefetchFnDynamic,
  useRelayEnvironment,
} from 'react-relay';
import {
  createResource,
  RouteResource,
  useResource,
} from 'react-resource-router';
import {
  ConcreteRequest,
  fetchQuery,
  GraphQLTaggedNode,
  OperationType,
  VariablesOf,
} from 'relay-runtime';

import { RelayEnvironment } from '@atlassian/performance-portal-gql-client';

export const RELAY_RESOURCE_TYPE = 'RELAY_RESOURCE_TYPE';

interface RelayResourceConfig<TQuery extends OperationType> {
  query: ConcreteRequest;
  variables: VariablesOf<TQuery>;
  options?: LoadQueryOptions;
}

type GetQueryFunction<TQuery extends OperationType> = (
  ...args: Parameters<RouteResource['getData']>
) => RelayResourceConfig<TQuery>;

export const createRelayResource = <TQuery extends OperationType>({
  getQuery,
}: {
  getQuery: GetQueryFunction<TQuery>;
}): RouteResource<PreloadedQuery<TQuery>> => {
  return createResource({
    type: RELAY_RESOURCE_TYPE,
    getKey: (...args) => {
      const { query } = getQuery(...args);

      const queryId = query.params.cacheID ?? query.params.id;
      return `relay-${queryId}`;
    },
    getData: async (...args) => {
      const { query, variables, options } = getQuery(...args);
      const queryReference = loadQuery<TQuery>(
        RelayEnvironment,
        query,
        variables,
        options,
      );

      return queryReference;
    },
  });
};

export const useRelayResource = <TQuery extends OperationType>(
  resource: RouteResource<PreloadedQuery<TQuery>>,
) => {
  const { data: queryReference } = useResource(resource);

  return queryReference;
};

export const useLazyLoadQueryWithLoadingState = <TQuery extends OperationType>(
  gqlQuery: GraphQLTaggedNode,
  variables: VariablesOf<TQuery>,
): { data: TQuery['response']; loading: boolean; error: null | Error } => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TQuery['response']>({});
  const [error, setError] = useState<Error | null>(null);
  const environment = useRelayEnvironment();

  useEffect(() => {
    // Use fetchQuery to implement loading state instead of Suspense.
    fetchQuery(environment, gqlQuery, variables, {
      fetchPolicy: 'store-or-network',
    }).subscribe({
      start: () => {
        setLoading(true);
        setError(null);
      },
      complete: () => {
        setLoading(false);
      },
      error: (error: Error) => {
        setLoading(false);
        setError(error);
      },
      next: (data) => {
        setData(data);
      },
    });
  }, [environment, gqlQuery, variables]);

  return { data, loading, error };
};

// This hook will make sure the relay refetchFn won't be called on the first mount
export const useRefetchOnVariablesChange = <TQuery extends OperationType>(
  refetchFn: RefetchFnDynamic<TQuery, null>,
  refetchVariables: Partial<Parameters<typeof refetchFn>[0]>,
  options?: Parameters<typeof refetchFn>[1],
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      // do not refetch on first mount
      isMounted.current = true;
    } else {
      // refetch on variables change after mount
      refetchFn(refetchVariables, options);
    }
  }, [options, refetchFn, refetchVariables]);
};
