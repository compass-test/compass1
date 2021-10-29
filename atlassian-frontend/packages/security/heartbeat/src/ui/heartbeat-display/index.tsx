import React from 'react';

import { DEFAULT_HEARTBEAT_ENDPOINT, DEFAULT_IDLE_TIME } from '../../constants';
import { useHeartbeatOnInterval } from '../../controllers/use-heartbeat-on-interval';

import { HeartbeatDisplayProps } from './types';

const HeartbeatDisplay = ({
  endpoint = DEFAULT_HEARTBEAT_ENDPOINT,
  idleTime = DEFAULT_IDLE_TIME,
  onAuthenticationFailed,
}: HeartbeatDisplayProps) => {
  const heartbeatTime = useHeartbeatOnInterval(
    endpoint,
    idleTime,
    onAuthenticationFailed,
  );

  const requestTimestamp = heartbeatTime.requestTimestamp
    ? heartbeatTime.requestTimestamp.toISOString()
    : null;

  const sessionExpiryTimestamp = heartbeatTime.sessionExpiryTimestamp
    ? heartbeatTime.sessionExpiryTimestamp.toISOString()
    : null;

  return (
    <div data-test-id="heartbeat_display">
      <p>
        <strong>Next call to api should be at:</strong>
      </p>
      {requestTimestamp && (
        <span data-test-id="heartbeat_display_nextcalltimestamp">
          {requestTimestamp}
        </span>
      )}
      <p>
        <strong>Session will expire at:</strong>
      </p>
      {sessionExpiryTimestamp && (
        <span data-test-id="heartbeat_display_sessionexpirytimestamp">
          {sessionExpiryTimestamp}
        </span>
      )}
    </div>
  );
};

export default HeartbeatDisplay;
