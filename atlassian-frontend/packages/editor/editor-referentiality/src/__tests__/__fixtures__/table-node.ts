export const tableNode = {
  type: 'table',
  attrs: {
    localId: '123abc',
  },
  content: [
    {
      type: 'tableRow',
      content: [
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'a',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'b',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'tableRow',
      content: [
        {
          type: 'tableCell',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '1',
                },
              ],
            },
          ],
        },
        {
          type: 'tableCell',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '2',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
