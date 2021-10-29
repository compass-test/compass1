import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs/observable/of';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  FETCH_CONFLUENCE_SPACES,
  fetchConfluenceSpacesError,
  updateConfluenceSpaces,
} from '../actions';

import { requestConfluenceSpaces$ } from './requests';

const decodeHtml = (html: any) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export default (action$: ActionsObservable<any>) =>
  action$.ofType(FETCH_CONFLUENCE_SPACES).switchMap(() =>
    requestConfluenceSpaces$()
      .map((value) => {
        fetchSuccess('confluence.spaces');
        return updateConfluenceSpaces(
          value.map((space) => ({
            spaceKey: space.id,
            spaceName: decodeHtml(space.text),
          })),
        );
      })
      .catch((err) => {
        fetchFailed('confluence.spaces', err);
        return of(fetchConfluenceSpacesError());
      }),
  );
