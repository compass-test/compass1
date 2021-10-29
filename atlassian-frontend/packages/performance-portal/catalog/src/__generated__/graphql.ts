//==============================================================
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
//==============================================================

import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: string;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: string;
};

export type Alert = Node & {
  __typename?: 'Alert';
  id: Scalars['ID'];
  date?: Maybe<Scalars['Date']>;
  sentAt?: Maybe<Scalars['DateTime']>;
  opsgenieAlertId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<AlertPriority>;
  status?: Maybe<Scalars['String']>;
  acknowledged?: Maybe<Scalars['Boolean']>;
  snoozed?: Maybe<Scalars['Boolean']>;
  isSeen?: Maybe<Scalars['Boolean']>;
};

export type AlertConfig = Node & {
  __typename?: 'AlertConfig';
  id: Scalars['ID'];
  metricId?: Maybe<Scalars['String']>;
  env?: Maybe<Scalars['String']>;
  pageLoadType?: Maybe<Scalars['String']>;
  metricType?: Maybe<Scalars['String']>;
  cohortType?: Maybe<Scalars['String']>;
  cohortValue?: Maybe<Scalars['String']>;
  percentile?: Maybe<Scalars['Int']>;
  thresholdValue?: Maybe<Scalars['Float']>;
  thresholdType?: Maybe<AlertConfigThresholdType>;
  comparisonType?: Maybe<ComparisonType>;
  priority?: Maybe<AlertConfigPriority>;
  ignoreWeekend?: Maybe<Scalars['Boolean']>;
};

export enum AlertConfigPriority {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
  P5 = 'P5',
}

export enum AlertConfigThresholdType {
  PERCENT_DIFF = 'PERCENT_DIFF',
  ABSOLUTE_DIFF = 'ABSOLUTE_DIFF',
}

export enum AlertPriority {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
  P5 = 'P5',
}

export type BatchSaveAlertConfigs = {
  alertConfigsToCreate?: Maybe<Array<CreateAlertConfigInput>>;
  alertConfigsToUpdate?: Maybe<Array<UpdateAlertConfigInput>>;
  alertConfigsToDelete?: Maybe<Array<Scalars['ID']>>;
};

export type BatchSaveAlertConfigsPayload = Payload & {
  __typename?: 'BatchSaveAlertConfigsPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  alertConfigsCreated?: Maybe<Array<AlertConfig>>;
  alertConfigsUpdated?: Maybe<Array<AlertConfig>>;
  alertConfigsDeleted?: Maybe<Array<Scalars['ID']>>;
};

export enum BreakdownAggregation {
  P50 = 'p50',
  P75 = 'p75',
  P90 = 'p90',
}

export type BreakdownTimingDetail = {
  __typename?: 'BreakdownTimingDetail';
  name: Scalars['String'];
  startTime: Scalars['Float'];
  duration: Scalars['Float'];
  count?: Maybe<Scalars['Int']>;
  aggregatedAt?: Maybe<Scalars['DateTime']>;
};

export type BreakdownTimings = {
  __typename?: 'BreakdownTimings';
  app?: Maybe<Array<BreakdownTimingDetail>>;
  metric?: Maybe<Array<BreakdownTimingDetail>>;
};

export type BrowserMetric = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  owner?: Maybe<MetricOwner>;
  slackChannel?: Maybe<Scalars['String']>;
  opsgenieTeamId?: Maybe<Scalars['String']>;
  metricType?: Maybe<MetricType>;
  eventType?: Maybe<BrowserMetricEventType>;
  eventKey?: Maybe<Scalars['String']>;
  availableCohortTypes?: Maybe<Array<CohortType>>;
  knownCohortValues?: Maybe<Array<KnownCohortValues>>;
  alertConfigs?: Maybe<Array<AlertConfig>>;
  alerts?: Maybe<Array<Alert>>;
  hotEvents?: Maybe<Array<HotEvent>>;
};

export type BrowserMetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type BrowserMetricHotEventsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type BrowserMetricBreakdownTimingDetail = {
  __typename?: 'BrowserMetricBreakdownTimingDetail';
  name: Scalars['String'];
  startTime: Scalars['Float'];
  duration: Scalars['Float'];
  count?: Maybe<Scalars['Int']>;
  aggregatedAt?: Maybe<Scalars['DateTime']>;
};

export type BrowserMetricCapabilitiesInput = {
  availableCohortTypes?: Maybe<Array<CohortType>>;
};

export type BrowserMetricCapabilitiesPatchInput = {
  availableCohortTypes?: Maybe<Array<CohortType>>;
};

export enum BrowserMetricEventType {
  PAGE_LOAD = 'PAGE_LOAD',
  INLINE_RESULT = 'INLINE_RESULT',
  CUSTOM = 'CUSTOM',
  PAGE_SEGMENT_LOAD = 'PAGE_SEGMENT_LOAD',
  WEB_VITALS = 'WEB_VITALS',
}

export type BrowserMetricInput = {
  name: Scalars['String'];
  key: Scalars['String'];
  eventType: BrowserMetricEventType;
  product: Product;
  owner?: Maybe<MetricOwnerInput>;
  slackChannel?: Maybe<Scalars['String']>;
  opsgenieTeamId?: Maybe<Scalars['String']>;
  toplineGoals?: Maybe<Array<BrowserMetricToplineGoalInput>>;
  capabilities?: Maybe<BrowserMetricCapabilitiesInput>;
};

export type BrowserMetricPatchInput = {
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  eventType?: Maybe<BrowserMetricEventType>;
  product?: Maybe<Product>;
  owner?: Maybe<MetricOwnerInput>;
  slackChannel?: Maybe<Scalars['String']>;
  opsgenieTeamId?: Maybe<Scalars['String']>;
  toplineGoals?: Maybe<Array<Maybe<BrowserMetricToplineGoalPatchInput>>>;
  capabilities?: Maybe<BrowserMetricCapabilitiesPatchInput>;
};

export type BrowserMetricToplineGoalInput = {
  name: Scalars['String'];
  toplineType: PageLoadToplineType;
  percentile: BrowserMetricToplineGoalPercentile;
  value: Scalars['Float'];
};

export type BrowserMetricToplineGoalPatchInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  toplineType?: Maybe<PageLoadToplineType>;
  percentile?: Maybe<BrowserMetricToplineGoalPercentile>;
  value?: Maybe<Scalars['Float']>;
};

export enum BrowserMetricToplineGoalPercentile {
  P50 = 'p50',
  P75 = 'p75',
  P90 = 'p90',
}

export enum CohortType {
  /** All traffic */
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

export enum ComparisonType {
  DOD = 'DoD',
  WOW = 'WoW',
}

export type CreateAlertConfigInput = {
  metricId: Scalars['String'];
  env: Scalars['String'];
  pageLoadType?: Maybe<Scalars['String']>;
  metricType: Scalars['String'];
  cohortType: Scalars['String'];
  cohortValue: Scalars['String'];
  percentile: Scalars['Int'];
  thresholdValue: Scalars['Float'];
  thresholdType: AlertConfigThresholdType;
  comparisonType: ComparisonType;
  priority: AlertConfigPriority;
  ignoreWeekend?: Maybe<Scalars['Boolean']>;
};

export type CreateAlertConfigPayload = Payload & {
  __typename?: 'CreateAlertConfigPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  alertConfig?: Maybe<AlertConfig>;
};

export type CreateBrowserMetricPayload = Payload & {
  __typename?: 'CreateBrowserMetricPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  browserMetric?: Maybe<BrowserMetric>;
};

export type CreateExperienceInput = {
  name: Scalars['String'];
  key: Scalars['String'];
  experienceType: ExperienceEventType;
  product: Product;
  teamId?: Maybe<Scalars['String']>;
  slackChannel?: Maybe<Scalars['String']>;
  opsgenieTeamId?: Maybe<Scalars['String']>;
};

export type CreateExperiencePayload = Payload & {
  __typename?: 'CreateExperiencePayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  experience?: Maybe<Experience>;
};

export type CreateHotEventInput = {
  issueId: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  affectedProducts: Array<Product>;
  affectedMetricEventKey?: Maybe<Array<Scalars['String']>>;
  startAt: Scalars['DateTime'];
  endAt?: Maybe<Scalars['DateTime']>;
};

export type CreateHotEventPayload = Payload & {
  __typename?: 'CreateHotEventPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  hotEvent?: Maybe<HotEvent>;
};

export type CreateTempHardcodedTeamInfoInput = {
  id: Scalars['ID'];
  displayName: Scalars['String'];
};

export type CreateTempHardcodedTeamInfoPayload = Payload & {
  __typename?: 'CreateTempHardcodedTeamInfoPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  team?: Maybe<Team>;
};

export type CustomMetric = BrowserMetric &
  Metric &
  Node & {
    __typename?: 'CustomMetric';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    key?: Maybe<Scalars['String']>;
    product?: Maybe<Product>;
    owner?: Maybe<MetricOwner>;
    slackChannel?: Maybe<Scalars['String']>;
    opsgenieTeamId?: Maybe<Scalars['String']>;
    metricType?: Maybe<MetricType>;
    eventType?: Maybe<BrowserMetricEventType>;
    eventKey?: Maybe<Scalars['String']>;
    availableCohortTypes?: Maybe<Array<CohortType>>;
    knownCohortValues?: Maybe<Array<KnownCohortValues>>;
    alertConfigs?: Maybe<Array<AlertConfig>>;
    alerts?: Maybe<Array<Alert>>;
    hotEvents?: Maybe<Array<HotEvent>>;
  };

export type CustomMetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type CustomMetricHotEventsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type DailyToplineTrendSeries = {
  __typename?: 'DailyToplineTrendSeries';
  env: Environment;
  percentile: Scalars['Int'];
  pageLoadType?: Maybe<PageLoadType>;
  metric: Scalars['String'];
  cohortType: Scalars['String'];
  cohortValue: Scalars['String'];
  data: Array<DailyToplineTrendSeriesData>;
  goals: Array<ExperienceToplineGoal>;
};

export type DailyToplineTrendSeriesData = {
  __typename?: 'DailyToplineTrendSeriesData';
  day: Scalars['Date'];
  value: Scalars['Float'];
  count: Scalars['Int'];
  aggregatedAt?: Maybe<Scalars['DateTime']>;
  overrideUserId?: Maybe<Scalars['String']>;
  overrideAt?: Maybe<Scalars['DateTime']>;
  overrideSourceName?: Maybe<Scalars['String']>;
};

export type DateTimeRange = {
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
};

export type DeleteNodeInput = {
  id: Scalars['ID'];
};

export type DeleteNodePayload = Payload & {
  __typename?: 'DeleteNodePayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
};

export enum Environment {
  STAGING = 'STAGING',
  PROD = 'PROD',
  DEV = 'DEV',
}

export type Experience = {
  __typename?: 'Experience';
  id: Scalars['ID'];
  name: Scalars['String'];
  key: Scalars['String'];
  product: Product;
  owner?: Maybe<Team>;
  slackChannel?: Maybe<Scalars['String']>;
  opsgenieTeamId?: Maybe<Scalars['String']>;
  experienceKey: Scalars['String'];
  experienceType: ExperienceEventType;
  populations: Array<ExperiencePopulation>;
  dailyToplineTrend: Array<DailyToplineTrendSeries>;
  dailyBreakdown: BreakdownTimings;
  toplineGoals?: Maybe<Array<ExperienceToplineGoal>>;
  pageLoadTransitionRatio?: Maybe<Scalars['Float']>;
  hotEvents?: Maybe<Array<HotEvent>>;
};

export type ExperiencePopulationsArgs = {
  sloEnabled?: Maybe<Scalars['Boolean']>;
  env?: Maybe<Environment>;
  onlySLOConfigured?: Maybe<Scalars['Boolean']>;
};

export type ExperienceDailyToplineTrendArgs = {
  env: Environment;
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  percentile: Scalars['Int'];
  pageLoadType?: Maybe<PageLoadType>;
  metric: Scalars['String'];
  cohortType: Scalars['String'];
};

export type ExperienceDailyBreakdownArgs = {
  env: Environment;
  date: Scalars['Date'];
  percentile: Scalars['Int'];
  pageLoadType?: Maybe<PageLoadType>;
  cohortType: Scalars['String'];
  cohortValue: Scalars['String'];
};

export type ExperiencePageLoadTransitionRatioArgs = {
  env: Environment;
  date: Scalars['Date'];
  cohort: Scalars['String'];
};

export type ExperienceHotEventsArgs = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};

export enum ExperienceEventType {
  PAGE_LOAD = 'PAGE_LOAD',
  INLINE_RESULT = 'INLINE_RESULT',
  CUSTOM = 'CUSTOM',
  PAGE_SEGMENT_LOAD = 'PAGE_SEGMENT_LOAD',
  WEB_VITALS = 'WEB_VITALS',
}

export type ExperiencePopulation = {
  __typename?: 'ExperiencePopulation';
  /** e.g. tti, fmp */
  metric?: Maybe<Scalars['String']>;
  env: Environment;
  pageLoadType?: Maybe<PageLoadType>;
  /** e.g. 'all::all', 'enabled_users::>5k', 'enabled_users::Other', 'enterprise::Enterprise' */
  cohort: Scalars['String'];
  perfPortalUrl?: Maybe<Scalars['String']>;
  sloConfiguration?: Maybe<SloConfiguration>;
};

export type ExperiencePopulationToplineGoalInput = {
  /** If id is set, the goal will be updated or deleted, otherwise, the goal will be created */
  id?: Maybe<Scalars['ID']>;
  /** If delete is truthy, the goal will be deleted */
  delete?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  env: Environment;
  pageLoadType?: Maybe<PageLoadType>;
  /** e.g. 'All::all' 'ENTERPRISE::enterprise */
  cohort: Scalars['String'];
  /** e.g. tti, fmp */
  metric: Scalars['String'];
  /** e.g. 50, 75, 90 */
  percentile: Scalars['Int'];
  value: Scalars['Float'];
};

export type ExperienceToplineGoal = {
  __typename?: 'ExperienceToplineGoal';
  id: Scalars['ID'];
  name: Scalars['String'];
  env: Environment;
  pageLoadType?: Maybe<PageLoadType>;
  cohort: Scalars['String'];
  metric: Scalars['String'];
  /** e.g. 50, 75, 90 */
  percentile: Scalars['Int'];
  value: Scalars['Float'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Boolean']>;
};

export type HotEvent = Node & {
  __typename?: 'HotEvent';
  id: Scalars['ID'];
  issueId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  affectedProducts?: Maybe<Array<Maybe<Product>>>;
  affectedMetricEventKey?: Maybe<Array<Maybe<Scalars['String']>>>;
  startAt?: Maybe<Scalars['DateTime']>;
  endAt?: Maybe<Scalars['DateTime']>;
};

export type InlineResultMetric = BrowserMetric &
  Metric &
  Node & {
    __typename?: 'InlineResultMetric';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    key?: Maybe<Scalars['String']>;
    product?: Maybe<Product>;
    owner?: Maybe<MetricOwner>;
    slackChannel?: Maybe<Scalars['String']>;
    opsgenieTeamId?: Maybe<Scalars['String']>;
    metricType?: Maybe<MetricType>;
    eventType?: Maybe<BrowserMetricEventType>;
    eventKey?: Maybe<Scalars['String']>;
    availableCohortTypes?: Maybe<Array<CohortType>>;
    knownCohortValues?: Maybe<Array<KnownCohortValues>>;
    alertConfigs?: Maybe<Array<AlertConfig>>;
    alerts?: Maybe<Array<Alert>>;
    hotEvents?: Maybe<Array<HotEvent>>;
  };

export type InlineResultMetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type InlineResultMetricHotEventsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type KnownCohortValues = {
  __typename?: 'KnownCohortValues';
  cohortType: CohortType;
  cohortValues?: Maybe<Array<Scalars['String']>>;
};

export type Metric = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  owner?: Maybe<MetricOwner>;
  slackChannel?: Maybe<Scalars['String']>;
  opsgenieTeamId?: Maybe<Scalars['String']>;
  metricType?: Maybe<MetricType>;
  alertConfigs?: Maybe<Array<AlertConfig>>;
  alerts?: Maybe<Array<Alert>>;
};

export type MetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type MetricConnection = {
  __typename?: 'MetricConnection';
  edges?: Maybe<Array<MetricEdge>>;
  nodes?: Maybe<Array<Metric>>;
  pageInfo: PageInfo;
};

export type MetricEdge = {
  __typename?: 'MetricEdge';
  cursor: Scalars['String'];
  node: Metric;
};

export type MetricOwner = {
  id: Scalars['ID'];
};

export type MetricOwnerInput = {
  staffId?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type MetricPaginatedResults = {
  __typename?: 'MetricPaginatedResults';
  metrics?: Maybe<Array<Metric>>;
  totalCount: Scalars['Int'];
};

export enum MetricType {
  BROWSER_METRIC = 'BROWSER_METRIC',
}

export type Mutation = {
  __typename?: 'Mutation';
  _void_?: Maybe<Scalars['String']>;
  saveExperienceSLOTarget?: Maybe<SaveExperienceSloTargetPayload>;
  createExperience?: Maybe<CreateExperiencePayload>;
  saveExperiencePopulationToplineGoals?: Maybe<
    SaveExperiencePopulationToplineGoalsPayload
  >;
  deleteNode?: Maybe<DeleteNodePayload>;
  overridePageLoadToplineTrend?: Maybe<OverrideToplineTrendPayload>;
  removePageLoadToplineTrendOverride?: Maybe<OverrideToplineTrendPayload>;
  createBrowserMetric?: Maybe<CreateBrowserMetricPayload>;
  updateBrowserMetric?: Maybe<UpdateBrowserMetricPayload>;
  createAlertConfig?: Maybe<CreateAlertConfigPayload>;
  updateAlertConfig?: Maybe<UpdateAlertConfigPayload>;
  batchSaveAlertConfigs?: Maybe<BatchSaveAlertConfigsPayload>;
  muteAlerts?: Maybe<MuteAlertsPayload>;
  unmuteAlerts?: Maybe<UnmuteAlertsPayload>;
  createHotEvent?: Maybe<CreateHotEventPayload>;
  updateHotEvent?: Maybe<UpdateHotEventPayload>;
  createTempHardcodedTeamInfo?: Maybe<CreateTempHardcodedTeamInfoPayload>;
  updateTempHardcodedTeamInfo?: Maybe<UpdateTempHardcodedTeamInfoPayload>;
};

export type MutationSaveExperienceSloTargetArgs = {
  experienceKey: Scalars['String'];
  sloTargets: Array<PopulationSloTargetInput>;
};

export type MutationCreateExperienceArgs = {
  input: CreateExperienceInput;
};

export type MutationSaveExperiencePopulationToplineGoalsArgs = {
  experienceId: Scalars['ID'];
  toplineGoals: Array<ExperiencePopulationToplineGoalInput>;
};

export type MutationDeleteNodeArgs = {
  input: DeleteNodeInput;
};

export type MutationOverridePageLoadToplineTrendArgs = {
  input: OverridePageLoadToplineTrendInput;
};

export type MutationRemovePageLoadToplineTrendOverrideArgs = {
  input: RemovePageLoadToplineTrendOverrideInput;
};

export type MutationCreateBrowserMetricArgs = {
  input: BrowserMetricInput;
};

export type MutationUpdateBrowserMetricArgs = {
  input: UpdateBrowserMetricInput;
};

export type MutationCreateAlertConfigArgs = {
  input: CreateAlertConfigInput;
};

export type MutationUpdateAlertConfigArgs = {
  input: UpdateAlertConfigInput;
};

export type MutationBatchSaveAlertConfigsArgs = {
  input: BatchSaveAlertConfigs;
};

export type MutationMuteAlertsArgs = {
  date: Scalars['Date'];
  userId: Scalars['String'];
};

export type MutationUnmuteAlertsArgs = {
  date: Scalars['Date'];
};

export type MutationCreateHotEventArgs = {
  input: CreateHotEventInput;
};

export type MutationUpdateHotEventArgs = {
  input: UpdateHotEventInput;
};

export type MutationCreateTempHardcodedTeamInfoArgs = {
  input: CreateTempHardcodedTeamInfoInput;
};

export type MutationUpdateTempHardcodedTeamInfoArgs = {
  input: UpdateTempHardcodedTeamInfoInput;
};

export type MutationError = {
  __typename?: 'MutationError';
  message?: Maybe<Scalars['String']>;
  extensions?: Maybe<MutationErrorExtension>;
};

export type MutationErrorExtension = {
  __typename?: 'MutationErrorExtension';
  /** A numerical code (as a HTTP status code) representing the error category */
  statusCode?: Maybe<Scalars['Int']>;
  /** Application specific error trace */
  errorType?: Maybe<Scalars['String']>;
};

export type MuteAlertsPayload = Payload & {
  __typename?: 'MuteAlertsPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  alertConfig?: Maybe<AlertConfig>;
};

export type Node = {
  id: Scalars['ID'];
};

export type OverridePageLoadToplineTrendInput = {
  overrideUserId: Scalars['String'];
  series: Array<PageLoadToplineTrendSeriesOverrideInput>;
};

export type OverrideToplineTrendPayload = Payload & {
  __typename?: 'OverrideToplineTrendPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type PageLoadBreakdownResult = {
  __typename?: 'PageLoadBreakdownResult';
  timings?: Maybe<PageLoadBreakdownTimings>;
};

export type PageLoadBreakdownTimings = {
  __typename?: 'PageLoadBreakdownTimings';
  app?: Maybe<Array<BrowserMetricBreakdownTimingDetail>>;
  metric?: Maybe<Array<BrowserMetricBreakdownTimingDetail>>;
};

export type PageLoadMetric = BrowserMetric &
  Metric &
  Node & {
    __typename?: 'PageLoadMetric';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    key?: Maybe<Scalars['String']>;
    product?: Maybe<Product>;
    owner?: Maybe<MetricOwner>;
    slackChannel?: Maybe<Scalars['String']>;
    opsgenieTeamId?: Maybe<Scalars['String']>;
    metricType?: Maybe<MetricType>;
    eventType?: Maybe<BrowserMetricEventType>;
    eventKey?: Maybe<Scalars['String']>;
    pageLoadTransitionRatio?: Maybe<Scalars['Float']>;
    availableCohortTypes?: Maybe<Array<CohortType>>;
    knownCohortValues?: Maybe<Array<KnownCohortValues>>;
    toplineTrend?: Maybe<PageLoadToplineTrendResult>;
    breakdown?: Maybe<PageLoadBreakdownResult>;
    toplineGoals?: Maybe<Array<PageLoadToplineGoal>>;
    alertConfigs?: Maybe<Array<AlertConfig>>;
    alerts?: Maybe<Array<Alert>>;
    hotEvents?: Maybe<Array<HotEvent>>;
  };

export type PageLoadMetricPageLoadTransitionRatioArgs = {
  env: Environment;
  date: Scalars['Date'];
  cohort: Scalars['String'];
};

export type PageLoadMetricToplineTrendArgs = {
  env: Environment;
  dateTimeRange: DateTimeRange;
  aggregations: Array<ToplineAggregation>;
  toplineTypes?: Maybe<Array<PageLoadToplineType>>;
  pageLoadTypes: Array<PageLoadType>;
  cohortTypes?: Maybe<Array<CohortType>>;
};

export type PageLoadMetricBreakdownArgs = {
  env: Environment;
  date: Scalars['Date'];
  aggregation: BreakdownAggregation;
  pageLoadType: PageLoadType;
  cohortType?: Maybe<CohortType>;
  cohortValue?: Maybe<Scalars['String']>;
};

export type PageLoadMetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type PageLoadMetricHotEventsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type PageLoadToplineGoal = Node & {
  __typename?: 'PageLoadToplineGoal';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  toplineType?: Maybe<PageLoadToplineType>;
  percentile?: Maybe<ToplineAggregation>;
  value: Scalars['Float'];
};

export type PageLoadToplineTrendResult = {
  __typename?: 'PageLoadToplineTrendResult';
  series?: Maybe<Array<PageLoadToplineTrendSeries>>;
};

export type PageLoadToplineTrendSeries = {
  __typename?: 'PageLoadToplineTrendSeries';
  toplineType: PageLoadToplineType;
  aggregation: ToplineAggregation;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
  version?: Maybe<Scalars['String']>;
  goal?: Maybe<Array<PageLoadToplineGoal>>;
  data?: Maybe<Array<TrendData>>;
};

export type PageLoadToplineTrendSeriesOverrideInput = {
  env: Environment;
  eventKey: Scalars['String'];
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
  percentile: Scalars['Int'];
  overrideSourceName: Scalars['String'];
  data: Array<TrendDataOverrideInput>;
};

export enum PageLoadToplineType {
  TTI = 'TTI',
  FMP = 'FMP',
}

export enum PageLoadType {
  INITIAL = 'INITIAL',
  TRANSITION = 'TRANSITION',
  COMBINED = 'COMBINED',
}

export type PageSegmentLoadMetric = BrowserMetric &
  Metric &
  Node & {
    __typename?: 'PageSegmentLoadMetric';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    key?: Maybe<Scalars['String']>;
    product?: Maybe<Product>;
    owner?: Maybe<MetricOwner>;
    slackChannel?: Maybe<Scalars['String']>;
    opsgenieTeamId?: Maybe<Scalars['String']>;
    metricType?: Maybe<MetricType>;
    eventType?: Maybe<BrowserMetricEventType>;
    eventKey?: Maybe<Scalars['String']>;
    availableCohortTypes?: Maybe<Array<CohortType>>;
    knownCohortValues?: Maybe<Array<KnownCohortValues>>;
    alertConfigs?: Maybe<Array<AlertConfig>>;
    alerts?: Maybe<Array<Alert>>;
    hotEvents?: Maybe<Array<HotEvent>>;
  };

export type PageSegmentLoadMetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type PageSegmentLoadMetricHotEventsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type Payload = {
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
};

export type PopulationSloTargetInput = {
  metric?: Maybe<Scalars['String']>;
  pageLoadType?: Maybe<PageLoadType>;
  cohort: Scalars['String'];
  sloConfiguration?: Maybe<SloConfigurationInput>;
};

export enum Product {
  JIRA = 'JIRA',
  CONFLUENCE = 'CONFLUENCE',
  OPSGENIE = 'OPSGENIE',
  PERFORMANCE_PORTAL = 'PERFORMANCE_PORTAL',
  WATERMELON = 'WATERMELON',
  COMPASS = 'COMPASS',
  ADMIN = 'ADMIN',
  DAC = 'DAC',
}

export type Query = {
  __typename?: 'Query';
  _void_?: Maybe<Scalars['String']>;
  experience?: Maybe<Experience>;
  searchExperiences: SearchExperiencesResults;
  node?: Maybe<Node>;
  metric?: Maybe<Metric>;
  metrics?: Maybe<MetricConnection>;
  searchMetrics?: Maybe<MetricPaginatedResults>;
  metricByEventKey?: Maybe<Metric>;
  metricsByIds?: Maybe<Array<Metric>>;
  staff?: Maybe<Staff>;
  team?: Maybe<Team>;
  me?: Maybe<Staff>;
  featureFlags?: Maybe<Array<Maybe<FeatureFlag>>>;
};

export type QueryExperienceArgs = {
  experienceId: Scalars['ID'];
};

export type QuerySearchExperiencesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  onlySLOConfigured?: Maybe<Scalars['Boolean']>;
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type QueryMetricArgs = {
  id: Scalars['ID'];
};

export type QueryMetricsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['String']>;
};

export type QuerySearchMetricsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  products?: Maybe<Array<Product>>;
  searchString?: Maybe<Scalars['String']>;
  sortBy?: Maybe<SearchMetricsSortBy>;
  sortOrder?: Maybe<SearchMetricsSortOrder>;
};

export type QueryMetricByEventKeyArgs = {
  eventKey: Scalars['String'];
};

export type QueryMetricsByIdsArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};

export type QueryStaffArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryTeamArgs = {
  id: Scalars['String'];
};

export type RemovePageLoadToplineTrendOverrideInput = {
  series: Array<RemovePageLoadToplineTrendSeriesOverrideInput>;
};

export type RemovePageLoadToplineTrendSeriesOverrideInput = {
  env: Environment;
  eventKey: Scalars['String'];
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
  percentile: Scalars['Int'];
  dates: Array<Scalars['Date']>;
};

export type SaveExperiencePopulationToplineGoalsPayload = {
  __typename?: 'SaveExperiencePopulationToplineGoalsPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  toplineGoals?: Maybe<Array<ExperienceToplineGoal>>;
};

export type SaveExperienceSloTargetPayload = {
  __typename?: 'SaveExperienceSLOTargetPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  populationSLOTargets?: Maybe<Array<ExperiencePopulation>>;
};

export type SearchExperiencesResults = {
  __typename?: 'SearchExperiencesResults';
  experiences: Array<Experience>;
};

export enum SearchMetricsSortBy {
  EVENT_KEY = 'EVENT_KEY',
  NAME = 'NAME',
  OWNER = 'OWNER',
  PRODUCT = 'PRODUCT',
}

export enum SearchMetricsSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SloConfiguration = {
  __typename?: 'SLOConfiguration';
  target: Scalars['Float'];
  tomeUrl: Scalars['String'];
};

export type SloConfigurationInput = {
  target: Scalars['Float'];
  tomeUrl: Scalars['String'];
};

export type Staff = MetricOwner & {
  __typename?: 'Staff';
  id: Scalars['ID'];
  atlassianId?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
};

export type Team = MetricOwner & {
  __typename?: 'Team';
  id: Scalars['ID'];
  teamName?: Maybe<Scalars['String']>;
};

export enum ToplineAggregation {
  P50 = 'p50',
  P75 = 'p75',
  P90 = 'p90',
}

export type TrendData = {
  __typename?: 'TrendData';
  dateTime: Scalars['DateTime'];
  value: Scalars['Float'];
  count: Scalars['Int'];
  aggregatedAt?: Maybe<Scalars['DateTime']>;
  overrideUserId?: Maybe<Scalars['String']>;
  overrideAt?: Maybe<Scalars['DateTime']>;
  overrideSourceName?: Maybe<Scalars['String']>;
};

export type TrendDataOverrideInput = {
  day: Scalars['Date'];
  value: Scalars['Float'];
  count: Scalars['Int'];
  aggregatedAt: Scalars['DateTime'];
};

export type UnmuteAlertsPayload = Payload & {
  __typename?: 'UnmuteAlertsPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  alertConfig?: Maybe<AlertConfig>;
};

export type UpdateAlertConfigInput = {
  id: Scalars['ID'];
  patch: UpdateAlertConfigPatchInput;
};

export type UpdateAlertConfigPatchInput = {
  metricId?: Maybe<Scalars['String']>;
  env?: Maybe<Scalars['String']>;
  pageLoadType?: Maybe<Scalars['String']>;
  metricType?: Maybe<Scalars['String']>;
  cohortType?: Maybe<Scalars['String']>;
  cohortValue?: Maybe<Scalars['String']>;
  percentile?: Maybe<Scalars['Int']>;
  thresholdValue?: Maybe<Scalars['Float']>;
  thresholdType?: Maybe<AlertConfigThresholdType>;
  comparisonType?: Maybe<ComparisonType>;
  priority?: Maybe<AlertConfigPriority>;
  ignoreWeekend?: Maybe<Scalars['Boolean']>;
};

export type UpdateAlertConfigPayload = Payload & {
  __typename?: 'UpdateAlertConfigPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  alertConfig?: Maybe<AlertConfig>;
};

export type UpdateBrowserMetricInput = {
  id: Scalars['ID'];
  patch: BrowserMetricPatchInput;
};

export type UpdateBrowserMetricPayload = Payload & {
  __typename?: 'UpdateBrowserMetricPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  browserMetric?: Maybe<BrowserMetric>;
};

export type UpdateHotEventInput = {
  id: Scalars['ID'];
  patch: UpdateHotEventPatchInput;
};

export type UpdateHotEventPatchInput = {
  issueId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  affectedProducts?: Maybe<Array<Product>>;
  affectedMetricEventKey?: Maybe<Array<Scalars['String']>>;
  startAt?: Maybe<Scalars['DateTime']>;
  endAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateHotEventPayload = Payload & {
  __typename?: 'UpdateHotEventPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  hotEvent?: Maybe<HotEvent>;
};

export type UpdateTempHardcodedTeamInfoInput = {
  id: Scalars['ID'];
  patch: UpdateTempHardcodedTeamInfoPatchInput;
};

export type UpdateTempHardcodedTeamInfoPatchInput = {
  displayName?: Maybe<Scalars['String']>;
};

export type UpdateTempHardcodedTeamInfoPayload = Payload & {
  __typename?: 'UpdateTempHardcodedTeamInfoPayload';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<MutationError>>;
  team?: Maybe<Team>;
};

export type WebVitalsMetric = BrowserMetric &
  Metric &
  Node & {
    __typename?: 'WebVitalsMetric';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    key?: Maybe<Scalars['String']>;
    product?: Maybe<Product>;
    owner?: Maybe<MetricOwner>;
    slackChannel?: Maybe<Scalars['String']>;
    opsgenieTeamId?: Maybe<Scalars['String']>;
    metricType?: Maybe<MetricType>;
    eventType?: Maybe<BrowserMetricEventType>;
    eventKey?: Maybe<Scalars['String']>;
    availableCohortTypes?: Maybe<Array<CohortType>>;
    knownCohortValues?: Maybe<Array<KnownCohortValues>>;
    alertConfigs?: Maybe<Array<AlertConfig>>;
    alerts?: Maybe<Array<Alert>>;
    hotEvents?: Maybe<Array<HotEvent>>;
  };

export type WebVitalsMetricAlertsArgs = {
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
};

export type WebVitalsMetricHotEventsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type GetMetricsQueryVariables = Exact<{
  first?: Scalars['Int'];
}>;

export type GetMetricsQuery = {
  __typename?: 'Query';
  metrics?: Maybe<{
    __typename?: 'MetricConnection';
    edges?: Maybe<
      Array<{
        __typename?: 'MetricEdge';
        cursor: string;
        node:
          | ({ __typename?: 'CustomMetric' } & Metric_CustomMetric_Fragment)
          | ({
              __typename?: 'InlineResultMetric';
            } & Metric_InlineResultMetric_Fragment)
          | ({ __typename?: 'PageLoadMetric' } & Metric_PageLoadMetric_Fragment)
          | ({
              __typename?: 'PageSegmentLoadMetric';
            } & Metric_PageSegmentLoadMetric_Fragment)
          | ({
              __typename?: 'WebVitalsMetric';
            } & Metric_WebVitalsMetric_Fragment);
      }>
    >;
    nodes?: Maybe<
      Array<
        | ({ __typename?: 'CustomMetric' } & Metric_CustomMetric_Fragment)
        | ({
            __typename?: 'InlineResultMetric';
          } & Metric_InlineResultMetric_Fragment)
        | ({ __typename?: 'PageLoadMetric' } & Metric_PageLoadMetric_Fragment)
        | ({
            __typename?: 'PageSegmentLoadMetric';
          } & Metric_PageSegmentLoadMetric_Fragment)
        | ({ __typename?: 'WebVitalsMetric' } & Metric_WebVitalsMetric_Fragment)
      >
    >;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }>;
};

type Metric_CustomMetric_Fragment = {
  __typename: 'CustomMetric';
  id: string;
  name?: Maybe<string>;
  product?: Maybe<Product>;
  key?: Maybe<string>;
  slackChannel?: Maybe<string>;
  owner?: Maybe<
    | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
    | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
  >;
};

type Metric_InlineResultMetric_Fragment = {
  __typename: 'InlineResultMetric';
  id: string;
  name?: Maybe<string>;
  product?: Maybe<Product>;
  key?: Maybe<string>;
  slackChannel?: Maybe<string>;
  owner?: Maybe<
    | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
    | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
  >;
};

type Metric_PageLoadMetric_Fragment = {
  __typename: 'PageLoadMetric';
  eventType?: Maybe<BrowserMetricEventType>;
  eventKey?: Maybe<string>;
  id: string;
  name?: Maybe<string>;
  product?: Maybe<Product>;
  key?: Maybe<string>;
  slackChannel?: Maybe<string>;
  owner?: Maybe<
    | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
    | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
  >;
};

type Metric_PageSegmentLoadMetric_Fragment = {
  __typename: 'PageSegmentLoadMetric';
  id: string;
  name?: Maybe<string>;
  product?: Maybe<Product>;
  key?: Maybe<string>;
  slackChannel?: Maybe<string>;
  owner?: Maybe<
    | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
    | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
  >;
};

type Metric_WebVitalsMetric_Fragment = {
  __typename: 'WebVitalsMetric';
  id: string;
  name?: Maybe<string>;
  product?: Maybe<Product>;
  key?: Maybe<string>;
  slackChannel?: Maybe<string>;
  owner?: Maybe<
    | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
    | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
  >;
};

export type MetricFragment =
  | Metric_CustomMetric_Fragment
  | Metric_InlineResultMetric_Fragment
  | Metric_PageLoadMetric_Fragment
  | Metric_PageSegmentLoadMetric_Fragment
  | Metric_WebVitalsMetric_Fragment;

export type GetSearchMetricsQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  products?: Maybe<Array<Product> | Product>;
  searchString?: Maybe<Scalars['String']>;
}>;

export type GetSearchMetricsQuery = {
  __typename?: 'Query';
  searchMetrics?: Maybe<{
    __typename: 'MetricPaginatedResults';
    totalCount: number;
    metrics?: Maybe<
      Array<
        | ({ __typename: 'CustomMetric' } & Metric_CustomMetric_Fragment)
        | ({
            __typename: 'InlineResultMetric';
          } & Metric_InlineResultMetric_Fragment)
        | ({ __typename: 'PageLoadMetric' } & Metric_PageLoadMetric_Fragment)
        | ({
            __typename: 'PageSegmentLoadMetric';
          } & Metric_PageSegmentLoadMetric_Fragment)
        | ({ __typename: 'WebVitalsMetric' } & Metric_WebVitalsMetric_Fragment)
      >
    >;
  }>;
};

export const MetricFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'metric' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Metric' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'product' } },
          { kind: 'Field', name: { kind: 'Name', value: 'key' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slackChannel' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Staff' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Team' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'teamName' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'InlineFragment',
            typeCondition: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PageLoadMetric' },
            },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'eventType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eventKey' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const GetMetricsDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getMetrics' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          defaultValue: { kind: 'IntValue', value: '200' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metrics' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'metric' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'metric' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'metric' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Metric' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'product' } },
          { kind: 'Field', name: { kind: 'Name', value: 'key' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slackChannel' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Staff' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Team' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'teamName' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'InlineFragment',
            typeCondition: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PageLoadMetric' },
            },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'eventType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eventKey' } },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useGetMetricsQuery__
 *
 * To run a query within a React component, call `useGetMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetMetricsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMetricsQuery,
    GetMetricsQueryVariables
  >,
) {
  return Apollo.useQuery<GetMetricsQuery, GetMetricsQueryVariables>(
    GetMetricsDocument,
    baseOptions,
  );
}
export function useGetMetricsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMetricsQuery,
    GetMetricsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetMetricsQuery, GetMetricsQueryVariables>(
    GetMetricsDocument,
    baseOptions,
  );
}
export type GetMetricsQueryHookResult = ReturnType<typeof useGetMetricsQuery>;
export type GetMetricsLazyQueryHookResult = ReturnType<
  typeof useGetMetricsLazyQuery
>;
export type GetMetricsQueryResult = Apollo.QueryResult<
  GetMetricsQuery,
  GetMetricsQueryVariables
>;
export function refetchGetMetricsQuery(variables?: GetMetricsQueryVariables) {
  return { query: GetMetricsDocument, variables: variables };
}
export const GetSearchMetricsDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getSearchMetrics' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'products' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'Product' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'searchString' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchMetrics' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'products' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'products' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchString' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'searchString' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'metrics' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'metric' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'metric' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Metric' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'product' } },
          { kind: 'Field', name: { kind: 'Name', value: 'key' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slackChannel' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'owner' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Staff' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullName' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Team' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'teamName' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'InlineFragment',
            typeCondition: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PageLoadMetric' },
            },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'eventType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eventKey' } },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useGetSearchMetricsQuery__
 *
 * To run a query within a React component, call `useGetSearchMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchMetricsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      products: // value for 'products'
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useGetSearchMetricsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSearchMetricsQuery,
    GetSearchMetricsQueryVariables
  >,
) {
  return Apollo.useQuery<GetSearchMetricsQuery, GetSearchMetricsQueryVariables>(
    GetSearchMetricsDocument,
    baseOptions,
  );
}
export function useGetSearchMetricsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSearchMetricsQuery,
    GetSearchMetricsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetSearchMetricsQuery,
    GetSearchMetricsQueryVariables
  >(GetSearchMetricsDocument, baseOptions);
}
export type GetSearchMetricsQueryHookResult = ReturnType<
  typeof useGetSearchMetricsQuery
>;
export type GetSearchMetricsLazyQueryHookResult = ReturnType<
  typeof useGetSearchMetricsLazyQuery
>;
export type GetSearchMetricsQueryResult = Apollo.QueryResult<
  GetSearchMetricsQuery,
  GetSearchMetricsQueryVariables
>;
export function refetchGetSearchMetricsQuery(
  variables?: GetSearchMetricsQueryVariables,
) {
  return { query: GetSearchMetricsDocument, variables: variables };
}
