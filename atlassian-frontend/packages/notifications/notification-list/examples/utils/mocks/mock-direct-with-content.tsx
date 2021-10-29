import { NotificationResponse } from '../../../src/common/types';

// TODO: The payloads need a refresh or need a good old mock. The analyticAttributes don't match actual notifications.
export const mockDataDirectWithContent: NotificationResponse = {
  notifications: [
    {
      id: '1618990351633-MLcrvcRd_fNXKyLa',
      timestamp: '2021-04-21T07:32:31.633Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lachlan Smith',
            ari:
              'ari:cloud:identity::user/557058:75f3ce80-fb00-448b-b24d-04d6e7919577',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:75f3ce80-fb00-448b-b24d-04d6e7919577/66259c01-ae43-40aa-87ca-9070e2f44731/128',
          },
        ],
        message: 'Lachlan Smith replied to your comment',
        entity: {
          title: 'WIP Notification Drawer Analytic Events - 2021 ed.',
          link: {
            url:
              'https://product-fabric.atlassian.net/wiki/spaces/YW/pages/2444202520?focusedCommentId=2588708904#comment-2588708904',
          },
          icon: {
            url:
              'https://home-static.us-east-1.prod.public.atl-paas.net/confluence-page-icon.svg',
          },
        },
        path: [
          {
            title: 'Confluence',
            icon: {
              url:
                'https://home-static.us-east-1.prod.public.atl-paas.net/home/logo-confluence-blue.png',
            },
          },
          {
            title: 'Your Work',
            link: {
              url: 'https://product-fabric.atlassian.net/wiki/spaces/YW',
            },
          },
        ],
        actions: [],
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'QUOTED',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"I see an ","type":"text"},{"text":"attributes.errorBoundaryType","type":"text","marks":[{"type":"code"}]},{"text":" attribute in the code, is this going to have the same type as ","type":"text"},{"text":"actionSubjectId: root | adf | notificationItem","type":"text","marks":[{"type":"code"}]},{"text":"? or something else?","type":"text"}]}],"version":1}',
              },
              author: {
                ari: 'ari:cloud:identity::user/5fb4ff6c0dd553006f374da6',
              },
            },
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"Great point - I\'ve seen them as being similar things. ","type":"text"},{"type":"mention","attrs":{"id":"5fbe3915aca10c006979aeec","text":"@Josh Maloney"}},{"text":" / ","type":"text"},{"type":"mention","attrs":{"id":"5ee0ad4cdd6ecb0ab514507a","text":"@Mike Dao"}},{"text":"  thoughts?","type":"text"}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'read',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b:content/2444202520',
      },
      category: 'direct',
      bodyItemCount: 2,
      analyticsAttributes: {
        cloudId: 'DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618990351633-MLcrvcRd_fNXKyLq',
      timestamp: '2021-04-21T07:32:31.633Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lachlan Smith',
            ari:
              'ari:cloud:identity::user/557058:75f3ce80-fb00-448b-b24d-04d6e7919577',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:75f3ce80-fb00-448b-b24d-04d6e7919577/66259c01-ae43-40aa-87ca-9070e2f44731/128',
          },
        ],
        message: 'Lachlan Smith replied to your comment',
        entity: {
          title: 'WIP Notification Drawer Analytic Events - 2021 ed.',
          link: {
            url:
              'https://product-fabric.atlassian.net/wiki/spaces/YW/pages/2444202520?focusedCommentId=2588708904#comment-2588708904',
          },
          icon: {
            url:
              'https://home-static.us-east-1.prod.public.atl-paas.net/confluence-page-icon.svg',
          },
        },
        path: [
          {
            title: 'Confluence',
            icon: {
              url:
                'https://home-static.us-east-1.prod.public.atl-paas.net/home/logo-confluence-blue.png',
            },
          },
          {
            title: 'Your Work',
            link: {
              url: 'https://product-fabric.atlassian.net/wiki/spaces/YW',
            },
          },
        ],
        actions: [],
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'QUOTED',
              document: {
                format: 'TEXT',
                data: 'Lalalalalalal',
              },
              author: {
                ari: 'ari:cloud:identity::user/5fb4ff6c0dd553006f374da6',
              },
            },
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"Good point - I\'ve seen them as being similar things. ","type":"text"},{"type":"mention","attrs":{"id":"5fbe3915aca10c006979aeec","text":"@Josh Maloney"}},{"text":" / ","type":"text"},{"type":"mention","attrs":{"id":"5ee0ad4cdd6ecb0ab514507a","text":"@Mike Dao"}},{"text":"  thoughts?","type":"text"}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'read',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b:content/2444202520',
      },
      category: 'direct',
      bodyItemCount: 2,
      analyticsAttributes: {
        cloudId: 'DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1619019223993-Mnno0Mrmp8voOktW',
      timestamp: '2021-04-21T15:33:43.993Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Mike Egan',
            ari: 'ari:cloud:identity::user/5b0df3de4d941a51f0da33f1',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5b0df3de4d941a51f0da33f1/dc402e67-ae4c-469e-9e55-d547978fc12f/128',
          },
        ],
        message: 'Mike Egan edited a page',
        entity: {
          title:
            'How-to: Build, modify and use the atlassian-frontend library (with confluence-frontend)',
          link: {
            url: 'https://pug.jira-dev.com/wiki/spaces/CFE/pages/17819141327',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/17819141327',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618943135821-Z9f2NXXLUQWjEmHb',
      timestamp: '2021-04-20T18:25:35.821Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Mike Egan',
            ari: 'ari:cloud:identity::user/5b0df3de4d941a51f0da33f1',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5b0df3de4d941a51f0da33f1/dc402e67-ae4c-469e-9e55-d547978fc12f/128',
          },
        ],
        message: 'Mike Egan edited a page',
        entity: {
          title: 'Customer facing tickets',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/3639607305/Customer+facing+tickets',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/3639607305',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618934243036-zn81HRqV6DZSHiVG',
      timestamp: '2021-04-20T15:57:23.036Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Saba Bokhari',
            ari: 'ari:cloud:identity::user/5cbfb1457742d70ffbc7881c',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5cbfb1457742d70ffbc7881c/bed698a0-2b04-490d-99e3-7cc6673ff690/128',
          },
        ],
        message: 'Saba Bokhari commented on a page',
        entity: {
          title: 'Confluence Cloud - Tech Talks Schedule',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CONFDEV/pages/4132470803/Confluence+Cloud+-+Tech+Talks+Schedule?focusedCommentId=20681622432#comment-20681622432',
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
            title: 'Confluence Development',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CONFDEV',
            },
          },
        ],
        actions: [],
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"fyi summit/team 2021 is on this day, so ppl ","type":"text"},{"text":"may","type":"text","marks":[{"type":"em"}]},{"text":" have conflicts on this tech talk date","type":"text"}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4132470803',
      },
      bodyItemCount: 1,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618933792214-hP6DNEKJmXvG_DRX',
      timestamp: '2021-04-20T15:49:52.214Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Jeevjyot Chhabda',
            ari: 'ari:cloud:identity::user/5e314cd1fae00f0cb3ace8ae',
            avatarUrl:
              'https://secure.gravatar.com/avatar/4a8955172d75c80875fa0378391a9765?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FJC-1.png',
          },
        ],
        message: 'Jeevjyot Chhabda and Saba Bokhari edited a page',
        entity: {
          title: 'Confluence Cloud - Tech Talks Schedule',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CONFDEV/pages/4132470803/Confluence+Cloud+-+Tech+Talks+Schedule',
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
            title: 'Confluence Development',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CONFDEV',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4132470803',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618933764272-UCTFg5IBbzM3SK0F',
      timestamp: '2021-04-20T15:49:24.272Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Jeevjyot Chhabda',
            ari: 'ari:cloud:identity::user/5e314cd1fae00f0cb3ace8ae',
            avatarUrl:
              'https://secure.gravatar.com/avatar/4a8955172d75c80875fa0378391a9765?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FJC-1.png',
          },
        ],
        message: 'Jeevjyot Chhabda commented on a page',
        entity: {
          title: 'Confluence Cloud - Tech Talks Schedule',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CONFDEV/pages/4132470803/Confluence+Cloud+-+Tech+Talks+Schedule?focusedCommentId=20681589678#comment-20681589678',
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
            title: 'Confluence Development',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CONFDEV',
            },
          },
        ],
        actions: [],
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"You’re absolutely right, ","type":"text"},{"type":"mention","attrs":{"id":"5cbfb1457742d70ffbc7881c","text":"@Saba Bokhari"}},{"text":" ! Thanks for letting us know. Just changed ","type":"text"},{"type":"emoji","attrs":{"id":"1f642","text":"🙂","shortName":":slight_smile:"}},{"text":" ","type":"text"}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4132470803',
      },
      bodyItemCount: 1,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618933684201-1N79oOq28hKTjW9t',
      timestamp: '2021-04-20T15:48:04.201Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Saba Bokhari',
            ari: 'ari:cloud:identity::user/5cbfb1457742d70ffbc7881c',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5cbfb1457742d70ffbc7881c/bed698a0-2b04-490d-99e3-7cc6673ff690/128',
          },
        ],
        message: 'Saba Bokhari commented on a page',
        entity: {
          title: 'Confluence Cloud - Tech Talks Schedule',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CONFDEV/pages/4132470803/Confluence+Cloud+-+Tech+Talks+Schedule?focusedCommentId=20681622405#comment-20681622405',
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
            title: 'Confluence Development',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CONFDEV',
            },
          },
        ],
        actions: [],
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"mention","attrs":{"id":"5e314cd1fae00f0cb3ace8ae","text":"@Jeevjyot Chhabda"}},{"text":" ","type":"text"},{"type":"mention","attrs":{"id":"5aea8642eee87f2e3151c7a3","text":"@Mikhael Tanutama"}},{"text":" shouldn’t this be the 28th of April?","type":"text"}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4132470803',
      },
      bodyItemCount: 1,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618418827831-isTjguZatR_EEfCj',
      timestamp: '2021-04-14T16:47:07.831Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Mikhael Tanutama',
            ari: 'ari:cloud:identity::user/5aea8642eee87f2e3151c7a3',
            avatarUrl:
              'https://secure.gravatar.com/avatar/16668fd980c86c6f7700e4340d52e2e8?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FMT-0.png',
          },
        ],
        message: 'Mikhael Tanutama edited a page',
        entity: {
          title: 'Confluence Cloud - Tech Talks Schedule',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CONFDEV/pages/4132470803/Confluence+Cloud+-+Tech+Talks+Schedule',
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
            title: 'Confluence Development',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CONFDEV',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4132470803',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618357651899-Ob4hdEFBfnVDBl-H',
      timestamp: '2021-04-13T23:47:31.899Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: 'Alert Runbook: Pollinator E-MAU Check',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/4303948033/Alert+Runbook%3A+Pollinator+E-MAU+Check',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4303948033',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1618335923924-dzbKNl5aBxxeDZPE',
      timestamp: '2021-04-13T17:45:23.924Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617990513073-8bdE0PccEHjMe4eu',
      timestamp: '2021-04-09T17:48:33.073Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617989280039-88fE5YQBLYLv-_b-',
      timestamp: '2021-04-09T17:28:00.039Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers created a page',
        entity: {
          title: '2021-04-12 to 2021-04-19',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20629521539/2021-04-12+to+2021-04-19',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20629521539',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617927495570-PTz29Z9x70BEI40z',
      timestamp: '2021-04-09T00:18:15.570Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617910475626--Bi9i6YyWJksslSF',
      timestamp: '2021-04-08T19:34:35.626Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a blog post',
        entity: {
          title: 'Please handle GraphQL errors properly',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/blog/2021/03/03/17874389778/Please+handle+GraphQL+errors+properly',
          },
          icon: {
            url:
              'https://home-static.us-east-1.staging.public.atl-paas.net/confluence-blogpost-icon.svg',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/17874389778',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-blogpost-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617904551555-EVzzVIlF_gzczfrQ',
      timestamp: '2021-04-08T17:55:51.555Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617838726910-SbOX9G1OFgWEMHxf',
      timestamp: '2021-04-07T23:38:46.910Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Ruslan Arkhipau',
            ari:
              'ari:cloud:identity::user/655363:b490fc0f-a387-4389-90e7-01e5664187b9',
            avatarUrl:
              'https://secure.gravatar.com/avatar/1b240968f7d0113f85c5dd2a47bc356a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FRA-1.png',
          },
        ],
        message: 'Ruslan Arkhipau edited a page',
        entity: {
          title: '2021-03-29 to 2021-04-05',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20619461335/2021-03-29+to+2021-04-05',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20619461335',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617830503040-QD4EZb3Jcrm9d35-',
      timestamp: '2021-04-07T21:21:43.040Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Eric Le',
            ari:
              'ari:cloud:identity::user/655363:3b2875df-e192-4e6b-a8e6-246c5eb388e7',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/655363:3b2875df-e192-4e6b-a8e6-246c5eb388e7/b6188b22-1a2e-4fcf-84a9-99e867e79ee2/128',
          },
        ],
        message: 'Eric Le commented on a page',
        entity: {
          title: 'More details on confluence-object-provider',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/7375325805/More+details+on+confluence-object-provider?focusedCommentId=20627428009#comment-20627428009',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"You need to build your docker image first by running ","type":"text"},{"text":"docker-compose build","type":"text","marks":[{"type":"code"}]}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'unread',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/7375325805',
      },
      bodyItemCount: 1,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617779844313-qJ6tuOoBDSlycBxh',
      timestamp: '2021-04-07T07:17:24.313Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617768267201-VUx-urBgFRUSn2Ef',
      timestamp: '2021-04-07T04:04:27.201Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Josh Maloney',
            ari: 'ari:cloud:identity::user/5fbe2b563b4f590068a5bda9',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5fbe2b563b4f590068a5bda9/4f54a147-7458-4b6a-a5c5-5b4d7fca79a1/128',
          },
        ],
        message: 'Josh Maloney created a page',
        entity: {
          title: 'Notifications List',
          link: {
            url:
              'https://lsmith.jira-dev.com/wiki/spaces/~915416093/pages/981827585/Notifications+List',
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
            title: 'Lachlan Smith',
            link: {
              url: 'https://lsmith.jira-dev.com/wiki/spaces/~915416093',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:5d188cb3-680f-4c25-a634-f45a71318789:content/981827585',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: '5d188cb3-680f-4c25-a634-f45a71318789',
        registrationName: 'streamhub-confluence-page-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617724624584-_JgzrhgGH-P2nR07',
      timestamp: '2021-04-06T15:57:04.584Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Jeevjyot Chhabda',
            ari: 'ari:cloud:identity::user/5e314cd1fae00f0cb3ace8ae',
            avatarUrl:
              'https://secure.gravatar.com/avatar/4a8955172d75c80875fa0378391a9765?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FJC-1.png',
          },
        ],
        message: 'Jeevjyot Chhabda edited a page',
        entity: {
          title: 'Confluence Cloud - Tech Talks Schedule',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CONFDEV/pages/4132470803/Confluence+Cloud+-+Tech+Talks+Schedule',
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
            title: 'Confluence Development',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CONFDEV',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4132470803',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617665209604-cVDls0b3qQLZn9GY',
      timestamp: '2021-04-05T23:26:49.604Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617660887423-6wFTcxCKO8TcbIGD',
      timestamp: '2021-04-05T22:14:47.423Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Eric Le',
            ari:
              'ari:cloud:identity::user/655363:3b2875df-e192-4e6b-a8e6-246c5eb388e7',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/655363:3b2875df-e192-4e6b-a8e6-246c5eb388e7/b6188b22-1a2e-4fcf-84a9-99e867e79ee2/128',
          },
        ],
        message: 'Eric Le created a page',
        entity: {
          title: 'eric very first draft',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/17879926573/eric+very+first+draft',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/17879926573',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617653622937-A8tl81GvWjK6tawV',
      timestamp: '2021-04-05T20:13:42.937Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lauren Speers',
            ari: 'ari:cloud:identity::user/5cc8eb80c2e4550e3df45600',
            avatarUrl:
              'https://secure.gravatar.com/avatar/509ecc01f36adae8d62f1217517de47b?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLS-1.png',
          },
        ],
        message: 'Lauren Speers edited a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617407980554-b7eCg1GMVmDWvEWs',
      timestamp: '2021-04-02T23:59:40.554Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Gordie Johnson',
            ari: 'ari:cloud:identity::user/5fbe2b04facfd60076ecb86e',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5fbe2b04facfd60076ecb86e/efa73794-8923-46d2-9807-f3fd925325a0/128',
          },
        ],
        message: 'Gordie Johnson edited a blog post',
        entity: {
          title: 'Please handle GraphQL errors properly',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/blog/2021/03/03/17874389778/Please+handle+GraphQL+errors+properly',
          },
          icon: {
            url:
              'https://home-static.us-east-1.staging.public.atl-paas.net/confluence-blogpost-icon.svg',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/17874389778',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-blogpost-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617398337425-dTUr3Xyc0aSoJ-Ul',
      timestamp: '2021-04-02T21:18:57.425Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Ruslan Arkhipau',
            ari:
              'ari:cloud:identity::user/655363:b490fc0f-a387-4389-90e7-01e5664187b9',
            avatarUrl:
              'https://secure.gravatar.com/avatar/1b240968f7d0113f85c5dd2a47bc356a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FRA-1.png',
          },
        ],
        message: 'Ruslan Arkhipau created a page',
        entity: {
          title: '2021-04-05 to 2021-04-12',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20623917701/2021-04-05+to+2021-04-12',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20623917701',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617306222087-a8p6eFE6hkvuslMU',
      timestamp: '2021-04-01T19:43:42.087Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Ruslan Arkhipau',
            ari:
              'ari:cloud:identity::user/655363:b490fc0f-a387-4389-90e7-01e5664187b9',
            avatarUrl:
              'https://secure.gravatar.com/avatar/1b240968f7d0113f85c5dd2a47bc356a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FRA-1.png',
          },
        ],
        message: 'Ruslan Arkhipau edited a page',
        entity: {
          title: 'Alert Runbook: JS error rate is elevated',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/6037733405/Alert+Runbook%3A+JS+error+rate+is+elevated',
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
            title: 'Confluence Frontend',
            link: {
              url: 'https://pug.jira-dev.com/wiki/spaces/CFE',
            },
          },
        ],
        actions: [],
        body: {
          items: [],
        },
      },
      readState: 'read',
      category: 'direct',
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/6037733405',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-page-update',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
  ],
  continuationToken: '1617306222087-a8p6eFE6hkvuslMU',
};
