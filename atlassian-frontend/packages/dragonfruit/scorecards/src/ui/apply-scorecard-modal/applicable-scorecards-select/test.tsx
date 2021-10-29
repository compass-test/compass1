import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Field } from '@atlaskit/form';
import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardOption } from '../../../common/ui/types';

import {
  MOCK_COMPONENT_ID,
  MOCKED_APPLICABLE_SCORECARDS_EMPTY,
  MOCKED_APPLICABLE_SCORECARDS_WITH_DATA,
} from './mocks';

import { ApplicableScorecardsSelect } from './index';

const CLASSNAME_PREFIX = 'applicable-scorecards-select';

describe('ApplicableScorecardsSelect', () => {
  test('Should display ScorecardOptions if getComponentApplicableScorecards returns applicable scorecards', async () => {
    const { findByText } = render(
      <ApolloAutoMockProvider mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}>
        <CompassTestProvider>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    // TODO COMPASS-3228: assert text other than the scorecard name once ScorecardItem is used in the Select
    const scorecardOptionLabel = await findByText('Scorecard 1');
    const scorecardOptionLabel2 = await findByText('Scorecard 2');
    const scorecardOptionLabel3 = await findByText('Scorecard 3');

    expect(scorecardOptionLabel).toBeInTheDocument();
    expect(scorecardOptionLabel2).toBeInTheDocument();
    expect(scorecardOptionLabel3).toBeInTheDocument();
  });

  test('Should display no scorecards message if no applicable scorecards', async () => {
    const { findByText } = render(
      <ApolloAutoMockProvider mocks={MOCKED_APPLICABLE_SCORECARDS_EMPTY}>
        <CompassTestProvider>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const noScorecardsMessage = await findByText('No scorecards to display');
    expect(noScorecardsMessage).toBeInTheDocument();
  });

  test('Should display inline error message if error message is not null', async () => {
    const inlineErrorMessage = 'This scorecard was recently deleted.';

    const { findByText } = render(
      <ApolloAutoMockProvider mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}>
        <CompassTestProvider>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                inlineErrorMessage={inlineErrorMessage}
                {...fieldProps}
              />
            )}
          </Field>
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    const scorecardOptionLabel = await findByText(inlineErrorMessage);

    expect(scorecardOptionLabel).toBeInTheDocument();
  });

  test('Should display no scorecards message if there was an error querying applicable scorecards', async () => {
    const { findByText } = render(
      <ApolloNetworkErrorProvider>
        <CompassTestProvider>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </CompassTestProvider>
      </ApolloNetworkErrorProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const noScorecardsMessage = await findByText('No scorecards to display');
    expect(noScorecardsMessage).toBeInTheDocument();
  });

  test('Should display scorecard loading items when scorecards are loading', async () => {
    const { getAllByTestId } = render(
      <CompassTestProvider>
        <ApolloLoadingProvider>
          <Field<ScorecardOption> name="scorecard">
            {({ fieldProps }) => (
              <ApplicableScorecardsSelect
                componentId={MOCK_COMPONENT_ID}
                {...fieldProps}
              />
            )}
          </Field>
        </ApolloLoadingProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const scorecardLoadingItems = getAllByTestId(
      'dragonfruit-scorecard-loading-item',
    );
    expect(scorecardLoadingItems).not.toBeNull();
  });
});
