import { useContext, useEffect } from 'react';
import { useMemoOne } from 'use-memo-one';
import gql from 'graphql-tag';
import { ApolloClient, ApolloError } from 'apollo-client';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import {
  GQLExtensionContext,
  GQLExtensionContextExtensionsByTypeVariables,
  GQLExtensionContextsVariables,
  isGQLGatewayError,
  isGQLUnderlyingServiceError,
} from '../graphql/types';
import { catalog } from '@atlassiansox/metal-client';
import { ContextId } from '@atlassian/forge-ui-types';
import { MetalClientContext } from '../../context';

export const getExtensionListQuery = (
  expandAppOwner?: boolean,
  egressConsentFlowEnabled?: boolean,
  moduleTypes?: string[],
) => {
  const modules = moduleTypes?.map((m) => `"${m}"`) || ['$type'];

  const query = `
  query forge_ui_extensionList($contextIds: [ID!]!${
    moduleTypes ? '' : ', $type: String!'
  }) {
    extensionContexts(contextIds: $contextIds) {
      id
      ${modules
        .map(
          (m) => `
        extensionsByType(type: ${m}) {
          id
          ${
            expandAppOwner
              ? `appOwner {
            name
          }`
              : ''
          }
          environmentId
          environmentType
          properties
          type
          appVersion
          installationId
          ${
            egressConsentFlowEnabled
              ? `
                consentUrl
                currentUserConsent {
                  user {
                    aaid
                  }
                  appEnvironmentVersion {
                    id
                  }
                  consentedAt
                }
                requiresUserConsent
              `
              : ''
          }
        }`,
        )
        .join('')}
    }
  }`;

  return gql`
    ${query}
  `;
};

export interface QueryVariables {
  contextIds: GQLExtensionContextsVariables['contextIds'];
  type: GQLExtensionContextExtensionsByTypeVariables['type'];
}

export interface QueryData {
  extensionContexts: GQLExtensionContext[];
}

export type UseExtensionQueryHookOptions = QueryHookOptions<
  QueryData,
  QueryVariables
>;

export type UseExtensionListOptions = QueryVariables & {
  client?: ApolloClient<object>;
  queryOptions?: UseExtensionQueryHookOptions;
  expandAppOwner?: boolean;
  egressConsentFlowEnabled?: boolean;
};

interface CommonHookResult {
  loading: boolean;
  error?: ApolloError;
}

export interface UseExtensionListHookResult extends CommonHookResult {
  extensions: GQLExtensionContext['extensionsByType'];
}

export interface ExtensionListGQLResult<T> {
  data?: {
    extensionContexts?: Array<{
      extensionsByType?: T[];
    }>;
  };
  loading: boolean;
}

export const createExtensionListQueryOptions = <T>(
  client: ApolloClient<object> | undefined,
  contextIds: ContextId[],
  moduleType: string,
  queryOptions?: T,
  expandAppOwner?: boolean,
  egressConsentFlowEnabled?: boolean,
): T => {
  return {
    variables: {
      contextIds,
      type: moduleType,
    },
    ...queryOptions,
    query: getExtensionListQuery(expandAppOwner, egressConsentFlowEnabled),
    client,
    /**
     * We don't want to set 'ignore' because that discards errors and we need to inspect
     * them for SLI reporting. We also need 'all' so we don't discard data on errors:http://go/j/AUX-317
     * https://www.apollographql.com/docs/react/data/error-handling/
     */
    errorPolicy: 'all',
  } as T;
};

export const getExtensionsFromGQLResult = <T>({
  loading,
  data,
}: ExtensionListGQLResult<T>) => {
  if (
    !loading &&
    data &&
    data.extensionContexts &&
    data.extensionContexts[0] &&
    data.extensionContexts[0].extensionsByType
  ) {
    return data.extensionContexts[0].extensionsByType;
  }

  return null;
};

export const useExtensionList = (
  options: UseExtensionListOptions,
): UseExtensionListHookResult => {
  const {
    contextIds,
    type,
    client,
    queryOptions,
    expandAppOwner,
    egressConsentFlowEnabled,
  } = options;
  const contextIdsString = contextIds.sort().join('');
  const startTimeMs = useMemoOne(() => performance.now(), [
    contextIdsString,
    type,
    client,
  ]);

  const requestOptions = createExtensionListQueryOptions<
    UseExtensionQueryHookOptions
  >(
    client,
    contextIds,
    type,
    queryOptions,
    expandAppOwner,
    egressConsentFlowEnabled,
  );

  const { error, loading, data } = useQuery<QueryData, QueryVariables>(
    requestOptions.query || getExtensionListQuery(expandAppOwner),
    requestOptions,
  );
  const extensions = getExtensionsFromGQLResult({ loading, data });

  const { metalClient, page } = useContext(MetalClientContext);

  useEffect(() => {
    if (metalClient && extensions) {
      const endTimeMs = performance.now();
      Promise.resolve(metalClient).then((metalClient) => {
        metalClient.metric.submit({
          component: 'useExtensionList',
          page,
          name: catalog.performance.COMPONENT_READY,
          value: endTimeMs - startTimeMs,
        });
      });
    }
  }, [extensions, startTimeMs, metalClient, page]);

  useEffect(() => {
    if (
      metalClient &&
      // if hydration of appOwners (non-critical data) fails but we still have the extensions,
      // we shouldn't count this as a bad event
      !extensions &&
      error &&
      error.graphQLErrors.length > 0
    ) {
      const err = error.graphQLErrors.find(
        (err) => isGQLUnderlyingServiceError(err) || isGQLGatewayError(err),
      );
      Promise.resolve(metalClient).then((metalClient) => {
        metalClient.error.submit({
          component: 'useExtensionList',
          page,
          name: err
            ? isGQLUnderlyingServiceError(err)
              ? catalog.error.COMPONENT_API
              : catalog.error.COMPONENT_GRAPHQL
            : catalog.error.UNCAUGHT,
        });
      });
    }
  }, [extensions, error, metalClient, page]);

  return {
    error,
    extensions: extensions || [],
    loading,
  };
};
