/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// @ts-ignore
import React from 'react';
import { ColumnFilterGroup, RowFilterGroup, SearchDialog } from '../src';
import { Simple as ExampleSearchFooter } from '../examples/12-search-footer';
import { getMockSearchResults } from '../examples-helpers/mock-data';
import { SimpleColFilter, SimpleRowFilter } from '../examples/17-filter-item';
import { ResultsContent } from './22-guide-dialog-layout';

const FilterContent = ({ loading = false }) => (
  <React.Fragment>
    <ColumnFilterGroup title="Column Filters" isLoading={loading}>
      <SimpleColFilter />
      <SimpleColFilter />
    </ColumnFilterGroup>
    <RowFilterGroup title="Row Filters" isLoading={loading}>
      <SimpleRowFilter />
      <SimpleRowFilter />
    </RowFilterGroup>
  </React.Fragment>
);

const WithFilters = () => {
  const error = false;
  const loading = false;
  const data = getMockSearchResults(5);
  return (
    <SearchDialog>
      <div>
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              overflow-x: hidden;
              overflow-y: auto;
              flex: 1;
              max-width: 100%;
              padding: 10px 0;
              box-sizing: border-box;
            `}
          >
            <ResultsContent error={error} loading={loading} data={data} />
          </div>
          <div
            css={css`
              width: 300px;
              overflow-x: hidden;
              overflow-y: auto;
              padding: 10px 0;
              box-sizing: border-box;
              margin-left: 10px;
              height: 100%;
            `}
          >
            <FilterContent loading={loading} />
          </div>
        </div>
      </div>
      <ExampleSearchFooter />
    </SearchDialog>
  );
};

export default WithFilters;
