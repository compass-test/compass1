export type Attributes = Record<string, any>;

// TODO: Kind of guessing here - Use real types if they ever become available
type UITrackAndOperationalEventPayload = {
  action: string;
  actionSubject: string;
  actionSubjectId?: string;
  attributes?: Attributes;
  tags?: string[];
  source: string;
  objectType?: string;
  objectId?: string;
  containerType?: string;
  containerId?: string;
};

export type OperationalEventPayload = UITrackAndOperationalEventPayload;
export type ScreenEventPayload = {
  name: string;
  attributes?: Attributes;
};
export type TrackEventPayload = UITrackAndOperationalEventPayload;
export type UIEventPayload = UITrackAndOperationalEventPayload;

export type UIEventClientType = {
  sendUIEvent: (uiEventPayload: UIEventPayload) => any;
};

export type OperationalEventClientType = {
  sendOperationalEvent: (
    operationalEventPayload: OperationalEventPayload,
  ) => any;
};

export type ScreenEventClientType = {
  sendScreenEvent: (screenEventPayload: ScreenEventPayload) => any;
};

export type TrackEventClientType = {
  sendTrackEvent: (trackEventPayload: TrackEventPayload) => any;
};

export type AnalyticsWebClientType = UIEventClientType &
  ScreenEventClientType &
  TrackEventClientType &
  OperationalEventClientType;
