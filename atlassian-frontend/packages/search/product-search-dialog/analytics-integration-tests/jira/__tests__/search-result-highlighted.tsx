import {
  setup,
  SEARCH_SESSION_ID,
  COMMON_RECENT_ISSUE_PREFIX,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
} from '../setup';
import { fireEvent } from '@testing-library/react';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';
import { BinaryStatusCategory } from '../../../src/jira/filter-context';

describe('analytics - search results highlighted', () => {
  beforeAndAfterTestSetup();

  analyticTest(
    'search results highlighted using down key on pre query',
    async () => {
      const {
        getFiredEvents,
        getInputField,
        results: { recentIssuesResults },
      } = await setup();

      const input = getInputField();

      // The first arrow down selects the all issues link
      fireEvent.keyDown(input, {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        charCode: 40,
      });
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
          containerId: recentIssuesResults.results[0].attributes.containerId,
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
    },
  );

  analyticTest(
    'search results highlighted using up key on pre query',
    async () => {
      const {
        getFiredEvents,
        getInputField,
        results: { recentIssuesResults, recentBoardsProjectsFiltersResults },
      } = await setup();

      const input = getInputField();

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
            recentIssuesResults.results.length +
            recentBoardsProjectsFiltersResults.results.length -
            1, // -1 because it's a zero-based index
          indexWithinSection: recentIssuesResults.results.length - 1, // -1 because it's a zero-based index
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
    },
  );

  analyticTest(
    'search result highlighted using up on cached results screen',
    async () => {
      const {
        getFiredEvents,
        getInputField,
        transitionToFasterSearch,
        results: { recentIssuesResults, recentBoardsProjectsFiltersResults },
      } = await setup();

      await transitionToFasterSearch(COMMON_RECENT_ISSUE_PREFIX);

      const input = getInputField();

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
          query: COMMON_RECENT_ISSUE_PREFIX,
        },
        attributes: {
          abTest: {
            abTestId: 'default',
            controlId: 'default',
            experimentId: 'nav-v3',
          },
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          containerId:
            recentIssuesResults.results[recentIssuesResults.results.length - 1]
              .attributes.containerId,
          globalIndex: recentIssuesResults.results.length - 1, // -1 because it's a zero-based index
          indexWithinSection:
            recentBoardsProjectsFiltersResults.results.length - 1, // -1 because it's a zero-based index
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
    },
  );

  analyticTest(
    'search result highlighted using up on post query screen',
    async () => {
      const {
        getFiredEvents,
        transitionToPostQuery,
        getInputField,
        results: {
          recentIssuesResults,
          issuesResults,
          boardsProjectsFiltersResults,
        },
      } = await setup();

      await transitionToPostQuery(COMMON_RECENT_ISSUE_PREFIX);
      const input = getInputField();

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
          query: COMMON_RECENT_ISSUE_PREFIX,
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
            recentIssuesResults.results.length +
            issuesResults.results.length +
            boardsProjectsFiltersResults.results.length -
            1, // -1 because it's a zero-based index, we also add the recentPages here because of 'faster search'
          indexWithinSection: boardsProjectsFiltersResults.results.length - 1, // -1 because it's a zero-based index
          isCached: false,
          queryHash: expectNonEmptyString,
          queryLength: COMMON_RECENT_ISSUE_PREFIX.length,
          queryVersion: 1,
          searchSessionId: SEARCH_SESSION_ID,
          sectionId: 'jira-board-project-filter',
          sectionIndex: 1, // 3 sections - 1 because it's a zero-based index
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
    },
  );
});
