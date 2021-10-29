import { Notification } from '../types';

/**
 * [MD] This file is JUST for mocking data. Not sure where to put it yet
 */

type Builder = ((def: Notification) => Notification) | Partial<Notification>;

const confluenceNotification: Notification = {
  id: '1612806493619-7S_fOu7Twxj-X_fZ',
  timestamp: '2017-08-08T17:48:13.619Z',
  content: {
    type: 'DEFAULT',
    actors: [
      {
        displayName: 'Swati Katta',
        ari: 'ari:cloud:identity::user/5b0df44cb386fc51f32ad85b',
        avatarUrl:
          'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5b0df44cb386fc51f32ad85b/11fbb3aa-9cd5-4017-af32-7c58bba3a037/128',
      },
    ],
    message: 'Swati Katta изменяет страницу',
    entity: {
      title: 'Scaling Search Planning Meeting 2/1/2021',
      link: {
        url: 'https://pug.jira-dev.com/wiki/spaces/CCB/pages/17846140953',
      },
      icon: {
        url:
          'https://home-static.us-east-1.staging.public.atl-paas.net/confluence-page-icon.svg',
      },
    },
    path: [
      {
        title: 'Confluence',
        icon: {
          url:
            'https://home-static.us-east-1.staging.public.atl-paas.net/home/logo-confluence-blue.png',
        },
      },
      {
        title: 'Scaling Search Planning Meeting 2/1/2021',
        link: {
          url: 'https://pug.jira-dev.com/wiki/spaces/CCB/pages/17846140953',
        },
        icon: {
          url:
            'https://home-static.us-east-1.staging.public.atl-paas.net/confluence-page-icon.svg',
        },
      },
    ],
    actions: [],
    body: {
      items: [],
    },
  },
  analyticsAttributes: {
    cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
    registrationName: 'streamhub-confluence-page-like',
    registrationOwner: 'streamhub-confluence',
    registrationProduct: 'confluence',
  },
  readState: 'unread',
  bodyItemCount: 0,
};

const jiraNotification: Notification = {
  id: '1610345089869-11tRiBkBM4ZN1tuk',
  timestamp: '2021-01-11T06:04:49.869Z',
  content: {
    type: 'DEFAULT',
    actors: [
      {
        displayName: "Ze'ev Gilovitz",
        ari:
          'ari:cloud:identity::user/655363:ff83c986-7c0b-4134-b38d-5a64f33fa431',
        avatarUrl:
          'https://secure.gravatar.com/avatar/b2024e84d11d104aaee73bd5a1896ebd?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FZG-6.png',
      },
    ],
    message: "Ze'ev Gilovitz reacted to your comment",
    entity: {
      title: 'sup m8',
      link: {
        url: 'https://jdog.jira-dev.com/browse/CLIN-3',
      },
      icon: {
        url:
          'https://jdog.jira-dev.com/secure/viewavatar?size=medium&avatarId=21745&avatarType=issuetype',
      },
    },
    path: [
      {
        title: 'Jira',
        icon: {
          url:
            'https://home-static.us-east-1.staging.public.atl-paas.net/home/logo-jira-blue.png',
        },
      },
      {
        title: 'sup m8',
        link: {
          url: 'https://jdog.jira-dev.com/browse/CLIN-3',
        },
        icon: {
          url:
            'https://jdog.jira-dev.com/secure/viewavatar?size=medium&avatarId=21745&avatarType=issuetype',
        },
      },
    ],
    actions: [],
    body: {
      items: [],
    },
  },
  analyticsAttributes: {
    cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
    registrationName: 'streamhub-jira-issue-mention',
    registrationOwner: 'streamhub-jira',
    registrationProduct: 'jira',
  },
  readState: 'read',
  category: 'direct',
  bodyItemCount: 0,
};

const confluenceNotificationWithoutContent: Notification = {
  ...confluenceNotification,
  content: { ...confluenceNotification.content, body: { items: [] } },
};

const jiraNotificationWithoutContent: Notification = {
  ...jiraNotification,
  content: { ...jiraNotification.content, body: { items: [] } },
};

export const buildConfluenceNotificationWithoutContent = (
  builder: Builder,
): Notification =>
  typeof builder === 'function'
    ? builder(confluenceNotificationWithoutContent)
    : { ...confluenceNotificationWithoutContent, ...builder };

export const buildJiraNotificationWithoutContent = (
  builder: Builder,
): Notification =>
  typeof builder === 'function'
    ? builder(jiraNotificationWithoutContent)
    : { ...jiraNotificationWithoutContent, ...builder };

export const buildConfluenceNotification = (builder: Builder): Notification =>
  typeof builder === 'function'
    ? builder(confluenceNotification)
    : { ...confluenceNotification, ...builder };

export const buildJiraNotification = (builder: Builder): Notification =>
  typeof builder === 'function'
    ? builder(jiraNotification)
    : { ...jiraNotification, ...builder };
