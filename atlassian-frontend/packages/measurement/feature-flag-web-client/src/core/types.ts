import { RawFlags } from '../index';

export type PollingConfig = {
  interval: number;
  tabHiddenPollingFactor: number;
  maxWaitInterval: number;
  minWaitInterval: number;
  backOffFactor: number;
  backOffJitter: number;
  maxInstantRetryTimes: number;
};

export enum RefreshStatus {
  INITIALISED = 'INITIALISED',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface FeatureFlagUpdate {
  flags: RawFlags;
  deletedFlags?: Array<string>;
  versionData?: string;
}

export enum FeatureFlagServiceApiVersion {
  V1 = 'v1',
  V2 = 'v2',
}
