import React from 'react';

import { act, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('ApplyScorecardModal', () => {
  const CLASSNAME_PREFIX = 'applicable-scorecards-select';
  const testId = 'dragonfruit-scorecards.apply-scorecard-modal';
  const selectTestId = 'dragonfruit-apply-scorecard-modal.ui.scorecards-select';
  const submitButtonTestId =
    'dragonfruit-apply-scorecard-modal.ui.submit-button';

  test('should disable apply button if no scorecard is selected', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ApplyScorecardModal
            testId={testId}
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(selectTestId)).toBeInTheDocument();

    const submitButton = getByTestId(submitButtonTestId);

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('should show success flag if mutation succeeded', async () => {
    const { getByTestId, findByText } = render(
      <ApolloAutoMockProvider
        mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
        resolvers={mockApplyScorecardSuccessResolver}
      >
        <CompassTestProvider>
          <ApplyScorecardModal
            testId={testId}
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
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

    // Select a scorecard option
    const optionToSelect = await findByText(`Scorecard 1`);
    expect(optionToSelect).toBeInTheDocument();
    act(() => {
      userEvent.click(optionToSelect!);
    });

    // Click submit button
    const submitButton = getByTestId(
      'dragonfruit-apply-scorecard-modal.ui.submit-button',
    );
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    act(() => {
      userEvent.click(submitButton!);
    });

    await wait(() => {
      const successFlag = getByTestId(
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag',
      );
      expect(successFlag).toBeInTheDocument();
    });
  });

  test('should show inline error if scorecard is not applicable', async () => {
    const { getByTestId, findByText } = render(
      <ApolloAutoMockProvider
        mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
        resolvers={mockApplyScorecardNotApplicableResolver}
      >
        <CompassTestProvider>
          <ApplyScorecardModal
            testId="storybook"
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
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

    // Select a scorecard option
    const optionToSelect = await findByText(`Scorecard 1`);
    expect(optionToSelect).toBeInTheDocument();
    act(() => {
      userEvent.click(optionToSelect!);
    });

    // Click submit button
    const submitButton = getByTestId(
      'dragonfruit-apply-scorecard-modal.ui.submit-button',
    );
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    act(() => {
      userEvent.click(submitButton!);
    });

    await wait(() => {
      const inlineError = getByTestId(
        'dragonfruit-apply-scorecard-modal.ui.scorecards-select-error',
      );
      expect(inlineError).toBeInTheDocument();
    });
  });

  test('should show success flag if mutation failed with SCORECARD_ALREADY_APPLIED_TO_COMPONENT error', async () => {
    const { getByTestId, findByText } = render(
      <ApolloAutoMockProvider
        mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
        resolvers={mockApplyScorecardAlreadyAppliedResolver}
      >
        <CompassTestProvider>
          <ApplyScorecardModal
            testId={testId}
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
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

    // Select a scorecard option
    const optionToSelect = await findByText(`Scorecard 1`);
    expect(optionToSelect).toBeInTheDocument();
    act(() => {
      userEvent.click(optionToSelect!);
    });

    // Click submit button
    const submitButton = getByTestId(
      'dragonfruit-apply-scorecard-modal.ui.submit-button',
    );
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    act(() => {
      userEvent.click(submitButton!);
    });

    await wait(() => {
      const successFlag = getByTestId(
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag',
      );
      expect(successFlag).toBeInTheDocument();
    });
  });

  test('should show failure flag if mutation failed with server error', async () => {
    const { getByTestId, findByText } = render(
      <ApolloAutoMockProvider
        mocks={MOCKED_APPLICABLE_SCORECARDS_WITH_DATA}
        resolvers={mockApplyScorecardServerErrorResolver}
      >
        <CompassTestProvider>
          <ApplyScorecardModal
            testId={testId}
            componentId={MOCK_COMPONENT_ID}
            onCancel={() => {}}
            onClose={() => {}}
          />
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

    // Select a scorecard option
    const optionToSelect = await findByText(`Scorecard 1`);
    expect(optionToSelect).toBeInTheDocument();
    act(() => {
      userEvent.click(optionToSelect!);
    });

    // Click submit button
    const submitButton = getByTestId(
      'dragonfruit-apply-scorecard-modal.ui.submit-button',
    );
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    act(() => {
      userEvent.click(submitButton!);
    });

    await wait(() => {
      const successFlag = getByTestId(
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-failure-flag',
      );
      expect(successFlag).toBeInTheDocument();
    });
  });
});
