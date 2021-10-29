import React from 'react';

import { act, render, RenderResult, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DeleteTeamCheckinModal from './main';
import { mockDeleteTeamCheckinSuccessResolver } from './mocks';

describe('DeleteTeamCheckinModal', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('basics', () => {
    const testId = 'delete-team-checkin-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <DeleteTeamCheckinModal testId={testId} teamCheckinId={'1234'} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    test('should be found by testId', () => {
      expect(result.getByTestId(testId)).toBeInTheDocument();
    });

    test('should have the required title', () => {
      expect(
        result.getByText('Are you sure you want to delete this check-in?'),
      ).toBeInTheDocument();
    });

    test('should have the required body', () => {
      expect(
        result.getByText(
          "You will lose the information for this week's check-in",
        ),
      ).toBeInTheDocument();
    });

    test('should have the cancel button', () => {
      expect(result.getByText('Cancel')).toBeInTheDocument();
    });

    test('should have the remove button', () => {
      expect(result.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('success', () => {
    const testId = 'delete-team-checkin-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            resolvers={mockDeleteTeamCheckinSuccessResolver}
          >
            <DeleteTeamCheckinModal testId={testId} teamCheckinId={'1234'} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    it('should show success flag', async () => {
      const deleteButton = result.getByTestId(
        'dragonfruit-team-checkins.ui.delete-team-checkin-modal.delete-button',
      );
      act(() => {
        userEvent.click(deleteButton);
      });

      await wait(() => {
        const successFlag = result.getByTestId(
          'dragonfruit-team-checkins.ui.delete-team-checkin-modal.flags.delete-team-checkin-success-flag',
        );
        expect(successFlag).toBeInTheDocument();
      });
    });
  });

  describe('failure', () => {
    const testId = 'delete-team-checkin-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <DeleteTeamCheckinModal testId={testId} teamCheckinId={'1234'} />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>,
      );
    });

    it('should show failure flag', async () => {
      const deleteButton = result.getByTestId(
        'dragonfruit-team-checkins.ui.delete-team-checkin-modal.delete-button',
      );
      act(() => {
        userEvent.click(deleteButton);
      });

      await wait(() => {
        const failureFlag = result.getByTestId(
          'dragonfruit-team-checkins.ui.delete-team-checkin-modal.flags.delete-team-checkin-generic-error-flag',
        );
        expect(failureFlag).toBeInTheDocument();
      });
    });
  });
});
