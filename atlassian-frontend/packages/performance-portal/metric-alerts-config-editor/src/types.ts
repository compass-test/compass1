export interface ThresholdItemFormValue {
  id?: string;
  env?: string;
  pageLoadType?: string | null;
  metricType?: string;
  percentile?: number;
  cohortType?: string;
  cohortValue?: string;
  thresholdValue?: number;
  thresholdType?: 'ABSOLUTE_DIFF' | 'PERCENT_DIFF';
  comparisonType?: 'WoW' | 'DoD';
  priority?: 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
  isDeleted: boolean;
  ignoreWeekend: boolean;
}

export interface AlertConfigFormValues {
  opsgenieTeamId: string | null;
  thresholds: ThresholdItemFormValue[];
}
