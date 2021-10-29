import { TestCase } from '../../types';

export const replaceOne: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'abcdef' }] },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 3,
      to: 4,
      slice: { content: [{ type: 'text', text: 'z' }] },
    },
  ],
};

export const replaceRange: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'abcdef' }] },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 2,
      to: 6,
      slice: { content: [{ type: 'text', text: 'z' }] },
    },
  ],
};
