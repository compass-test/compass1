import React from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecentComponentsProvider } from '@atlassian/dragonfruit-component-create-modal';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CreateComponentForm } from './index';

describe('TeamCreateComponent', () => {
  const CLASS_NAME_PREFIX = 'dragonfruit-teams-component-type-select';

  enum Options {
    SERVICE,
    API,
    LIBRARY,
    OTHER,
  }

  const onCancel = jest.fn();
  const onSuccess = jest.fn();
  let mutationFn: jest.Mock;

  let cancelButton: HTMLElement;
  let submitButton: HTMLElement;
  let nameField: HTMLElement;

  describe('Checking Callbacks', () => {
    beforeEach(() => {
      const { getByTestId } = render(
        <RecentComponentsProvider>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <CreateComponentForm
                onCancel={onCancel}
                onSuccess={onSuccess}
                teamId="fake-team"
                formKey={1}
              />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </RecentComponentsProvider>,
      );

      cancelButton = getByTestId(
        'dragonfruit.teams.team-create-component.cancel-button',
      );
      submitButton = getByTestId(
        'dragonfruit.teams.team-create-component.submit-button',
      );
      nameField = getByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      );
    });

    it('selecting a component type and clicking submit invokes the onSuccess callback', () => {
      // Open dropdown menu
      const valueContainer = document.querySelector(
        `.${CLASS_NAME_PREFIX}__value-container`,
      );

      act(() => {
        userEvent.click(valueContainer!);
      });

      // Select the library option
      const allOptions = document.querySelectorAll(
        `.${CLASS_NAME_PREFIX}__option`,
      );

      const optionToSelect = allOptions[Options.LIBRARY];

      act(() => {
        userEvent.click(optionToSelect!);
      });

      expect(nameField).toBeInTheDocument();
      fireEvent.change(nameField, { target: { value: 'Component name' } });

      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);
      wait(() => expect(onSuccess).toHaveBeenCalledTimes(1));
    });

    it('clicking cancel invokes the onCancel callback', () => {
      expect(cancelButton).toBeInTheDocument();
      fireEvent.click(cancelButton);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sending create component mutation', () => {
    beforeEach(() => {
      mutationFn = jest.fn();
      const resolvers = () => ({
        Mutation: {
          compass: () => ({ createComponent: mutationFn }),
        },
      });
      const { getByTestId } = render(
        <RecentComponentsProvider>
          <CompassTestProvider>
            <ApolloAutoMockProvider resolvers={resolvers}>
              <CreateComponentForm
                onCancel={onCancel}
                onSuccess={onSuccess}
                teamId="fake-team"
                formKey={1}
              />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </RecentComponentsProvider>,
      );

      cancelButton = getByTestId(
        'dragonfruit.teams.team-create-component.cancel-button',
      );
      submitButton = getByTestId(
        'dragonfruit.teams.team-create-component.submit-button',
      );
      nameField = getByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      );
    });

    it('leaving default component type and entering name sends createComponent with Service and team Id', async () => {
      // Enter name
      fireEvent.change(nameField, { target: { value: 'Component name' } });
      // Submit form
      fireEvent.click(submitButton);

      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      const variables = mutationFn.mock.calls[0][0];

      expect(variables.input).toEqual({
        name: 'Component name',
        type: CompassComponentType.SERVICE,
        ownerId: 'fake-team',
      });
    });

    it('selecting a component type and clicking submit sends createComponent with correct type and team Id', async () => {
      // Open dropdown menu
      const valueContainer = document.querySelector(
        `.${CLASS_NAME_PREFIX}__value-container`,
      );

      act(() => {
        userEvent.click(valueContainer!);
      });

      // Select the library option
      const allOptions = document.querySelectorAll(
        `.${CLASS_NAME_PREFIX}__option`,
      );

      const optionToSelect = allOptions[Options.LIBRARY];

      act(() => {
        userEvent.click(optionToSelect!);
      });

      expect(nameField).toBeInTheDocument();
      fireEvent.change(nameField, { target: { value: 'Component name' } });

      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);

      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      const variables = mutationFn.mock.calls[0][0];

      expect(variables.input).toEqual({
        name: 'Component name',
        type: CompassComponentType.LIBRARY,
        ownerId: 'fake-team',
      });
    });
  });

  describe('Validations', () => {
    it('disables submit button if component name has been left blank', () => {
      const { getByTestId } = render(
        <RecentComponentsProvider>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <CreateComponentForm
                onCancel={onCancel}
                onSuccess={onSuccess}
                teamId="fake-team"
                formKey={1}
              />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </RecentComponentsProvider>,
      );

      submitButton = getByTestId(
        'dragonfruit.teams.team-create-component.submit-button',
      );

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('displays an error flag if the create component mutation is unsuccessful', async () => {
      const { getByTestId } = render(
        <RecentComponentsProvider>
          <CompassTestProvider>
            <ApolloNetworkErrorProvider>
              <CreateComponentForm
                onCancel={onCancel}
                onSuccess={onSuccess}
                teamId="fake-team"
                formKey={1}
              />
            </ApolloNetworkErrorProvider>
          </CompassTestProvider>
        </RecentComponentsProvider>,
      );

      submitButton = getByTestId(
        'dragonfruit.teams.team-create-component.submit-button',
      );
      nameField = getByTestId(
        'dragonfruit.teams.team-create-component.name-field',
      );

      expect(nameField).toBeInTheDocument();
      fireEvent.change(nameField, { target: { value: 'Component name' } });

      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);

      await wait(() => {
        const errorFlag = getByTestId(
          'dragonfruit.teams.team-create-component.create-component-form.error-flag',
        );
        expect(errorFlag).toBeInTheDocument;
      });
    });
  });
});
