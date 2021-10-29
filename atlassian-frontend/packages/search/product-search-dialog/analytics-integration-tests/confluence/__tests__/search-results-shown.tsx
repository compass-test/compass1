import {
  setup,
  SEARCH_SESSION_ID,
  COMMON_RECENT_PAGE_PREFIX,
  analyticTest,
  expectNonEmptyString,
  beforeAndAfterTestSetup,
  EXPECTED_FILTERS,
} from '../setup';

describe('analytics - search results shown', () => {
  beforeAndAfterTestSetup();

  analyticTest('on pre query', async () => {
    const {
      getFiredEvents,
      results: { recentPageResults, recentSpaceResults, recentPeopleResults },
    } = await setup();

    const events = getFiredEvents(
      'searchResults shown (preQuerySearchResults)',
    );
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
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
        activeProduct: 'CONFLUENCE',
        isMultiProduct: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        sectionCount: 3,
        resultCount:
          recentPageResults.length +
          recentSpaceResults.length +
          recentPeopleResults.results.length,
        timeToQueryMs: expect.any(Number),
        wordCount: 0,
        searchSessionId: SEARCH_SESSION_ID,
        results: [
          {
            results: recentPageResults.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'confluence-item',
          },
          {
            results: recentSpaceResults.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'confluence-space',
          },
          {
            results: recentPeopleResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'confluence-people',
          },
        ],
      },
    });
  });

  analyticTest('on post query', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      results: {
        recentPageResults,
        pageBlogAttachmentSearchResults,
        spaceSearchResults,
        peopleSearchResults,
      },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_PAGE_PREFIX);

    const events = getFiredEvents(
      'searchResults shown (postQuerySearchResults)',
    );
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
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
        activeProduct: 'CONFLUENCE',
        isMultiProduct: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_PAGE_PREFIX.length,
        queryVersion: 1,
        sectionCount: 3,
        resultCount:
          recentPageResults.length +
          pageBlogAttachmentSearchResults.results.length +
          spaceSearchResults.results.length +
          peopleSearchResults.results.length,
        timeToQueryMs: expect.any(Number),
        wordCount: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
        results: [
          {
            results: [
              ...recentPageResults.map(() => ({
                containerId: expectNonEmptyString,
                isRecentResult: true,
                resultType: expectNonEmptyString,
                resultContentId: expectNonEmptyString,
              })),
              ...pageBlogAttachmentSearchResults.results.map(() => ({
                containerId: expectNonEmptyString,
                isRecentResult: false,
                resultType: expectNonEmptyString,
                resultContentId: expectNonEmptyString,
              })),
            ],
            sectionId: 'confluence-item',
          },
          {
            results: spaceSearchResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: false,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'confluence-space',
          },
          {
            results: peopleSearchResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: false,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'confluence-people',
          },
        ],
      },
    });
  });

  analyticTest('on cached results', async () => {
    const {
      getFiredEvents,
      transitionToFasterSearch,
      results: { recentPageResults },
    } = await setup();

    await transitionToFasterSearch(COMMON_RECENT_PAGE_PREFIX);

    const events = getFiredEvents('searchResults shown (cachedResults)');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
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
        activeProduct: 'CONFLUENCE',
        isMultiProduct: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 4,
        queryVersion: 1,
        sectionCount: 1,
        resultCount: recentPageResults.length,
        wordCount: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
        results: [
          {
            results: recentPageResults.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'confluence-item',
          },
        ],
      },
    });
  });
});
