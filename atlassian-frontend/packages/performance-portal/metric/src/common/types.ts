export enum ToplineType {
  FMP = 'FMP',
  TTI = 'TTI',
}

export enum ComparisonType {
  DoD = 'DoD',
  WoW = 'WoW',
  Fixed = 'FIXED',
}

export enum ToplineMetrics {
  TTI = 'tti',
  FMP = 'fmp',
  FP = 'fp',
  FCP = 'fcp',
  TTFB = 'ttfb',
}

export type ToplineChartDataPoint = {
  dateTime: string;
  values: {
    [cohort: string]: {
      value: number;
      aggregatedAt?: Nullable<Date>;
      overrideAt?: Nullable<Date>;
      overrideSourceName?: Nullable<string>;
    };
  };
};
export type ToplineChartData = ToplineChartDataPoint[];

export type AvailableCohort = {
  cohort: string;
  color: string;
};

export enum Sort {
  CHANGE_DESC = 'change.desc',
  CHANGE_ASC = 'change.asc',
  VALUE_DESC = 'value.desc',
  VALUE_ASC = 'value.asc',
  WATERFALL = 'waterfall',
}

export interface ToplineDateRange {
  value: number;
  label?: string;
}

export enum TooltipType {
  SELECTED_TOOLTIP = 'selected.tooltip',
  HOVER_TOOLTIP = 'hover.tooltip',
}

export enum TimingType {
  METRIC,
  APP,
}

export interface BreakdownTimingData {
  name: string;
  duration?: number | null;
  comparisonDuration?: number | null;
  delta?: number | null;
  deltaPercent?: number | null;
  level: number;
  startTime?: number | null;
  comparisonStartTime?: number | null;
  count?: number | null;
  comparisonCount?: number | null;
  timingType: TimingType;
}

export enum BreakdownViewType {
  COMPARISON = 'comparison',
  WATERFALL = 'waterfall',
}
