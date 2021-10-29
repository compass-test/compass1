/*
 * NOTE: This is just used for testing. We can remove this file once we have a proper profile/user-integration
 *
 */
import { ParticipantData, SynchronyUser } from './types';
import { CollabParticipant } from '@atlaskit/editor-common/collab';

type AvailableParticipants = 'rick' | 'morty' | 'summer';

const greenSquareBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAASElEQVR42u3PMQ0AMAgAsGFoCQrRg0s08JLWQeN31jsgREREREREREREREREREREREREREREREREREREREREREREREREREQ2BpswTJFc0h4tAAAAAElFTkSuQmCC';

// ED-10826: Replaced stale twitter avatar resource URLS with examples
// from packages/search/global-search/example-helpers/mocks/mockData.ts
export const participants: Record<AvailableParticipants, ParticipantData> = {
  rick: {
    sid: 'rick',
    name: 'Rick Sanchez',
    avatar: greenSquareBase64,
  },
  morty: {
    sid: 'morty',
    name: 'Morty Smith',
    avatar: greenSquareBase64,
  },
  summer: {
    sid: 'summer',
    name: 'Summer Smith',
    avatar: greenSquareBase64,
  },
};

const participantsArray = Object.keys(participants).map(
  (key: string) => participants[key as AvailableParticipants],
);

export const getProfile = (
  user: SynchronyUser,
): Omit<CollabParticipant, 'email'> => {
  return {
    ...getUserData(user.origin),
    lastActive: user.joinedAt,
    sessionId: user.origin,
  };
};

const getUserData = (sid: string): Pick<ParticipantData, 'name' | 'avatar'> => {
  let hash = 0;

  for (let i = 0; i < sid.length; i++) {
    hash = (hash << 5) - hash + sid.charCodeAt(i);
    hash = hash & hash;
  }

  return participantsArray[Math.abs(hash) % participantsArray.length];
};
