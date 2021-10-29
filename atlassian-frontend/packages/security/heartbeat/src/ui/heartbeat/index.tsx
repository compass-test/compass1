import { DEFAULT_HEARTBEAT_ENDPOINT, DEFAULT_IDLE_TIME } from '../../constants';
import { useHeartbeatOnInterval } from '../../controllers/use-heartbeat-on-interval';

import { HeartbeatProps } from './types';

const Heartbeat = ({
  endpoint = DEFAULT_HEARTBEAT_ENDPOINT,
  idleTime = DEFAULT_IDLE_TIME,
  onAuthenticationFailed,
}: HeartbeatProps) => {
  useHeartbeatOnInterval(endpoint, idleTime, onAuthenticationFailed);

  return null;
};

export default Heartbeat;
