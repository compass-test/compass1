import {
  setup,
  SEARCH_SESSION_ID,
  COMMON_RECENT_PAGE_PREFIX,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
  EXPECTED_FILTERS,
} from '../setup';
import { fireEvent } from '@testing-library/react';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';

describe('analytics - search results highlighted', () => {
  beforeAndAfterTestSetup();

  analyticTest(
    'pre query - search results highlighted using down key',
    async () => {
      const {
        getFiredEvents,
        getInputField,
        results: { recentPageResults },
      } = await setup();

      const input = getInputField();
      fireEvent.keyDown(input, {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        charCode: 40,
      });

      await awaitAllEvents();
      const events = getFiredEvents('searchResult highlighted');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        action: 'highlighted',
        actionSubject: 'searchResult',
        actionSubjectId: 'preQuerySearchResults',
        source: 'searchDialog',
        eventType: 'ui',
        nonPrivacySafeAttributes: {
          query: '',
        },
        attributes: {
          abTest: {
            abTestId: 'default',
            controlId: 'default',
            experimentId: 'nav-v3',
          },
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          containerId: recentPageResults[0].spaceKey,
          globalIndex: 0,
          indexWithinSection: 0,
          isCached: true,
          queryHash: expectNonEmptyString,
          queryLength: 0,
          queryVersion: 0,
          searchSessionId: SEARCH_SESSION_ID,
          sectionId: 'confluence-item',
          sectionIndex: 0,
          wordCount: 0,
        },
      });
    },
  );

  analyticTest(
    'pre query - search results highlighted using up key',
    async () => {
      const {
        getFiredEvents,
        getInputField,
        results: { recentPageResults, recentSpaceResults, recentPeopleResults },
      } = await setup();

      const input = getInputField();
      // First up will take the user to the advanced search
      fireEvent.keyDown(input, {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      });
      fireEvent.keyDown(input, {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      });

      await awaitAllEvents();
      const events = getFiredEvents('searchResult highlighted');

      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        action: 'highlighted',
        actionSubject: 'searchResult',
        actionSubjectId: 'preQuerySearchResults',
        source: 'searchDialog',
        eventType: 'ui',
        nonPrivacySafeAttributes: {
          query: '',
        },
        attributes: {
          abTest: {
            abTestId: 'default',
            controlId: 'default',
            experimentId: 'nav-v3',
          },
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          containerId: null,
          globalIndex:
            recentPageResults.length +
            recentSpaceResults.length +
            recentPeopleResults.results.length -
            1, // -1 because it's a zero-based index
          indexWithinSection: recentPeopleResults.results.length - 1, // -1 because it's a zero-based index
          isCached: true,
          queryHash: expectNonEmptyString,
          queryLength: 0,
          queryVersion: 0,
          searchSessionId: SEARCH_SESSION_ID,
          sectionId: 'confluence-people',
          sectionIndex: 2,
          wordCount: 0,
        },
      });
    },
  );

  analyticTest(
    'cached results - search result highlighted using up',
    async () => {
      const {
        getFiredEvents,
        getInputField,
        transitionToFasterSearch,
        results: { recentPageResults, recentPeopleResults },
      } = await setup();

      await transitionToFasterSearch(COMMON_RECENT_PAGE_PREFIX);

      const input = getInputField();

      // First up will take the user to the advanced search
      fireEvent.keyDown(input, {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      });
      fireEvent.keyDown(input, {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      });

      await awaitAllEvents();
      const events = getFiredEvents('searchResult highlighted');

      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        action: 'highlighted',
        actionSubject: 'searchResult',
        actionSubjectId: 'cachedResults',
        source: 'searchDialog',
        eventType: 'ui',
        nonPrivacySafeAttributes: {
          query: COMMON_RECENT_PAGE_PREFIX,
        },
        attributes: {
          abTest: {
            abTestId: 'default',
            controlId: 'default',
            experimentId: 'nav-v3',
          },
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          containerId: recentPageResults[1].spaceKey,
          globalIndex: recentPeopleResults.results.length - 1, // -1 because it's a zero-based index
          indexWithinSection: recentPeopleResults.results.length - 1, // -1 because it's a zero-based index
          isCached: true,
          metadata: {
            contentId: recentPageResults[1].id.toString(),
            contentType: `confluence-${recentPageResults[1].contentType}`,
            spaceId: recentPageResults[1].spaceKey,
            containerId: undefined,
          },
          queryHash: expectNonEmptyString,
          queryLength: COMMON_RECENT_PAGE_PREFIX.length,
          queryVersion: 1,
          searchSessionId: SEARCH_SESSION_ID,
          filters: EXPECTED_FILTERS,
          sectionId: 'confluence-item',
          sectionIndex: 0,
          wordCount: 1,
        },
      });
    },
  );

  analyticTest('post query - search result highlighted using up', async () => {
    const {
      getFiredEvents,
      getInputField,
      transitionToPostQuery,
      results: {
        recentPageResults,
        pageBlogAttachmentSearchResults,
        spaceSearchResults,
        peopleSearchResults,
      },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_PAGE_PREFIX);

    const input = getInputField();

    // First up will take the user to the advanced search
    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
      charCode: 38,
    });
    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
      charCode: 38,
    });

    await awaitAllEvents();
    const events = getFiredEvents('searchResult highlighted');

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'highlighted',
      actionSubject: 'searchResult',
      actionSubjectId: 'postQuerySearchResults',
      source: 'searchDialog',
      eventType: 'ui',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_PAGE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        containerId: null,
        globalIndex:
          recentPageResults.length +
          pageBlogAttachmentSearchResults.results.length +
          spaceSearchResults.results.length +
          peopleSearchResults.results.length -
          1, // -1 because it's a zero-based index, we also add the recentPages here because of 'faster search'
        indexWithinSection: peopleSearchResults.results.length - 1, // -1 because it's a zero-based index
        isCached: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_PAGE_PREFIX.length,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
        sectionId: 'confluence-people',
        sectionIndex: 2, // 3 sections - 1 because it's a zero-based index
        wordCount: 1,
      },
    });
  });
});
