import ApolloClient, { QueryOptions } from 'apollo-client';
import { ContextId, ForgeUIExtensionType } from '@atlassian/forge-ui-types';
import {
  createExtensionListQueryOptions,
  getExtensionsFromGQLResult,
  QueryData,
} from '../web-client';
import { GraphQLError } from 'graphql';

export type GetForgeUIExtensionsAsyncOptions = {
  client: ApolloClient<object>;
  contextIds: ContextId[];
  moduleType: string;
  queryOptions?: Omit<QueryOptions, 'query'>;
  expandAppOwner?: boolean;
  egressConsentFlowEnabled?: boolean;
};

export async function getForgeUIExtensionsAsync({
  client,
  contextIds,
  moduleType,
  queryOptions,
  expandAppOwner,
  egressConsentFlowEnabled,
}: GetForgeUIExtensionsAsyncOptions): Promise<{
  extensions: ReadonlyArray<ForgeUIExtensionType> | null;
  errors?: ReadonlyArray<GraphQLError>;
}> {
  const requestOptions = createExtensionListQueryOptions<QueryOptions>(
    client,
    contextIds,
    moduleType,
    queryOptions as QueryOptions,
    expandAppOwner,
    egressConsentFlowEnabled,
  );

  const queryResult = await client.query<QueryData>(requestOptions);
  return {
    extensions: getExtensionsFromGQLResult<ForgeUIExtensionType>(queryResult),
    errors: queryResult.errors,
  };
}
