import React from 'react';

import { render } from '@testing-library/react';

import TEMPLATE_COMPONENT_NAME from './index';

describe('TEMPLATE_COMPONENT_NAME', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'TEMPLATE_TEST_ID';
      const { getByTestId } = render(
        <TEMPLATE_COMPONENT_NAME testId={testId} />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
