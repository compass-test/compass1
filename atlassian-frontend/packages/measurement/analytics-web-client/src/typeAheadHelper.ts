/**
 * TypeAheadHelper is helper file which assists in
 * tracking analytics around typeahead components, such as mentions, in
 * a consistent way. It generates objects that can be passed into
 * an instance of analyticsWebClient to trigger events.
 *
 * Example usage:
 *
 * const typeAheadHelper = new TypeAheadHelper(
 *   webClient.sendTrackEvent,
 *   baseEvent // an object containing the action + additional context attributes
 * );
 *
 * mentionHelper.search('abc');
 * mentionHelper.searched(resultsArray);
 * mentionHelper.selected(selectedIndex);
 */

function combineWithBaseEvent(
  action: any,
  extraAttributes: any,
  baseEvent: any,
) {
  const event = { action, ...baseEvent };
  event.attributes = { ...extraAttributes, ...event.attributes };

  return event;
}

export default class TypeAheadHelper {
  _baseEvent: any;

  _lastQueryResultsTime: any;

  _lastResults: any;

  _onEvent: any;

  _queryLength: any;

  _searchStartedTime: any;

  /**
   * Constructs a new instance of TypeAheadHelper.
   *
   * @param {Function} onEvent the function to call when an analytics event must be fired.
   *  There will be one argument, the analytics event object.
   * @param {Object} baseEvent base event with action and context to use when triggering events.
   *  More details here: https://product-fabric.atlassian.net/wiki/x/XQCZFg
   */
  constructor(onEvent: any, baseEvent: any) {
    this._onEvent = onEvent;
    this._baseEvent = baseEvent;

    this._searchStartedTime = null;
    this._lastQueryResultsTime = null;
    this._queryLength = null;

    this._baseEvent = { ...baseEvent };
  }

  /**
   * Records the start time of the first web request
   * and a copy of the query length for sending later in an analytics event.
   *
   * It should be called before the web request is initially made.
   *
   * @param {String} query the string entered as the query
   */
  search(query: any) {
    if (!query && query !== '') {
      throw new Error('Missing query param');
    }
    this._searchStartedTime = Date.now();
    this._queryLength = (query || '').length;
  }

  /**
   * searched() tracks an event representing the completion of the web request
   * to fetch results for a given typeahead query.
   *
   * Events are structured as follows:
   *
   * <actionSubject>.searched {
   *    queryLength: 12, // length in characters
   *    responseTimeMs: 5023, // time to return results in milliseconds
   *    results: [ 'abc', '123' ] // actual result content
   * }
   *
   * It should be called after the response returns from the web server.
   *
   * @param {Array} results List of results returned by the server. MUST NOT CONTAIN UGC.
   */
  searched(results: any) {
    if (!results) {
      throw new Error('Missing results param');
    }

    if (this._queryLength === null) {
      throw new Error('search() must be called before searched().');
    }

    const responseTimeMs = Date.now() - this._searchStartedTime;

    this._lastQueryResultsTime = Date.now();
    this._lastResults = results;

    const extraAttributes = {
      responseTimeMs,
      queryLength: this._queryLength,
      results,
    };
    const event = combineWithBaseEvent(
      'searched',
      extraAttributes,
      this._baseEvent,
    );

    this._onEvent(event);
  }

  /**
   * selected() tracks an event representing one of the results in the typeahead
   * being chosen.
   *
   * Events are structured as follows:
   *
   * <actionSubject>.selected {
   *    queryLength: 12,
   *    selectionIndex: 0,
   *    selectionTimeMs: 123 // ms since the response came back
   *    searchTimeMs: 123 // ms since the search was made, i.e. selection + response time
   * }
   *
   * @param {Number} selectionIndex the index of the result was selected.
   */
  selected(selectionIndex: any) {
    if (!selectionIndex && selectionIndex !== 0) {
      throw new Error('Missing selectionIndex param');
    }

    if (!this._lastQueryResultsTime) {
      throw new Error('searched() must be called before selected().');
    }

    const now = Date.now();
    const selectionTimeMs = now - this._lastQueryResultsTime;
    const searchTimeMs = now - this._searchStartedTime;
    const selectedResultValue = this._lastResults[selectionIndex];

    const extraAttributes = {
      queryLength: this._queryLength,
      selectionIndex,
      selectionTimeMs,
      searchTimeMs,
      selectedResultValue,
    };

    const event = combineWithBaseEvent(
      'selected',
      extraAttributes,
      this._baseEvent,
    );

    this._onEvent(event);
  }
}
