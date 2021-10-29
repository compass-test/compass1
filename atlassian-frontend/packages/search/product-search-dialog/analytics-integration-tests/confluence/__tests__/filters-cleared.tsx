import {
  setup,
  SEARCH_SESSION_ID,
  completeSearch,
  analyticTest,
  beforeAndAfterTestSetup,
} from '../setup';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';
import {
  collaborationGraphUserEntities,
  collabGraphEntryName,
  collaborationGraphContainerEntities,
  collabGraphEntryId,
} from '../setup/analytics-test-setup';

describe('analytics - filter selected', () => {
  beforeAndAfterTestSetup();

  analyticTest('Clearing filters', async () => {
    const { findByText, getFiredEvents, transitionToPostQuery } = await setup({
      abTest: {
        abTestId: 'default_filters-experiment',
        controlId: 'default',
        experimentId: 'filters-experiment',
      },
      resultCount: {
        searchItem: 0,
        searchSpace: 0,
        searchPeople: 0,
      },
    });

    await transitionToPostQuery('testing testing');

    const contributorFilter = await findByText(collabGraphEntryName);

    contributorFilter.click();
    await completeSearch();

    const clearFiltersButton = await findByText('Clear filters');
    clearFiltersButton.click();
    await completeSearch();

    const events = getFiredEvents('button clicked (searchDialogClearFilters)');
    expect(events).toHaveLength(1);

    expect(events[0]).toEqual({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'searchDialogClearFilters',
      attributes: {
        abTest: {
          abTestId: 'default_filters-experiment',
          controlId: 'default',
          experimentId: 'filters-experiment',
        },
        filters: {
          container: {
            applied: [],
            recommendedIds: collaborationGraphContainerEntities.map(
              (space) => ({
                id: space.containerDetails.key,
                source: 'COLLABORATION_GRAPH',
              }),
            ),
          },
          contributor: {
            applied: [
              {
                id: collabGraphEntryId,
                index: 0,
                source: 'COLLABORATION_GRAPH',
              },
            ],
            recommendedIds: collaborationGraphUserEntities.map((user) => ({
              id: user.id,
              source: 'COLLABORATION_GRAPH',
            })),
          },
        },
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        queryHash: expectNonEmptyString,
        queryLength: 15,
        queryVersion: 2,
        searchSessionId: SEARCH_SESSION_ID,
        wordCount: 2,
      },
      eventType: 'ui',
      nonPrivacySafeAttributes: { query: 'testing testing' },
      source: 'searchDialog',
    });
  });
});
