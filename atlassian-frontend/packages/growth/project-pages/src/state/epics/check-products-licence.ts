import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { ActionsObservable } from 'redux-observable';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  CHECK_PRODUCTS_LICENCE_STATE,
  checkConfluenceUserPermissions,
  getProjectSpaceLink,
  updateConfluenceEdition,
  updateConfluenceState,
  updateJswEdition,
} from '../actions';
import { getCloudId } from '../context/selectors';
import {
  CONFLUENCE_ACTIVATING,
  CONFLUENCE_ACTIVE,
  CONFLUENCE_DEACTIVATED,
  CONFLUENCE_ERROR,
  CONFLUENCE_EXPIRED,
  CONFLUENCE_INACTIVE,
  CONFLUENCE_LOADING,
  ProductKeys,
} from '../context/types';
import { getProjectKey } from '../project/selectors';

import { requestProductLicenceState$ } from './requests';

const confluenceStateMap: { [key: string]: any } = {
  LOADING: CONFLUENCE_LOADING,
  INACTIVE: CONFLUENCE_INACTIVE,
  DEACTIVATED: CONFLUENCE_DEACTIVATED,
  ACTIVE: CONFLUENCE_ACTIVE,
  ACTIVATING: CONFLUENCE_ACTIVATING,
  EXPIRED: CONFLUENCE_EXPIRED,
  ERROR: CONFLUENCE_ERROR,
};

export default (action$: ActionsObservable<any>, store: any) =>
  action$.ofType(CHECK_PRODUCTS_LICENCE_STATE).switchMap(() => {
    const state = store.getState();
    const projectKey: string | null | undefined = getProjectKey(state);
    const cloudId: string | null | undefined = getCloudId(state);
    if (!projectKey) {
      fetchFailed(
        'confluence.license',
        new Error('missing projectKey in project-pages state'),
      );
      return of(updateConfluenceState(CONFLUENCE_ERROR));
    }
    if (!cloudId) {
      fetchFailed(
        'confluence.license',
        new Error('missing cloudId in project-pages state'),
      );
      return of(updateConfluenceState(CONFLUENCE_ERROR));
    }
    return requestProductLicenceState$(cloudId)
      .mergeMap((values) => {
        fetchSuccess('confluence.license');
        const confluence = values.products?.[ProductKeys.CONFLUENCE];
        const confluenceState = confluence
          ? confluenceStateMap[confluence.state]
          : CONFLUENCE_INACTIVE;

        const jswEdition =
          values.products?.[ProductKeys.JIRA_SOFTWARE]?.edition;
        return from([
          updateConfluenceState(confluenceState),
          updateConfluenceEdition(confluence?.edition),
          updateJswEdition(jswEdition),
          ...(confluenceState === CONFLUENCE_ACTIVE
            ? [
                checkConfluenceUserPermissions(),
                getProjectSpaceLink(projectKey),
              ]
            : []),
        ]);
      })
      .catch((err) => {
        fetchFailed('confluence.license', err);
        return of(updateConfluenceState(CONFLUENCE_ERROR));
      });
  });
