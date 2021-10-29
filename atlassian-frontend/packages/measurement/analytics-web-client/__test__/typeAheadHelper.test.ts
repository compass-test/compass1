/* eslint no-underscore-dangle: ["error", { "allow": ["_queryLength", "_searchStartedTime"] }] */
import { TypeAheadHelper } from '../src';

const DUMMY_QUERY = 'myFirstQuery';
const EMPTY_QUERY = '';

const DUMMY_ACTION_EVENT = {
  actionSubject: 'mention',
  actionSubjectId: '836e0f2e-6b13-45b5-840a-55ce50578574',
  source: 'eventSource',
  containerType: 'space',
  containerId: '836e0f2e-6b13-45b5-840a-55ce50578574',
  objectType: 'page',
  objectId: 'ea9db061-6ae1-46c9-a46d-e0033e8bd3af',
  attributes: {
    selectionType: 'search',
  },
  tags: ['tagOne', 'tagTwo'],
};
const DATE_START = new Date(1000);
const DATE_RESULTS_RETURNED = new Date(1500);
const DATE_RESULT_SELECTED = new Date(2000);

describe('TypeAheadHelper', () => {
  const oldDate = window.Date;

  let mockEventCallback: any = null;
  let typeAheadHelper: any = null;

  function assertResultingEventMatchesBaseEventWithProperties(
    props = {},
    attrs = {},
  ) {
    const objectToMatch = {
      ...DUMMY_ACTION_EVENT,
      ...props,
    };

    objectToMatch.attributes = expect.objectContaining({
      ...DUMMY_ACTION_EVENT.attributes,
      ...attrs,
    });

    expect(mockEventCallback).toHaveBeenLastCalledWith(
      expect.objectContaining(objectToMatch),
    );
  }

  function assertResultingEventHasAttributes(attributes: any) {
    return assertResultingEventMatchesBaseEventWithProperties({}, attributes);
  }

  beforeEach(() => {
    mockEventCallback = jest.fn();
    // @ts-ignore
    window.Date = jest.fn(() => DATE_START);
    // @ts-ignore
    window.Date.now = jest.fn(() => DATE_START);

    typeAheadHelper = new TypeAheadHelper(
      mockEventCallback,
      DUMMY_ACTION_EVENT,
    );
  });

  afterEach(() => {
    window.Date = oldDate;
  });

  describe('search()', () => {
    test('should record the correct time and query length', () => {
      typeAheadHelper.search(DUMMY_QUERY);

      expect(typeAheadHelper._queryLength).toEqual(DUMMY_QUERY.length);

      expect(typeAheadHelper._searchStartedTime).toEqual(DATE_START);
    });

    test('should throw if query param is not provided', () => {
      expect(() => {
        typeAheadHelper.search();
      }).toThrow('Missing query param');
    });

    test('should allow an empty query param', () => {
      typeAheadHelper.search(EMPTY_QUERY);

      expect(typeAheadHelper._queryLength).toEqual(0);
      expect(typeAheadHelper._searchStartedTime).toEqual(DATE_START);
    });
  });

  describe('searched()', () => {
    test('should require query() to have been run first', () => {
      expect(() => {
        typeAheadHelper.searched([1, 2, 3]);
      }).toThrow('search() must be called before searched().');
    });
  });

  describe('searched()', () => {
    beforeEach(() => {
      typeAheadHelper.search(DUMMY_QUERY);
    });

    test('should return an event with the correct context & basic action details', () => {
      typeAheadHelper.searched([1, 2, 3]);

      assertResultingEventMatchesBaseEventWithProperties({
        action: 'searched',
      });
    });

    test('should return an event with the results attribute & original query', () => {
      typeAheadHelper.searched([1, 2, 3]);

      assertResultingEventHasAttributes({
        queryLength: DUMMY_QUERY.length,
        results: [1, 2, 3],
      });
    });

    test('should calculate the correct responseTimeMs attribute', () => {
      // @ts-ignore
      window.Date.now = jest.fn(() => DATE_RESULTS_RETURNED);

      // show the results
      typeAheadHelper.searched([1, 2, 3]);

      assertResultingEventHasAttributes({
        responseTimeMs: 500,
      });
    });

    test('should throw if results param is not provided', () => {
      expect(() => {
        typeAheadHelper.searched();
      }).toThrow('Missing results param');
    });
  });

  describe('selected()', () => {
    test('should require resultsSelected() to have been run first', () => {
      expect(() => {
        typeAheadHelper.selected(0);
      }).toThrow('searched() must be called before selected().');
    });
  });

  describe('selected()', () => {
    beforeEach(() => {
      typeAheadHelper.search(DUMMY_QUERY);
      // mock the date first so the calculations are predictable
      // @ts-ignore
      window.Date.now = jest.fn(() => DATE_RESULTS_RETURNED);
      typeAheadHelper.searched([1, 2, 3]);
    });

    test('should send the correct context and basic action details', () => {
      typeAheadHelper.selected(2);

      assertResultingEventMatchesBaseEventWithProperties({
        action: 'selected',
      });
    });

    test('should send the correct selectionIndex and query attributes', () => {
      typeAheadHelper.selected(2);
      assertResultingEventHasAttributes({
        queryLength: DUMMY_QUERY.length,
        selectionIndex: 2,
      });
    });

    test('should calculate the correct selectionTimeMs and searchTimeMs attribute', () => {
      // render some results first, as a real user would
      // @ts-ignore
      window.Date.now = jest.fn(() => DATE_RESULTS_RETURNED);
      typeAheadHelper.searched([1, 2, 3]);

      // update the date
      // @ts-ignore
      window.Date.now = jest.fn(() => DATE_RESULT_SELECTED);

      // choose a result
      typeAheadHelper.selected(2);

      // DATE_RESULTS_RETURNED - DATE_START
      assertResultingEventHasAttributes({
        selectionTimeMs: 500,
        searchTimeMs: 1000,
        selectedResultValue: 3,
      });
    });

    test('should throw if selectionIndex param is not provided', () => {
      expect(() => {
        typeAheadHelper.selected();
      }).toThrow('Missing selectionIndex param');
    });
  });
});
