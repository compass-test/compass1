import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

export interface ProviderProps {
  client: ApolloClient<any>;
  children: React.ReactNode;
}

export const QueryProvider = ({
  client,
  children,
}: ProviderProps): React.ReactElement<ProviderProps> => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
