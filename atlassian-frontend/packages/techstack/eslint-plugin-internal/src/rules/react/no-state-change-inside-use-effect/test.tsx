// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/no-state-change-inside-use-effect', rule, {
  valid: [
    `import React, { useState, useEffect } from 'react';

    ValidComponent = () => {
      const [count, setCount] = useState(0);

      const someOtherFunction = () => {
        setCount(count++);
      }

      useEffect(() => {
      });
    };`,
  ],
  invalid: [
    {
      code: `
        import React, { useState, useEffect } from 'react';

        InvalidComponent = () => {
          const [count, setCount] = useState(0);

          useEffect(() => {
            setCount(count++);
          });
        };
      `,
      errors: [
        {
          messageId: 'noStateChangeInsideUseEffect',
        },
      ],
    },
  ],
});
