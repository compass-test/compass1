import React, { ReactElement } from 'react';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentSearchPicker } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const SearchComponentPickerSuccess = () => {
  return (
    <ApolloAutoMockProvider>
      <ComponentSearchPicker />
    </ApolloAutoMockProvider>
  );
};

export const SearchComponentPickerError = () => {
  return (
    <ApolloNetworkErrorProvider>
      <ComponentSearchPicker />
    </ApolloNetworkErrorProvider>
  );
};
