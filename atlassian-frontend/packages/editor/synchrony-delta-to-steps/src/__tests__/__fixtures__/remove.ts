import { TestCase } from '../../types';

export const atTwo: TestCase = {
  initialADF: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'ab' }] }],
  },
  steps: [{ stepType: 'replace', from: 2, to: 3 }],
};

export const middleRange: TestCase = {
  initialADF: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'abcd' }] }],
  },
  steps: [{ stepType: 'replace', from: 2, to: 4 }],
};
