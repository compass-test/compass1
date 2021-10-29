import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

import { PresenceAvatarGroup } from '../src';
import type { CollabParticipant } from '../src/common/types';

const participants: CollabParticipant[] = [
  { sessionId: 'rick', name: 'Rick Sanchez', avatar: '' },
  { sessionId: 'morty', name: 'Morty Smith', avatar: '' },
];

const Container = styled.div`
  padding: ${gridSize()}px;
`;

const Basic = () => (
  <Container>
    <PresenceAvatarGroup sessionId="rick" participants={participants} />
  </Container>
);

export default Basic;
