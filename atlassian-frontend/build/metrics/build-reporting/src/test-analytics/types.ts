import { AggregatedResult } from '@jest/test-result';

import { AnalyticsEventPayload } from './reporting';

export type TimedTestSuiteResult = {
  startTime: number;
  aggregatedResult: AggregatedResult;
};

export type ActionSubject = 'unit_test' | 'integration_test' | 'vr_test';

export type AnalyticsModifier = (p: AnalyticsEventPayload) => Promise<boolean>;
