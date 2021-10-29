import { useEffect } from 'react';

import useInterval from '@use-it/interval';

import { INTERVAL_TIME } from '../../constants';
import { useBrowserInteractionTime } from '../use-browser-interaction-time';
import { useHearbeatService } from '../use-heartbeat-service';

export const useHeartbeatOnInterval = (
  endpoint: string,
  idleTime: number,
  onAuthenticationFailed?: () => void,
) => {
  const {
    requestTimestamp,
    sessionExpiryTimestamp,
    callHeartbeatService,
    setCallHeartbeatService,
  } = useHearbeatService(endpoint, onAuthenticationFailed);
  const { idle } = useBrowserInteractionTime(idleTime);

  useEffect(() => {
    setCallHeartbeatService(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (idle) {
      setCallHeartbeatService(true);
    }
  }, [idle, setCallHeartbeatService]);

  useInterval(() => {
    if (callHeartbeatService) {
      return;
    }

    if (
      sessionExpiryTimestamp &&
      sessionExpiryTimestamp.getTime() <= Date.now()
    ) {
      setCallHeartbeatService(true);
      return;
    }

    // user is not idle but reaches timestamp to call api
    if (!idle && requestTimestamp && requestTimestamp.getTime() <= Date.now()) {
      setCallHeartbeatService(true);
    }
  }, INTERVAL_TIME);

  return { requestTimestamp, sessionExpiryTimestamp };
};
