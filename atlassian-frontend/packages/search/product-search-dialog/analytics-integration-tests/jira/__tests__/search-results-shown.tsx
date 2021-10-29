import {
  setup,
  SEARCH_SESSION_ID,
  COMMON_RECENT_ISSUE_PREFIX,
  analyticTest,
  beforeAndAfterTestSetup,
} from '../setup';
import { BinaryStatusCategory } from '../../../src/jira/filter-context';

const expectNonEmptyString = expect.stringMatching(/.+/);

describe('analytics - search results shown', () => {
  beforeAndAfterTestSetup();

  analyticTest('on pre query', async () => {
    const {
      getFiredEvents,
      results: { recentIssuesResults, recentBoardsProjectsFiltersResults },
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
        activeProduct: 'JIRA',
        isMultiProduct: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        sectionCount: 2,
        resultCount:
          recentIssuesResults.results.length +
          recentBoardsProjectsFiltersResults.results.length,
        timeToQueryMs: expect.any(Number),
        wordCount: 0,
        searchSessionId: SEARCH_SESSION_ID,
        filters: undefined,
        results: [
          {
            results: recentIssuesResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'jira-issue',
          },
          {
            results: recentBoardsProjectsFiltersResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'jira-board-project-filter',
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
        recentIssuesResults,
        issuesResults,
        boardsProjectsFiltersResults,
      },
    } = await setup();

    await transitionToPostQuery(COMMON_RECENT_ISSUE_PREFIX);

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
        query: COMMON_RECENT_ISSUE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        activeProduct: 'JIRA',
        isMultiProduct: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_ISSUE_PREFIX.length,
        queryVersion: 1,
        sectionCount: 2,
        resultCount:
          recentIssuesResults.results.length +
          issuesResults.results.length +
          boardsProjectsFiltersResults.results.length,
        timeToQueryMs: expect.any(Number),
        wordCount: 1,
        searchSessionId: SEARCH_SESSION_ID,
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
        results: [
          {
            results: [
              ...recentIssuesResults.results.map(() => ({
                containerId: expectNonEmptyString,
                isRecentResult: true,
                resultType: expectNonEmptyString,
                resultContentId: expectNonEmptyString,
              })),
              ...issuesResults.results.map(() => ({
                containerId: expectNonEmptyString,
                isRecentResult: false,
                resultType: expectNonEmptyString,
                resultContentId: expectNonEmptyString,
              })),
            ],
            sectionId: 'jira-issue',
          },
          {
            results: boardsProjectsFiltersResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: false,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'jira-board-project-filter',
          },
        ],
      },
    });
  });

  analyticTest('on cached results', async () => {
    const {
      getFiredEvents,
      transitionToFasterSearch,
      results: { recentIssuesResults },
    } = await setup();

    await transitionToFasterSearch(COMMON_RECENT_ISSUE_PREFIX);

    const events = getFiredEvents('searchResults shown (cachedResults)');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
      actionSubjectId: 'cachedResults',
      source: 'searchDialog',
      eventType: 'ui',
      nonPrivacySafeAttributes: {
        query: COMMON_RECENT_ISSUE_PREFIX,
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        activeProduct: 'JIRA',
        isMultiProduct: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        isStickyUpdated: false,
        queryHash: expectNonEmptyString,
        queryLength: COMMON_RECENT_ISSUE_PREFIX.length,
        queryVersion: 1,
        sectionCount: 1,
        resultCount: recentIssuesResults.results.length,
        wordCount: 1,
        searchSessionId: SEARCH_SESSION_ID,
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
        results: [
          {
            results: recentIssuesResults.results.map(() => ({
              containerId: expectNonEmptyString,
              isRecentResult: true,
              resultType: expectNonEmptyString,
              resultContentId: expectNonEmptyString,
            })),
            sectionId: 'jira-issue',
          },
        ],
      },
    });
  });
});
