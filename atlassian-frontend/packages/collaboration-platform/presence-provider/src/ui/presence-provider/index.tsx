import { ReactElement } from 'react';

import { PresenceOption } from '@atlassian/presence-client';

import { useEventManager } from '../../controllers/event-manager';
import { usePresenceProvider } from '../../controllers/provider';
import { PresenceParticipant } from '../../types';

export interface PresenceProviderProps {
  initialData: { accountId: string; [key: string]: any };
  getUser: (accountId: string) => Promise<PresenceParticipant>;
  children: ({
    participants,
    sessionId,
  }: {
    participants: PresenceParticipant[] | null;
    sessionId: string | null;
  }) => ReactElement;
}

export const PresenceProvider = ({
  spaceKey,
  presenceServerUrl,
  initialData,
  getUser,
  children,
}: PresenceOption & PresenceProviderProps) => {
  const presenceProvider = usePresenceProvider({
    spaceKey,
    presenceServerUrl,
    initialData,
  });
  const { participants } = useEventManager({ presenceProvider, getUser });
  const sessionId = presenceProvider ? presenceProvider.getMySessionId() : null;

  return children({ participants, sessionId });
};
