import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
  EXPECTED_FILTERS,
} from '../setup';
import { fireEvent } from '@testing-library/react';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';

describe('analytics - text entered', () => {
  beforeAndAfterTestSetup();

  analyticTest('text entered from pre query', async () => {
    const { getFiredEvents, getInputField } = await setup();

    const input = getInputField();
    fireEvent.input(input, { target: { value: 'testing testing' } });
    await awaitAllEvents();

    const events = getFiredEvents('text entered');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'entered',
      actionSubject: 'text',
      actionSubjectId: 'searchDialogTextField',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: 'testing testing',
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        queryHash: expectNonEmptyString,
        queryLength: 15,
        queryVersion: 1,
        wordCount: 2,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
      },
    });
  });

  analyticTest('text entered from post query', async () => {
    const {
      getFiredEvents,
      getInputField,
      findByText,
      transitionToPostQuery,
      results: { pageBlogAttachmentSearchResults },
    } = await setup();

    await transitionToPostQuery();

    await findByText(pageBlogAttachmentSearchResults.results[0]!.title);

    fireEvent.input(getInputField(), {
      target: { value: 'testing testing' },
    });
    await awaitAllEvents();

    const events = getFiredEvents('text entered');
    expect(events).toHaveLength(2);
    expect(events[1]).toEqual({
      action: 'entered',
      actionSubject: 'text',
      actionSubjectId: 'searchDialogTextField',
      source: 'searchDialog',
      eventType: 'track',
      nonPrivacySafeAttributes: {
        query: 'testing testing',
      },
      attributes: {
        abTest: {
          abTestId: 'default',
          controlId: 'default',
          experimentId: 'nav-v3',
        },
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        isSticky: false,
        queryHash: expectNonEmptyString,
        queryLength: 15,
        queryVersion: 2,
        wordCount: 2,
        searchSessionId: SEARCH_SESSION_ID,
        filters: EXPECTED_FILTERS,
      },
    });
  });
});
