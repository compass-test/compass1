import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Loading from './index';

describe('Loading', () => {
  let result: RenderResult;

  describe('when testId provided', () => {
    const testId = 'fake-test-id';

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <Loading testId={testId} />
        </CompassTestProvider>,
      );
    });

    test('should be found by the provided testId', async () => {
      expect(result.getByTestId(testId)).toBeInTheDocument();
    });
  });
});
