import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
} from '../setup';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';
import { BinaryStatusCategory } from '../../../src/jira/filter-context';

describe('analytics - show-more button clicked', () => {
  beforeAndAfterTestSetup();

  analyticTest('clicking show more fires analytics', async () => {
    const result = await setup({
      resultCount: {
        searchIssues: 20,
      },
      abTest: {
        abTestId: 'default_filters-experiment',
        controlId: 'default',
        experimentId: 'filters-experiment',
      },
    });

    await result.transitionToPostQuery('testing');

    const showMore = await result.container.querySelector('#show-more-button');

    if (!showMore) {
      throw new Error('Show More btn not available in DOM');
    }

    // eslint-disable-next-line
    // @ts-ignore
    showMore.click();
    await awaitAllEvents();

    const events = result.getFiredEvents('button clicked (showMoreButton)');

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'showMoreButton',
      source: 'searchDialog',
      eventType: 'ui',
      nonPrivacySafeAttributes: {
        query: 'testing',
      },
      attributes: {
        total: 20,
        currentSize: 10,
        pageSize: 10,
        abTest: {
          abTestId: 'default_filters-experiment',
          controlId: 'default',
          experimentId: 'filters-experiment',
        },
        wordCount: 1,
        queryLength: 7,
        queryHash: expectNonEmptyString,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        filters: {
          projects: {
            applied: [],
            recommendedIds:
              events[0].attributes.filters.projects.recommendedIds,
          },
          assignees: {
            applied: [],
            recommendedIds:
              events[0].attributes.filters.assignees.recommendedIds,
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
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
      },
    });
  });
});
