import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { ActionsObservable } from 'redux-observable';

import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK,
  redirectToConfluenceTemplateDeepLinkError,
  RedirectToConfluenceTemplateDeepLinkAction,
} from '../actions';
import {
  getProjectSpaceKey,
  getProjectPageLinkedId,
} from '../confluence/connected-space/selectors';
import { getOrigin } from '../context/selectors';
import { createConfluenceDraft$, createConfluenceBlank$ } from './requests';
import { Action } from 'redux';

export default (
  action$: ActionsObservable<RedirectToConfluenceTemplateDeepLinkAction>,
  store: any,
) =>
  action$
    .ofType(REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK)
    .switchMap((action) => {
      const state = store.getState();
      const projectSpaceKey: string | null | undefined = getProjectSpaceKey(
        state,
      );
      const projectPageLinkedId = getProjectPageLinkedId(state);
      const origin = getOrigin(state);
      if (!projectSpaceKey) {
        fetchFailed(
          'confluence.template.redirect',
          new Error('missing projectSpaceKey in project-pages state'),
        );
        return of(redirectToConfluenceTemplateDeepLinkError());
      }

      const { templateId } = action;
      const { skipHowToUse } = action;
      const { openSideBar } = action;
      if (templateId === undefined) {
        fetchFailed(
          'confluence.template.redirect',
          new Error('missing templateId'),
        );
        return of(redirectToConfluenceTemplateDeepLinkError());
      }

      fetchSuccess('confluence.template.redirect');
      const newWnd = window.open('', '_blank');
      if (newWnd == null) {
        return empty<Action>();
      }
      newWnd.opener = null;
      if (skipHowToUse) {
        if (templateId === null) {
          // blank page
          return createConfluenceBlank$({
            spaceKey: projectSpaceKey,
            projectPageLinkedId,
          })
            .mergeMap((value) => {
              const blankUrl = value._links.base + value._links.editui;
              if (origin) {
                newWnd.location.href = origin.addToUrl(blankUrl);
              } else {
                newWnd.location.href = blankUrl;
              }
              return empty<Action>();
            })
            .catch(() => {
              fetchFailed(
                'confluence.template.redirect',
                new Error('failed to create new blank draft'),
              );
              newWnd.close();
              return of(redirectToConfluenceTemplateDeepLinkError());
            });
        }
        return createConfluenceDraft$({
          templateId,
          projectSpaceKey,
          projectPageLinkedId,
          pageTitle: action.pageTitle,
        })
          .mergeMap((value) => {
            // dictated by the shape of the response from confluence
            const draftUrl = value._links.base + value.content._links.editui;
            if (origin) {
              newWnd.location.href = origin.addToUrl(draftUrl);
            } else {
              newWnd.location.href = draftUrl;
            }
            return empty<Action>();
          })
          .catch(() => {
            fetchFailed(
              'confluence.template.redirect',
              new Error('failed to create new draft for selected template'),
            );
            newWnd.close();
            return of(redirectToConfluenceTemplateDeepLinkError());
          });
      }

      const createTemplateUrl = openSideBar
        ? `/wiki?createBlankFabricPage=true&spaceKey=${projectSpaceKey}${
            projectPageLinkedId ? `&parentPageId=${projectPageLinkedId}` : ''
          }`
        : `/wiki/discover/all-updates?createDialog=true&createDialogSpaceKey=${projectSpaceKey}${
            templateId ? `&createDialogBlueprintId=${templateId}` : ''
          }`;

      if (origin) {
        newWnd.location.href = origin.addToUrl(createTemplateUrl);
      } else {
        newWnd.location.href = createTemplateUrl;
      }
      return empty<Action>();
    });
