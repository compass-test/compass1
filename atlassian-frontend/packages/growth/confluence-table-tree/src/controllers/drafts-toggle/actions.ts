import { DraftsToggleState } from './types';
import { StoreActionApi } from 'react-sweet-state';
import {
  getUserProperty,
  putUserProperty,
} from '../../services/jira-user-properties';

const SHOW_DRAFTS_USER_PROPERTY =
  'growth.project-pages.confluence-table-tree.show-drafts';

export const setIsDraftsShown = (
  accountId: string,
  isDraftsShown: boolean,
) => async ({ setState }: StoreActionApi<DraftsToggleState>) => {
  setState({
    isDraftsShown,
    isTreeUpdatedForDrafts: false,
  });
  // save the preference
  await putUserProperty(accountId, SHOW_DRAFTS_USER_PROPERTY, isDraftsShown);
};

export const loadIsDraftsShownPreference = (accountId: string) => async ({
  setState,
}: StoreActionApi<DraftsToggleState>) => {
  // default is to show drafts
  const isDraftsShown = await getUserProperty(
    accountId,
    SHOW_DRAFTS_USER_PROPERTY,
    true,
  );
  setState({
    isDraftsShown,
    isTreeUpdatedForDrafts: false,
  });
};

export const setIsTreeUpdatedForDrafts = (
  isTreeUpdatedForDrafts: boolean | null,
) => ({ setState }: StoreActionApi<DraftsToggleState>) => {
  setState({
    isTreeUpdatedForDrafts,
  });
};
