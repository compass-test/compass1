import { useContext, useEffect, useRef } from 'react';
import { useMemoOne } from 'use-memo-one';
import gql from 'graphql-tag';
import { ApolloClient, ApolloError } from 'apollo-client';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import {
  GQLCustomUITunnelDefinition,
  GQLAppTunnels,
  isGQLGatewayError,
  isGQLUnderlyingServiceError,
} from '../graphql/types';
import { catalog } from '@atlassiansox/metal-client';
import { MetalClientContext } from '../../context';

export const getActiveTunnelsQuery = () => {
  const query = `
  query forge_ui_getActiveTunnels($appId: ID!, $environmentId: ID!) {
    appActiveTunnels(appId: $appId, environmentId: $environmentId) {
      customUI {
        resourceKey
        tunnelUrl
      }
    }
  }
  `;

  return gql`
    ${query}
  `;
};

export interface QueryVariables {
  appId: string;
  environmentId: string;
}

export interface QueryData {
  appActiveTunnels: GQLAppTunnels;
}

export type UseAppTunnelsQueryHookOptions = QueryHookOptions<
  QueryData,
  QueryVariables
>;

export type UseAppTunnelsOptions = QueryVariables & {
  environmentType: string;
  client?: ApolloClient<object>;
  queryOptions?: UseAppTunnelsQueryHookOptions;
  expandAppOwner?: boolean;
};

interface CommonHookResult {
  loading: boolean;
  error?: ApolloError;
}

export interface UseAppTunnelsHookResult extends CommonHookResult {
  tunnels: GQLCustomUITunnelDefinition[];
}

export interface AppTunnelsGQLResult {
  data?: {
    appActiveTunnels?: {
      customUI?: Array<GQLCustomUITunnelDefinition>;
    };
  };
  loading: boolean;
}

export const createAppTunnelsQueryOptions = (
  client: ApolloClient<object> | undefined,
  appId: string,
  environmentId: string,
  queryOptions?: UseAppTunnelsQueryHookOptions,
): UseAppTunnelsQueryHookOptions => {
  return {
    variables: {
      appId,
      environmentId,
    },
    ...queryOptions,
    query: getActiveTunnelsQuery(),
    client,
    /**
     * We don't want to set 'ignore' because that discards errors and we need to inspect
     * them for SLI reporting. We also need 'all' so we don't discard data on errors:http://go/j/AUX-317
     * https://www.apollographql.com/docs/react/data/error-handling/
     */
    errorPolicy: 'all',
  };
};

export const getCustomUITunnelsFromGQLResult = ({
  loading,
  data,
}: AppTunnelsGQLResult) => {
  if (!loading) {
    return data?.appActiveTunnels?.customUI;
  }

  return undefined;
};

export const useCustomUITunnelsList = (
  options: UseAppTunnelsOptions,
): UseAppTunnelsHookResult => {
  const {
    appId,
    environmentType,
    environmentId,
    client,
    queryOptions,
  } = options;

  const shouldQuery = useRef(true);

  if (environmentType !== 'DEVELOPMENT') {
    shouldQuery.current = false;
  }

  const startTimeMs = useMemoOne(() => performance.now(), [
    appId,
    environmentId,
    client,
  ]);

  const requestOptions = createAppTunnelsQueryOptions(
    client,
    appId,
    environmentId,
    queryOptions,
  );

  const { error, loading, data } = useQuery<QueryData, QueryVariables>(
    requestOptions.query || getActiveTunnelsQuery(),
    {
      ...requestOptions,
      skip: !shouldQuery.current,
    },
  );
  const tunnels = getCustomUITunnelsFromGQLResult({ loading, data });

  const { metalClient, page } = useContext(MetalClientContext);

  useEffect(() => {
    if (metalClient && tunnels) {
      const endTimeMs = performance.now();
      Promise.resolve(metalClient).then((metalClient) => {
        metalClient.metric.submit({
          component: 'useCustomUITunnelsList',
          page,
          name: catalog.performance.COMPONENT_READY,
          value: endTimeMs - startTimeMs,
        });
      });
    }
  }, [tunnels, startTimeMs, metalClient, page]);

  useEffect(() => {
    if (
      metalClient &&
      // if hydration of appOwners (non-critical data) fails but we still have the extensions,
      // we shouldn't count this as a bad event
      !tunnels &&
      error &&
      error.graphQLErrors.length > 0
    ) {
      const err = error.graphQLErrors.find(
        (err) => isGQLUnderlyingServiceError(err) || isGQLGatewayError(err),
      );
      Promise.resolve(metalClient).then((metalClient) => {
        metalClient.error.submit({
          component: 'useCustomUITunnelsList',
          page,
          name: err
            ? isGQLUnderlyingServiceError(err)
              ? catalog.error.COMPONENT_API
              : catalog.error.COMPONENT_GRAPHQL
            : catalog.error.UNCAUGHT,
        });
      });
    }
  }, [tunnels, error, metalClient, page]);

  return {
    error,
    tunnels: tunnels || [],
    loading,
  };
};
