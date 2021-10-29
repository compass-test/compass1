import React from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  MOCK_CLOUD_ID,
  MOCK_ORG_ID,
} from '@atlassian/dragonfruit-testing';
import { mockCreateTeam, resetFetchMock } from '@atlassian/ptc-test-utils';

import { CreateComponentModal } from './index';

describe('CreateComponentModal', () => {
  describe('Modal selectors', () => {
    test('Should be found by data-testid', async () => {
      const createComponentModalTestId = 'create-component';
      const createComponentFormModalTestId = 'create-component-form-modal';

      const { getByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <CreateComponentModal testId={createComponentModalTestId} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(getByTestId(createComponentModalTestId)).toBeInTheDocument();
      expect(getByTestId(createComponentFormModalTestId)).toBeInTheDocument();
    });
  });

  describe('Creating team', () => {
    afterEach(() => {
      resetFetchMock();
    });
    test('Should autofill team and previous inputs in component form after successful team creation', async () => {
      const createComponentFormModalTestId = 'create-component-form-modal';
      const createTeamButtonTestId =
        'create-component-form-modal-component-form-create-team-button';
      mockCreateTeam(MOCK_CLOUD_ID, 'jira', 0, MOCK_ORG_ID);

      const mutationFn = jest.fn();

      // By supplying a mock function as a resolver, we've effectively stopped
      // execution at this step. As a result, we can't expect onSuccess to be
      // called unless we provided a proper implementation within mutationFn.
      const resolvers = () => ({
        Mutation: { compass: () => ({ createComponent: mutationFn }) },
      });

      const {
        getByTestId,
        getByLabelText,
        getByText,
        getAllByLabelText,
        findByTestId,
      } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider resolvers={resolvers}>
            <CreateComponentModal />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      act(() => {
        // Set Component Name
        fireEvent.change(getByLabelText(/Name/i), {
          target: { value: 'Component Name' },
        });
      });

      // Set component type from select
      fireEvent.keyDown(getAllByLabelText(/Type/i)[0], { keyCode: 40 });
      const optionElement = getByText('Application');

      act(() => {
        fireEvent.click(optionElement);

        // Click create team
        fireEvent.click(getByTestId(createTeamButtonTestId));
      });

      // Enter team name
      fireEvent.change(getByTestId('team-name-input'), {
        target: { value: 'Team Name' },
      });

      // Create team
      act(() => {
        fireEvent.click(getByText('Start team'));
      });

      const createComponentForm = await findByTestId(
        createComponentFormModalTestId,
      );
      expect(createComponentForm).toBeInTheDocument();

      // Submit the component create form
      act(() => {
        fireEvent.click(
          getByTestId('dragonfruit-create-component-modal.ui.submit-button'),
        );
      });
      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      const variables = mutationFn.mock.calls[0][0];

      expect(variables.input).toEqual({
        name: 'Component Name',
        type: CompassComponentType.APPLICATION,
        ownerId: 'ari:cloud:teams::team/76bec70a-8768-4b2b-b28f-6dfff8538f89',
      });
    });
  });
});
