import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { ActionsObservable } from 'redux-observable';
import get from 'lodash/get';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  CHECK_CONFLUENCE_USER_PERMISSIONS,
  updateConfluenceUserAccess,
} from '../actions';
import { FORBIDDEN, OK } from '../confluence/user/types';

import { fetchConfluenceCurrentUser } from './requests';

export default (action$: ActionsObservable<any>) =>
  /* , store: Object */
  action$.ofType(CHECK_CONFLUENCE_USER_PERMISSIONS).switchMap(() =>
    fetchConfluenceCurrentUser()
      .mergeMap((value) => {
        fetchSuccess('confluence.user');

        if (get(value, 'operations.length')) {
          return of(updateConfluenceUserAccess(OK));
        }

        return of(updateConfluenceUserAccess(FORBIDDEN));
      })
      .catch((err) => {
        if (err.statusCode === 403) {
          return of(updateConfluenceUserAccess(FORBIDDEN));
        }

        fetchFailed('confluence.user', err);
        return empty();
      }),
  );
