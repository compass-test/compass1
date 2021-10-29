import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { ActionsObservable } from 'redux-observable';
import { empty } from 'rxjs/observable/empty';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import { SET_FIRST_SPACE_CREATED_FLAG } from '../actions';

import { putFirstSpaceCreatedFlag$ } from './requests';
import { Action } from 'redux';

export default (action$: ActionsObservable<any>) =>
  action$.ofType(SET_FIRST_SPACE_CREATED_FLAG).switchMap(() =>
    putFirstSpaceCreatedFlag$()
      .switchMap(() => {
        fetchSuccess('confluence.first.space.created.flag');
        return empty<Action>();
      })
      .catch((err) => {
        fetchFailed('confluence.first.space.created.flag', err);
        return empty<Action>();
      }),
  );
