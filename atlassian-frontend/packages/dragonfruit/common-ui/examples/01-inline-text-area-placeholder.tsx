import React from 'react';

import { InlineTextArea } from '../src';

export default function Placeholder() {
  return (
    <InlineTextArea
      testId="dragonfruit-common-ui.inline-text-area"
      defaultValue=""
      placeholder="This is the placeholder text"
      onConfirm={console.log}
      onCancel={console.log}
    />
  );
}
