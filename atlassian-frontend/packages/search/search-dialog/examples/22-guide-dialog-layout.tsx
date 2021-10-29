/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// @ts-ignore
import React from 'react';
import { SearchDialog, SearchResult, SearchResultSection } from '../src';
import { Simple as ExampleSearchFooter } from '../examples/12-search-footer';
import { SearchError } from '../examples/06-empty-state';
import ListIcon from '@atlaskit/icon/glyph/list';
import { getMockSearchResults } from '../examples-helpers/mock-data';

export const ResultsContent = ({
  error = false,
  loading = false,
  data = [],
}: any) => {
  if (error) {
    return <SearchError />;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <SearchResultSection title="Search results" totalResults={data.length}>
      {data.length ? (
        // @ts-ignore
        data.map((i) => (
          <SearchResult
            key={i.id}
            href={i.href}
            title={i.title}
            icon={<ListIcon label="list icon" />}
          />
        ))
      ) : (
        <SearchError />
      )}
    </SearchResultSection>
  );
};

export const Basic = () => {
  const error = false;
  const loading = false;
  const data = getMockSearchResults(3);
  return (
    <SearchDialog>
      <div
        css={css`
          display: flex;
          flex-direction: column;
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
      </div>
      <ExampleSearchFooter />
    </SearchDialog>
  );
};

export default Basic;
