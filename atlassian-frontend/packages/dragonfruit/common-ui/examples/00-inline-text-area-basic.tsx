import React from 'react';

import { InlineTextArea } from '../src';

export default function Basic() {
  return (
    <InlineTextArea
      testId="dragonfruit-common-ui.inline-text-area"
      defaultValue="This is the default value"
      placeholder="This is the placeholder text"
      onConfirm={console.log}
      onCancel={console.log}
    />
  );
}
