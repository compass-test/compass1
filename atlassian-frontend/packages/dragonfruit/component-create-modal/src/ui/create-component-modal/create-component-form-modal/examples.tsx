import React from 'react';

import { action } from '@storybook/addon-actions';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CreateComponentModalProvider } from '../../../controllers/create-component-modal-controller';

import { CreateComponentFormModal } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const CreateComponentFormModalSuccess = () => {
  return (
    <ApolloAutoMockProvider>
      <CreateComponentModalProvider>
        <CreateComponentFormModal
          onClose={() => action('close')}
          onSuccess={(id) => action(`Created component with ID ${id}`)}
        />
      </CreateComponentModalProvider>
    </ApolloAutoMockProvider>
  );
};

export const CreateComponentFormModalNetworkFailure = () => {
  return (
    <ApolloNetworkErrorProvider>
      <CreateComponentModalProvider>
        <CreateComponentFormModal onClose={() => action('close')} />
      </CreateComponentModalProvider>
    </ApolloNetworkErrorProvider>
  );
};
