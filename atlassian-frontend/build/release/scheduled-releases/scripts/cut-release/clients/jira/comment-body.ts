export const getCommentBody = (releaseName: string, channelUrl: string) => ({
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'emoji',
          attrs: {
            shortName: ':bulb:',
            id: '1f4a1',
            text: '💡',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          text: 'TWP Release ',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: releaseName,
          marks: [
            {
              type: 'strong',
            },
            {
              type: 'textColor',
              attrs: {
                color: '#36b37e',
              },
            },
          ],
        },
        {
          type: 'text',
          text: ' has been cut!',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
      ],
    },
    {
      type: 'rule',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Stabilisation begins from today ',
        },
        {
          type: 'date',
          attrs: {
            timestamp: Date.now().toString(),
          },
        },
        {
          type: 'text',
          text: '. Please ensure:',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'All teams have blitzed all changes in the release;',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'You reach out to the Release Manager if you have any concerns.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'rule',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Join ',
        },
        {
          type: 'text',
          text: `#bump-editor-${releaseName.toLowerCase()}`,
          marks: [
            {
              type: 'link',
              attrs: {
                href: channelUrl,
              },
            },
          ],
        },
        {
          type: 'text',
          text: ' for more. Happy releasing! ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':rocket:',
            id: '1f680',
            text: '🚀',
          },
        },
      ],
    },
  ],
});
