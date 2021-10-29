import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DeleteOwnerModal from './index';

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

export const DeleteOwnerModalOpen = () => {
  return (
    <ApolloAutoMockProvider mocks={mockSuccess}>
      <DeleteOwnerModal
        onCancel={() => action('close')}
        updateOwner={async () => true}
        componentId={'testId'}
      />
    </ApolloAutoMockProvider>
  );
};
