import React from 'react';

import { ApolloClient, getApolloContext } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';

/*
When using useQuery() and useMutation() with a custom client, it disables any mocking provided by <MockedProvider>.
To get around this limitation, this hook checks if we're inside a <MockedProvider>, and if so returns the mocked client,
otherwise it returns the custom client.
 */
const useMockableClient = (client: ApolloClient<any>) => {
  const contextClient = React.useContext(getApolloContext()).client;
  if (contextClient?.link instanceof MockLink) {
    // There's a mocked client in the context. Return that instead.
    return contextClient;
  } else {
    return client;
  }
};

export { useMockableClient };
