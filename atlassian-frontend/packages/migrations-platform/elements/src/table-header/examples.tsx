import React from 'react';

import { VerticalHeadingsTable } from '../vertical-headings-table';

import TableHeader from './main';

export const TableHeaderBasic = () => {
  return (
    <TableHeader
      title="Data migration"
      rightHeaderContent={<>Estimated time: 3 hours</>}
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
};
