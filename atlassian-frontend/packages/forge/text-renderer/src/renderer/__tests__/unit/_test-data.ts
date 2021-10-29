export const exampleDoc = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'You have ',
        },
        {
          type: 'text',
          text: '4',
          marks: [{ type: 'em' }],
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'status',
          attrs: {
            text: 'In progress',
            color: 'blue',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'date',
          attrs: {
            timestamp: new Date(),
          },
        },
        {
          type: 'text',
          text: ' PRs',
        },
      ],
    },
  ],
};
