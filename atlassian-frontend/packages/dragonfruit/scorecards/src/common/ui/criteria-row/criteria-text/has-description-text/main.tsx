import React from 'react';

import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export default function HasDescriptionText() {
  const { formatMessage } = useIntl();

  return <>{formatMessage(messages.hasDescription)}</>;
}
