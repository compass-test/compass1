import React from 'react';

import Button, { ButtonProps } from '@atlaskit/button/standard-button';
import AddIcon from '@atlaskit/icon/glyph/add';

type CreateIssueProps = {
  appearance?: ButtonProps['appearance'];
};

export default function CreateIssue({
  appearance = 'default',
}: CreateIssueProps) {
  return (
    <Button
      appearance={appearance}
      iconBefore={<AddIcon label="" size="small" />}
      onClick={() => {}}
    >
      Create issue
    </Button>
  );
}
