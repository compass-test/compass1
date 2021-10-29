import React from 'react';

import { render } from '@testing-library/react';

import DataGridCard from './index';

const TITLE = 'ABOUT THIS SITE';
const GRID_ITEMS = [
  {
    label: 'Projects',
    value: '120 (340 issues, 798 MB)',
  },
  {
    label: 'Users',
    value: '543',
  },
  {
    label: 'Groups',
    value: '12',
  },
  {
    label: 'Plan',
    value: 'Premium',
  },
];

describe('<DataGridCard />', () => {
  it('should renders table with items', () => {
    const { getByText, queryByText } = render(
      <DataGridCard items={GRID_ITEMS} title={TITLE} />,
    );

    expect(getByText('Plan')).toBeInTheDocument();
    expect(getByText('Premium')).toBeInTheDocument();
    expect(getByText('Groups')).toBeInTheDocument();
    expect(getByText('Users')).toBeInTheDocument();
    expect(getByText('Projects')).toBeInTheDocument();
    expect(queryByText('120 (340 issues, 798 MB)')).toBeInTheDocument();
  });
});
