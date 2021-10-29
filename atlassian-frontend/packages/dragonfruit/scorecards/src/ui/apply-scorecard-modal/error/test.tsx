import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { OnCloseHandler } from '@atlaskit/modal-dialog';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { mockOnClose } from './mocks';

import Error from './index';

describe('Error', () => {
  let result: RenderResult;

  describe('when testId provided', () => {
    const testId = 'fake-test-id';

    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <Error onClose={mockOnClose as OnCloseHandler} testId={testId} />
        </CompassTestProvider>,
      );
    });

    test('should be found by the provided testId', async () => {
      expect(result.getByTestId(testId)).toBeInTheDocument();
    });
  });
});
