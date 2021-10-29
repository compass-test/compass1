import React, { PropsWithChildren } from 'react';

import { ApolloProvider } from '@apollo/client';

import { CustomerCentralGraphClient } from '../index';

type Props = PropsWithChildren<{}>;

/**
 * Straightforward wrapper for consumers to use instead of using the graph client directly
 */
const CustomerCentralProvider = ({ children }: Props) => {
  return (
    <ApolloProvider client={CustomerCentralGraphClient}>
      {children}
    </ApolloProvider>
  );
};

export default CustomerCentralProvider;
