import React from 'react';

import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';
import { N500 } from '@atlaskit/theme/colors';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { AddLinkButton } from '../../../../common/ui/styled';

import messages from './messages';
import { IconPositionWrapper, Wrapper } from './styled';

export type Props = {
  type: CompassLinkType;
  onClick: () => void;
};

function getLabel(linkType: CompassLinkType) {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
      return messages.addDocument;
    case CompassLinkType.DASHBOARD:
      return messages.addDashboard;
    case CompassLinkType.PROJECT:
      return messages.addProject;
    case CompassLinkType.REPOSITORY:
      return messages.addRepository;
    case CompassLinkType.OTHER_LINK:
      return messages.addOtherLink;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.addChatChannel;
    case CompassLinkType.ON_CALL:
      return messages.addOnCall;
    default:
      throw Error('Unsupported link type');
  }
}

export function AddLink(props: Props) {
  const { type, onClick } = props;
  const { formatMessage } = useIntl();

  const label = formatMessage(getLabel(type));

  return (
    <Wrapper onClick={onClick} aria-label="Add a link">
      <IconPositionWrapper>
        <EditorAddIcon label="Add" size="small" primaryColor={N500} />
      </IconPositionWrapper>
      <AddLinkButton>{label}</AddLinkButton>
    </Wrapper>
  );
}
