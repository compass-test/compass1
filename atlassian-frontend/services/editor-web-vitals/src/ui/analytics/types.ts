import { AnalyticsEventPayload } from '@atlaskit/analytics-next';

export enum EVENT_TYPE {
  OPERATIONAL = 'operational',
  SCREEN = 'screen',
  TRACK = 'track',
  UI = 'ui',
}

export type EditorSandboxAnalyticsEventPayload = {
  actionSubject: string;
  action: string;
  attributes: Record<string, any>;
  source?: string;
} & AnalyticsEventPayload;

export type FireAnalyticsEvent = {
  fireUIAnalyticEvent: (payload: EditorSandboxAnalyticsEventPayload) => void;
  fireTrackAnalyticEvent: (payload: EditorSandboxAnalyticsEventPayload) => void;
  fireOperationalAnalyticEvent: (
    payload: EditorSandboxAnalyticsEventPayload,
  ) => void;
  fireScreenAnalyticEvent: (
    payload: EditorSandboxAnalyticsEventPayload,
  ) => void;
};

export type WithFireAnalyticsEventsProps = {
  fireAnalyticsEvent: FireAnalyticsEvent;
};
