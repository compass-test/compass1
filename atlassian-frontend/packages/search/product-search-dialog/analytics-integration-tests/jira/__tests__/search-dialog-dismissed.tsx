import {
  setup,
  SEARCH_SESSION_ID,
  analyticTest,
  awaitAllEvents,
  beforeAndAfterTestSetup,
} from '../setup';
import { fireEvent } from '@testing-library/react';
import { expectNonEmptyString } from '../../../src/__tests__/__fixtures__/test-helper-functions';

describe('analytics - search dialog dismissed', () => {
  beforeAndAfterTestSetup();

  analyticTest('event is fired when dismissed by mouse', async () => {
    const { getFiredEvents, getElementOutsideDialog } = await setup();

    getElementOutsideDialog().focus();
    await awaitAllEvents();

    const events = getFiredEvents('searchDialog dismissed');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'dismissed',
      actionSubject: 'searchDialog',
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
        wordCount: 0,
        queryLength: 0,
        queryHash: expectNonEmptyString,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        filters: undefined,
      },
    });
  });

  analyticTest('event is fired when dismissed by keyboard escape', async () => {
    const { getFiredEvents, getInputField } = await setup();

    const input = getInputField();

    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    await awaitAllEvents();
    const events = getFiredEvents('searchDialog dismissed');
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      action: 'dismissed',
      actionSubject: 'searchDialog',
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
        wordCount: 0,
        queryLength: 0,
        queryHash: expectNonEmptyString,
        queryVersion: 0,
        searchSessionId: SEARCH_SESSION_ID,
        frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
        filters: undefined,
      },
    });
  });
});
