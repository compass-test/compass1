import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  ANNOUNCEMENT_DELETE_MUTATION_SUCCESS_RESOLVER,
  MOCKED_COMPONENT,
} from '../../../../../../../common/mocks';

import { DeleteAnnouncementModal } from './main';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const DeleteModalSuccess = () => {
  return (
    <ApolloAutoMockProvider
      resolvers={() => ANNOUNCEMENT_DELETE_MUTATION_SUCCESS_RESOLVER()}
    >
      <DeleteAnnouncementModal
        announcementId="mock-announcement-id"
        component={MOCKED_COMPONENT}
        onSuccess={() => action('success')}
        onCancel={() => action('cancel')}
      />
    </ApolloAutoMockProvider>
  );
};
