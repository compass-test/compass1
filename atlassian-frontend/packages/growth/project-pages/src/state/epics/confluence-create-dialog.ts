import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { ActionsObservable } from 'redux-observable';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  REDIRECT_TO_CONFLUENCE_CREATE,
  redirectToConfluenceCreateError,
} from '../actions';
import { getProjectSpaceKey } from '../confluence/connected-space/selectors';
import { getOrigin } from '../context/selectors';
import { Action } from 'redux';

export default (action$: ActionsObservable<any>, store: any) =>
  action$.ofType(REDIRECT_TO_CONFLUENCE_CREATE).switchMap(() => {
    const state = store.getState();
    const origin = getOrigin(state);
    const projectSpaceKey: string | null | undefined = getProjectSpaceKey(
      state,
    );
    if (!projectSpaceKey) {
      fetchFailed(
        'confluence.create.dialog.redirect',
        new Error('missing projectSpaceKey in project-pages state'),
      );
      return of(redirectToConfluenceCreateError());
    }
    fetchSuccess('confluence.create.dialog.redirect');
    let blankTemplateUrl = `/wiki/spaces/${projectSpaceKey}/overview?createDialog=true&createDialogSpaceKey=${projectSpaceKey}`;
    if (origin) {
      blankTemplateUrl = origin.addToUrl(blankTemplateUrl);
    }
    const newWnd = window.open(blankTemplateUrl, '_blank');
    if (newWnd) {
      newWnd.opener = null;
    }
    return empty<Action>();
  });
