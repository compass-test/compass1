import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import UpdateOwnerModal from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const mockSuccess = {
  UpdateCompassComponentPayload: () => ({
    errors: [],
    success: true,
    componentDetails: () => ({
      __typename: 'CompassComponent',
    }),
  }),
};

export const AddOwnerUpdateModal = () => {
  return (
    <ApolloAutoMockProvider mocks={mockSuccess}>
      <UpdateOwnerModal
        onClose={() => action('close')}
        updateOwner={async () => true}
        defaultValues={undefined}
        isEditModal={false}
        componentId={'testId'}
      />
    </ApolloAutoMockProvider>
  );
};

export const EditOwnerUpdateModal = () => {
  return (
    <ApolloAutoMockProvider mocks={mockSuccess}>
      <UpdateOwnerModal
        onClose={() => action('close')}
        defaultValues={undefined}
        updateOwner={async () => true}
        isEditModal={true}
        componentId={'testId'}
      />
    </ApolloAutoMockProvider>
  );
};
