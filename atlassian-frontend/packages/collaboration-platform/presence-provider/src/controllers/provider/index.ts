import { useMemo } from 'react';

import { Presence, PresenceOption } from '@atlassian/presence-client';

export const usePresenceProvider = ({
  spaceKey,
  presenceServerUrl,
  initialData,
}: PresenceOption): Presence => {
  const presenceProvider = useMemo(() => {
    const provider = new Presence({
      spaceKey,
      presenceServerUrl,
      initialData,
    });

    provider.on('connected', ({ sessionId }) => {
      // eslint-disable-next-line no-console
      console.log('Presence client connected!, ', sessionId);
    });

    return provider;
  }, [spaceKey, presenceServerUrl, initialData]);

  return presenceProvider;
};
