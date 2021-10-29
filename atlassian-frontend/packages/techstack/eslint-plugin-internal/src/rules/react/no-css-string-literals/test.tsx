// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

const errors = [
  {
    messageId: 'noCSSStringLiterals',
  },
];

ruleTester.run('props/no-css-string-literals', rule, {
  valid: [
    {
      code: `<div />`,
    },
    {
      code: `
      <div
        css={css({
          backgroundColor: 'hotpink',
          '&:hover': {
            color: 'lightgreen',
          },
        })}
      >
        This has a hotpink background.
      </div>
      `,
    },
    {
      code: `<div
      css={{
        backgroundColor: 'hotpink',
        '&:hover': {
          color: 'lightgreen'
        }
      }}
    >
      This has a hotpink background.
    </div>`,
    },
    {
      code: `
      import styled from '@emotion/styled';

      const Wrapper = styled.div\`
        margin-top: 100px;
      \`;
      `,
    },
    {
      code: `
      import styled from '@emotion/styled';

      const generateStyle = () => (styled.div\`
        background-color: hotpink;
        &:hover {
          color: '#999999';
        }
      \`);
      `,
    },
    {
      code: `
      import styled from '@emotion/styled';

      function generateStyle () {
        return styled.div\`
          background-color: hotpink;
          &:hover {
            color: '#999999';
          }
        \`
      }`,
    },
  ],
  invalid: [
    {
      code: `
      import { css } from '@emotion/core';
      const myComponent = () => {
        return (
          <div css={css\`
          background-color: hotpink;
          &:hover {
            color: '#999999';
          }
        \`}>
            This has a hotpink background.
          </div>
        )
      }
      `,
      errors,
    },
    {
      code: `
      import { css } from '@emotion/core';

      const myComponent = () => {
        const stringStyle = css\`
          background-color: hotpink;
          &:hover {
            color: '#999999';
          }
        \`;
        return (
          <div css={stringStyle}>
            This has a hotpink background.
          </div>
        )
      }
  `,
      errors,
    },
    {
      code: `
      import { css } from '@emotion/core';

      const myComponent = () => {
        const generateStringStyle = () => (css\`
          background-color: hotpink;
          &:hover {
            color: '#999999';
          }
        \`);
        return (
          <div css={generateStringStyle()}>
            This has a hotpink background.
          </div>
        )
      }
  `,
      errors,
    },
    {
      code: `
      import { css } from '@emotion/core';

      const myComponent = () => {
        function generateStringStyle () {
          return css\`
            background-color: hotpink;
            &:hover {
              color: '#999999';
            }
          \`
        };
        return (
          <div css={generateStringStyle()}>
            This has a hotpink background.
          </div>
        )
      }
  `,
      errors,
    },
  ],
});
