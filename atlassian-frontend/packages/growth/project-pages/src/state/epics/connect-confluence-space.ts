import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { ActionsObservable } from 'redux-observable';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  CONNECT_CONFLUENCE_SPACE,
  putProjectSpaceLink,
  putProjectSpaceLinkError,
} from '../actions';
import { getProjectKey } from '../project/selectors';
import { getSelectedSpace } from '../ui/connect-space/selectors';

export default (action$: ActionsObservable<any>, store: any) =>
  action$.ofType(CONNECT_CONFLUENCE_SPACE).map(() => {
    const state = store.getState();

    const projectKey: string | null | undefined = getProjectKey(state);
    const selectedSpace = getSelectedSpace(state);

    if (!projectKey) {
      fetchFailed('connect.confluence.space', new Error('missing projectKey'));
      return putProjectSpaceLinkError();
    }

    if (!selectedSpace || !selectedSpace.spaceKey) {
      fetchFailed(
        'connect.confluence.space',
        new Error('missing selected space spaceKey'),
      );
      return putProjectSpaceLinkError();
    }
    const { spaceKey, spaceUrl } = selectedSpace;
    fetchSuccess('connect.confluence.space');
    return putProjectSpaceLink({
      projectKey,
      spaceKey,
      spaceUrl,
    });
  });
