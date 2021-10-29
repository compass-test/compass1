# react/no-css-string-literals

# Forbid certain props on Components (props/no-unsafe-overrides)

By default this rule prevents the usage of tagged template expression like: 

```jsx
<div css={css`color: pink;`}/>
```

## Rule Details

This rule is off by default.

Examples of **incorrect** code for this rule:

```jsx
import { jsx } from '@emotion/react';
import { css } from '@emotion/core';

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: darkgreen;
      }
    `}
  >
    This has a hotpink background.
  </div>,
);
```

```jsx
import { jsx } from '@emotion/react';
import { css } from '@emotion/core';

const stringStyle = css`
  background-color: hotpink;
  &:hover {
    color: darkgreen;
  }
`;

render(<div css={stringStyle}>This has a hotpink background.</div>);
```

Examples of **correct** code for this rule:

```jsx
import { jsx } from '@emotion/react';
import { css } from '@emotion/core';

render(
  <div
    css={css({
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen',
      },
    })}
  >
    This has a hotpink background.
  </div>,
);
```

## Resources

- [Rule source](./index.js)
- [Rule test](./test.js)
