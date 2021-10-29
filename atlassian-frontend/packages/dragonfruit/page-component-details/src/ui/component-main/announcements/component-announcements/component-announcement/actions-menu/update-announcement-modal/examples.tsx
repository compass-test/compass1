import React from 'react';

import { action } from '@storybook/addon-actions';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  ANNOUNCEMENT_CREATE_MUTATION_SUCCESS_RESOLVER,
  MOCKED_ANNOUNCEMENTS,
  MOCKED_COMPONENT,
} from '../../../../../../../common/mocks';

import { UpdateAnnouncementModal } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const UpdateComponentModalSuccess = () => {
  return (
    <ApolloAutoMockProvider
      resolvers={() => ANNOUNCEMENT_CREATE_MUTATION_SUCCESS_RESOLVER()}
    >
      <UpdateAnnouncementModal
        component={MOCKED_COMPONENT}
        announcement={MOCKED_ANNOUNCEMENTS[0]}
        onClose={() => action('close')}
        onSuccess={() => action('success')}
      />
    </ApolloAutoMockProvider>
  );
};

export const UpdateComponentModalNetworkFailure = () => {
  return (
    <ApolloNetworkErrorProvider>
      <UpdateAnnouncementModal
        component={MOCKED_COMPONENT}
        announcement={MOCKED_ANNOUNCEMENTS[0]}
        onClose={() => action('close')}
      />
    </ApolloNetworkErrorProvider>
  );
};
