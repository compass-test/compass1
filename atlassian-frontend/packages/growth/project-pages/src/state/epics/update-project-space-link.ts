import 'rxjs/add/operator/switchMap';
import { ActionsObservable } from 'redux-observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import {
  fetchConnectedSpaceBlueprints,
  UPDATE_PROJECT_SPACE_LINK,
} from '../actions';
import { Action } from 'redux';

export default (action$: ActionsObservable<any>) =>
  action$
    .ofType(UPDATE_PROJECT_SPACE_LINK)
    .switchMap(({ spaceKey }) =>
      spaceKey !== null ? of(fetchConnectedSpaceBlueprints()) : empty<Action>(),
    );
