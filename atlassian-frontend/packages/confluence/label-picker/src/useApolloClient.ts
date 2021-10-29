import { getApolloContext } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { useContext } from 'react';

export function useApolloClient(client?: ApolloClient<unknown>) {
  const apolloContext = useContext(getApolloContext());
  const apolloClient = client || apolloContext.client;
  if (!apolloClient) {
    throw new Error(
      'No ApolloClient provided! Pass it as a prop or create an ApolloProvider.',
    );
  }
  return apolloClient;
}
