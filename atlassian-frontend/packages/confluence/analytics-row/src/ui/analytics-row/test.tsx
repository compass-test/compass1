import React from 'react';

import { render } from '@testing-library/react';
import { Chance } from 'chance';

import { AnalyticsRowContent } from './types';

import AnalyticsRows from './index';

const chance = new Chance();
const testId = 'analytics-row';

function generateRandomPerson() {
  const editMetric = {
    singular: 'edit',
    plural: 'edits',
  };

  return {
    name: chance.string(),
    value: chance.integer(),
    url: '#',
    metric: editMetric,
    key: chance.string(),
    onClick: jest.fn(),
  };
}

describe('AnalyticsRow', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const editMetric = {
        singular: 'edit',
        plural: 'edits',
      };

      const person: AnalyticsRowContent = {
        name: 'Chaki Caronni',
        value: 10402,
        iconUrl: '#',
        metric: editMetric,
        key: '1',
      };

      const { getByTestId } = render(
        <AnalyticsRows content={[person]} testId={testId} />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
  describe('AnalyticsRow', () => {
    const p1 = generateRandomPerson();
    const p2 = generateRandomPerson();
    const p3 = generateRandomPerson();
    const p4 = generateRandomPerson();
    const p5 = generateRandomPerson();
    const maxRows = 4;
    const analyticsRowTestid = 'analytics-row-link';

    it('Should accept fewer than N rows', () => {
      const lessThanFour = [p1, p2, p3];
      const { getAllByTestId } = render(
        <AnalyticsRows
          content={lessThanFour}
          maxRows={maxRows}
          testId={testId}
        />,
      );
      expect(getAllByTestId(analyticsRowTestid)).toHaveLength(3);
    });

    it('Should not have more than N rows', () => {
      const moreThanFour = [p1, p2, p3, p4, p5];

      const { getAllByTestId } = render(
        <AnalyticsRows
          content={moreThanFour}
          maxRows={maxRows}
          testId={testId}
        />,
      );
      expect(getAllByTestId(analyticsRowTestid)).toHaveLength(4);
    });
  });
});
