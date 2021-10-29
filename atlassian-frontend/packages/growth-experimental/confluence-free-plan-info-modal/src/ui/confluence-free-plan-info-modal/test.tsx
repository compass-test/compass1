import React from 'react';

import { render } from '@testing-library/react';

import ConfluenceFreePlanInfoModal from './index';

describe('ConfluenceFreePlanInfoModal', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'confluence-free-plan-info-modal';
      const mockFunc = () => {};
      const { getByTestId } = render(
        <ConfluenceFreePlanInfoModal
          isOpen
          onClose={mockFunc}
          onPrimaryActionClick={mockFunc}
          onSecondaryActionClick={mockFunc}
        />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
