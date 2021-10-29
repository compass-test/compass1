import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecentComponentsProvider } from '@atlassian/dragonfruit-component-create-modal';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCK_TEAM_ID, MOCKED_SEARCH_RESULTS } from './component-select/mocks';

import { TeamComponentPickerModal } from './index';

const CLASSNAME_PREFIX = 'team-component-picker-select';

describe('TeamComponentPickerModal', () => {
  const submitTestId =
    'dragonfruit-team-component-picker-modal.ui.submit-button';

  test('Should be found by data-testid', () => {
    const testId = 'dragonfruit-team-component-picker-modal';
    const { getByTestId, getByText } = render(
      <CompassTestProvider locale="en">
        <RecentComponentsProvider>
          <MockedProvider addTypename={false} mocks={[]}>
            <TeamComponentPickerModal
              onFormSubmit={jest.fn()}
              onClose={jest.fn()}
              ownerId={MOCK_TEAM_ID}
            />
          </MockedProvider>
        </RecentComponentsProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByText('Assign a component to this team')).toBeInTheDocument();
  });

  test('Submit button should be disabled when no selection has been made', () => {
    const testId = 'dragonfruit-team-component-picker-modal.ui.submit-button';
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <RecentComponentsProvider>
          <MockedProvider addTypename={false} mocks={[]}>
            <TeamComponentPickerModal
              onFormSubmit={jest.fn()}
              onClose={jest.fn()}
              ownerId={MOCK_TEAM_ID}
            />
          </MockedProvider>
        </RecentComponentsProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toBeDisabled();
  });

  test('Should be able to submit when a select a component with no owner', async () => {
    const confirmationModalTestId =
      'dragonfruit-team-owner-override-confirmation-modal';

    const submitFunction = jest.fn();

    const { getByTestId, findByText, queryByTestId } = render(
      <CompassTestProvider locale="en">
        <RecentComponentsProvider>
          <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
            <TeamComponentPickerModal
              onFormSubmit={submitFunction}
              onClose={jest.fn()}
              ownerId={MOCK_TEAM_ID}
            />
          </ApolloAutoMockProvider>
        </RecentComponentsProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    // Select a non-disabled option ownerId == null
    const optionToSelect = await findByText('noOwnerComponentName');

    expect(optionToSelect).toBeInTheDocument();
    act(() => {
      userEvent.click(optionToSelect!);
    });

    const submitButton = getByTestId(submitTestId);
    expect(submitButton).toBeInTheDocument();

    // Submit form
    act(() => {
      userEvent.click(submitButton);
    });

    const confirmationModal = queryByTestId(confirmationModalTestId);
    // confirmation modal should not show when component has no owner
    expect(confirmationModal).toBeNull();

    expect(submitFunction).toHaveBeenCalledTimes(1);
    expect(submitFunction).toHaveBeenCalledWith(
      '4cc042c8-99da-47ad-849e-5f8ebf574c32',
      'noOwnerComponentName',
      CompassComponentType.LIBRARY,
      'This is the component description.',
    );
  });

  test('Should open confirmation modal when submitted with a component with ownerId', async () => {
    const submitFunction = jest.fn();
    const { getByTestId, findByText } = render(
      <CompassTestProvider locale="en">
        <RecentComponentsProvider>
          <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
            <TeamComponentPickerModal
              onFormSubmit={submitFunction}
              onClose={jest.fn()}
              ownerId={MOCK_TEAM_ID}
            />
          </ApolloAutoMockProvider>
        </RecentComponentsProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    // Select a non-disabled option with ownerId != null
    const optionToSelect = await findByText('react');

    expect(optionToSelect).toBeInTheDocument();
    act(() => {
      userEvent.click(optionToSelect!);
    });

    const submitButton = getByTestId(submitTestId);
    expect(submitButton).toBeInTheDocument();

    // Submit form should show confirmation modal
    act(() => {
      userEvent.click(submitButton);
    });

    let confirmationModal = getByTestId(
      'dragonfruit-team-owner-override-confirmation-modal',
    );
    expect(confirmationModal).toBeInTheDocument();

    const saveButton = await findByText('Save');

    // Click saveButton on confirmation modal
    act(() => {
      userEvent.click(saveButton);
    });

    expect(submitFunction).toHaveBeenCalledTimes(1);
  });
});
