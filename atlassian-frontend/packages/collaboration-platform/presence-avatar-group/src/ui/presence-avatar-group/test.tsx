import React from 'react';

import { render } from '@testing-library/react';
import styled from 'styled-components';

import type { CollabParticipant } from '../../common/types';
import { PresenceAvatarGroup } from '../../index';

const Button = styled.button`
  display: flex;
`;

describe('PresenceAvatarGroup', () => {
  const sessionIdMock = 'rick';
  const participantsMock: CollabParticipant[] = [
    { sessionId: 'rick', name: 'Rick Sanchez', avatar: '' },
    { sessionId: 'morty', name: 'Morty Smith', avatar: '' },
  ];

  it('should render a div as a container element', () => {
    const { getByTestId } = render(
      <PresenceAvatarGroup
        testId={'presence-avatar-group'}
        participants={participantsMock}
        sessionId={sessionIdMock}
      />,
    );

    expect(getByTestId('presence-avatar-group').tagName.toLowerCase()).toBe(
      'div',
    );
  });

  it('should render avatars for each participant', () => {
    const { getAllByTestId } = render(
      <PresenceAvatarGroup
        testId={'presence-avatar-group'}
        participants={participantsMock}
        sessionId={sessionIdMock}
      />,
    );

    expect(getAllByTestId('presence-avatar-badge')).toHaveLength(
      participantsMock.length,
    );
  });

  it('should render child components when provided', () => {
    const { getByTestId } = render(
      <PresenceAvatarGroup
        testId={'presence-avatar-group'}
        participants={participantsMock}
        sessionId={sessionIdMock}
      >
        <Button data-testid="test-button" />
      </PresenceAvatarGroup>,
    );

    expect(getByTestId('test-button').tagName.toLowerCase()).toBe('button');
  });
});
