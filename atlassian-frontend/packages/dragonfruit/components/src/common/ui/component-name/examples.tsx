import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { Router } from 'react-resource-router';

import { FlagsProvider } from '@atlaskit/flag';
import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import { ComponentName } from './main';

const mockClient = createMockClient();

const testComponent: CompassComponent = {
  __typename: 'CompassComponent',
  id: '1234',
  type: CompassComponentType.SERVICE,
  name: 'test-component-name',
  changeMetadata: {},
};

const testUrl = 'https://www.atlassian.com/';

export default () => (
  <CompassIntlProvider locale="en">
    <FlagsProvider>
      <ApolloProvider client={mockClient}>
        <Router routes={[]}>
          <ComponentName
            component={testComponent}
            componentDetailsUrl={testUrl}
          />
        </Router>
      </ApolloProvider>
    </FlagsProvider>
  </CompassIntlProvider>
);
