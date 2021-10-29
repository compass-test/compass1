import React from 'react';

import { render } from '@testing-library/react';

import { HelpPointerType } from '../../types';

import HelpPointerCard from './index';

describe('HelpPointerCard', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'help-pointer-card';
      const { getByTestId } = render(
        <HelpPointerCard
          testId={testId}
          link="link"
          name="name"
          type={HelpPointerType.Information}
          pointerId="help-pointer-id"
          cloudId="test-cloud-id"
        />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
