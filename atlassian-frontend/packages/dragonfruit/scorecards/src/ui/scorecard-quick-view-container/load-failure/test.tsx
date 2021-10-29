import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import LoadFailure from './main';

describe('LoadFailure', () => {
  let result: RenderResult;
  const testId = 'fake-test-id';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <LoadFailure testId={testId} />
      </CompassTestProvider>,
    );
  });

  test('should be found by testId', async () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  test('should have the title', async () => {
    expect(result.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  test('should have the body', async () => {
    expect(
      result.getByText("Scorecards aren't loading, try refreshing the page."),
    ).toBeInTheDocument();
  });

  test('should have the load-failure image', async () => {
    expect(result.getByTestId('error-image')).toBeInTheDocument();
  });
});
