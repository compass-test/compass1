import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  completeSearch,
  beforeAndAfterTestSetup,
} from '../setup';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';
import { FilterOptionSource } from '../../../src/common/filters/types';
import {
  collaborationGraphContainerEntities,
  collabGraphEntryName,
  collabGraphEntryId,
  collaborationGraphUserEntities,
} from '../setup/analytics-test-setup';

describe('analytics - filter selected', () => {
  beforeAndAfterTestSetup();

  analyticTest(
    'Selecting and de-selecting first filter in list of spaces',
    async () => {
      const { findByText, getFiredEvents, transitionToPostQuery } = await setup(
        {
          abTest: {
            abTestId: 'default_filters-experiment',
            controlId: 'default',
            experimentId: 'filters-experiment',
          },
        },
      );

      await transitionToPostQuery('testing testing');

      let contributorFilter = await findByText(collabGraphEntryName);

      contributorFilter.click();
      await completeSearch();

      let events = getFiredEvents('filter selected');

      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        action: 'selected',
        actionSubject: 'filter',
        actionSubjectId: 'searchDialogFilter',
        attributes: {
          abTest: {
            abTestId: 'default_filters-experiment',
            controlId: 'default',
            experimentId: 'filters-experiment',
          },
          filterId: expectNonEmptyString,
          filters: {
            contributor: {
              applied: [],
              recommendedIds: collaborationGraphUserEntities.map((user) => ({
                id: user.id,
                source: 'COLLABORATION_GRAPH',
              })),
            },
            container: {
              applied: [],
              recommendedIds: collaborationGraphContainerEntities.map(
                (space) => ({
                  id: space.containerDetails.key,
                  source: 'COLLABORATION_GRAPH',
                }),
              ),
            },
          },
          filterType: 'contributor',
          filterSource: FilterOptionSource.COLLABORATION_GRAPH,
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          isSticky: false,
          isStickyUpdated: false,
          queryHash: expectNonEmptyString,
          queryLength: 15,
          queryVersion: 1,
          searchSessionId: SEARCH_SESSION_ID,
          wordCount: 2,
        },
        eventType: 'ui',
        nonPrivacySafeAttributes: {
          query: 'testing testing',
        },
        source: 'searchDialog',
      });

      contributorFilter = await findByText(collabGraphEntryName);

      contributorFilter.click();
      await completeSearch();

      events = getFiredEvents('filter unselected');

      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        action: 'unselected',
        actionSubject: 'filter',
        actionSubjectId: 'searchDialogFilter',
        attributes: {
          abTest: {
            abTestId: 'default_filters-experiment',
            controlId: 'default',
            experimentId: 'filters-experiment',
          },
          filterId: expectNonEmptyString,
          filters: {
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
            container: {
              applied: [],
              recommendedIds: collaborationGraphContainerEntities.map(
                (space) => ({
                  id: space.containerDetails.key,
                  source: 'COLLABORATION_GRAPH',
                }),
              ),
            },
          },
          filterType: 'contributor',
          filterSource: FilterOptionSource.COLLABORATION_GRAPH,
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          isSticky: false,
          isStickyUpdated: false,
          queryHash: expectNonEmptyString,
          queryLength: 15,
          queryVersion: 2,
          searchSessionId: SEARCH_SESSION_ID,
          wordCount: 2,
        },
        eventType: 'ui',
        nonPrivacySafeAttributes: {
          query: 'testing testing',
        },
        source: 'searchDialog',
      });
    },
  );
});
