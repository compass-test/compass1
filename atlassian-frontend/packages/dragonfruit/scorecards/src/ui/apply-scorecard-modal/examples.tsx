import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCKED_APPLICABLE_SCORECARDS_WITH_DATA } from './applicable-scorecards-select/mocks';
import {
  MOCK_COMPONENT_ID,
  mockApplyScorecardAlreadyAppliedResolver,
  mockApplyScorecardNotApplicableResolver,
  mockApplyScorecardServerErrorResolver,
  mockApplyScorecardSuccessResolver,
} from './mocks';

import { ApplyScorecardModal } from './index';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export const ApplyScorecardModalSuccessExample = () => {
  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
      resolvers={mockApplyScorecardSuccessResolver}
    >
      <CompassTestProvider>
        <Container>
          <ApplyScorecardModal
            testId="storybook"
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export const ApplyScorecardModalNotApplicableExample = () => {
  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
      resolvers={mockApplyScorecardNotApplicableResolver}
    >
      <CompassTestProvider>
        <Container>
          <ApplyScorecardModal
            testId="storybook"
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export const ApplyScorecardModalAlreadyAppliedFakeSuccessExample = () => {
  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
      resolvers={mockApplyScorecardAlreadyAppliedResolver}
    >
      <CompassTestProvider>
        <Container>
          <ApplyScorecardModal
            testId="storybook"
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export const ApplyScorecardModalServerErrorExample = () => {
  return (
    <ApolloAutoMockProvider
      mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
      resolvers={mockApplyScorecardServerErrorResolver}
    >
      <CompassTestProvider>
        <Container>
          <ApplyScorecardModal
            testId="storybook"
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};
