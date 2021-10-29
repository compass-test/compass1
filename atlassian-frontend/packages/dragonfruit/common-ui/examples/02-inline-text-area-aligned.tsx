import React from 'react';

import { InlineTextArea } from '../src';

export default function Aligned() {
  return (
    <div>
      <strong>This is a label</strong>
      <InlineTextArea
        testId="dragonfruit-common-ui.inline-text-area"
        defaultValue="The label is included so that you can see the alignment"
        placeholder="This is the placeholder text"
        onConfirm={console.log}
        onCancel={console.log}
        alignText
      />
    </div>
  );
}
