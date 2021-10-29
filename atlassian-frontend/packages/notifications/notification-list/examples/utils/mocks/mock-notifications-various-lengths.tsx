import { buildConfluenceNotification } from '../../../src/common/mocks/notifications-factory';
import { NotificationResponse } from '../../../src/common/types';

const plainTextSamples = [
  'Lalalalal',
  'LalalalalLalalalal',
  'LalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalalLalalalal',
  'LalalalalLalalalalLalalalal LalalalalLalalalalLalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
  'Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal Lalalalal',
];

export const adfs = {
  extraLong:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"ReplyReplyReplyReplyR","type":"text"},{"text":"eplyReplyRe","type":"text","marks":[{"type":"strike"},{"type":"em"}]},{"text":"plyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReplyReply","type":"text"}]}],"version":1}',
  long:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"I see an ","type":"text"},{"text":"attributes.errorBoundaryType","type":"text","marks":[{"type":"code"}]},{"text":" attribute in the code, is this going to have the same type as ","type":"text"},{"text":"actionSubjectId: root | adf | notificationItem","type":"text","marks":[{"type":"code"}]},{"text":"? or something else?","type":"text"}]}],"version":1}',
  medium:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"text":"Great point - I\'ve seen them as being similar things. ","type":"text"},{"type":"mention","attrs":{"id":"5fbe3915aca10c006979aeec","text":"@Josh Maloney"}},{"text":" / ","type":"text"},{"type":"mention","attrs":{"id":"5ee0ad4cdd6ecb0ab514507a","text":"@Mike Dao"}},{"text":"  thoughts?","type":"text"}]}],"version":1}',
  short:
    '{"type": "doc","content": [{"type": "paragraph","content": [{"text": "I see an attributes.errorBoundaryType","type": "text"},{"text": " attribute  ","type": "text"},{"text": "actionSubjectId: string","type": "text","marks": [{"type": "code"}]}]}],"version": 1}',
  table:
    '{"type":"doc","content":[{"type":"panel","attrs":{"panelType":"warning"},"content":[{"type":"paragraph","content":[{"text":"WARNING: THIS IS A PANEL","type":"text"}]}]},{"type":"table","attrs":{"layout":"default"},"content":[{"type":"tableRow","content":[{"type":"tableHeader","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph","content":[{"text":"Table","type":"text","marks":[{"type":"strong"}]}]}]},{"type":"tableHeader","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph","content":[{"text":"content","type":"text","marks":[{"type":"strong"}]}]}]},{"type":"tableHeader","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph","content":[{"text":"oh boi","type":"text","marks":[{"type":"strong"}]}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph"}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1},"content":[{"type":"paragraph"}]}]}]},{"type":"orderedList","attrs":{"order":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"text":"wow","type":"text"}]},{"type":"orderedList","attrs":{"order":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"text":"wooaw","type":"text"}]},{"type":"orderedList","attrs":{"order":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"text":"wooaoaoao","type":"text"}]}]}]}]}]}]}]},{"type":"paragraph"}],"version":1}',
};

/**
 * Just a way to show all variations of texts and how they wrap
 */
const notifications: NotificationResponse['notifications'] = [
  buildConfluenceNotification((original) => ({
    ...original,
    id: 'notif-1',
    bodyItemCount: 2,
    content: {
      ...original.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'QUOTED',
            document: {
              format: 'ADF',
              data: adfs.long,
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
              data: adfs.short,
            },
          },
        ],
      },
    },
  })),
  buildConfluenceNotification((original) => ({
    ...original,
    id: 'notif-2',
    bodyItemCount: 2,
    content: {
      ...original.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'QUOTED',
            document: {
              format: 'ADF',
              data: adfs.short,
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
              data: adfs.medium,
            },
          },
        ],
      },
    },
  })),
  buildConfluenceNotification((original) => ({
    ...original,
    id: 'notif-3',
    bodyItemCount: 2,
    content: {
      ...original.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'QUOTED',
            document: {
              format: 'ADF',
              data: adfs.short,
            },
          },
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'PRIMARY',
            document: {
              format: 'ADF',
              data: adfs.long,
            },
          },
        ],
      },
    },
  })),
  buildConfluenceNotification((original) => ({
    ...original,
    id: 'notif-4',
    bodyItemCount: 2,
    content: {
      ...original.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'QUOTED',
            document: {
              format: 'ADF',
              data: adfs.short,
            },
          },
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'PRIMARY',
            document: {
              format: 'ADF',
              data: adfs.extraLong,
            },
          },
        ],
      },
    },
  })),
  buildConfluenceNotification((original) => ({
    ...original,
    id: 'notif-5',
    bodyItemCount: 2,
    content: {
      ...original.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'QUOTED',
            document: {
              format: 'ADF',
              data: adfs.extraLong,
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
              data: adfs.table,
            },
          },
        ],
      },
    },
  })),
  buildConfluenceNotification((original) => ({
    ...original,
    id: 'notif-6',
    bodyItemCount: 2,
    content: {
      ...original.content,
      body: {
        items: [
          {
            type: 'RICH_TEXT_CONTENT',
            appearance: 'QUOTED',
            document: {
              format: 'ADF',
              data: adfs.table,
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
              data: adfs.short,
            },
          },
        ],
      },
    },
  })),
  ...plainTextSamples.map((plainText, index) =>
    buildConfluenceNotification((original) => ({
      ...original,
      id: `notif-plain-${index}`,
      bodyItemCount: 2,
      content: {
        ...original.content,
        body: {
          items: [
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'QUOTED',
              document: {
                format: 'TEXT',
                data: plainText,
              },
            },
            {
              type: 'RICH_TEXT_CONTENT',
              appearance: 'PRIMARY',
              document: {
                format: 'ADF',
                data: (() => {
                  switch (index % 4) {
                    case 0:
                      return adfs.short;
                    case 1:
                      return adfs.medium;
                    case 2:
                      return adfs.long;
                    case 3:
                    default:
                      return adfs.extraLong;
                  }
                })(),
              },
            },
          ],
        },
      },
    })),
  ),
];

export const mockNotificationsVariousLengths: NotificationResponse = {
  notifications,
  continuationToken: notifications[notifications.length - 1].id,
};
