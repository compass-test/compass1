import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import {
  FETCH_CONNECTED_SPACE_OR_PAGE_TITLE,
  updateConnectedSpaceOrPageContent,
  FetchConnectedSpaceOrPageTitleAction,
  fetchConnectedSpace,
} from '../actions';
import {
  getProjectPageLinkedId,
  getProjectSpaceKey,
  getProjectSpacePageId,
} from '../../state/confluence/connected-space/selectors';
import { State } from '../types';
import { Action } from 'redux';
import { getConfluencePageContent$ } from './requests';
import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import { ActionsObservable } from 'redux-observable';

const fetchConnectedSpaceOrPageTitleEpic: Epic<Action, State> = (
  action$,
  store,
) =>
  (action$.ofType(FETCH_CONNECTED_SPACE_OR_PAGE_TITLE) as ActionsObservable<
    FetchConnectedSpaceOrPageTitleAction
  >).switchMap<FetchConnectedSpaceOrPageTitleAction, any>(() => {
    const state = store.getState();
    const pageId =
      getProjectPageLinkedId(state) || getProjectSpacePageId(state);
    const isConnectedToPage = Boolean(getProjectPageLinkedId(state));
    const spaceKey = getProjectSpaceKey(state);
    // if we are connected to a space, use the fetchConnectedSpace to update the state
    if (
      state.featureFlags.isProjectPagesProductionisation &&
      spaceKey &&
      !isConnectedToPage
    ) {
      return of(fetchConnectedSpace(spaceKey));
    }
    if (!pageId) {
      return empty();
    }
    // otherwise fetch page content and update page title etc
    return getConfluencePageContent$(pageId)
      .mergeMap(({ title, _links: { webui, base } }) => {
        const url = `${base}${webui}`;
        fetchSuccess('confluence.content');
        return of(
          updateConnectedSpaceOrPageContent({
            title,
            url,
            isConnectedToPage,
            projectSpacePageTitleHasBeenFetched: true,
            iconUrl: null,
            pageId,
          }),
        );
      })
      .catch((err) => {
        fetchFailed('confluence.content', err);
        return of(
          updateConnectedSpaceOrPageContent({
            title: null,
            iconUrl: null,
            projectSpacePageTitleHasBeenFetched: true,
            pageId,
          }),
        );
      });
  });

export default fetchConnectedSpaceOrPageTitleEpic;
