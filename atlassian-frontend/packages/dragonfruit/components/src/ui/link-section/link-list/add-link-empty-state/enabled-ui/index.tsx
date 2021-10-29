import React from 'react';

import { ContentSectionEmptyState } from '@atlassian/dragonfruit-common-ui';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export type Props = {
  type: CompassLinkType;
  onClick: () => void;
};

function getLabel(linkType: CompassLinkType) {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
      return messages.addFirstDocument;
    case CompassLinkType.DASHBOARD:
      return messages.addFirstDashboard;
    case CompassLinkType.PROJECT:
      return messages.addFirstProject;
    case CompassLinkType.REPOSITORY:
      return messages.addFirstRepository;
    case CompassLinkType.OTHER_LINK:
      return messages.addFirstOther;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.addFirstChatChannel;
    case CompassLinkType.ON_CALL:
      return messages.addFirstOnCall;
    default:
      throw Error('Unsupported link type');
  }
}

export function AddLinkEmptyEnabledState(props: Props) {
  const { type, onClick } = props;
  const { formatMessage } = useIntl();

  const label = formatMessage(getLabel(type));

  return (
    <ContentSectionEmptyState actionLabel="Add a link" onClick={onClick}>
      {label}
    </ContentSectionEmptyState>
  );
}
