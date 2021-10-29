import type { XIDItem } from '@atlassian/atl-cross-domain-tracking/dist/esm';

import { tenantType, userType } from '../analyticsWebTypes';
import { eventType, ResilienceMechanism } from '../index';


export type PackagedEvent = {
  headers: {
    [key: string]: string,
  },
  msg: SegmentEvent,
  url: string,
};

// Type only to be used for checking mismatches between events

export type EventMismatch = {
  eventId: string, // should always be the segment messageId
  type: eventType,
  mismatches: Mismatch[],
};

export type Mismatch = {
  path: string,
  type: 'missing' | 'added' | 'different', // In relation to the segment event
  value?: unknown, // value our processory gave it
};

// Segment event types copied from our backend
// https://bitbucket.org/atlassian/analytics-service/src/master/api/src/main/java/com/atlassian/dataservices/analytics/service/api/segment/

export type SegmentBatchDef = {
  batch: SegmentEvent[],
  sentAt: string, // ISO format
  context?: SegmentContextDef,
  metadata?: LibraryMetadataDef,
};

export type SegmentContextDef = {
  active?: boolean,
  app?: SegmentAppDef,
  // Ignoring campaign as its not used by the backend
  // Ignoring device as its derived from useragent
  // Ignoring ip since the request provides it
  library?: SegmentLibraryDef,
  locale?: string,
  // Ignoring location since this is determined by ip
  // Ignoring network as its not provided by AWC,
  // Ignoring os as its derived from the useragent
  // This is added by segment but then BeforeSend integration removes it
  page?: object,
  // Ignoring referrer as it is not used by the backend
  screen?: SegmentScreenDef,
  // Ignoring timezone as its derived from the ip
  userAgent?: string,
};

export type SegmentAppDef = {
  name?: string,
  version?: string,
  build?: string,
  namespace?: string,
};

export type SegmentLibraryDef = {
  name: 'analytics.js',
  version: string,
  metadata?: LibraryMetadataDef,
};

export type LibraryMetadataDef = {
  itemsDiscardedByRetry?: number,
  itemsDiscardedByOverflow?: number,
  httpRetryCount?: number,
  eventCount?: string,
  resilienceMechanism?: ResilienceMechanism,

  // Localstorage specific metrics
  duplicateEventCount?: number,
  localstorageDuplicateCount?: number,
  fullReclaims?: number,
  partialReclaims?: number,
  failedReclaims?: number,
  localstorageQueuesPurged?: number,
};

export type SegmentScreenDef = {
  width?: number,
  height?: number,
  density?: number,
};

export enum SegmentEventTypes {
  IDENTIFY = 'identify',
  PAGE = 'page',
  // Dont need Screen as page and screen are the same and we only use page
  TRACK = 'track',
}

export type SegmentMetadataDef = {
  bundled?: string[],
  unbundled?: string[],
  failedAttempts?: number,
};

export type BaseSegmentEvent = {
  anonymousId?: string,
  context?: SegmentContextDef,
  integrations?: { [name: string]: boolean },
  messageId: string,
  sentAt?: string, // ISO format
  timestamp: string, // ISO format
  type: SegmentEventTypes,
  userId?: string | null,
  version?: string,
  _metadata?: SegmentMetadataDef,
};

export type SegmentIdentifyEventDef = BaseSegmentEvent & {
  traits: SegmentIdentifyEventTraitsDef,
  type: SegmentEventTypes.IDENTIFY,
};

export type SegmentIdentifyEventTraitsDef = BaseXidContainer & {
  userIdType: string,
  entityId: string,
  entityType: string,
  entityTraits?: { [key: string]: unknown },

  // Internal use for checking transformation quality
  transformUUID?: string,
};

export type SegmentScreenEventDef = BaseSegmentEvent & {
  // Ignoring channel as its unused by backend
  name?: string,
  properties: SegmentProperties,
  type: SegmentEventTypes.PAGE,

  // Not used by backend, Segment adds this for some reason
  category: null,
};

export type SegmentTrackEventDef = BaseSegmentEvent & {
  event: string,
  properties: SegmentTrackPropertiesDef,
  type: SegmentEventTypes.TRACK,
};

export type SegmentEvent = SegmentTrackEventDef | SegmentScreenEventDef | SegmentIdentifyEventDef;

export type SegmentProperties = BaseXidContainer & {
  env: string,
  product: string,
  subproduct?: string,
  origin: string,
  platform: string,
  version?: string,
  tenantIdType?: tenantType,
  tenantId?: string,
  userIdType?: userType,
  orgId?: string,
  tags?: string[],
  attributes?: { [key: string]: unknown },
  containers?: { [containerKey: string]: SegmentContainerObjectDef },
  nonPrivacySafeAttributes?: { [key: string]: unknown },
  taskSessions?: { [key: string]: unknown },
  sessionId?: string,
  tabId?: string,

  // Not used by backend, Segment adds this for some reason
  name?: string,

  // Internal use for checking transformation quality
  transformUUID?: string,
};

export type SegmentTrackPropertiesDef = SegmentProperties & {
  eventType: eventType.OPERATIONAL | eventType.TRACK | eventType.UI,
  datacenter?: string,
  source: string,
  containerType?: string,
  containerId?: string,
  objectType?: string,
  objectId?: string,

  actionSubject: string,
  actionSubjectId?: string,
  action: string,
};

export type SegmentContainerObjectDef = {
  id: string,
  type?: string,
};

export type BaseXidContainer = {
  xid?: XIDItem[],
};

export enum CrossDomainIdentifierType {
  XC = 'xc',
  UID = 'uid',
}

export enum CrossDomainIdentifierState {
  NEW = 'NEW',
  CHANGED = 'CHANGED',
  EXISTING = 'EXISTING',
  TIMEOUT = 'TIMEOUT',
  ERROR = 'ERROR',
  UNAVAILABLE = 'UNAVAILABLE',
  MALFORMED = 'MALFORMED',
  UNKNOWN = 'UNKNOWN',
}
