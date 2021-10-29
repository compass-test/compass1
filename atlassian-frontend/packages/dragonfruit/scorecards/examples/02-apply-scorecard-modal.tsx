import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ApplyScorecardModal } from '../src';
import { MOCKED_APPLICABLE_SCORECARDS_WITH_DATA } from '../src/ui/apply-scorecard-modal/applicable-scorecards-select/mocks';
import { mockApplyScorecardSuccessResolver } from '../src/ui/apply-scorecard-modal/mocks';

export default function ApplyScorecardModalSuccess() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider
        mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
        resolvers={mockApplyScorecardSuccessResolver}
      >
        <ApplyScorecardModal
          testId="apply-scorecard-modal-test-id"
          componentId="fake-component-id"
          onCancel={() => {}}
          onClose={() => {}}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
