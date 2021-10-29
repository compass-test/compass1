import { NotificationResponse } from '../../../src/common/types';

export const mockDataWithContent: NotificationResponse = {
  notifications: [
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
      id: '1617305362416-cEEKIl80R8F4E8qz',
      timestamp: '2021-04-01T19:29:22.416Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Jacob Brunson',
            ari: 'ari:cloud:identity::user/5d2534f3ace8220c25ecdb76',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5d2534f3ace8220c25ecdb76/2e0b582a-df32-4fd1-9003-f4975da82073/128',
          },
        ],
        message: 'Jacob Brunson published a blog post',
        entity: {
          title: 'Easily debug and profile tests in Next',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/blog/2021/04/02/20622640166/Easily+debug+and+profile+tests+in+Next',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20622640166',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-blogpost-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617302847106-OJ1o30SP-cP55nuM',
      timestamp: '2021-04-01T18:47:27.106Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Velu Alagianambi',
            ari: 'ari:cloud:identity::user/5cae9b0f2c573b4b24d0f15b',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5cae9b0f2c573b4b24d0f15b/bfefc5f6-748f-494f-a316-14236e406c45/128',
          },
        ],
        message: 'Velu Alagianambi edited a page',
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
      id: '1617250525579-Wc1pguBBWDzOIo3d',
      timestamp: '2021-04-01T04:15:25.579Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Jason Lu',
            ari: 'ari:cloud:identity::user/5fbe2b4caca10c006979253d',
            avatarUrl:
              'https://secure.gravatar.com/avatar/ecab99fa6f78c920ffa550f71250c1fe?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FJL-4.png',
          },
        ],
        message: 'Jason Lu created a page',
        entity: {
          title: 'sfsf',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20607795721/sfsf',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20607795721',
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
      id: '1617233597760-LscCjVVdm-S31vwJ',
      timestamp: '2021-03-31T23:33:17.760Z',
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
        message: 'Ruslan Arkhipau edited a blog post',
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
      id: '1617231906157-bo2oBgIY3U8qjs7J',
      timestamp: '2021-03-31T23:05:06.157Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Anshuman Prakash',
            ari: 'ari:cloud:identity::user/5bbbcd2c24ceb903f8e84e2e',
            avatarUrl:
              'https://avatar-management--avatars.us-west-2.staging.public.atl-paas.net/5bbbcd2c24ceb903f8e84e2e/1f67e9aa-430e-420a-9622-acebced4839f/128',
          },
        ],
        message: 'Anshuman Prakash commented on a blog post',
        entity: {
          title: 'Blog post to group on',
          link: {
            url:
              'https://lsmith.jira-dev.com/wiki/spaces/~915416093/blog/2021/03/17/968359964/Blog+post+to+group+on?focusedCommentId=978354177#comment-978354177',
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
            title: 'Lachlan Smith',
            link: {
              url: 'https://lsmith.jira-dev.com/wiki/spaces/~915416093',
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
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"sas","type":"text"}]}],"version":1}',
              },
            },
          ],
        },
      },
      readState: 'unread',
      grouping: {
        id:
          'ari:cloud:confluence:5d188cb3-680f-4c25-a634-f45a71318789:content/968359964',
      },
      bodyItemCount: 1,
      analyticsAttributes: {
        cloudId: '5d188cb3-680f-4c25-a634-f45a71318789',
        registrationName: 'streamhub-confluence-comment-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
    {
      id: '1617004165197-aEdnUs86LjXR_ff8',
      timestamp: '2021-03-29T07:49:25.197Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Lyubo Marinov',
            ari:
              'ari:cloud:identity::user/655363:e56fee9d-8a14-446b-aa01-7ee175353249',
            avatarUrl:
              'https://secure.gravatar.com/avatar/2091d69b7365a6be5af826b694bcd1bf?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FLM-2.png',
          },
        ],
        message: 'Lyubo Marinov edited a page',
        entity: {
          title: '2021-03-15 to 2021-03-22',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20606458120/2021-03-15+to+2021-03-22',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20606458120',
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
      id: '1616654732190-AffOSlfTmdNaByzG',
      timestamp: '2021-03-25T06:45:32.190Z',
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
          title: 'Role: Frontend developer on-call',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/4317777835/Role%3A+Frontend+developer+on-call',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/4317777835',
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
      id: '1616637846734-rV2HT4ZfQ9MIrqVT',
      timestamp: '2021-03-25T02:04:06.734Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Eddy Deng',
            ari: 'ari:cloud:identity::user/5ffec50e3b5e47013838b793',
            avatarUrl:
              'https://secure.gravatar.com/avatar/2d73f0538356b4cc9af0ee49e8f117a9?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FED-4.png',
          },
        ],
        message: 'Eddy Deng created a page',
        entity: {
          title: 'Me',
          link: {
            url:
              'https://lsmith.jira-dev.com/wiki/spaces/~915416093/pages/974127105/Me',
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
      readState: 'unread',
      grouping: {
        id:
          'ari:cloud:confluence:5d188cb3-680f-4c25-a634-f45a71318789:content/974127105',
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
      id: '1616616181389-SJ3dYVbypWlN_ME_',
      timestamp: '2021-03-24T20:03:01.389Z',
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
      id: '1616553644274-SLSGWgogJOdMNJTL',
      timestamp: '2021-03-24T02:40:44.274Z',
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
      readState: 'read',
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
      id: '1616533138687-lJGngPY_hTIroS6v',
      timestamp: '2021-03-23T20:58:58.687Z',
      content: {
        type: 'DEFAULT',
        actors: [
          {
            displayName: 'Andrew Dildy',
            ari: 'ari:cloud:identity::user/5d25369edd3e3b0c5197571b',
            avatarUrl:
              'https://secure.gravatar.com/avatar/50424b4cbff5ba3d3b67560a554b9094?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FAD-3.png',
          },
        ],
        message: 'Andrew Dildy created a page',
        entity: {
          title: 'Alert Runbook: Advanced Search experience',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/pages/20614283479/Alert+Runbook%3A+Advanced+Search+experience',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20614283479',
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
      id: '1616532032836-VuGqgMYPxW_xfdZv',
      timestamp: '2021-03-23T20:40:32.836Z',
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
        message: 'Ruslan Arkhipau edited a blog post',
        entity: {
          title:
            '[PSA] Some tags are going away soon, check your SignalFx Dashboards',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/blog/2021/03/24/20614906828',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20614906828',
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
      id: '1616531971646-JRcz4nb9BucJU4qX',
      timestamp: '2021-03-23T20:39:31.646Z',
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
        message: 'Ruslan Arkhipau published a blog post',
        entity: {
          title:
            '[PSA] Some tags are going away soon, check your SignalFx Dashboards',
          link: {
            url:
              'https://pug.jira-dev.com/wiki/spaces/CFE/blog/2021/03/24/20614906828',
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
      grouping: {
        id:
          'ari:cloud:confluence:DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5:content/20614906828',
      },
      bodyItemCount: 0,
      analyticsAttributes: {
        cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
        registrationName: 'streamhub-confluence-blogpost-create',
        registrationOwner: 'streamhub-confluence',
        registrationProduct: 'confluence',
      },
    },
  ],
  continuationToken: '1616531971646-JRcz4nb9BucJU4qX',
};
