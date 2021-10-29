import React from 'react';

import { render } from '@testing-library/react';

import ExampleComponentRestricted from './index';

describe('ExampleComponentRestricted', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'example-component';
      const { getByTestId } = render(
        <ExampleComponentRestricted
          label="Label"
          content="Content"
          testId={testId}
        />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
