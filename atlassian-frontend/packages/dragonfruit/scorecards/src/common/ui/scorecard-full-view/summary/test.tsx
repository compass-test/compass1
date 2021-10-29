import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  mockProgress,
  mockScorecardDescription,
  mockScorecardName,
} from './mocks';

import Summary from './index';

describe('Summary', () => {
  let result: RenderResult;

  const testId = 'scorecard-full-view-summary';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <Summary
          scorecardName={mockScorecardName}
          scorecardDescription={mockScorecardDescription}
          progress={mockProgress}
          testId={testId}
        />
      </CompassTestProvider>,
    );
  });

  test('should be found by testId', async () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  test('should have scorecard title', async () => {
    expect(
      result.getByTestId('scorecard-full-view-summary-scorecard-name'),
    ).toBeInTheDocument();
  });

  test('should have scorecard description', async () => {
    expect(
      result.getByTestId('scorecard-full-view-summary-scorecard-description'),
    ).toBeInTheDocument();
  });

  test('should have progress', async () => {
    expect(
      result.getByTestId('scorecard-full-view-summary-scorecard-progress'),
    ).toBeInTheDocument();
  });
});
