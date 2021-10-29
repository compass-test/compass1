import React from 'react';

import { ApolloClient, ApolloProvider } from '@apollo/client';

export interface ProviderProps {
  client: ApolloClient<unknown>;
  children: React.ReactNode;
}

export const QueryProvider = ({
  client,
  children,
}: ProviderProps): React.ReactElement<ProviderProps> => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
