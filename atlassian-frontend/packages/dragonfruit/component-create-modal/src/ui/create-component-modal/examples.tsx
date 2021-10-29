import React from 'react';

import { action } from '@storybook/addon-actions';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CreateComponentModal } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const CreateComponentModalSuccess = () => {
  return (
    <ApolloAutoMockProvider>
      <CreateComponentModal
        onClose={() => action('close')}
        onSuccess={(id) => action(`Created component with ID ${id}`)}
      />
    </ApolloAutoMockProvider>
  );
};

export const CreateComponentModalWithDefault = () => {
  return (
    <ApolloAutoMockProvider>
      <CreateComponentModal
        onClose={() => action('close')}
        onSuccess={(id) => action(`Created component with ID ${id}`)}
        defaultValues={{
          type: CompassComponentType.OTHER,
          name: 'Default Name',
        }}
      />
    </ApolloAutoMockProvider>
  );
};
