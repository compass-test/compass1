import {
  setup,
  SEARCH_SESSION_ID,
  COMMON_RECENT_ISSUE_PREFIX,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
} from '../setup';
import { BinaryStatusCategory } from '../../../src/jira/filter-context';

const expectNonEmptyString = expect.stringMatching(/.+/);

describe('analytics - search results shown', () => {
  beforeAndAfterTestSetup();

  analyticTest('on pre query - item', async () => {
    const {
      getFiredEvents,
      findByText,
      results: { recentIssuesResults },
    } = await setup();

    const resultDetails = recentIssuesResults.results[0];
    const result = await findByText(resultDetails.name!);

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
        containerId: resultDetails.attributes.containerId,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        globalIndex: 0,
        indexWithinSection: 0,
        isCached: true,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'jira-issue',
        sectionIndex: 0,
        wordCount: 0,
        filters: undefined,
      },
    });
  });

  analyticTest('on pre query - boards projects filers', async () => {
    const {
      getFiredEvents,
      findByText,
      results: { recentIssuesResults, recentBoardsProjectsFiltersResults },
    } = await setup();

    const resultDetails = recentBoardsProjectsFiltersResults.results[0];
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
        containerId: (resultDetails.attributes as any).containerId,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        globalIndex: recentIssuesResults.results.length,
        indexWithinSection: 0,
        isCached: true,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'jira-board-project-filter',
        sectionIndex: 1,
        wordCount: 0,
        filters: undefined,
      },
    });
  });

  analyticTest('on cached results - item', async () => {
    const {
      getFiredEvents,
      findByText,
      transitionToFasterSearch,
      results: { recentIssuesResults },
    } = await setup();

    await transitionToFasterSearch(COMMON_RECENT_ISSUE_PREFIX);

    const resultDetails = recentIssuesResults.results[0];
    const result = await findByText(resultDetails.name!);

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
        query: COMMON_RECENT_ISSUE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: resultDetails.attributes.containerId,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        globalIndex: 0,
        indexWithinSection: 0,
        isCached: true,
        queryHash: expectNonEmptyString,
        queryLength: 4,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'jira-issue',
        sectionIndex: 0,
        wordCount: 1,
        filters: {
          assignees: {
            applied: [],
            recommendedIds: [],
          },
          projects: {
            applied: [],
            recommendedIds: [
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
            ],
          },
          binaryStatusCategories: {
            applied: [],
            recommendedIds: [
              {
                id: BinaryStatusCategory.OPEN.id,
                source: 'STATIC',
              },
              {
                id: BinaryStatusCategory.DONE.id,
                source: 'STATIC',
              },
            ],
          },
        },
      },
    });
  });

  analyticTest('on post query - item (faster search)', async () => {
    const {
      getFiredEvents,
      findByText,
      transitionToPostQuery,
      results: { recentIssuesResults },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_ISSUE_PREFIX);

    const resultDetails = recentIssuesResults.results[0];
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
        query: COMMON_RECENT_ISSUE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: resultDetails.attributes.containerId,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        globalIndex: 0,
        indexWithinSection: 0,
        isCached: true,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_ISSUE_PREFIX.length,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'jira-issue',
        sectionIndex: 0,
        wordCount: 1,
        filters: {
          assignees: {
            applied: [],
            recommendedIds: [],
          },
          projects: {
            applied: [],
            recommendedIds: [
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
            ],
          },
          binaryStatusCategories: {
            applied: [],
            recommendedIds: [
              {
                id: BinaryStatusCategory.OPEN.id,
                source: 'STATIC',
              },
              {
                id: BinaryStatusCategory.DONE.id,
                source: 'STATIC',
              },
            ],
          },
        },
      },
    });
  });

  analyticTest('on post query - item (search result)', async () => {
    const {
      getFiredEvents,
      findByText,
      transitionToPostQuery,
      results: { recentIssuesResults, issuesResults },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_ISSUE_PREFIX);

    const resultDetails = issuesResults.results[0];
    const result = await findByText(resultDetails.name!);

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
        query: COMMON_RECENT_ISSUE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: resultDetails.attributes.containerId,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        globalIndex: recentIssuesResults.results.length,
        indexWithinSection: recentIssuesResults.results.length,
        isCached: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_ISSUE_PREFIX.length,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'jira-issue',
        sectionIndex: 0,
        wordCount: 1,
        filters: {
          assignees: {
            applied: [],
            recommendedIds: [],
          },
          projects: {
            applied: [],
            recommendedIds: [
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
            ],
          },
          binaryStatusCategories: {
            applied: [],
            recommendedIds: [
              {
                id: BinaryStatusCategory.OPEN.id,
                source: 'STATIC',
              },
              {
                id: BinaryStatusCategory.DONE.id,
                source: 'STATIC',
              },
            ],
          },
        },
      },
    });
  });

  analyticTest('on post query - project board filter', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      findByText,
      results: { issuesResults, boardsProjectsFiltersResults },
    } = await setup();

    await transitionToPostQuery('blah blah');

    const resultDetails = boardsProjectsFiltersResults.results[0];
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
        query: 'blah blah',
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        containerId: (resultDetails.attributes as any).containerId,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        globalIndex: issuesResults.results.length,
        indexWithinSection: 0,
        isCached: false,
        queryHash: expectNonEmptyString,
        queryLength: 9,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        sectionId: 'jira-board-project-filter',
        sectionIndex: 1,
        wordCount: 2,
        filters: {
          assignees: {
            applied: [],
            recommendedIds: [],
          },
          projects: {
            applied: [],
            recommendedIds: [
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
              {
                id: expectNonEmptyString,
                source: 'RECENT',
              },
            ],
          },
          binaryStatusCategories: {
            applied: [],
            recommendedIds: [
              {
                id: BinaryStatusCategory.OPEN.id,
                source: 'STATIC',
              },
              {
                id: BinaryStatusCategory.DONE.id,
                source: 'STATIC',
              },
            ],
          },
        },
      },
    });
  });
});
