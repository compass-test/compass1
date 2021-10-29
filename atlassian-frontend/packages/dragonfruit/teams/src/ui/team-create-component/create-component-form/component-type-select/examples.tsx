import React, { ReactElement } from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentTypeSelect from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <ApolloAutoMockProvider>
        <CompassTestProvider locale="en">
          <div style={{ width: '264px' }}>{storyFn()}</div>
        </CompassTestProvider>
      </ApolloAutoMockProvider>
    ),
  ],
};

export const ComponentTypeSelectExample = () => (
  <CompassTestProvider locale="en">
    <ComponentTypeSelect />
  </CompassTestProvider>
);
