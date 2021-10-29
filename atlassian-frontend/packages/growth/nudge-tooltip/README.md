# `Nudge-Tooltop Component`

A container for components that provides a pulsing animation around it and a tooltip upon engaging with the target

## Usage

`NudgeTooltip` uses most of the same props as `Tooltip` in atlaskit. With the exception of `component` which is the
shell for the custom nudge tooltip. See https://atlaskit.atlassian.com/packages/core/tooltip for more on these props.

```typescript jsx
import React from 'react';
import { NudgeTooltip } from '@atlassiansox/nudge-tooltip';

const Component = () => {
  <NudgeTooltip content="You hovered over me">
    <p>hover over me</p>
  </NudgeTooltip>;
};
```

Feel free to reach out to @brandon on slack for further support / questions.
