// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/consistent-css-prop-usage', rule, {
  valid: [
    `
     <button css={asdasd} />
    `,
    'function Button({children}) { return <button someCss={{}}>{children}</button>; }',
    `
      const containerStyles = css({
        padding: 8,
      });

      function Button({children}) { return <button css={containerStyles}>{children}</button>; }
    `,
    `
      const containerStyles = css({
        padding: 8,
      });
      const baseContainerStyles = css({
        padding: 10,
      });

      function Button({children}) { return <button css={[containerStyles, baseContainerStyles]}>{children}</button>; }
   `,
    `
const containerStyles = css({
  padding: 8,
});

<div css={isPrimary && containerStyles} />
   `,
    `
   const containerStyles = css({
     padding: 8,
   });

   <div css={[isPrimary && containerStyles]} />
      `,
    `
      const containerStyles = css({
        padding: 8,
      });

      <div css={isPrimary ? containerStyles : null} />
         `,
    `
    const containerStyles = css({
      padding: 8,
    });

    <div css={[isPrimary ? containerStyles : null]} />
      `,
  ],
  invalid: [
    {
      code: `
        import type { Size } from '../types';
        import { dimensions } from '../constants';
        import { css, CSSObject } from '@emotion/core';

        const small = css(dimensions.small);
        const hello = 'ok';

        // pre-built css style-size map
        export const sizeStyleMap = {
          small,
        };

        export const getIconSize = ({
          width,
          height,
          size,
        }: {
          size?: Size;
          width?: number;
          height?: number;
        }) => {
          if (width && height) {
            return { width, height };
          }

          if (size) {
            return dimensions[size];
          }

          return undefined;
        };
      `,
      output: `
        import type { Size } from '../types';
        import { dimensions } from '../constants';
        import { css, CSSObject } from '@emotion/core';

        const smallStyles = css(dimensions.small);
        const hello = 'ok';

        // pre-built css style-size map
        export const sizeStyleMap = {
          small: smallStyles,
        };

        export const getIconSize = ({
          width,
          height,
          size,
        }: {
          size?: Size;
          width?: number;
          height?: number;
        }) => {
          if (width && height) {
            return { width, height };
          }

          if (size) {
            return dimensions[size];
          }

          return undefined;
        };
      `,
      errors: [
        {
          messageId: 'shouldEndInStyles',
        },
      ],
    },
    {
      code: `
        const containerStyle = css({});

        <div css={containerStyle} />
      `,
      output: `
        const containerStyles = css({});

        <div css={containerStyles} />
      `,
      errors: [
        {
          messageId: 'shouldEndInStyles',
        },
      ],
    },
    {
      code: `
        const container = css({});

        <div css={container} />
      `,
      output: `
        const containerStyles = css({});

        <div css={containerStyles} />
      `,
      errors: [
        {
          messageId: 'shouldEndInStyles',
        },
      ],
    },
    {
      code: `
      <div css={isPrimary && {}} />
         `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
      const containerStyles = css({
        padding: 8,
      });

      <div css={[isPrimary ? {} : {}]} />
         `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code:
        'function Button({children}) { return <button css={css``}>{children}</button>; }',
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code:
        'function Button({children}) { return <button css={{}}>{children}</button>; }',
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code:
        'function Button({children}) { return <button css={``}>{children}</button>; }',
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        function Button({children}) {
          const containerStyles = {
            padding: 8,
          };

          return <button css={containerStyles}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        function Button({children}) {
          const containerStyles = css({
            padding: 8,
          });

          return <button css={containerStyles}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        function Button({children}) {
          const containerStyles = css({
            padding: 8,
          });

          return (
            <Component>
              {
                () =>  <button css={containerStyles}>{children}</button>
              }
            </Component>
          );
        }
      `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        function Button({children}) {
          const getStyles = () => ({
            padding: 8,
          });

          return <button css={getStyles()}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code:
        'function Button({children}) { return <button css="">{children}</button>; }',
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        const containerStyles = {
          padding: 8,
        };

        function Button({children}) { return <button css={containerStyles}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssObjectTypeOnly',
        },
      ],
    },
    {
      code: `
        const containerStyles = \`
          padding: 8,
        \`;

        function Button({children}) { return <button css={containerStyles}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssObjectTypeOnly',
        },
      ],
    },
    {
      code: `
        const containerStyles = css\`
          padding: 8,
        \`;

        function Button({children}) { return <button css={containerStyles}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssObjectTypeOnly',
        },
      ],
    },
    {
      code: `
        const getStyles = (padding) => ({
          padding,
        });

        function Button({children,padding}) {

          return <button css={getStyles(padding)}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        const containerStyles = css({
          padding: 8,
        });
        const baseContainerStyles = {
          padding: 10,
        };

        function Button({children}) { return <button css={[containerStyles, baseContainerStyles]}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssObjectTypeOnly',
        },
      ],
    },
    {
      code: `
        const containerStyles = css({
          padding: 8,
        });
        const baseContainerStyles = css\`
          padding: 10,
        \`;

        function Button({children}) { return <button css={[containerStyles, baseContainerStyles]}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssObjectTypeOnly',
        },
      ],
    },
    {
      code: `
        const containerStyles = css({
          padding: 8,
        });
        const getStyles = (padding) => ({
          padding,
        });

        function Button({children,padding}) {

          return <button css={[containerStyles, getStyles(padding)]}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code:
        'function Button({children}) { return <button css={css({})}>{children}</button>; }',
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code:
        'function Button({children}) { return <button css={someCss({})}>{children}</button>; }',
      errors: [
        {
          messageId: 'cssOnTopOfModule',
        },
      ],
    },
    {
      code: `
        import { containerStyles } from './styles';

        function Button({children}) {
          return <button css={containerStyles}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssInModule',
        },
      ],
    },
    {
      code: `
        import containerStyles from './styles';

        function Button({children}) {
          return <button css={containerStyles}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssInModule',
        },
      ],
    },
    {
      code: `
        import { baseContainerStyles } from './styles';

        const containerStyles = css({
          padding: 8,
        });

        function Button({children}) {
          return <button css={[containerStyles, baseContainerStyles]}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssInModule',
        },
      ],
    },
    {
      code: `
        import baseContainerStyles from './styles';

        const containerStyles = css({
          padding: 8,
        });

        function Button({children}) {
          return <button css={[containerStyles, baseContainerStyles]}>{children}</button>;
        }
      `,
      errors: [
        {
          messageId: 'cssInModule',
        },
      ],
    },
    {
      code: `
        const baseContainerStyles = css({
          padding: 10,
        });
        const containerStyles = css({
          ...baseContainerStyles,
          padding: 8,
        });

        function Button({children}) { return <button css={containerStyles}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssArrayStylesOnly',
          line: 6,
        },
      ],
    },
    {
      code: `
        const baseContainerStyles = css({
          padding: 10,
        });
        const containerStyles = css({
          padding: 8,
        });
        const newContainerStyles = css({
          ...baseContainerStyles,
          padding: 12,
        });

        function Button({children}) { return <button css={[containerStyles, baseContainerStyles, newContainerStyles]}>{children}</button>; }
      `,
      errors: [
        {
          messageId: 'cssArrayStylesOnly',
        },
      ],
    },
  ],
});
