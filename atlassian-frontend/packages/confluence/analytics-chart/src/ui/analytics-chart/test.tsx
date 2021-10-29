import React from 'react';

import { render } from '@testing-library/react';

import { AnalyticsChart } from './index';

describe('AnalyticsChart', () => {
  window.ResizeObserver = require('resize-observer-polyfill');

  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'analytics-chart';
      const date = 'Oct 10';
      const data = [{ label: date, value: 10 }];

      const { getByTestId } = render(<AnalyticsChart data={data} />);
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
