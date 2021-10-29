import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { ActionsObservable } from 'redux-observable';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  FETCH_CONNECTED_SPACE_BLUEPRINTS,
  fetchConnectedSpaceBlueprintsError,
  updateConnectedSpaceBlueprints,
} from '../actions';
import { getProjectSpaceKey } from '../confluence/connected-space/selectors';

import { fetchConnectedSpaceBlueprints$ } from './requests';
import { BlueprintData } from '../confluence/connected-space/types';

export default (action$: ActionsObservable<any>, store: any) =>
  action$.ofType(FETCH_CONNECTED_SPACE_BLUEPRINTS).switchMap(() => {
    const state = store.getState();
    const projectSpaceKey: string | null | undefined = getProjectSpaceKey(
      state,
    );
    if (!projectSpaceKey) {
      fetchFailed(
        'connected.space.blueprints',
        new Error('missing projectSpaceKey in project-pages state'),
      );
      return of(fetchConnectedSpaceBlueprintsError());
    }

    return fetchConnectedSpaceBlueprints$(projectSpaceKey)
      .map((value) => {
        fetchSuccess('connected.space.blueprints');
        return updateConnectedSpaceBlueprints(
          value.map(
            ({
              name,
              itemModuleCompleteKey,
              blueprintModuleCompleteKey,
              contentBlueprintId,
              skipHowToUse,
            }: BlueprintData) => ({
              name,
              itemModuleCompleteKey,
              blueprintModuleCompleteKey,
              contentBlueprintId,
              skipHowToUse,
            }),
          ),
        );
      })
      .catch((err) => {
        fetchFailed('connected.space.blueprints', err);
        return of(fetchConnectedSpaceBlueprintsError());
      });
  });
