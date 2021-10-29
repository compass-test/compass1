import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { Chance } from 'chance';
import { IntlProvider } from 'react-intl';

import AnalyticsCard, { AvatarCardBody } from './index';

const chance = new Chance();
const testId = 'analytics-card';

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

const noDataDetails = {
  verb: 'edited',
  noun: 'pages',
};

const href = '#';

describe('AnalyticsCard', () => {
  describe('testId property', () => {
    it('Should be found by data-testid', async () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <AnalyticsCard title={'title-test'} href={href} onClick={onClick}>
            <AvatarCardBody content={[]} noDataDetails={noDataDetails} />
          </AnalyticsCard>
        </IntlProvider>,
      );
      expect(getByTestId(testId)).toBeInTheDocument();
    });
  });

  describe('Card properties', () => {
    const p1 = generateRandomPerson();
    const p2 = generateRandomPerson();
    const p3 = generateRandomPerson();
    const p4 = generateRandomPerson();
    const p5 = generateRandomPerson();

    const analyticsRowTestid = 'analytics-row-link';

    it('Should accept fewer than 4 rows', () => {
      const onClick = jest.fn();
      const lessThanFour = [p1, p2, p3];

      const { getAllByTestId } = render(
        <IntlProvider locale="en">
          <AnalyticsCard title={'lessThanFour'} href={href} onClick={onClick}>
            <AvatarCardBody
              testId={testId}
              content={lessThanFour}
              noDataDetails={noDataDetails}
              maxRows={4}
            />
          </AnalyticsCard>
        </IntlProvider>,
      );
      expect(getAllByTestId(analyticsRowTestid)).toHaveLength(3);
    });

    it('Should not have more than 4 rows', () => {
      const onClick = jest.fn();
      const moreThanFour = [p1, p2, p3, p4, p5];

      const { getAllByTestId } = render(
        <IntlProvider locale="en">
          <AnalyticsCard title={'moreThanFour'} href={href} onClick={onClick}>
            <AvatarCardBody
              testId={testId}
              content={moreThanFour}
              noDataDetails={noDataDetails}
              maxRows={4}
            />
          </AnalyticsCard>
        </IntlProvider>,
      );
      expect(getAllByTestId(analyticsRowTestid)).toHaveLength(4);
    });

    it('Should display text notifying user that there is no data to be displayed', () => {
      const onClick = jest.fn();
      const noDataMessage = 'No pages edited within the selected time frame';

      const { getByText } = render(
        <IntlProvider locale="en">
          <AnalyticsCard title={'Analytics Card'} href={href} onClick={onClick}>
            <AvatarCardBody content={[]} noDataDetails={noDataDetails} />
          </AnalyticsCard>
        </IntlProvider>,
      );
      expect(getByText(noDataMessage)).toBeInTheDocument();
    });

    it('should call onClick when view all button has been clicked', async () => {
      const onClick = jest.fn();

      const { getByText } = render(
        <IntlProvider locale="en">
          <AnalyticsCard title={'Analytics Card'} href={href} onClick={onClick}>
            <AvatarCardBody content={[]} noDataDetails={noDataDetails} />
          </AnalyticsCard>
        </IntlProvider>,
      );

      fireEvent.click(getByText('View all'));

      expect(onClick).toHaveBeenCalled();
    });
  });
});
