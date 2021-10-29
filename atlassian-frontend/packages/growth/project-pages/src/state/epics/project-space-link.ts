import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { concat } from 'rxjs/observable/concat';

import { sendTrackAnalyticsEvent } from '../../common/analytics/analytics-web-client';
import { NOT_FOUND } from '../../common/constants/http-status-codes';
import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  GET_PROJECT_SPACE_LINK,
  getProjectSpaceLinkError,
  PUT_PROJECT_SPACE_LINK,
  putProjectSpaceLinkError,
  successfullyConnectedSpace,
  fetchConnectedSpace,
  updateProjectSpaceLink,
  updateConnectedSpaceOrPageContent,
  PutProjectSpaceLinkAction,
} from '../actions';
import { getSelectedSpace } from '../ui/connect-space/selectors';
import { getUserEnteredSpaceName } from '../ui/create-space/selectors';

import {
  fetchProjectSpaceLinkViaXflow$,
  putProjectSpaceLinkViaXflow$,
  retrieveRootPageId$,
} from './requests';
import { getCloudId } from '../context/selectors';
import { Action, MiddlewareAPI } from 'redux';
import { State } from '../types';

const missingCloudId = () => {
  sendTrackAnalyticsEvent({
    source: 'space.create',
    action: 'missing',
    actionSubject: 'cloudId',
    attributes: { errorMessage: 'Missing cloudId in tenant context' },
  });
};

const updateProjectSpaceAnalytics = () => {
  sendTrackAnalyticsEvent({
    source: 'project.space',
    action: 'update',
    actionSubject: 'link',
  });
};

/**
 * Finds the root page of the space intended to be linked to the project and
 * sends a PUT request to xflow to store the project + space link
 * @param action$
 */
const putProjectSpaceLink = (
  action$: ActionsObservable<PutProjectSpaceLinkAction>,
  store: MiddlewareAPI<State>,
) =>
  action$
    .ofType(PUT_PROJECT_SPACE_LINK)
    .switchMap((action: PutProjectSpaceLinkAction) => {
      const state = store.getState();
      const { spaceKey, spaceUrl, projectKey } = action;
      const selectedSpace = getSelectedSpace(state);
      const userEnteredSpaceName: string = getUserEnteredSpaceName(state);
      const connectedSpaceOrPageTitle =
        selectedSpace?.linkedPageTitle ||
        selectedSpace?.spaceName ||
        userEnteredSpaceName;
      const connectedSpaceOrPageUrl =
        selectedSpace?.linkedPageUrl || selectedSpace?.spaceUrl || spaceUrl;
      const isConnectedToPage = Boolean(selectedSpace?.linkedPageTitle);
      const cloudId = getCloudId(state);
      if (!cloudId) {
        missingCloudId();
        return putProjectSpaceLinkError() as any;
      }
      // mostly a copy & paste block to reduce risk of changing isProjectPagesProductionisation=false behaviour,
      // and to make it easy to clean up fully productionised
      if (state.featureFlags.isProjectPagesProductionisation) {
        return putProjectSpaceLinkViaXflow$({
          spaceKey,
          projectKey,
          linkedPageId: selectedSpace?.linkedPageId,
          cloudId,
          pageId: 'undefined', // TODO dummy value to be removed from xflow (currently a required param)
        })
          .switchMap(() => {
            fetchSuccess('put.project.space', { spaceKey, projectKey });
            const updateLinkAction = isConnectedToPage
              ? updateConnectedSpaceOrPageContent({
                  title: connectedSpaceOrPageTitle,
                  url: connectedSpaceOrPageUrl,
                  projectSpacePageTitleHasBeenFetched: true,
                  isConnectedToPage,
                  iconUrl: null,
                  pageId: null,
                })
              : fetchConnectedSpace(spaceKey);
            return concat(
              of(
                successfullyConnectedSpace(
                  connectedSpaceOrPageTitle,
                  isConnectedToPage,
                ),
              ),
              of(
                updateProjectSpaceLink(
                  spaceKey,
                  null,
                  selectedSpace?.linkedPageId,
                ),
              ),
              of(updateLinkAction),
            );
          })
          .catch((err) => {
            fetchFailed('put.project.space', err);
            return of(putProjectSpaceLinkError());
          });
      }
      return retrieveRootPageId$(spaceKey)
        .switchMap((rootPageId) =>
          putProjectSpaceLinkViaXflow$({
            spaceKey,
            projectKey,
            pageId: rootPageId,
            linkedPageId: selectedSpace?.linkedPageId,
            cloudId,
          }).switchMap(() => {
            fetchSuccess('put.project.space', { spaceKey, projectKey });
            return concat(
              of(
                updateConnectedSpaceOrPageContent({
                  title: connectedSpaceOrPageTitle,
                  url: connectedSpaceOrPageUrl,
                  isConnectedToPage,
                  iconUrl: null,
                  pageId: rootPageId,
                }),
              ),
              of(
                successfullyConnectedSpace(
                  connectedSpaceOrPageTitle,
                  isConnectedToPage,
                ),
              ),
              of(
                updateProjectSpaceLink(
                  spaceKey,
                  rootPageId,
                  selectedSpace?.linkedPageId,
                ),
              ),
            );
          }),
        )
        .catch((err) => {
          fetchFailed('put.project.space', err);
          return of(putProjectSpaceLinkError());
        });
    });

/**
 * Sends a GET request to xflow to retrieve the project + space link
 * Note: returned space may have been deleted already. Another issue should handle this.
 * @param action$
 */
const getProjectSpaceLink = (
  action$: ActionsObservable<any>,
  store: MiddlewareAPI<State>,
) =>
  action$.ofType(GET_PROJECT_SPACE_LINK).switchMap((action) => {
    const state = store.getState();
    const { projectKey } = action;
    const cloudId = getCloudId(state);

    if (!cloudId) {
      throw new Error('missing cloudId in tenant context');
    }
    return fetchProjectSpaceLinkViaXflow$(cloudId, projectKey)
      .map(({ spaceKey, pageId: fetchedPageId, linkedPageId }) => {
        fetchSuccess('fetch.project.space');
        updateProjectSpaceAnalytics();
        // we don't actually want to use the stored pageId in the productionised codepath
        const pageId = state.featureFlags.isProjectPagesProductionisation
          ? null
          : fetchedPageId;
        return updateProjectSpaceLink(
          spaceKey || null,
          pageId || null,
          linkedPageId,
        );
      })
      .catch((err: any) => {
        if (err.statusCode === NOT_FOUND) {
          // no project space stored previously. Treat as success and clear confluence space link
          fetchSuccess('updated.previously.empty.project.space');
          return of(updateProjectSpaceLink(null, null)) as any;
        }
        fetchFailed('fetch.project.space', err);
        return of(getProjectSpaceLinkError());
      });
  });

export default combineEpics(putProjectSpaceLink, getProjectSpaceLink) as Epic<
  Action,
  State
>;
