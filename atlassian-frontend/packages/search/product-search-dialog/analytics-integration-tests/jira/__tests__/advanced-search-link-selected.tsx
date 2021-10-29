import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
} from '../setup';
import { fireEvent } from '@testing-library/react';
import { BinaryStatusCategory } from '../../../src/jira/filter-context';

const expectNonEmptyString = expect.stringMatching(/.+/);

describe('analytics - advanced search selected', () => {
  beforeAndAfterTestSetup();

  describe('lozenges', () => {
    [
      {
        lozengeText: 'Issues',
        actionSubjectId: 'jiraIssuesSearchLink',
      },
      {
        lozengeText: 'Boards',
        actionSubjectId: 'jiraBoardsSearchLink',
      },
      {
        lozengeText: 'Projects',
        actionSubjectId: 'jiraProjectsSearchLink',
      },
      {
        lozengeText: 'Filters',
        actionSubjectId: 'jiraFiltersSearchLink',
      },
      {
        lozengeText: 'People',
        actionSubjectId: 'jiraPeopleSearchLink',
      },
    ].forEach(({ lozengeText, actionSubjectId }) => {
      analyticTest(`select ${lozengeText} link - pre query`, async () => {
        const { getFiredEvents, getAllByText } = await setup();
        // We need to check that the selected element has a parent that is a link. This is because there are more than one element that might hold the lozenge text
        const advancedSearch = getAllByText(lozengeText).filter(
          (element) => !!element.closest('a'),
        )[0];

        fireEvent.click(advancedSearch, { screenX: 100 });
        await awaitAllEvents();

        const events = getFiredEvents('advancedSearchLink selected');
        expect(events).toHaveLength(1);
        expect(events[0]).toEqual({
          action: 'selected',
          actionSubject: 'advancedSearchLink',
          actionSubjectId,
          source: 'searchDialog',
          eventType: 'track',
          nonPrivacySafeAttributes: { query: '' },
          attributes: {
            abTest: {
              abTestId: 'default',
              controlId: 'default',
              experimentId: 'nav-v3',
            },
            trigger: 'click',
            newTab: false,
            isLoading: false,
            frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
            queryHash: expectNonEmptyString,
            queryLength: 0,
            queryVersion: 0,
            wordCount: 0,
            searchSessionId: SEARCH_SESSION_ID,
            filters: undefined,
          },
        });
      });

      analyticTest(`select ${lozengeText} link - post query`, async () => {
        const {
          getFiredEvents,
          transitionToPostQuery,
          getAllByText,
        } = await setup();

        await transitionToPostQuery('blah blah');

        // We need to check that the selected element has a parent that is a link. This is because there are more than one element that might hold the lozenge text
        const advancedSearch = getAllByText(lozengeText).filter(
          (element) => !!element.closest('a'),
        )[0];

        fireEvent.click(advancedSearch, { screenX: 100 });
        await awaitAllEvents();

        const events = getFiredEvents('advancedSearchLink selected');
        expect(events).toHaveLength(1);
        expect(events[0]).toEqual({
          action: 'selected',
          actionSubject: 'advancedSearchLink',
          actionSubjectId,
          source: 'searchDialog',
          eventType: 'track',
          nonPrivacySafeAttributes: { query: 'blah blah' },
          attributes: {
            abTest: {
              abTestId: 'default',
              controlId: 'default',
              experimentId: 'nav-v3',
            },
            trigger: 'click',
            newTab: false,
            isLoading: false,
            frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
            queryHash: expectNonEmptyString,
            queryLength: 9,
            queryVersion: 1,
            wordCount: 2,
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
          },
        });
      });
    });
  });

  analyticTest('select "Advanced issue search"', async () => {
    const { getFiredEvents, findByText } = await setup();

    const advancedSearch = await findByText('Advanced issue search');

    fireEvent.click(advancedSearch, { screenX: 100 });
    await awaitAllEvents();

    const events = getFiredEvents('advancedSearchLink selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'jiraIssuesSearchLink',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: { query: '' },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        trigger: 'click',
        newTab: false,
        isLoading: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        wordCount: 0,
        searchSessionId: SEARCH_SESSION_ID,
        filters: undefined,
      },
    });
  });
});
