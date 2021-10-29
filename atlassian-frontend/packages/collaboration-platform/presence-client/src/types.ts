export interface PresenceData {
  sessionId: string;
  [k: string]: any;
}

export interface PresenceEmitEvents {
  connected: { sessionId: string };
  presence: PresenceData[];
  'presence:left': PresenceData;
  broadcast: { [k: string]: any };
  error: { [k: string]: any };
}

export interface PresenceOption {
  spaceKey: string;
  presenceServerUrl: string;
  initialData?: any;
}
