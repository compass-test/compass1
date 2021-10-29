import React from 'react';
import { SearchResultSection } from './search-result-section';
import times from 'lodash/times';

const dummyResultItemStyling = {
  padding: '0 8px',
};

export const Basic = () => (
  <SearchResultSection title="Search Results" totalResults={12}>
    {
      // TODO: use SearchResult component here when it is implemented
      times(10, () => (
        <div style={dummyResultItemStyling}>search result</div>
      ))
    }
  </SearchResultSection>
);

export const WithoutTotalResultsBadge = () => (
  <SearchResultSection title="Search Results">
    {
      // TODO: use SearchResult component here when it is implemented
      times(10, () => (
        <div style={dummyResultItemStyling}>search result</div>
      ))
    }
  </SearchResultSection>
);

export default { title: 'Search Dialog/Search Results Section' };
