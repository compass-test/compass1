import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
  EXPECTED_FILTERS,
} from '../setup';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';

describe('analytics - show-more button clicked', () => {
  beforeAndAfterTestSetup();

  analyticTest('clicking show more fires analytics', async () => {
    const result = await setup({
      resultCount: {
        searchItem: 20,
      },
    });

    await result.transitionToPostQuery('testing');

    const showMore = await result.container.querySelector('#show-more-button');

    if (!showMore) {
      throw new Error('Show More button not available in DOM');
    }

    // eslint-disable-next-line
    // @ts-ignore
    showMore.click();
    awaitAllEvents();

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
        total: 99,
        currentSize: 10,
        pageSize: 10,
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        wordCount: 1,
        queryLength: 7,
        queryHash: expectNonEmptyString,
        queryVersion: 1,
        searchSessionId: SEARCH_SESSION_ID,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        filters: EXPECTED_FILTERS,
      },
    });
  });
});
