import React from 'react';

import { action } from '@storybook/addon-actions';
import { act, render, RenderResult, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import RemoveScorecardModal from './main';
import {
  mockRemoveScorecardFailureResolver,
  mockRemoveScorecardFailureWithPermissionDeniedResolver,
  mockRemoveScorecardScoreCardNotAppliedToComponentFailureResolver,
  mockRemoveScorecardSuccessResolver,
} from './mocks';

describe('RemoveScorecardModal', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('basics', () => {
    const testId = 'remove-scorecard-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <RemoveScorecardModal
              testId={testId}
              onCancel={() => action('cancel')}
              onClose={() => action('close')}
              componentId={'testComponentId'}
              scorecardId={'testScorecardId'}
              scorecardName={'testScorecardName'}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    test('should be found by testId', () => {
      expect(result.getByTestId(testId)).toBeInTheDocument();
    });

    test('should have the required title', () => {
      expect(result.getByText('Remove this scorecard')).toBeInTheDocument();
    });

    test('should have the required body', () => {
      expect(
        result.getByText(
          'Are you sure you want to remove this scorecard from this component?',
        ),
      ).toBeInTheDocument();
    });

    test('should have the cancel button', () => {
      expect(result.getByText('Cancel')).toBeInTheDocument();
    });

    test('should have the remove button', () => {
      expect(result.getByText('Remove')).toBeInTheDocument();
    });
  });

  describe('success', () => {
    const testId = 'remove-scorecard-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            resolvers={mockRemoveScorecardSuccessResolver}
          >
            <RemoveScorecardModal
              testId={testId}
              onCancel={() => action('cancel')}
              onClose={() => action('close')}
              componentId={'testComponentId'}
              scorecardId={'testScorecardId'}
              scorecardName={'testScorecardName'}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    it('should show success flag', async () => {
      const removeButton = result.getByTestId(
        'dragonfruit-scorecards.ui.remove-scorecard-modal.remove-button',
      );
      act(() => {
        userEvent.click(removeButton);
      });

      await wait(() => {
        const successFlag = result.getByTestId(
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-success-flag',
        );
        expect(successFlag).toBeInTheDocument();
      });
    });
  });

  describe('permission denied', () => {
    const testId = 'remove-scorecard-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            resolvers={mockRemoveScorecardFailureWithPermissionDeniedResolver}
          >
            <RemoveScorecardModal
              testId={testId}
              onCancel={() => action('cancel')}
              onClose={() => action('close')}
              componentId={'testComponentId'}
              scorecardId={'testScorecardId'}
              scorecardName={'testScorecardName'}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    it('should show generic failure flag', async () => {
      const removeButton = result.getByTestId(
        'dragonfruit-scorecards.ui.remove-scorecard-modal.remove-button',
      );
      act(() => {
        userEvent.click(removeButton);
      });

      await wait(() => {
        const failureFlag = result.getByTestId(
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-generic-error-flag',
        );
        expect(failureFlag).toBeInTheDocument();
      });
    });
  });

  // For the following scenarios:
  // 1. scorecard is no longer applied to component
  // 2. scorecard doesn't exist
  // 3. component doesn't exist
  // we show a fake success flag
  describe('scorecard not applied to component', () => {
    const testId = 'remove-scorecard-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            resolvers={
              mockRemoveScorecardScoreCardNotAppliedToComponentFailureResolver
            }
          >
            <RemoveScorecardModal
              testId={testId}
              onCancel={() => action('cancel')}
              onClose={() => action('close')}
              componentId={'testComponentId'}
              scorecardId={'testScorecardId'}
              scorecardName={'testScorecardName'}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    it('should show success flag', async () => {
      const removeButton = result.getByTestId(
        'dragonfruit-scorecards.ui.remove-scorecard-modal.remove-button',
      );
      act(() => {
        userEvent.click(removeButton);
      });

      await wait(() => {
        const failureFlag = result.getByTestId(
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-success-flag',
        );
        expect(failureFlag).toBeInTheDocument();
      });
    });
  });

  describe('failure', () => {
    const testId = 'remove-scorecard-modal';
    let result: RenderResult;

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider
            resolvers={mockRemoveScorecardFailureResolver}
          >
            <RemoveScorecardModal
              testId={testId}
              onCancel={() => action('cancel')}
              onClose={() => action('close')}
              componentId={'testComponentId'}
              scorecardId={'testScorecardId'}
              scorecardName={'testScorecardName'}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    it('should show failure flag', async () => {
      const removeButton = result.getByTestId(
        'dragonfruit-scorecards.ui.remove-scorecard-modal.remove-button',
      );
      act(() => {
        userEvent.click(removeButton);
      });

      await wait(() => {
        const failureFlag = result.getByTestId(
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-generic-error-flag',
        );
        expect(failureFlag).toBeInTheDocument();
      });
    });
  });
});
