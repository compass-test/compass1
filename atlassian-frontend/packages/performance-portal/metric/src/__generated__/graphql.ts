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

export type GetMetricAlertsQueryVariables = Exact<{
  metricId: Scalars['ID'];
  dateFrom: Scalars['Date'];
  dateTo: Scalars['Date'];
  env: Environment;
  aggregation: ToplineAggregation;
  toplineType: PageLoadToplineType;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
}>;

export type GetMetricAlertsQuery = {
  __typename?: 'Query';
  metric?: Maybe<
    | {
        __typename?: 'CustomMetric';
        alerts?: Maybe<Array<{ __typename?: 'Alert' } & AlertFragment>>;
      }
    | {
        __typename?: 'InlineResultMetric';
        alerts?: Maybe<Array<{ __typename?: 'Alert' } & AlertFragment>>;
      }
    | {
        __typename?: 'PageLoadMetric';
        alerts?: Maybe<Array<{ __typename?: 'Alert' } & AlertFragment>>;
      }
    | {
        __typename?: 'PageSegmentLoadMetric';
        alerts?: Maybe<Array<{ __typename?: 'Alert' } & AlertFragment>>;
      }
    | {
        __typename?: 'WebVitalsMetric';
        alerts?: Maybe<Array<{ __typename?: 'Alert' } & AlertFragment>>;
      }
  >;
};

export type AlertFragment = {
  __typename?: 'Alert';
  id: string;
  date?: Maybe<string>;
  sentAt?: Maybe<string>;
  opsgenieAlertId?: Maybe<string>;
  title?: Maybe<string>;
  description?: Maybe<string>;
  priority?: Maybe<AlertPriority>;
  status?: Maybe<string>;
  acknowledged?: Maybe<boolean>;
  snoozed?: Maybe<boolean>;
  isSeen?: Maybe<boolean>;
};

export type GetMetricByEventKeyQueryVariables = Exact<{
  eventKey: Scalars['String'];
}>;

export type GetMetricByEventKeyQuery = {
  __typename?: 'Query';
  metricByEventKey?: Maybe<
    | {
        __typename: 'CustomMetric';
        eventType?: Maybe<BrowserMetricEventType>;
        eventKey?: Maybe<string>;
        availableCohortTypes?: Maybe<Array<CohortType>>;
        id: string;
        name?: Maybe<string>;
        product?: Maybe<Product>;
        key?: Maybe<string>;
        slackChannel?: Maybe<string>;
        owner?: Maybe<
          | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
          | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
        >;
      }
    | {
        __typename: 'InlineResultMetric';
        eventType?: Maybe<BrowserMetricEventType>;
        eventKey?: Maybe<string>;
        availableCohortTypes?: Maybe<Array<CohortType>>;
        id: string;
        name?: Maybe<string>;
        product?: Maybe<Product>;
        key?: Maybe<string>;
        slackChannel?: Maybe<string>;
        owner?: Maybe<
          | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
          | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
        >;
      }
    | {
        __typename: 'PageLoadMetric';
        eventType?: Maybe<BrowserMetricEventType>;
        eventKey?: Maybe<string>;
        availableCohortTypes?: Maybe<Array<CohortType>>;
        id: string;
        name?: Maybe<string>;
        product?: Maybe<Product>;
        key?: Maybe<string>;
        slackChannel?: Maybe<string>;
        owner?: Maybe<
          | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
          | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
        >;
      }
    | {
        __typename: 'PageSegmentLoadMetric';
        eventType?: Maybe<BrowserMetricEventType>;
        eventKey?: Maybe<string>;
        availableCohortTypes?: Maybe<Array<CohortType>>;
        id: string;
        name?: Maybe<string>;
        product?: Maybe<Product>;
        key?: Maybe<string>;
        slackChannel?: Maybe<string>;
        owner?: Maybe<
          | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
          | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
        >;
      }
    | {
        __typename: 'WebVitalsMetric';
        eventType?: Maybe<BrowserMetricEventType>;
        eventKey?: Maybe<string>;
        availableCohortTypes?: Maybe<Array<CohortType>>;
        id: string;
        name?: Maybe<string>;
        product?: Maybe<Product>;
        key?: Maybe<string>;
        slackChannel?: Maybe<string>;
        owner?: Maybe<
          | { __typename: 'Team'; id: string; teamName?: Maybe<string> }
          | { __typename: 'Staff'; id: string; fullName?: Maybe<string> }
        >;
      }
  >;
};

export type PageLoadInitialRatioQueryVariables = Exact<{
  id: Scalars['ID'];
  env: Environment;
  dateTimeRange: DateTimeRange;
  aggregations: Array<ToplineAggregation> | ToplineAggregation;
  toplineTypes: Array<PageLoadToplineType> | PageLoadToplineType;
  pageLoadTypes: Array<PageLoadType> | PageLoadType;
  cohortTypes: Array<CohortType> | CohortType;
}>;

export type PageLoadInitialRatioQuery = {
  __typename?: 'Query';
  metric?: Maybe<
    | { __typename?: 'CustomMetric'; id: string }
    | { __typename?: 'InlineResultMetric'; id: string }
    | {
        __typename?: 'PageLoadMetric';
        id: string;
        toplineTrend?: Maybe<{
          __typename?: 'PageLoadToplineTrendResult';
          series?: Maybe<
            Array<{
              __typename?: 'PageLoadToplineTrendSeries';
              pageLoadType: PageLoadType;
              cohortType: CohortType;
              cohortValue: string;
              data?: Maybe<
                Array<
                  {
                    __typename?: 'TrendData';
                  } & PageLoadInitialRatioDataFragment
                >
              >;
            }>
          >;
        }>;
      }
    | { __typename?: 'PageSegmentLoadMetric'; id: string }
    | { __typename?: 'WebVitalsMetric'; id: string }
  >;
};

export type PageLoadInitialRatioDataFragment = {
  __typename?: 'TrendData';
  dateTime: string;
  count: number;
};

export type PerfPortalBreakdownChartQueryVariables = Exact<{
  id: Scalars['ID'];
  env: Environment;
  baseDate: Scalars['Date'];
  comparisonDate: Scalars['Date'];
  aggregation: BreakdownAggregation;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: Scalars['String'];
}>;

export type PerfPortalBreakdownChartQuery = {
  __typename?: 'Query';
  metric?: Maybe<
    | { __typename?: 'CustomMetric'; id: string }
    | { __typename?: 'InlineResultMetric'; id: string }
    | {
        __typename?: 'PageLoadMetric';
        id: string;
        baseBreakdown?: Maybe<
          {
            __typename?: 'PageLoadBreakdownResult';
          } & BreakdownResultFieldsFragment
        >;
        comparisonBreakdown?: Maybe<
          {
            __typename?: 'PageLoadBreakdownResult';
          } & BreakdownResultFieldsFragment
        >;
      }
    | { __typename?: 'PageSegmentLoadMetric'; id: string }
    | { __typename?: 'WebVitalsMetric'; id: string }
  >;
};

export type BreakdownResultFieldsFragment = {
  __typename?: 'PageLoadBreakdownResult';
  timings?: Maybe<{
    __typename?: 'PageLoadBreakdownTimings';
    app?: Maybe<
      Array<
        {
          __typename?: 'BrowserMetricBreakdownTimingDetail';
        } & BreakdownTimingDetailFragment
      >
    >;
    metric?: Maybe<
      Array<
        {
          __typename?: 'BrowserMetricBreakdownTimingDetail';
        } & BreakdownTimingDetailFragment
      >
    >;
  }>;
};

export type BreakdownTimingDetailFragment = {
  __typename?: 'BrowserMetricBreakdownTimingDetail';
  name: string;
  startTime: number;
  duration: number;
  count?: Maybe<number>;
  aggregatedAt?: Maybe<string>;
};

export type PerfPortalToplineChartQueryVariables = Exact<{
  id: Scalars['ID'];
  env: Environment;
  dateTimeRange: DateTimeRange;
  dateFrom: Scalars['DateTime'];
  dateTo: Scalars['DateTime'];
  aggregations: Array<ToplineAggregation> | ToplineAggregation;
  toplineTypes: Array<PageLoadToplineType> | PageLoadToplineType;
  pageLoadTypes: Array<PageLoadType> | PageLoadType;
  cohortTypes: Array<CohortType> | CohortType;
}>;

export type PerfPortalToplineChartQuery = {
  __typename?: 'Query';
  metric?: Maybe<
    | { __typename?: 'CustomMetric'; id: string }
    | { __typename?: 'InlineResultMetric'; id: string }
    | {
        __typename?: 'PageLoadMetric';
        id: string;
        hotEvents?: Maybe<
          Array<{ __typename?: 'HotEvent' } & HotEventFragment>
        >;
        toplineTrend?: Maybe<{
          __typename?: 'PageLoadToplineTrendResult';
          series?: Maybe<
            Array<
              {
                __typename?: 'PageLoadToplineTrendSeries';
              } & ToplineSeriesFragment
            >
          >;
        }>;
      }
    | { __typename?: 'PageSegmentLoadMetric'; id: string }
    | { __typename?: 'WebVitalsMetric'; id: string }
  >;
};

export type HotEventFragment = {
  __typename?: 'HotEvent';
  issueId?: Maybe<string>;
  name?: Maybe<string>;
  startAt?: Maybe<string>;
  endAt?: Maybe<string>;
};

export type ToplineSeriesFragment = {
  __typename?: 'PageLoadToplineTrendSeries';
  toplineType: PageLoadToplineType;
  aggregation: ToplineAggregation;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  cohortValue: string;
  version?: Maybe<string>;
  goal?: Maybe<
    Array<{ __typename?: 'PageLoadToplineGoal' } & ToplineGoalFragment>
  >;
  data?: Maybe<Array<{ __typename?: 'TrendData' } & ToplineTrendDataFragment>>;
};

export type ToplineGoalFragment = {
  __typename?: 'PageLoadToplineGoal';
  id: string;
  name?: Maybe<string>;
  value: number;
};

export type ToplineTrendDataFragment = {
  __typename?: 'TrendData';
  dateTime: string;
  value: number;
  count: number;
  aggregatedAt?: Maybe<string>;
  overrideAt?: Maybe<string>;
  overrideSourceName?: Maybe<string>;
};

export const AlertFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'alert' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Alert' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sentAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'opsgenieAlertId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'acknowledged' } },
          { kind: 'Field', name: { kind: 'Name', value: 'snoozed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSeen' } },
        ],
      },
    },
  ],
};
export const PageLoadInitialRatioDataFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'pageLoadInitialRatioData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TrendData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
        ],
      },
    },
  ],
};
export const BreakdownTimingDetailFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'breakdownTimingDetail' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'BrowserMetricBreakdownTimingDetail' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregatedAt' } },
        ],
      },
    },
  ],
};
export const BreakdownResultFieldsFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'breakdownResultFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadBreakdownResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'timings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'app' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'breakdownTimingDetail' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'metric' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'breakdownTimingDetail' },
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
      name: { kind: 'Name', value: 'breakdownTimingDetail' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'BrowserMetricBreakdownTimingDetail' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregatedAt' } },
        ],
      },
    },
  ],
};
export const HotEventFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'hotEvent' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'HotEvent' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'issueId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endAt' } },
        ],
      },
    },
  ],
};
export const ToplineGoalFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineGoal' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadToplineGoal' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
        ],
      },
    },
  ],
};
export const ToplineTrendDataFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineTrendData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TrendData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'overrideAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'overrideSourceName' },
          },
        ],
      },
    },
  ],
};
export const ToplineSeriesFragmentDoc: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineSeries' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadToplineTrendSeries' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'toplineType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pageLoadType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cohortType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cohortValue' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'goal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'toplineGoal' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'data' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'toplineTrendData' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineGoal' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadToplineGoal' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineTrendData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TrendData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'overrideAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'overrideSourceName' },
          },
        ],
      },
    },
  ],
};
export const GetMetricAlertsDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getMetricAlerts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'metricId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateFrom' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateTo' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'env' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Environment' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'aggregation' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ToplineAggregation' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'toplineType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PageLoadToplineType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageLoadType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PageLoadType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cohortType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CohortType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cohortValue' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metric' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'metricId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'alerts' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'dateFrom' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'dateFrom' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'dateTo' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'dateTo' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'env' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'env' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'aggregation' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'aggregation' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'toplineType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'toplineType' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageLoadType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageLoadType' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'cohortType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'cohortType' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'cohortValue' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'cohortValue' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'alert' },
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
      name: { kind: 'Name', value: 'alert' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Alert' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sentAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'opsgenieAlertId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priority' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'acknowledged' } },
          { kind: 'Field', name: { kind: 'Name', value: 'snoozed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSeen' } },
        ],
      },
    },
  ],
};

/**
 * __useGetMetricAlertsQuery__
 *
 * To run a query within a React component, call `useGetMetricAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricAlertsQuery({
 *   variables: {
 *      metricId: // value for 'metricId'
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *      env: // value for 'env'
 *      aggregation: // value for 'aggregation'
 *      toplineType: // value for 'toplineType'
 *      pageLoadType: // value for 'pageLoadType'
 *      cohortType: // value for 'cohortType'
 *      cohortValue: // value for 'cohortValue'
 *   },
 * });
 */
export function useGetMetricAlertsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMetricAlertsQuery,
    GetMetricAlertsQueryVariables
  >,
) {
  return Apollo.useQuery<GetMetricAlertsQuery, GetMetricAlertsQueryVariables>(
    GetMetricAlertsDocument,
    baseOptions,
  );
}
export function useGetMetricAlertsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMetricAlertsQuery,
    GetMetricAlertsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetMetricAlertsQuery,
    GetMetricAlertsQueryVariables
  >(GetMetricAlertsDocument, baseOptions);
}
export type GetMetricAlertsQueryHookResult = ReturnType<
  typeof useGetMetricAlertsQuery
>;
export type GetMetricAlertsLazyQueryHookResult = ReturnType<
  typeof useGetMetricAlertsLazyQuery
>;
export type GetMetricAlertsQueryResult = Apollo.QueryResult<
  GetMetricAlertsQuery,
  GetMetricAlertsQueryVariables
>;
export function refetchGetMetricAlertsQuery(
  variables?: GetMetricAlertsQueryVariables,
) {
  return { query: GetMetricAlertsDocument, variables: variables };
}
export const GetMetricByEventKeyDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getMetricByEventKey' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'eventKey' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metricByEventKey' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventKey' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'eventKey' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'product' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'owner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'Staff' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
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
                  kind: 'Field',
                  name: { kind: 'Name', value: 'slackChannel' },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'BrowserMetric' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'eventType' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'eventKey' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'availableCohortTypes' },
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
  ],
};

/**
 * __useGetMetricByEventKeyQuery__
 *
 * To run a query within a React component, call `useGetMetricByEventKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricByEventKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricByEventKeyQuery({
 *   variables: {
 *      eventKey: // value for 'eventKey'
 *   },
 * });
 */
export function useGetMetricByEventKeyQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMetricByEventKeyQuery,
    GetMetricByEventKeyQueryVariables
  >,
) {
  return Apollo.useQuery<
    GetMetricByEventKeyQuery,
    GetMetricByEventKeyQueryVariables
  >(GetMetricByEventKeyDocument, baseOptions);
}
export function useGetMetricByEventKeyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMetricByEventKeyQuery,
    GetMetricByEventKeyQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetMetricByEventKeyQuery,
    GetMetricByEventKeyQueryVariables
  >(GetMetricByEventKeyDocument, baseOptions);
}
export type GetMetricByEventKeyQueryHookResult = ReturnType<
  typeof useGetMetricByEventKeyQuery
>;
export type GetMetricByEventKeyLazyQueryHookResult = ReturnType<
  typeof useGetMetricByEventKeyLazyQuery
>;
export type GetMetricByEventKeyQueryResult = Apollo.QueryResult<
  GetMetricByEventKeyQuery,
  GetMetricByEventKeyQueryVariables
>;
export function refetchGetMetricByEventKeyQuery(
  variables?: GetMetricByEventKeyQueryVariables,
) {
  return { query: GetMetricByEventKeyDocument, variables: variables };
}
export const PageLoadInitialRatioDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'pageLoadInitialRatio' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'env' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Environment' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateTimeRange' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeRange' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'aggregations' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ToplineAggregation' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'toplineTypes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'PageLoadToplineType' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageLoadTypes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'PageLoadType' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cohortTypes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'CohortType' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metric' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PageLoadMetric' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'toplineTrend' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'env' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'env' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'dateTimeRange' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'dateTimeRange' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'aggregations' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'aggregations' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'toplineTypes' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'toplineTypes' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'pageLoadTypes' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'pageLoadTypes' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'cohortTypes' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'cohortTypes' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'series' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'pageLoadType',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'cohortType' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'cohortValue',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'data' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'FragmentSpread',
                                          name: {
                                            kind: 'Name',
                                            value: 'pageLoadInitialRatioData',
                                          },
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
      name: { kind: 'Name', value: 'pageLoadInitialRatioData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TrendData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
        ],
      },
    },
  ],
};

/**
 * __usePageLoadInitialRatioQuery__
 *
 * To run a query within a React component, call `usePageLoadInitialRatioQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageLoadInitialRatioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageLoadInitialRatioQuery({
 *   variables: {
 *      id: // value for 'id'
 *      env: // value for 'env'
 *      dateTimeRange: // value for 'dateTimeRange'
 *      aggregations: // value for 'aggregations'
 *      toplineTypes: // value for 'toplineTypes'
 *      pageLoadTypes: // value for 'pageLoadTypes'
 *      cohortTypes: // value for 'cohortTypes'
 *   },
 * });
 */
export function usePageLoadInitialRatioQuery(
  baseOptions: Apollo.QueryHookOptions<
    PageLoadInitialRatioQuery,
    PageLoadInitialRatioQueryVariables
  >,
) {
  return Apollo.useQuery<
    PageLoadInitialRatioQuery,
    PageLoadInitialRatioQueryVariables
  >(PageLoadInitialRatioDocument, baseOptions);
}
export function usePageLoadInitialRatioLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PageLoadInitialRatioQuery,
    PageLoadInitialRatioQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    PageLoadInitialRatioQuery,
    PageLoadInitialRatioQueryVariables
  >(PageLoadInitialRatioDocument, baseOptions);
}
export type PageLoadInitialRatioQueryHookResult = ReturnType<
  typeof usePageLoadInitialRatioQuery
>;
export type PageLoadInitialRatioLazyQueryHookResult = ReturnType<
  typeof usePageLoadInitialRatioLazyQuery
>;
export type PageLoadInitialRatioQueryResult = Apollo.QueryResult<
  PageLoadInitialRatioQuery,
  PageLoadInitialRatioQueryVariables
>;
export function refetchPageLoadInitialRatioQuery(
  variables?: PageLoadInitialRatioQueryVariables,
) {
  return { query: PageLoadInitialRatioDocument, variables: variables };
}
export const PerfPortalBreakdownChartDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'perfPortalBreakdownChart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'env' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Environment' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'baseDate' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'comparisonDate' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'aggregation' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'BreakdownAggregation' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageLoadType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'PageLoadType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cohortType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CohortType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cohortValue' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metric' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PageLoadMetric' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'baseBreakdown' },
                        name: { kind: 'Name', value: 'breakdown' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'env' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'env' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'date' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'baseDate' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'aggregation' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'aggregation' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'pageLoadType' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'pageLoadType' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'cohortType' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'cohortType' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'cohortValue' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'cohortValue' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'breakdownResultFields',
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'comparisonBreakdown' },
                        name: { kind: 'Name', value: 'breakdown' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'env' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'env' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'date' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'comparisonDate' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'aggregation' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'aggregation' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'pageLoadType' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'pageLoadType' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'cohortType' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'cohortType' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'cohortValue' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'cohortValue' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'breakdownResultFields',
                              },
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
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'breakdownResultFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadBreakdownResult' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'timings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'app' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'breakdownTimingDetail' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'metric' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'breakdownTimingDetail' },
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
      name: { kind: 'Name', value: 'breakdownTimingDetail' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'BrowserMetricBreakdownTimingDetail' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregatedAt' } },
        ],
      },
    },
  ],
};

/**
 * __usePerfPortalBreakdownChartQuery__
 *
 * To run a query within a React component, call `usePerfPortalBreakdownChartQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerfPortalBreakdownChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerfPortalBreakdownChartQuery({
 *   variables: {
 *      id: // value for 'id'
 *      env: // value for 'env'
 *      baseDate: // value for 'baseDate'
 *      comparisonDate: // value for 'comparisonDate'
 *      aggregation: // value for 'aggregation'
 *      pageLoadType: // value for 'pageLoadType'
 *      cohortType: // value for 'cohortType'
 *      cohortValue: // value for 'cohortValue'
 *   },
 * });
 */
export function usePerfPortalBreakdownChartQuery(
  baseOptions: Apollo.QueryHookOptions<
    PerfPortalBreakdownChartQuery,
    PerfPortalBreakdownChartQueryVariables
  >,
) {
  return Apollo.useQuery<
    PerfPortalBreakdownChartQuery,
    PerfPortalBreakdownChartQueryVariables
  >(PerfPortalBreakdownChartDocument, baseOptions);
}
export function usePerfPortalBreakdownChartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PerfPortalBreakdownChartQuery,
    PerfPortalBreakdownChartQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    PerfPortalBreakdownChartQuery,
    PerfPortalBreakdownChartQueryVariables
  >(PerfPortalBreakdownChartDocument, baseOptions);
}
export type PerfPortalBreakdownChartQueryHookResult = ReturnType<
  typeof usePerfPortalBreakdownChartQuery
>;
export type PerfPortalBreakdownChartLazyQueryHookResult = ReturnType<
  typeof usePerfPortalBreakdownChartLazyQuery
>;
export type PerfPortalBreakdownChartQueryResult = Apollo.QueryResult<
  PerfPortalBreakdownChartQuery,
  PerfPortalBreakdownChartQueryVariables
>;
export function refetchPerfPortalBreakdownChartQuery(
  variables?: PerfPortalBreakdownChartQueryVariables,
) {
  return { query: PerfPortalBreakdownChartDocument, variables: variables };
}
export const PerfPortalToplineChartDocument: DocumentNode = /*#__PURE__*/ {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'perfPortalToplineChart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'env' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Environment' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateTimeRange' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeRange' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateFrom' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateTo' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'aggregations' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ToplineAggregation' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'toplineTypes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'PageLoadToplineType' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageLoadTypes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'PageLoadType' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cohortTypes' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'CohortType' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'metric' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'PageLoadMetric' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hotEvents' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'from' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'dateFrom' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'to' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'dateTo' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'hotEvent' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'toplineTrend' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'env' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'env' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'dateTimeRange' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'dateTimeRange' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'aggregations' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'aggregations' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'toplineTypes' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'toplineTypes' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'pageLoadTypes' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'pageLoadTypes' },
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'cohortTypes' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'cohortTypes' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'series' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'toplineSeries',
                                    },
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
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'hotEvent' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'HotEvent' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'issueId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineSeries' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadToplineTrendSeries' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'toplineType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pageLoadType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cohortType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cohortValue' } },
          { kind: 'Field', name: { kind: 'Name', value: 'version' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'goal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'toplineGoal' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'data' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'toplineTrendData' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineGoal' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageLoadToplineGoal' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'toplineTrendData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TrendData' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'dateTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          { kind: 'Field', name: { kind: 'Name', value: 'aggregatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'overrideAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'overrideSourceName' },
          },
        ],
      },
    },
  ],
};

/**
 * __usePerfPortalToplineChartQuery__
 *
 * To run a query within a React component, call `usePerfPortalToplineChartQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerfPortalToplineChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerfPortalToplineChartQuery({
 *   variables: {
 *      id: // value for 'id'
 *      env: // value for 'env'
 *      dateTimeRange: // value for 'dateTimeRange'
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *      aggregations: // value for 'aggregations'
 *      toplineTypes: // value for 'toplineTypes'
 *      pageLoadTypes: // value for 'pageLoadTypes'
 *      cohortTypes: // value for 'cohortTypes'
 *   },
 * });
 */
export function usePerfPortalToplineChartQuery(
  baseOptions: Apollo.QueryHookOptions<
    PerfPortalToplineChartQuery,
    PerfPortalToplineChartQueryVariables
  >,
) {
  return Apollo.useQuery<
    PerfPortalToplineChartQuery,
    PerfPortalToplineChartQueryVariables
  >(PerfPortalToplineChartDocument, baseOptions);
}
export function usePerfPortalToplineChartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PerfPortalToplineChartQuery,
    PerfPortalToplineChartQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    PerfPortalToplineChartQuery,
    PerfPortalToplineChartQueryVariables
  >(PerfPortalToplineChartDocument, baseOptions);
}
export type PerfPortalToplineChartQueryHookResult = ReturnType<
  typeof usePerfPortalToplineChartQuery
>;
export type PerfPortalToplineChartLazyQueryHookResult = ReturnType<
  typeof usePerfPortalToplineChartLazyQuery
>;
export type PerfPortalToplineChartQueryResult = Apollo.QueryResult<
  PerfPortalToplineChartQuery,
  PerfPortalToplineChartQueryVariables
>;
export function refetchPerfPortalToplineChartQuery(
  variables?: PerfPortalToplineChartQueryVariables,
) {
  return { query: PerfPortalToplineChartDocument, variables: variables };
}
