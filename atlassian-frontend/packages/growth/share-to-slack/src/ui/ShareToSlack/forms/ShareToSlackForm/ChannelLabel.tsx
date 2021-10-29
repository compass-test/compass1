import React from 'react';

import styled from 'styled-components';

import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';

import { MessageKey, SlackChannel } from '../../../../common/types';
import useMessages from '../../../../common/useMessages';

const Container = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr;
  grid-column-gap: 4px;
  align-items: center;
`;

const PublicChannelSymbol = styled.div`
  justify-self: center;
`;

type Props = {
  channel: Pick<SlackChannel, 'type' | 'name'>;
};

export default function ChannelLabel({ channel }: Props) {
  const formatMessage = useMessages();
  const messageKey: MessageKey =
    channel.type === 'private' ? 'privateChannelLabel' : 'publicChannelLabel';

  return (
    <Container>
      {channel.type === 'private' ? (
        <LockFilledIcon
          size="small"
          label={formatMessage('privateChannelLabel')}
        />
      ) : (
        <PublicChannelSymbol aria-label={formatMessage(messageKey)}>
          <span aria-hidden={true}>#</span>
        </PublicChannelSymbol>
      )}
      <div>{channel.name}</div>
    </Container>
  );
}
