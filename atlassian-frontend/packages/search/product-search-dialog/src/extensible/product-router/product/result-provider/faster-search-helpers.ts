import { SearchItems } from '../result-types';
import uniqBy from 'lodash/uniqBy';

export const filterItems = (
  searchItems: SearchItems,
  query: string,
  numberOfResultItems = 3,
): SearchItems => {
  if (!searchItems.sections[0]) {
    return searchItems;
  }
  const filteredSearchResults = searchItems.sections[0].searchResults
    .filter((item) => {
      return item.title.toLowerCase().includes(query.toLowerCase());
    })
    .slice(0, numberOfResultItems);
  return {
    size: filteredSearchResults.length,
    sections: [
      { ...searchItems.sections[0], searchResults: filteredSearchResults },
    ],
  };
};

export const mergeSearchItems = (
  intermediateSearchItems: SearchItems,
  postQuerySearchItems: SearchItems,
) => {
  if (!intermediateSearchItems.size) {
    return postQuerySearchItems;
  }

  if (!postQuerySearchItems.size) {
    return intermediateSearchItems;
  }

  const fullMergedResultsList = [
    ...intermediateSearchItems.sections[0].searchResults,
    ...postQuerySearchItems.sections[0].searchResults,
  ];
  const deduplicatedList = uniqBy(fullMergedResultsList, (item) => item.id);
  const sections = [
    {
      ...postQuerySearchItems.sections[0],
      searchResults: deduplicatedList,
    },
  ];
  return {
    size: sections.reduce(
      (accumulator, currentElem) =>
        accumulator + currentElem.searchResults.length,
      0,
    ),
    sections,
  };
};
