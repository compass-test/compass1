// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('styles/consistent-style-ordering', rule, {
  valid: [
    `
    css({
      color: 'red',
      ':hover': {
        margin: 0,
        padding: 0,
      }
    })
        `,
    `
    css({
      div: {
        margin: 0,
        padding: 0,
      }
    })
        `,
    `
const someVariable = {}
css({
  // don't move me
  ...someVariable,
  div: {
    // margin is important
    margin: 0,
    padding: 0,
  }
})
    `,
  ],
  invalid: [
    {
      code: `
css({
  color: token('background.blue'),
  padding: color,
  margin: 0,
})`,
      output: `
css({
  margin: 0,
  padding: color,
  color: token('background.blue'),
})`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
    {
      code: `
css({
  ':hover': {
    padding: 0,
    margin: 0,
  }
})`,
      output: `
css({
  ':hover': {
    margin: 0,
    padding: 0,
  }
})`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
    {
      code: `
css({
  div: {
    padding: 0,
    margin: 0,
  }
})`,
      output: `
css({
  div: {
    margin: 0,
    padding: 0,
  }
})`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
    {
      code: `
css({
  color: 'red',
  ':hover': {
    display: 'inline',
  },
  display: 'block',
});`,
      output: `
css({
  display: 'block',
  color: 'red',
  ':hover': {
    display: 'inline',
  },
});`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
    {
      code: `
css({
  color: 'red',
  display: 'block',
});`,
      output: `
css({
  display: 'block',
  color: 'red',
});`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
    {
      code: `
css({
  color: ['red', 'blue'],
  display: 'block',
});`,
      output: `
css({
  display: 'block',
  color: ['red', 'blue'],
});`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
    {
      code: `
css({
  color: 0,
  margin: 0,
  flex: 0,
  bottom: 0,
  background: 0,
  height: 0,
  clear: 0,
  float: 0,
  grid: 0,
  width: 0,
  padding: 0,
  position: 0,
  left: 0,
  right: 0,
  display: 0,
  boxSizing: 0,
  top: 0,
});`,
      output: `
css({
  display: 0,
  boxSizing: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  position: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  float: 0,
  clear: 0,
  flex: 0,
  grid: 0,
  background: 0,
  color: 0,
});`,
      errors: [
        {
          messageId: 'incorrectOrder',
        },
      ],
    },
  ],
});
