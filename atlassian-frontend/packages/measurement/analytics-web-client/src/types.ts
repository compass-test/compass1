import { userType } from './analyticsWebTypes';
import { GetterFunction } from './createGetter';
import { CompressionRule } from './eventCompressor';
import { ResilienceMechanism } from './resilienceQueue';

export type Attributes = Record<string, any>;

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

  nonPrivacySafeAttributes?: Attributes;
  containers?: any;
  tags?: string[];
};
export type SendScreenEventInput = string | ScreenEventPayload;
export type TrackEventPayload = UITrackAndOperationalEventPayload;
export type UIEventPayload = UITrackAndOperationalEventPayload;

export type ProductInfoType = {
  env: string;
  product: string;

  embeddedProduct?: string | GetterFunction;
  origin?: string;
  platform?: string;
  subproduct?: string | GetterFunction;

  locale?: string;
  version?: string;
};

export type InternalProductInfoType = ProductInfoType & {
  embeddedProduct: GetterFunction;
  subproduct: GetterFunction;
};

export type SettingsType = {
  apiHost?: string;
  apiKey?: string;
  delayQueueCompressors?: CompressionRule[];

  // To be deprecated for flushWaitInterval
  flushBeforeUnload?: boolean;
  flushWaitInterval?: number;

  // TODO Give functions stricter definitions
  historyReplaceFn?: Function;
  maxRetryAttempts?: number;
  minRetryDelay?: number;
  resilienceMechanism?: ResilienceMechanism;
  sessionExpiryTime?: number;
  useLegacyUrl?: boolean;
  useStargate?: boolean;
  xidConsent?: boolean;
};

export type Context = {
  context: {
    locale?: string,
    screen: {
      width?: number
      height?: number,
      density?: number,
    },
    library: {
      name: 'analytics.js',
      version: string,
    },
  }
};

export type UserInfo = {
  anonymousId: string,
  userId?: string,
  userIdType?: userType,
};
