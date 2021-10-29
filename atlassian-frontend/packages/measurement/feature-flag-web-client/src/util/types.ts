import { RawFlags } from '../index';

export type FeatureFlagState = {
  flags: RawFlags;
  timestamp: number;
  version?: string;
};
