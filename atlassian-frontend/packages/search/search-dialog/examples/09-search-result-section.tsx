import React from 'react';
import { SearchResultSection } from '../src';
import { default as SearchResultExample } from './07-search-result';

const Example = () => {
  const results = [1, 2, 3];
  return (
    <SearchResultSection title="Search results" totalResults={results.length}>
      {results.map((i) => (
        <SearchResultExample key={i} />
      ))}
    </SearchResultSection>
  );
};

export default Example;
