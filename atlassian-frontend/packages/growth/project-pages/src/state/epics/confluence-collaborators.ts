import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import {
  FETCH_CONFLUENCE_COLLABORATORS,
  updateConfluenceCollaborators,
} from '../actions';
import { getCloudId } from '../context/selectors';
import { State } from '../types';
import { Action } from 'redux';
import { getConfluenceCollaborators$ } from './requests';
import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';

const confluenceCollaboratorsEpic: Epic<Action, State> = (action$, store) =>
  action$.ofType(FETCH_CONFLUENCE_COLLABORATORS).switchMap(() => {
    const state = store.getState();
    const cloudId = getCloudId(state);
    return getConfluenceCollaborators$(cloudId)
      .mergeMap((response) => {
        fetchSuccess('confluence.collaborators');
        return of(updateConfluenceCollaborators(response));
      })
      .catch((err) => {
        fetchFailed('confluence.collaborators', err);
        return of(updateConfluenceCollaborators([]));
      });
  });

export default confluenceCollaboratorsEpic;
