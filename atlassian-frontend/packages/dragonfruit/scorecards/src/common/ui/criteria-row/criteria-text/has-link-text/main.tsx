import React from 'react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export default function HasLinkText({
  linkType,
}: {
  linkType: CompassLinkType;
}) {
  const { formatMessage } = useIntl();

  let text;

  switch (linkType) {
    case CompassLinkType.CHAT_CHANNEL:
      text = formatMessage(messages.hasLinkedChatChannel);
      break;
    case CompassLinkType.DASHBOARD:
      text = formatMessage(messages.hasLinkedDashboard);
      break;
    case CompassLinkType.DOCUMENT:
      text = formatMessage(messages.hasLinkedDocument);
      break;
    case CompassLinkType.ON_CALL:
      text = formatMessage(messages.hasLinkedOnCall);
      break;
    case CompassLinkType.PROJECT:
      text = formatMessage(messages.hasLinkedProject);
      break;
    case CompassLinkType.REPOSITORY:
      text = formatMessage(messages.hasLinkedRepository);
      break;
  }

  return <>{text}</>;
}
