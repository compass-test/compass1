import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Field } from '@atlaskit/form';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  fetchMockGet,
} from '@atlassian/dragonfruit-testing';

import { ComponentOption } from '../../../../controllers/components-add-team-owner';

import {
  MOCK_TEAM_ID,
  MOCKED_SEARCH_RESULTS,
  MOCKED_SEARCH_RESULTS_EMPTY,
  MOCKED_TEAM_REQUEST,
  MOCKED_TEAM_REQUEST_ERROR,
} from './mocks';

import { ComponentSelect } from './index';

const CLASSNAME_PREFIX = 'team-component-picker-select';

describe('TeamComponentPickerModal', () => {
  test('Should display no options message if no matching components', async () => {
    const { findByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS_EMPTY}>
          <Field<ComponentOption> name="component">
            {({ fieldProps }) => (
              <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
            )}
          </Field>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const noOptionsMessage = await findByText('No matches found');
    expect(noOptionsMessage).toBeInTheDocument();
  });

  test('Should display error message if searchComponents returns error', async () => {
    const { findByText } = render(
      <CompassTestProvider>
        <ApolloNetworkErrorProvider>
          <Field<ComponentOption> name="component">
            {({ fieldProps }) => (
              <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
            )}
          </Field>
        </ApolloNetworkErrorProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const noOptionsMessage = await findByText(
      "We couldn't load the component list.",
    );
    expect(noOptionsMessage).toBeInTheDocument();
  });

  test('Should display ComponentOptions if searchComponents returns matching components', async () => {
    fetchMockGet(MOCKED_TEAM_REQUEST);

    const { findByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
          <Field<ComponentOption> name="component">
            {({ fieldProps }) => (
              <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
            )}
          </Field>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const searchApiComponent = await findByText('searchApi');
    expect(searchApiComponent).toBeInTheDocument();

    const noOwnerComponent = await findByText('No owner');
    expect(noOwnerComponent).toBeInTheDocument();
  });

  test('Should display placeholder in options if error occurs fetching team info', async () => {
    fetchMockGet(MOCKED_TEAM_REQUEST_ERROR);

    const { findAllByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
          <Field<ComponentOption> name="component">
            {({ fieldProps }) => (
              <ComponentSelect ownerId={MOCK_TEAM_ID} {...fieldProps} />
            )}
          </Field>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    // Open dropdown menu
    const dropdownContainer = document.querySelector(
      `.${CLASSNAME_PREFIX}__value-container`,
    );

    act(() => {
      userEvent.click(dropdownContainer!);
    });

    const searchApiComponent = await findAllByTestId(
      'team-component-picker-modal-option-placeholder',
    );

    // One mock has no owner, should not show placeholder.
    expect(searchApiComponent).toHaveLength(3);
  });
});
