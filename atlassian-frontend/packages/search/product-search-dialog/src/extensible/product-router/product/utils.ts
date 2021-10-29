import { SearchItems } from './result-types';

export const hasSearchResults = (searchItems: SearchItems) => {
  const sectionsWithSearchResults = searchItems.sections.filter(
    ({ searchResults }) => searchResults.length > 0,
  );

  return sectionsWithSearchResults.length > 0;
};
