import {
  ApolloClient,
  ApolloQueryResult,
  OperationVariables,
  QueryOptions,
  useApolloClient,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

type ExtraOptions = {
  client?: ApolloClient<object>;
};

function useImperativeQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: Omit<QueryOptions<TVariables>, 'query'> & ExtraOptions,
): (variables: TVariables) => Promise<ApolloQueryResult<TData>> {
  const { client, ...remainingOption } = options ?? {};

  const defaultClient = useApolloClient();

  const queryClient = client ?? defaultClient;

  // We intentionally use client.query here rather than useQuery or useLazyQuery
  // so that we can return a promise when the query is complete.
  return (variables: TVariables) => {
    return queryClient.query<TData, TVariables>({
      query,
      ...remainingOption,
      variables: { ...remainingOption?.variables, ...variables },
    });
  };
}

export default useImperativeQuery;
