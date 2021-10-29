import React from 'react';

import { DataGridCard } from '../src';

export default function DataGridCardExample() {
  return (
    <div style={{ width: 300, margin: '1% auto' }}>
      <DataGridCard
        items={[
          {
            label: 'Projects',
            value: '120 (340 issues, 798 MB)',
          },
          {
            label: 'Users',
            value: '543',
          },
        ]}
        title={'TITLE'}
      />
    </div>
  );
}
