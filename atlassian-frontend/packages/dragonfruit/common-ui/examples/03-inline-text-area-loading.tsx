import React from 'react';

import { InlineTextArea } from '../src';

export default function Loading() {
  return (
    <div>
      <strong>This is a label</strong>
      <InlineTextArea
        testId="dragonfruit-common-ui.inline-text-area"
        defaultValue="This is the description"
        placeholder="This is the placeholder text"
        onConfirm={console.log}
        onCancel={console.log}
        loading
      />
    </div>
  );
}
