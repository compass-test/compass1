import {
  ANALYTICS_BRIDGE_CHANNEL,
  DRAWER,
  DROPDOWN,
  INLINE_DIALOG,
  MODAL,
  OPERATIONAL_EVENT_TYPE,
  SCREEN,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from './constants';
import { AnalyticsAttributes, EventType, SourceType } from './types';
import { AnalyticsEventToProps } from './ui/analytics-event-to-props';
import {
  ContextWrapper as ContextualAnalyticsData,
  Props as ContextualAnalyticsDataProps,
} from './ui/context-wrapper';
import {
  Props as FireAnalyticsProps,
  FireOperationalAnalytics,
  FireScreenAnalytics,
  FireTrackAnalytics,
  FireUIAnalytics,
} from './ui/fire-analytics';
import { MountEvent, Props as MountEventProps } from './ui/mount-event';
import { createTestEvent } from './utils/create-test-event';
import { extractAWCDataFromEvent } from './utils/extract-awc-data-from-event';
import {
  fireAnalytics,
  fireOperationalAnalytics,
  fireScreenAnalytics,
  fireTrackAnalytics,
  fireUIAnalytics,
} from './utils/fire-analytics';

export {
  // components and props
  ContextualAnalyticsData,
  FireOperationalAnalytics,
  FireScreenAnalytics,
  FireTrackAnalytics,
  FireUIAnalytics,
  MountEvent,
  AnalyticsEventToProps,
  // utilities
  fireAnalytics,
  fireOperationalAnalytics,
  fireScreenAnalytics,
  fireTrackAnalytics,
  fireUIAnalytics,
  createTestEvent,
  extractAWCDataFromEvent,
  DRAWER,
  DROPDOWN,
  INLINE_DIALOG,
  MODAL,
  SCREEN,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
  ANALYTICS_BRIDGE_CHANNEL,
};
export type {
  ContextualAnalyticsDataProps,
  FireAnalyticsProps,
  MountEventProps,
  // constants
  SourceType,
  EventType,
  AnalyticsAttributes,
};
