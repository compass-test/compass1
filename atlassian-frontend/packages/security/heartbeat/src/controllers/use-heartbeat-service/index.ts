import { useEffect, useState } from 'react';

import { postHeartbeat } from '../../services/heartbeat';

export const useHearbeatService = (
  endpoint: string,
  onAuthenticationFailed?: () => void,
) => {
  const [requestTimestamp, setRequestTimestamp] = useState<Date | void>(
    undefined,
  );
  const [
    sessionExpiryTimestamp,
    setSessionExpiryTimestamp,
  ] = useState<Date | void>(undefined);
  const [callHeartbeatService, setCallHeartbeatService] = useState<boolean>(
    false,
  );
  useEffect(() => {
    if (callHeartbeatService && endpoint) {
      const callAsync = async () => {
        const response = await postHeartbeat(endpoint, onAuthenticationFailed);
        setCallHeartbeatService(false);
        if (response && response.nextCallTimestamp) {
          setRequestTimestamp(new Date(response.nextCallTimestamp));
        }

        if (response && response.sessionExpiryTime) {
          setSessionExpiryTimestamp(new Date(response.sessionExpiryTime));
        }
      };

      callAsync();
    }
  }, [callHeartbeatService, endpoint, onAuthenticationFailed]);

  return {
    requestTimestamp,
    sessionExpiryTimestamp,
    callHeartbeatService,
    setCallHeartbeatService,
  };
};
