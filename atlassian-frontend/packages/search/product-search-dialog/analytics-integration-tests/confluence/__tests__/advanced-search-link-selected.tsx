import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
} from '../setup';
import { fireEvent } from '@testing-library/react';
import { EXPECTED_FILTERS } from '../setup/analytics-test-setup';

const expectNonEmptyString = expect.stringMatching(/.+/);

describe('analytics - advanced search selected', () => {
  beforeAndAfterTestSetup();

  analyticTest('on pre query with mouse', async () => {
    const { getFiredEvents, findByText } = await setup();

    const advancedSearch = await findByText('Advanced search');

    fireEvent.click(advancedSearch, { screenX: 100 });
    await awaitAllEvents();

    const events = getFiredEvents('advancedSearchLink selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'confluenceAdvancedSearchLink',
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
        trigger: 'click',
        newTab: false,
        isLoading: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        wordCount: 0,
        searchSessionId: SEARCH_SESSION_ID,
      },
    });
  });

  analyticTest('on pre query using keyboard nav', async () => {
    const { getFiredEvents, getInputField } = await setup();

    const input = getInputField();

    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
      charCode: 38,
    });
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
      bubbles: true,
    });
    await awaitAllEvents();

    const events = getFiredEvents('advancedSearchLink selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'confluenceAdvancedSearchLink',
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
        trigger: 'return',
        newTab: false,
        isLoading: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        queryHash: expectNonEmptyString,
        queryLength: 0,
        queryVersion: 0,
        wordCount: 0,
        searchSessionId: SEARCH_SESSION_ID,
      },
    });
  });

  analyticTest('on post query with mouse', async () => {
    const { getFiredEvents, findByText, transitionToPostQuery } = await setup();

    await transitionToPostQuery('blah blah');

    const advancedSearch = await findByText('Advanced search');

    fireEvent.click(advancedSearch, { screenX: 100 });
    await awaitAllEvents();

    const events = getFiredEvents('advancedSearchLink selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'confluenceAdvancedSearchLink',
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
        trigger: 'click',
        newTab: false,
        isLoading: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        queryHash: expectNonEmptyString,
        queryLength: 9,
        queryVersion: 1,
        wordCount: 2,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
      },
    });
  });

  analyticTest('on post query using keyboard nav', async () => {
    const {
      getFiredEvents,
      transitionToPostQuery,
      getInputField,
    } = await setup();

    await transitionToPostQuery('blah blah');

    const input = getInputField();

    fireEvent.keyDown(input, {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
      charCode: 38,
    });
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
      bubbles: true,
    });
    await awaitAllEvents();

    const events = getFiredEvents('advancedSearchLink selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'confluenceAdvancedSearchLink',
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
        trigger: 'return',
        newTab: false,
        isLoading: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        queryHash: expectNonEmptyString,
        queryLength: 9,
        queryVersion: 1,
        wordCount: 2,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
      },
    });
  });

  analyticTest('on post query with filters', async () => {
    const { getFiredEvents, findByText, transitionToPostQuery } = await setup({
      abTest: {
        abTestId: 'default_filters-experiment',
        controlId: 'default',
        experimentId: 'filters-experiment',
      },
    });

    await transitionToPostQuery('blah blah');

    const advancedSearch = await findByText('Advanced search');

    fireEvent.click(advancedSearch, { screenX: 100 });
    await awaitAllEvents();

    const events = getFiredEvents('advancedSearchLink selected');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'confluenceAdvancedSearchLink',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: 'blah blah',
      },
      attributes: {
        abTest: {
          abTestId: 'default_filters-experiment',
          controlId: 'default',
          experimentId: 'filters-experiment',
        },
        trigger: 'click',
        newTab: false,
        isLoading: false,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        filters: EXPECTED_FILTERS,
        queryHash: expectNonEmptyString,
        queryLength: 9,
        queryVersion: 1,
        wordCount: 2,
        searchSessionId: SEARCH_SESSION_ID,
      },
    });
  });
});
