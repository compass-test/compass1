import React from 'react';

import { render } from '@testing-library/react';

import { PageTeamList } from './index';

describe('PageTeamList', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'page-team-list';
      const { getByTestId } = render(<PageTeamList testId={testId} />);
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
