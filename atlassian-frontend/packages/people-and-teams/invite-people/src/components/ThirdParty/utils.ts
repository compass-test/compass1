import { auth, AuthError } from '@atlaskit/outbound-auth-flow-client';
import { ExternalUser } from '@atlaskit/user-picker';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  JIRA_SLACK_URL,
  CONFLUENCE_SLACK_URL,
} from './constants';
import {
  DEFAULT_STARGATE_SERVICE_URL,
  EXUS_THIRDPARTY_PATH,
  INFI_URL,
} from '../../clients/common';
import { SlackWorkspace } from '../../types';
import { isProd } from '../../utils';

export const getManageAppsUrl = () =>
  isProd()
    ? 'https://id.atlassian.com/manage-profile/apps'
    : 'https://id.stg.internal.atlassian.com/manage-profile/apps';

function getAuthUrl(serviceKey: string, thirdPartyApiV2: boolean) {
  return thirdPartyApiV2
    ? `${DEFAULT_STARGATE_SERVICE_URL}${EXUS_THIRDPARTY_PATH}/connect?serviceKey=${serviceKey}`
    : `${DEFAULT_STARGATE_SERVICE_URL}${INFI_URL}/connect?serviceKey=${serviceKey}`;
}

// kicks off outbound-auth oauth flow for third party providers in a popup window
export function beginThirdPartyOauth(
  serviceKey: string,
  thirdPartyApiV2: boolean,
  callback: (success: boolean, error?: AuthError) => void,
) {
  const url = getAuthUrl(serviceKey, thirdPartyApiV2);
  const windowLeft = window.screen.width / 2 - WINDOW_WIDTH / 2;
  const windowTop = window.screen.height / 2 - WINDOW_HEIGHT / 2;
  const options =
    'menubar, width=' +
    WINDOW_WIDTH +
    ', height=' +
    WINDOW_HEIGHT +
    ', top=' +
    windowTop +
    ', left=' +
    windowLeft;

  auth(url, options)
    .then(() => {
      if (callback) {
        callback(true);
      }
    })
    .catch((error: AuthError) => {
      if (callback) {
        callback(false, error);
      }
    });
}

function deleteFalsyValues<T>(obj: T) {
  (Object.keys(obj) as Array<keyof T>)
    .filter((k) => !obj[k])
    .forEach((k) => delete obj[k]);
  return obj;
}

// merges two lists of external users by the emails, merging their sources (for merging results from the backend with slack users)
export function mergeExternalUsers(
  users1: ExternalUser[],
  users2: ExternalUser[],
) {
  const usersByEmail = [...users1, ...users2].reduce<{
    [email: string]: ExternalUser[];
  }>((result, currentValue) => {
    (result[currentValue.email!] = result[currentValue.email!] || []).push(
      currentValue,
    );
    return result;
  }, {});

  return Object.keys(usersByEmail).map((email) => {
    return usersByEmail[email].reduce(
      (result: ExternalUser, currentValue: ExternalUser) => {
        const sources = [
          ...new Set([...result.sources, ...currentValue.sources]),
        ];
        const mergedUser = {
          ...deleteFalsyValues(result),
          ...deleteFalsyValues(currentValue),
        };
        mergedUser.sources = sources;
        return mergedUser;
      },
    );
  });
}

// export logic for managing slack workspaces
export const manageSlackWorkspaces = (
  isConnected: boolean,
  slackWorkspaces: SlackWorkspace[],
  isSlackConnectDialogOpen: boolean,
  openSlackConnectDialog: () => void,
  onSelectedSlackWorkspaceChange: (slackWorkspace: SlackWorkspace) => void,
  product: string,
  closeModal?: () => void,
  forceOpenDialog?: boolean,
) => {
  if (slackWorkspaces.length === 0) {
    if (product === 'jira') {
      window.open(JIRA_SLACK_URL);
      if (closeModal) {
        closeModal();
      }
    } else if (product === 'confluence') {
      window.open(CONFLUENCE_SLACK_URL);
      if (closeModal) {
        closeModal();
      }
    }
  } else if (!isConnected && slackWorkspaces.length === 1) {
    onSelectedSlackWorkspaceChange(slackWorkspaces[0]);
  } else {
    if (!isSlackConnectDialogOpen || forceOpenDialog) {
      openSlackConnectDialog();
    }
  }
};
