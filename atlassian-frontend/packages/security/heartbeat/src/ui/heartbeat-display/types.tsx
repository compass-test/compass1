export type HeartbeatDisplayProps = {
  // how long a user needs to be inactive before setting idle (ms)
  idleTime?: number;
  // heartbeat api endpoint url
  endpoint?: string;
  // auth failed callback
  onAuthenticationFailed?: () => void;
};
