import {
  setup,
  SEARCH_SESSION_ID,
  COMMON_RECENT_PAGE_PREFIX,
  awaitAllEvents,
  beforeAndAfterTestSetup,
  EXPECTED_FILTERS,
} from '../setup';

const expectNonEmptyString = expect.stringMatching(/.+/);

describe('analytics - search results shown', () => {
  beforeAndAfterTestSetup();

  test('on pre query - item', async () => {
    const {
      getFiredEvents,
      findByText,
      results: { recentPageResults },
    } = await setup();

    const resultDetails = recentPageResults[0];
    const result = await findByText(resultDetails.title!);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents(
      'searchResult selected (preQuerySearchResults)',
    );
    expect(events).toHaveLength(1);

    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'preQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: '',
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: resultDetails.spaceKey,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex: 0,
        indexWithinSection: 0,
        isCached: true,
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'confluence-item',
        sectionIndex: 0,
        wordCount: 0,
      },
    });
  });

  test('on pre query - space', async () => {
    const {
      getFiredEvents,
      findByText,
      results: { recentPageResults, recentSpaceResults },
    } = await setup();

    const resultDetails = recentSpaceResults[0];
    const result = await findByText(resultDetails.name);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents(
      'searchResult selected (preQuerySearchResults)',
    );
    expect(events).toHaveLength(1);

    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'preQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: '',
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: null,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex: recentPageResults.length,
        indexWithinSection: 0,
        isCached: true,
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'confluence-space',
        sectionIndex: 1,
        wordCount: 0,
      },
    });
  });

  test('on pre query - people', async () => {
    const {
      getFiredEvents,
      findByText,
      results: { recentPageResults, recentSpaceResults, recentPeopleResults },
    } = await setup();

    const resultDetails = recentPeopleResults.results[0];
    const result = await findByText(resultDetails.name);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents(
      'searchResult selected (preQuerySearchResults)',
    );
    expect(events).toHaveLength(1);

    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'preQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: '',
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: null,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex: recentPageResults.length + recentSpaceResults.length,
        indexWithinSection: 0,
        isCached: true,
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'confluence-people',
        sectionIndex: 2,
        wordCount: 0,
      },
    });
  });

  test('on cached results - item', async () => {
    const {
      getFiredEvents,
      findByText,
      transitionToFasterSearch,
      results: { recentPageResults },
    } = await setup();

    await transitionToFasterSearch(COMMON_RECENT_PAGE_PREFIX);

    const resultDetails = recentPageResults[0];
    const result = await findByText(resultDetails.title!);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents('searchResult selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'cachedResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_PAGE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: resultDetails.spaceKey,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex: 0,
        indexWithinSection: 0,
        isCached: true,
        metadata: {
          contentId: recentPageResults[0].id.toString(),
          contentType: `confluence-${recentPageResults[0].contentType}`,
          spaceId: recentPageResults[0].spaceKey,
          containerId: undefined,
        },
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 4,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
        sectionId: 'confluence-item',
        sectionIndex: 0,
        wordCount: 1,
      },
    });
  });

  test('on post query - item (faster search)', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      findByText,
      results: { pageBlogAttachmentSearchResults, recentPageResults },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_PAGE_PREFIX);

    await findByText(pageBlogAttachmentSearchResults.results[0].title);

    const resultDetails = recentPageResults[0];
    const result = await findByText(resultDetails.title!);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents('searchResult selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'postQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_PAGE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: resultDetails.spaceKey,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex: 0,
        indexWithinSection: 0,
        isCached: true,
        metadata: {
          contentId: recentPageResults[0].id.toString(),
          contentType: `confluence-${recentPageResults[0].contentType}`,
          spaceId: recentPageResults[0].spaceKey,
          containerId: undefined,
        },
        isSticky: false,
        isStickyUpdated: false,
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
  });

  test('on post query - item (search result)', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      findByText,
      results: { pageBlogAttachmentSearchResults, recentPageResults },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_PAGE_PREFIX);

    await findByText(pageBlogAttachmentSearchResults.results[0].title);

    const resultDetails = pageBlogAttachmentSearchResults.results[0];
    const result = await findByText(resultDetails.title!);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents('searchResult selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'postQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_PAGE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: 'UNAVAILABLE',
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex: recentPageResults.length,
        indexWithinSection: recentPageResults.length,
        isCached: false,
        metadata: {
          contentId: pageBlogAttachmentSearchResults.results[0]!.content!.id,
          contentType: `confluence-${
            pageBlogAttachmentSearchResults.results[0]!.content!.type
          }`,
          spaceId: 'UNAVAILABLE',
          containerId: pageBlogAttachmentSearchResults.results[0]!.container.id,
        },
        isSticky: false,
        isStickyUpdated: false,
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
  });

  test('on post query - space', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      findByText,
      results: {
        pageBlogAttachmentSearchResults,
        spaceSearchResults,
        recentPageResults,
      },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_PAGE_PREFIX);

    const resultDetails = spaceSearchResults.results[0];
    const result = await findByText(resultDetails.container.title);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents('searchResult selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'postQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_PAGE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: null,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex:
          recentPageResults.length +
          pageBlogAttachmentSearchResults.results.length,
        indexWithinSection: 0,
        isCached: false,
        metadata: {
          contentId: `space-${resultDetails!.content!.id}`,
          contentType: `confluence-${resultDetails!.content!.type}`,
          containerId: resultDetails!.id,
        },
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_PAGE_PREFIX.length,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
        sectionId: 'confluence-space',
        sectionIndex: 1,
        wordCount: 1,
      },
    });
  });

  test('on post query - people', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      findByText,
      results: {
        pageBlogAttachmentSearchResults,
        spaceSearchResults,
        peopleSearchResults,
        recentPageResults,
      },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_PAGE_PREFIX);

    const resultDetails = peopleSearchResults.results[0];
    const result = await findByText(resultDetails.name);

    result.click();
    await awaitAllEvents();

    const events = getFiredEvents('searchResult selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'searchResult',
      actionSubjectId: 'postQuerySearchResults',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_PAGE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: null,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        globalIndex:
          recentPageResults.length +
          pageBlogAttachmentSearchResults.results.length +
          spaceSearchResults.results.length,
        indexWithinSection: 0,
        isCached: false,
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_PAGE_PREFIX.length,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
        sectionId: 'confluence-people',
        sectionIndex: 2,
        wordCount: 1,
      },
    });
  });
});
