import React, { FC } from 'react';

import { RelayEnvironmentProvider } from 'react-relay';

import { useGqlClient } from './services/apollo/client';
import { QueryProvider as ApolloQueryProvider } from './services/apollo/query-provider';
import { RelayEnvironment } from './services/relay/environment';

interface Props {
  onApolloGqlError: (errors: Error[]) => void;
}
export const GqlClientProviders: FC<Props> = ({
  children,
  onApolloGqlError,
}) => {
  const client = useGqlClient(onApolloGqlError);

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ApolloQueryProvider client={client}>{children}</ApolloQueryProvider>
    </RelayEnvironmentProvider>
  );
};
