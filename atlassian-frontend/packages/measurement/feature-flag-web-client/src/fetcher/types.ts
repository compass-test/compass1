import { EvaluationReason, SupportedFlagTypes, TrackingInfo } from '../index';

export interface FeatureFlagRequest {
  apiKey: string;
  identifier: {
    type: string;
    value: string;
  };
  isAnonymous?: boolean;
  additionalIdentifiers?: {
    [key: string]: string;
  };
  customAttributes?: {
    [key: string]: string | number | boolean;
  };
  versionData?: string;
  metadata?: ClientMetadata;
}

export interface FeatureFlagResponse {
  featureFlagValues?: Array<FeatureFlag>;
  deletedFlags?: Array<string>;
  versionData?: string;
}

export enum ClientVisibilityState {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  PRERENDER = 'prerender',
}

export enum ClientCauseReason {
  INITIALIZATION = 'initialization',
  POLLING = 'polling',
  RETRY = 'retry',
}

export enum ClientStorageState {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'notAvailable',
  FULL = 'full',
  ERRORED = 'errored',
}

export enum ClientUserState {
  NEW = 'new',
  SAME = 'same',
  SWITCHED = 'switched',
}

export interface ClientMetadata {
  client: {
    name: string;
    version: string;
  };
  config: {
    pollingSeconds: number;
  };
  state: {
    visibility: ClientVisibilityState;
    storage: ClientStorageState;
    cause?: ClientCauseReason;
    userContext?: ClientUserState;
  };
}

export interface FeatureFlag {
  key: string;
  value: SupportedFlagTypes;
  ruleId?: string;
  reason?: EvaluationReason;
  trackingInfo?: TrackingInfo;
}
