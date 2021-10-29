import React from 'react';

import { ContentSectionEmptyState } from '@atlassian/dragonfruit-common-ui';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { openInNewTab, useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { DisabledWrapper } from './styled';

export type Props = {
  type: CompassLinkType;
  href?: string;
};

function getLabel(linkType: CompassLinkType) {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
      return messages.firstDocumentDisabled;
    case CompassLinkType.DASHBOARD:
      return messages.firstDashboardDisabled;
    case CompassLinkType.PROJECT:
      return messages.firstProjectDisabled;
    case CompassLinkType.REPOSITORY:
      return messages.firstRepositoryDisabled;
    case CompassLinkType.OTHER_LINK:
      return messages.firstOtherDisabled;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.firstChatChannelDisabled;
    case CompassLinkType.ON_CALL:
      return messages.firstOnCallDisabled;
    default:
      throw Error('Unsupported link type');
  }
}

export function AddLinkEmptyDisabledState(props: Props) {
  const { type, href } = props;
  const { formatMessage } = useIntl();

  const label = formatMessage(getLabel(type));

  if (!href) {
    return <DisabledWrapper>{label}</DisabledWrapper>;
  }

  return (
    <ContentSectionEmptyState
      actionLabel="Add link"
      onClick={() => openInNewTab(href)}
    >
      {label}
    </ContentSectionEmptyState>
  );
}
