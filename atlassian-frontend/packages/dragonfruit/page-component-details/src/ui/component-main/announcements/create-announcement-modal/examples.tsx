import React from 'react';

import { action } from '@storybook/addon-actions';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  ANNOUNCEMENT_CREATE_MUTATION_SUCCESS_RESOLVER,
  MOCKED_COMPONENT,
} from '../../../../common/mocks';

import { CreateAnnouncementModal } from './index';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const CreateComponentModalSuccess = () => {
  return (
    <ApolloAutoMockProvider
      resolvers={() => ANNOUNCEMENT_CREATE_MUTATION_SUCCESS_RESOLVER()}
    >
      <CreateAnnouncementModal
        component={MOCKED_COMPONENT}
        onClose={() => action('close')}
        onSuccess={() => action('success')}
      />
    </ApolloAutoMockProvider>
  );
};

export const CreateComponentModalNetworkFailure = () => {
  return (
    <ApolloNetworkErrorProvider>
      <CreateAnnouncementModal
        component={MOCKED_COMPONENT}
        onClose={() => action('close')}
      />
    </ApolloNetworkErrorProvider>
  );
};
