import { FuseOptions } from 'fuse.js';
import { ExternalUser } from '@atlaskit/user-picker';

export const SLACK_SERVICE = 'slack-invites';
export const GOOGLE_SERVICE = 'google-invites';
export const MICROSOFT_SERVICE = 'microsoft-invites';

export const WINDOW_WIDTH = 480;
export const WINDOW_HEIGHT = 640;

// default fuse options for external user fetching
export const FUSE_OPTIONS: FuseOptions<ExternalUser> = {
  keys: ['displayName', 'name', 'email', 'publicName'],
  threshold: 0.2,
};
export const MAX_USERS = 10;

// marketplace urls to take the user to if they do not have any connected slack workspaces
export const JIRA_SLACK_URL =
  'https://marketplace.atlassian.com/apps/1216863/jira-cloud-for-slack-official';
export const CONFLUENCE_SLACK_URL =
  'https://marketplace.atlassian.com/apps/1219518/confluence-cloud-for-slack-official';

export const EXPERIMENT_PRODUCTS = ['jira', 'confluence'];

export const GOOGLE_MAIL_DOMAINS = ['gmail.com', 'googlemail.com'];
