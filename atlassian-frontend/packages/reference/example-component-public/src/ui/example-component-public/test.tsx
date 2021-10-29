import React from 'react';

import { render } from '@testing-library/react';

import ExampleComponentPublic from './index';

describe('ExampleComponentPublic', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'example-component';
      const { getByTestId } = render(
        <ExampleComponentPublic
          label="Label"
          content="Content"
          testId={testId}
        />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
