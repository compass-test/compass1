import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import { ActionsObservable } from 'redux-observable';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  CREATE_CONFLUENCE_SPACE,
  createConfluenceSpaceError,
  putProjectSpaceLink,
  setFirstSpaceCreatedFlag,
} from '../actions';
import { getAvailableSpaces } from '../confluence/spaces/selectors';
import { getSuggestedKey } from '../context/selectors';
import { getProjectKey } from '../project/selectors';
import { getUserEnteredSpaceName } from '../ui/create-space/selectors';

import { requestCreateConfluenceSpace$ } from './requests';

export default (action$: ActionsObservable<any>, store: any) =>
  action$.ofType(CREATE_CONFLUENCE_SPACE).switchMap(() => {
    const state = store.getState();

    const availableSpaces = getAvailableSpaces(state);
    const confluenceSpaceName: string = getUserEnteredSpaceName(state);
    const confluenceSpaceKey: string | null | undefined = getSuggestedKey(
      state,
    );
    const projectKey: string = getProjectKey(state);

    if (
      confluenceSpaceKey === null ||
      confluenceSpaceKey === undefined ||
      confluenceSpaceKey === ''
    ) {
      return of(createConfluenceSpaceError());
    }

    return requestCreateConfluenceSpace$(
      confluenceSpaceName,
      confluenceSpaceKey,
      projectKey,
    )
      .switchMap(({ spaceKey, spaceUrl }) => {
        fetchSuccess('confluence.space.create');
        return from([
          putProjectSpaceLink({ spaceKey, spaceUrl, projectKey }),
          ...(availableSpaces.length === 0 ? [setFirstSpaceCreatedFlag()] : []),
        ]);
      })
      .catch((err) => {
        fetchFailed('confluence.space.create', err);
        return of(createConfluenceSpaceError());
      });
  });
