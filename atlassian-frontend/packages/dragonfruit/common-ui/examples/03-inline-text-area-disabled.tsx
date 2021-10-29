import React from 'react';

import { InlineTextArea } from '../src';

export default function DisabledInlineTextAres() {
  return (
    <div>
      <InlineTextArea
        testId="dragonfruit-common-ui.inline-text-area"
        defaultValue=""
        placeholder="This is the placeholder on a disabled text area"
        onConfirm={console.log}
        onCancel={console.log}
        isDisabled={true}
      />
    </div>
  );
}
