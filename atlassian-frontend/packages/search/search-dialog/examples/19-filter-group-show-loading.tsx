import React from 'react';
import { ColumnFilterGroup, RowFilterGroup } from '../src';
import { SimpleColFilter, SimpleRowFilter } from './17-filter-item';

const ShowLoading = () => {
  const isLoading = true;
  return (
    <>
      <ColumnFilterGroup title="Column Filters" isLoading={isLoading}>
        <SimpleColFilter />
        <SimpleColFilter />
      </ColumnFilterGroup>
      <RowFilterGroup title="Row Filters" isLoading={isLoading}>
        <SimpleRowFilter />
        <SimpleRowFilter />
        <SimpleRowFilter />
        <SimpleRowFilter />
      </RowFilterGroup>
    </>
  );
};

export default ShowLoading;
