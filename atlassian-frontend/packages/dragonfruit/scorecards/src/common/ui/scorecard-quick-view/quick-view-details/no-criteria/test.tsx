import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import NoCriteria from './main';

describe('NoCriteria', () => {
  let result: RenderResult;

  const testId = 'fake-test-id';

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <NoCriteria testId={testId} />
      </CompassTestProvider>,
    );
  });

  test('should be found by testId', async () => {
    expect(result.getByTestId(testId)).toBeInTheDocument();
  });

  test('should have the title', async () => {
    expect(result.getByText('No criteria to display')).toBeInTheDocument();
  });

  test('should have the load-failure image', async () => {
    expect(result.getByTestId('error-image')).toBeInTheDocument();
  });

  test('should have the body', async () => {
    expect(result.getByText('Reload to try again.')).toBeInTheDocument();
  });

  test('should have the callToActionText', async () => {
    const reloadButton = result.getByTestId(
      'dragonfruit-scorecards.ui.scorecard-quick-view.quick-view-details.no-criteria.callToAction-button',
    );

    expect(reloadButton.innerText).toEqual('Reload');
  });
});
