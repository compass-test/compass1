import React from 'react';

import memoizeOne from 'memoize-one';

import type { AvatarProps } from '@atlaskit/avatar-group';

import type { CollabParticipant } from '../../common/types';
import { getPresenceColor } from '../../common/utils';

import { AvatarItem } from './avatar-item';

const toAvatar = (participant: CollabParticipant): AvatarProps => {
  const color = getPresenceColor(participant.sessionId).color.solid;
  return {
    name: participant.name,
    src: participant.avatar,
    size: 'medium',
    borderColor: color,
    presence: <AvatarItem name={participant.name} color={color} />,
  };
};

export default memoizeOne(toAvatar, function participantEquals([a], [b]) {
  return (
    a.name === b.name && a.avatar === b.avatar && a.sessionId === b.sessionId
  );
});
