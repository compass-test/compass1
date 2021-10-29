import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { ActionsObservable, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import {
  FETCH_CONNECTED_SPACE,
  updateConnectedSpaceOrPageContent,
  FetchConnectedSpaceAction,
} from '../actions';
import { State } from '../types';
import { Action } from 'redux';
import { getConfluenceSpace$ } from './requests';
import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';

const fetchConnectedSpaceEpic: Epic<Action, State> = (action$) =>
  (action$.ofType(FETCH_CONNECTED_SPACE) as ActionsObservable<
    FetchConnectedSpaceAction
  >).switchMap<FetchConnectedSpaceAction, any>(({ spaceKey }) => {
    return getConfluenceSpace$(spaceKey)
      .mergeMap(
        ({
          name,
          homepage,
          icon: { path: iconPath },
          _links: { base, webui },
        }) => {
          fetchSuccess('confluence.space');
          return of(
            updateConnectedSpaceOrPageContent({
              title: name,
              isConnectedToPage: false,
              projectSpacePageTitleHasBeenFetched: true,
              url: `${base}${webui}`,
              iconUrl: `${base}${iconPath}`,
              pageId: homepage?.id || null, // setting the id to null will cause root pages to be fetched
            }),
          );
        },
      )
      .catch((err) => {
        fetchFailed('confluence.space', err);
        return of(
          updateConnectedSpaceOrPageContent({
            title: null,
            iconUrl: null,
            projectSpacePageTitleHasBeenFetched: true,
            pageId: null,
          }),
        );
      });
  });

export default fetchConnectedSpaceEpic;
