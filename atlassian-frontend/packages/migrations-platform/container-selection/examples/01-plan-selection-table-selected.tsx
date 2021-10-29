import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import { PlanSelectionTable, PlansQuery, PlansResult } from '../src';

const allThePlans = [
  { id: 1, name: 'A', link: '/some-url/123' },
  { id: 2, name: 'E', link: '/some-url/123' },
  { id: 3, name: 'B', link: '/some-url/123' },
  { id: 4, name: 'I', link: '/some-url/123' },
  { id: 5, name: 'J', link: '/some-url/123' },
  { id: 6, name: 'K', link: '/some-url/123' },
  { id: 7, name: 'C', link: '/some-url/123' },
  { id: 8, name: 'W', link: '/some-url/123' },
  { id: 9, name: 'X', link: '/some-url/123' },
  { id: 10, name: 'S', link: '/some-url/123' },
  { id: 11, name: 'R', link: '/some-url/123' },
  { id: 12, name: 'N', link: '/some-url/123' },
  { id: 13, name: 'M', link: '/some-url/123' },
  { id: 14, name: 'D', link: '/some-url/123' },
  { id: 15, name: 'F', link: '/some-url/123' },
  { id: 16, name: 'G', link: '/some-url/123' },
  { id: 17, name: 'L', link: '/some-url/123' },
  { id: 18, name: 'H', link: '/some-url/123' },
  { id: 19, name: 'O', link: '/some-url/123' },
  { id: 20, name: 'P', link: '/some-url/123' },
  { id: 21, name: 'Q', link: '/some-url/123' },
  { id: 22, name: 'V', link: '/some-url/123' },
  { id: 23, name: 'T', link: '/some-url/123' },
  { id: 24, name: 'Z', link: '/some-url/123' },
  { id: 25, name: 'U', link: '/some-url/123' },
  { id: 26, name: 'Y', link: '/some-url/123' },
];

export default () => {
  const plansProvider = async (query: PlansQuery): Promise<PlansResult> => {
    const { offset, limit, sortKey, sortOrder } = query;
    if (offset == null || limit == null) {
      return {
        plans: allThePlans,
        totalNumberOfPlans: allThePlans.length,
      };
    }

    if (sortKey === 'NAME') {
      if (sortOrder === 'ASC') {
        allThePlans.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        allThePlans.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    return {
      plans: allThePlans.slice(offset, offset + limit),
      totalNumberOfPlans: allThePlans.length,
    };
  };

  const [selectedPlans, setSelectedPlans] = useState([
    allThePlans[0],
    allThePlans[1],
    allThePlans[2],
    allThePlans[3],
    allThePlans[4],
    allThePlans[5],
  ]);

  return (
    <IntlProvider locale="en">
      <PlanSelectionTable
        plansProvider={plansProvider}
        selectedPlans={selectedPlans}
        onSelectedPlansChanged={setSelectedPlans}
        onTotalCountChanged={action('handleTotalCountChanged')}
      />
    </IntlProvider>
  );
};
