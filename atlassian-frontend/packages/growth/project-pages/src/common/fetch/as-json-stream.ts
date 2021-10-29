import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { freeze, merge } from 'icepick';

import FetchError from './errors';
import { NO_CONTENT } from '../constants/http-status-codes';

const noContentStatus = NO_CONTENT;

const defaultOptions = freeze({
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Accept: ['application/json', 'text/javascript', '*/*'],
  },
});

// This function returns a JSON stream which emits a single JSON value on success, and throws
// an error on failure
// Pass the headersProcessor in the options to provide a callback function which can respond on headers.
const fetchJson$ = <TResponse = any>(
  url: string,
  options: { headersProcessor?: Function } & RequestInit = {},
): Observable<TResponse> => {
  const { headersProcessor, ...opts } = options;

  return Observable.of(url)
    .mergeMap(() => fetch(url, merge(defaultOptions, opts)))
    .mergeMap((response) => {
      if (!response.ok) {
        const { status } = response;
        return response.text().then((str) => {
          throw new FetchError(status, str);
        });
      }

      if (typeof headersProcessor === 'function') {
        headersProcessor(response.headers);
      }

      if (response.status === noContentStatus) {
        // We want it to return a `null` value.
        // Using `Observable.empty()` would just hang as `mergeMap`
        // will be waiting for values that would never come.
        return Observable.of(null);
      }

      return response.json();
    });
};

export default fetchJson$;
