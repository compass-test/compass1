import React, { useState, useEffect } from 'react';
import { Table } from './';
import { TextPlain } from '../text';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

function generateRow(prefix = '', columns = 1) {
  return {
    cells: Array.from({ length: columns }, (_, x) => {
      const description = `${prefix} column ${x}`;
      return {
        content: <TextPlain content={description} />,
      };
    }),
  };
}

function generateRows(columns = 1, rows = 1, prefix = 'Table') {
  return Array.from({ length: rows }, (_, y) => {
    return generateRow(`${prefix} row ${y}`, columns);
  });
}

export function Basic() {
  const head = generateRow('Table', 2);
  const rows = generateRows(2, 2);

  return <Table head={head} rows={rows} />;
}

export function Pagination() {
  const head = generateRow('Table', 2);
  const rows = generateRows(2, 25);

  return (
    <>
      <Table head={head} rows={rows} />
      <Table head={head} rows={rows} rowsPerPage={1} />
      <Table head={head} rows={rows} rowsPerPage={5} />
    </>
  );
}

function PaginationGrowingPrivate() {
  const head = generateRow('Table', 3);
  const [rows, setRows] = useState([] as any);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows([...rows, generateRow(`Generated row ${rows.length}`, 3)]);
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      <Table head={head} rows={rows} rowsPerPage={4} />
    </>
  );
}

// TODO: can be removed when we update to >=@storybook/react@v6.0.0-alpha.43
// see https://github.com/storybookjs/storybook/pull/7571
export const PaginationGrowing = () =>
  React.createElement(() => <PaginationGrowingPrivate />);

export function PaginationDisabled() {
  const head = generateRow('Table', 3);
  const rows = generateRows(3, 42);

  return <Table head={head} rows={rows} rowsPerPage={0} />;
}
