export type IconProps = {
  label?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  primaryColor?: string;
  secondaryColor?: string;
  testId?: string;
};

export type Diff = {
  smallValueMax: number;
  absoluteDiff: number;
  percentageDiff: number;
  smallValuePercentageDiff: number;
};

export type CapabilitiesType = {
  availableCohortTypes: CohortType[];
};

export type ToplineGoalType = {
  id?: string;
  name: string;
  value: number;
  percentile: Percentile;
  toplineType: ToplineType;
};

export enum Environment {
  PROD = 'PROD',
  STAGING = 'STAGING',
  DEV = 'DEV',
}

export enum Percentile {
  p50 = 'p50',
  p75 = 'p75',
  p90 = 'p90',
}

export enum PageLoadType {
  INITIAL = 'INITIAL',
  TRANSITION = 'TRANSITION',
  COMBINED = 'COMBINED',
}

export enum CohortType {
  ALL = 'ALL',
  REGION = 'REGION',
  ENTERPRISE = 'ENTERPRISE',
  INSTANCE_SIZE = 'INSTANCE_SIZE',
  BROWSER = 'BROWSER',
  JSM_ENTERPRISE = 'JSM_ENTERPRISE',
  ENABLED_USERS = 'ENABLED_USERS',
  OS = 'OS',
  CPU = 'CPU',
  MIGRATION_READINESS = 'MIGRATION_READINESS',
}

export enum EventType {
  PAGE_LOAD = 'PAGE_LOAD',
  INLINE_RESULT = 'INLINE_RESULT',
  CUSTOM = 'CUSTOM',
  PAGE_SEGMENT_LOAD = 'PAGE_SEGMENT_LOAD',
  WEB_VITALS = 'WEB_VITALS',
}

export enum ProductType {
  JIRA = 'JIRA',
  CONFLUENCE = 'CONFLUENCE',
  OPSGENIE = 'OPSGENIE',
  PERFORMANCE_PORTAL = 'PERFORMANCE_PORTAL',
  WATERMELON = 'WATERMELON',
  COMPASS = 'COMPASS',
  ADMIN = 'ADMIN',
  DAC = 'DAC',
}

export enum ToplineType {
  TTI = 'TTI',
  FMP = 'FMP',
}

export enum BreakdownComparisonDate {
  DoD = 'DoD',
  WoW = 'WoW',
  Fixed = 'FIXED',
}

export type Product = { id: ProductType; name: string };

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
