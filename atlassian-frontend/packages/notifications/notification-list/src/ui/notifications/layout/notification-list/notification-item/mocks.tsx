import { LoadingState, ReadState } from '../../../../../common/types';
import { RenderableNotification } from '../../../../../services/use-notification-list-store/types';

export const fakeNotificationWithoutStatus: RenderableNotification = {
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
      link: { url: 'https://jdog.jira-dev.com/browse/CLIN-3' },
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
        title: 'CLIN-3',
        link: { url: 'https://jdog.jira-dev.com/browse/CLIN-3' },
      },
    ],
    actions: [],
    body: {
      items: [
        {
          appearance: 'PRIMARY',
          type: 'RICH_TEXT_CONTENT',
          document: {
            format: 'ADF',
            data:
              '{"version":1,"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"wowowowowow"}]}]}',
          },
        },
      ],
    },
  },
  readState: ReadState.READ,
  loadingState: LoadingState.COMPLETE,
  analyticsAttributes: {
    cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
    registrationName: 'streamhub-jira-issue-mention',
    registrationOwner: 'streamhub-jira',
    registrationProduct: 'jira',
  },
  category: 'direct',
  bodyItemCount: 1,
};

export const fakeNotificationWithStatus: RenderableNotification = {
  id: '1610341211607-pdlMrTzSDQ4JTddk',
  timestamp: '2021-01-11T05:00:11.607Z',
  content: {
    type: 'DEFAULT',
    actors: [
      {
        ari:
          'ari:cloud:identity::user/655363:94a9f153-8113-43b4-a7c6-f89088d57168',
        avatarUrl:
          'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/655363:94a9f153-8113-43b4-a7c6-f89088d57168/7d0483b5-111c-4156-9c83-f17c296c333b/128',
      },
    ],
    message: "You've been mentioned in a comment",
    entity: {
      title: 'Start Issue #1',
      link: {
        url:
          'https://lsmith.jira-dev.com/browse/STAR-1?focusedCommentId=10092&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-10092',
      },
      icon: {
        url: 'https://lsmith.jira-dev.com/images/icons/issuetypes/story.svg',
      },
      status: { value: 'Backlog', appearance: 'NEW' },
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
        title: 'STAR-1',
        link: {
          url:
            'https://lsmith.jira-dev.com/browse/STAR-1?focusedCommentId=10092&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-10092',
        },
      },
    ],
    actions: [],
    body: {
      items: [
        {
          appearance: 'PRIMARY',
          type: 'RICH_TEXT_CONTENT',
          document: {
            format: 'ADF',
            data:
              '{"version":1,"type":"doc","content":[{"type":"paragraph","content":[{"type":"mention","attrs":{"id":"5fb4f7aff8b01200695710f6","text":"Matthew Low"}},{"type":"text","text":" hello!"}]}]}',
          },
        },
      ],
    },
  },
  readState: ReadState.READ,
  loadingState: LoadingState.COMPLETE,
  category: 'direct',
  analyticsAttributes: {
    cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
    registrationName: 'streamhub-jira-issue-mention',
    registrationOwner: 'streamhub-jira',
    registrationProduct: 'jira',
  },
  bodyItemCount: 1,
};
