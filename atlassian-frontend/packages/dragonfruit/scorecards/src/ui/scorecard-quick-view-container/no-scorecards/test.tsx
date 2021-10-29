import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import NoScorecards from './main';

describe('NoScorecards', () => {
  let result: RenderResult;
  const testId = 'fake-test-id';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <NoScorecards testId={testId} />
      </CompassTestProvider>,
    );
  });

  test('should be found by testId', async () => {
    expect(result.getByTestId(testId)).toBeTruthy();
  });

  test('should have the title', async () => {
    expect(result.getByText('Get started with scorecards')).toBeTruthy();
  });

  test('should have the body', async () => {
    expect(
      result.getByText(
        'Build and run components with scorecards to guide you.',
      ),
    ).toBeTruthy();
  });

  test('should have the callToActionText', async () => {
    expect(result.getByText('Create scorecard')).toBeTruthy();
  });
});
