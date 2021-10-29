// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('styles/no-nested-styles', rule, {
  valid: [
    `
      const focusRingStyles = css({
        '@media screen and (forced-colors: active), screen and (-ms-high-contrast: active)': {
          '&:focus-visible': {
            outline: '1px solid',
          },
        },
      });
    `,
    `
    const iconExplorerLinkStyles = css({
      '&,&:hover,&:active,&:focus': {
        lineHeight: 0,
      },
    });
    `,
    `
      css({
        ':hover': { color: 'blue' },
        '&:hover': { color: 'blue' },
        '@media screen': {
          color: 'red',
        }
      })
    `,
    `
    css({
      color: 'red',
    })
  `,
  ],
  invalid: [
    {
      code: `
        css({
          div: {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noNestedStyles',
        },
      ],
    },
    {
      code: `
        css({
          '& :hover': {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noNestedStyles',
        },
      ],
    },
    {
      code: `
        css({
          '[data-disabled]': {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noNestedStyles',
        },
      ],
    },
    {
      code: `
        css({
          '&[data-disabled]': {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noDirectNestedStyles',
        },
      ],
    },
    {
      code: `
        css({
          '&, &[data-disabled]': {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noDirectNestedStyles',
        },
      ],
    },
    {
      code: `
        css({
          '> div': {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noNestedStyles',
        },
      ],
    },
    {
      code: `
        css({
          '&': {
            color: 'red',
          }
        })
    `,
      errors: [
        {
          messageId: 'noNestedStyles',
        },
      ],
    },
  ],
});
