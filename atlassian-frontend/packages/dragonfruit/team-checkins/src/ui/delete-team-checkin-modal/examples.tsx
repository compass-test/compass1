import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DeleteTeamCheckinModal from './main';
import { mockDeleteTeamCheckinSuccessResolver } from './mocks';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => {
      return <CompassTestProvider>{storyFn()}</CompassTestProvider>;
    },
  ],
};

export const DeleteTeamCheckinModalSuccess = () => {
  const testId = '1234';

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider resolvers={mockDeleteTeamCheckinSuccessResolver}>
        <DeleteTeamCheckinModal
          testId={testId}
          onCancel={() => action('cancel')}
          onSuccess={() => action('success')}
          teamCheckinId={'1234'}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export const DeleteTeamCheckinModalFailure = () => {
  const testId = '1234';

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <DeleteTeamCheckinModal
          testId={testId}
          onCancel={() => action('cancel')}
          onSuccess={() => action('success')}
          teamCheckinId={'1234'}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};
