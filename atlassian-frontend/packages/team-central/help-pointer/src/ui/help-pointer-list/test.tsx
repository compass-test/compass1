import React from 'react';

import { render } from '@testing-library/react';

import { HelpPointerType } from '../../types';

import HelpPointerList from './index';

const SAMPLE_HELP_POINTER = [
  {
    link: 'link',
    name: 'name',
    type: HelpPointerType.Information,
    pointerId: 'help-pointer-id',
    cloudId: 'test-cloud-id',
  },
];

describe('HelpPointerList', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'help-pointer-list';
      const { getByTestId } = render(
        <HelpPointerList
          testId={testId}
          helpPointers={SAMPLE_HELP_POINTER}
          emojiProvider={Promise.reject()}
        />,
      );
      expect(getByTestId(testId)).toBeTruthy(); // The list
      expect(getByTestId(`${testId}-name`)).toBeTruthy(); // The card inside the list above
    });
  });
});
