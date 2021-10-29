import { useCallback, useEffect, useRef, useState } from 'react';

import { Presence, PresenceEmitEvents } from '@atlassian/presence-client';

import { PresenceParticipant } from '../../types';

const onError = (error: PresenceEmitEvents['error']) => {
  // eslint-disable-next-line no-console
  console.warn('onError', { error });
};

export const useEventManager = ({
  presenceProvider,
  getUser,
}: {
  presenceProvider: Presence | null;
  getUser: (accountId: string) => Promise<PresenceParticipant>;
}) => {
  const [participants, setParticipants] = useState<any | null>(null);
  const usersCache = useRef<{ [key: string]: PresenceParticipant }>({});

  const getParticipants = useCallback(
    async (presenceData: PresenceEmitEvents['presence']) => {
      const results = [];

      for (let i = 0, count = presenceData.length; i < count; i += 1) {
        const { accountId } = presenceData[i];
        if (accountId) {
          const cachedUser = usersCache.current[accountId];
          const user = cachedUser ? cachedUser : await getUser(accountId);

          if (!cachedUser) {
            usersCache.current = { ...usersCache.current, [accountId]: user };
          }

          results.push({
            ...user,
            ...presenceData[i],
          });
        }
      }

      return results;
    },
    [getUser],
  );

  const onPresence = useCallback(
    async (presenceData: PresenceEmitEvents['presence']) => {
      const users = await getParticipants(presenceData);
      setParticipants(users);
    },
    [getParticipants],
  );

  // handle presence events
  useEffect(() => {
    if (!presenceProvider) {
      return () => {};
    }

    presenceProvider.on('presence', onPresence).on('error', onError);

    return () => {
      presenceProvider.off('presence', onPresence).off('error', onError);
    };
  }, [onPresence, presenceProvider]);

  useEffect(
    // destroy provider on unmount
    () => () => {
      if (presenceProvider) {
        presenceProvider.destroy();
      }
    },
    [presenceProvider],
  );

  return { participants };
};
