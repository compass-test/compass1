import React from 'react';

import CrossIcon from '@atlaskit/icon/glyph/cross';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

interface Props {
  testId?: string;
}

export const MediumCross: React.FC<Props> = ({ testId }) => {
  const { formatMessage } = useIntl();

  return (
    <CrossIcon
      size="medium"
      label={formatMessage(CommonMessages.cancel)}
      testId={testId}
    />
  );
};
