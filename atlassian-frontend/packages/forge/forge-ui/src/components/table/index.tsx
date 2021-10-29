/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode, useState } from 'react';
import { ForgeDoc, Rendered, TableProps } from '@atlassian/forge-ui-types';
import { Props } from '..';
import AKDynamicTable from './lazyLoadedTable';

interface Data {
  head: {
    cells: {
      content: ReactNode;
    }[];
  };
  rows: {
    cells: {
      content: ReactNode;
    }[];
  }[];
  rowsPerPage?: number;
}

const Table = ({ head, rows, rowsPerPage = 15 }: Data) => {
  const [currentPage, setCurrentPage] = useState(1);

  // rowsPerPage of 0 is a sentinel value for a fixed size Table
  const isFixedSize = rowsPerPage === 0 || rows.length <= rowsPerPage;
  rowsPerPage = isFixedSize ? Infinity : rowsPerPage;

  function onChange(i: number) {
    setCurrentPage(i);
  }

  return (
    <div
      css={css`
        align-self: normal;
        margin-bottom: 0px;
        word-break: initial;
      `}
    >
      <AKDynamicTable
        isFixedSize={isFixedSize}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onSetPage={onChange}
        head={head}
        rows={rows}
      />
    </div>
  );
};

const TableFn: React.FunctionComponent<Props> = ({
  props,
  children,
  dispatch,
  render,
  Components,
}) => {
  const { rowsPerPage } = props as Rendered<TableProps>;
  const convertRow = (row: ForgeDoc) => {
    const cells = row.children
      .filter((child) => child.type === 'Cell')
      .map((cell: ForgeDoc) => {
        const content = cell.children.map((child: ForgeDoc) => {
          return render({
            aux: child,
            dispatch,
            Components,
          });
        });
        return { content };
      });
    return { cells };
  };

  const head = children.filter((child) => child.type === 'Head');
  const headData = head.length > 0 ? convertRow(head[0]) : { cells: [] };

  const rows = children
    .filter((child) => child.type === 'Row')
    .map((row) => convertRow(row));

  return <Table head={headData} rows={rows} rowsPerPage={rowsPerPage} />;
};

export { Table, TableFn };
