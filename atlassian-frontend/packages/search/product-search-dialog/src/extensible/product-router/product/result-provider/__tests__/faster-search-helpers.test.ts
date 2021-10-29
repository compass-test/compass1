import { filterItems, mergeSearchItems } from '../faster-search-helpers';
import { SearchItems } from '../../result-types';

describe('FasterSearchHelpers', () => {
  const searchItemsMock: SearchItems = {
    size: 2,
    sections: [
      {
        id: 'bitbucket-repository',
        title: 'section title',
        searchResults: [
          {
            title: 'repo-name',
            id: 'repo-id',
            meta: 'Description',
            url: '/url',
            iconUrl: '/',
          },
          {
            title: 'repo-name-2',
            id: 'repo-id-2',
            meta: 'Description-2',
            url: '/url-2',
            iconUrl: '/2',
          },
        ],
      },
    ],
  };

  const intermediateSearchItemsMock: SearchItems = {
    size: 2,
    sections: [
      {
        id: 'bitbucket-repository',
        title: 'section title',
        searchResults: [
          {
            title: 'plum',
            id: 'plum-id',
            meta: 'Description',
            url: '/url',
            iconUrl: '/',
          },
          {
            title: 'peach',
            id: 'peach-id-2',
            meta: 'Description-2',
            url: '/url-2',
            iconUrl: '/2',
          },
        ],
      },
    ],
  };

  const emptySearchItemsMock = {
    size: 0,
    sections: [],
  };

  describe('filterItems', () => {
    it('should return empty for no sections defined', () => {
      const filteredItems = filterItems({ size: 0, sections: [] }, '2');
      expect(filteredItems.size).toBe(0);
      expect(filteredItems.sections.length).toBe(0);
    });

    it('should filter items that match the query', () => {
      const filteredItems = filterItems(searchItemsMock, '2');
      expect(filteredItems.size).toBe(1);
      expect(filteredItems.sections[0].searchResults.length).toBe(1);
      expect(filteredItems.sections[0].searchResults[0]).toBe(
        searchItemsMock.sections[0].searchResults[1],
      );
    });
    it('should return empty result', () => {
      const filteredItems = filterItems(emptySearchItemsMock, '2');
      expect(filteredItems.size).toBe(0);
      expect(filteredItems.sections.length).toBe(0);
      expect(filteredItems).toBe(emptySearchItemsMock);
    });
  });

  describe('mergeSearchItems', () => {
    it('should return searchResults if intermediateSearchResults is an empty', () => {
      const mergedItems = mergeSearchItems(
        emptySearchItemsMock,
        searchItemsMock,
      );
      expect(mergedItems).toBe(searchItemsMock);
    });
    it('should return deduplicated result', () => {
      const mergedItems = mergeSearchItems(searchItemsMock, searchItemsMock);
      expect(mergedItems).toStrictEqual(searchItemsMock);
      expect(mergedItems.size).toBe(2);
    });
    it('should return merged resultItems', () => {
      const mergedItems = mergeSearchItems(
        intermediateSearchItemsMock,
        searchItemsMock,
      );
      expect(mergedItems.size).toBe(4);
    });
    it('should return intermediateSearchItemsMock if there are no postQuery results', () => {
      const mergedItems = mergeSearchItems(
        intermediateSearchItemsMock,
        emptySearchItemsMock,
      );
      expect(mergedItems).toBe(intermediateSearchItemsMock);
    });
  });
});
