import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { Chart, ChartTypes } from '../../index';

import exampleDoc from './__fixtures__/example-doc.json';

describe('Charts', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'charts';
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <Chart
            testId={testId}
            chartType={ChartTypes.LINE}
            data={exampleDoc.content[0]}
          />
        </IntlProvider>,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
