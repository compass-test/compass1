import React from 'react';

import { action } from '@storybook/addon-actions';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import RemoveScorecardModal from '../src/ui/remove-scorecard-modal/main';
import { mockRemoveScorecardSuccessResolver } from '../src/ui/remove-scorecard-modal/mocks';

export default function RemoveScorecardFromComponentModa() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider resolvers={mockRemoveScorecardSuccessResolver}>
        <RemoveScorecardModal
          onCancel={() => action('cancel')}
          onClose={() => action('close')}
          componentId={'testComponentId'}
          scorecardId={'testScorecardId'}
          scorecardName={'testScorecardName'}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
