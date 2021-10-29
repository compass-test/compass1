import React from 'react';

import { TableHeader, VerticalHeadingsTable } from '../src';

export default function TableHeaderExample() {
  return (
    <TableHeader
      title="Data migration"
      HeadingLevel="h5"
      rightHeaderContent="Estimated time: 3 hours"
      description="This migration contains the following"
    >
      <VerticalHeadingsTable
        rows={[
          {
            header: 'Header 1',
            content: 'Content 1',
          },
          {
            header: 'Header 2',
            content: <button>Hello</button>,
          },
        ]}
      />
    </TableHeader>
  );
}
