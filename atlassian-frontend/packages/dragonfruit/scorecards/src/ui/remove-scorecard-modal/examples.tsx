import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import RemoveScorecardModal from './main';
import {
  mockRemoveScorecardFailureResolver,
  mockRemoveScorecardFailureWithPermissionDeniedResolver,
  mockRemoveScorecardScoreCardNotAppliedToComponentFailureResolver,
  mockRemoveScorecardSuccessResolver,
} from './mocks';

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => {
      return <CompassTestProvider>{storyFn()}</CompassTestProvider>;
    },
  ],
};

export const RemoveScorecardModalSuccess = () => {
  return (
    <ApolloAutoMockProvider resolvers={mockRemoveScorecardSuccessResolver}>
      <RemoveScorecardModal
        onCancel={() => action('cancel')}
        onClose={() => action('close')}
        componentId={'testComponentId'}
        scorecardId={'testScorecardId'}
        scorecardName={'testScorecardName'}
      />
    </ApolloAutoMockProvider>
  );
};

export const RemoveScorecardModalPermissionDeniedFailure = () => {
  return (
    <ApolloAutoMockProvider
      resolvers={mockRemoveScorecardFailureWithPermissionDeniedResolver}
    >
      <RemoveScorecardModal
        onCancel={() => action('cancel')}
        onClose={() => action('close')}
        componentId={'testComponentId'}
        scorecardId={'testScorecardId'}
        scorecardName={'testScorecardName'}
      />
    </ApolloAutoMockProvider>
  );
};

export const RemoveScorecardModalScoreCardNotAppliedToComponentFailure = () => {
  return (
    <ApolloAutoMockProvider
      resolvers={
        mockRemoveScorecardScoreCardNotAppliedToComponentFailureResolver
      }
    >
      <RemoveScorecardModal
        onCancel={() => action('cancel')}
        onClose={() => action('close')}
        componentId={'testComponentId'}
        scorecardId={'testScorecardId'}
        scorecardName={'testScorecardName'}
      />
    </ApolloAutoMockProvider>
  );
};

export const RemoveScorecardModalFailure = () => {
  return (
    <ApolloAutoMockProvider resolvers={mockRemoveScorecardFailureResolver}>
      <RemoveScorecardModal
        onCancel={() => action('cancel')}
        onClose={() => action('close')}
        componentId={'testComponentId'}
        scorecardId={'testScorecardId'}
        scorecardName={'testScorecardName'}
      />
    </ApolloAutoMockProvider>
  );
};
