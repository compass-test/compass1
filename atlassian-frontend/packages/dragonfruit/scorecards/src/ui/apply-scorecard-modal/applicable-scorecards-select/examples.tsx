import React from 'react';

import { text } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { Field } from '@atlaskit/form';
import { gridSize } from '@atlaskit/theme/constants';
import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardOption } from '../../../common/ui/types';

import { ApplicableScorecardsSelect } from './main';
import {
  MOCK_COMPONENT_ID,
  MOCKED_APPLICABLE_SCORECARDS_EMPTY,
  MOCKED_APPLICABLE_SCORECARDS_WITH_DATA,
} from './mocks';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export const ApplicableScorecardsSelectMockDataExample = () => {
  return (
    <ApolloAutoMockProvider mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}>
      <CompassTestProvider>
        <Container>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export const ApplicableScorecardsSelectEmptyStateExample = () => {
  return (
    <ApolloAutoMockProvider mocks={MOCKED_APPLICABLE_SCORECARDS_EMPTY}>
      <CompassTestProvider>
        <Container>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};

export const ApplicableScorecardsSelectLoadingExample = () => {
  return (
    <CompassTestProvider>
      <ApolloLoadingProvider>
        <Container>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </Container>
      </ApolloLoadingProvider>
    </CompassTestProvider>
  );
};

export const ApplicableScorecardsSelectNetworkErrorExample = () => {
  return (
    <CompassTestProvider>
      <ApolloNetworkErrorProvider>
        <Container>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </Container>
      </ApolloNetworkErrorProvider>
    </CompassTestProvider>
  );
};

export const ApplicableScorecardsSelectInlineErrorExample = () => {
  let inlineErrorMessage: string | null = text(
    'message',
    'This scorecard was recently deleted.',
  );

  return (
    <ApolloAutoMockProvider mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}>
      <CompassTestProvider>
        <Container>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                inlineErrorMessage={inlineErrorMessage}
                {...fieldProps}
              />
            )}
          </Field>
        </Container>
      </CompassTestProvider>
    </ApolloAutoMockProvider>
  );
};
