export enum Identifiers {
  ANALYTICS_ANONYMOUS_ID = 'analyticsAnonymousId',
  ATLASSIAN_ACCOUNT_ID = 'atlassianAccountId',
  TENANT_ID = 'tenantId',
  TRELLO_ANONYMOUS_ID = 'trelloAnonymousUserId',
  TRELLO_USER_ID = 'trelloUserId',
  FF_CLIENT_ANONYMOUS_ID = 'ffClientAnonymousId',
}

/**
 * Reasons from a FeatureFlag evaluation to explain the value provided.
 *
 * By default it uses 'OFF' = 0, which consider 0 in EvaluationReason and '0' in EvaluationReason
 * are valid EvaluationReason value
 * We set the enum value to string thus it can perform proper 'reason in EvaluationReason' check
 *
 */
export enum EvaluationReason {
  OFF = 'OFF',
  FALLTHROUGH = 'FALLTHROUGH',
  RULE_MATCH = 'RULE_MATCH',
  TARGET_MATCH = 'TARGET_MATCH',
  PREREQUISITE_FAILED = 'PREREQUISITE_FAILED',
  ERROR = 'ERROR',
  INELIGIBLE = 'INELIGIBLE',
  OVERRIDE = 'OVERRIDE',
}

/**
 * The error kind when there is a problem evaluating a FeatureFlag
 */
export enum EvaluationErrorKind {
  CLIENT_NOT_READY = 'CLIENT_NOT_READY',
  FLAG_NOT_FOUND = 'FLAG_NOT_FOUND',
  WRONG_TYPE = 'WRONG_TYPE',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  OTHER = 'OTHER',
}

/**
 * Types of feature flag values we support.
 */
type PrimitiveSupportedFlagTypes = boolean | string | number;
export type SupportedFlagTypes =
  | PrimitiveSupportedFlagTypes
  | Array<PrimitiveSupportedFlagTypes>
  | { [key: string]: PrimitiveSupportedFlagTypes };

/**
 * JSON map of additional data that can be sent with an exposure event.
 */
export interface ExposureData {
  [attributeName: string]: string | number | boolean;
}

/**
 * Options for the getValue or getFlagValue functions.
 */
export interface GetValueOptions<T extends SupportedFlagTypes> {
  /**
   * In case of a string, value must be contained in the array to be considered valid.
   */
  oneOf?: T[];
  /**
   * Additional data to be sent in the analytics exposure event.
   */
  exposureData?: ExposureData;
  /**
   * If true, sends an exposure event for the evaluated flag.
   * Note: 'Explanation' is required on the flag for the event to be sent.
   * Defaults to false.
   */
  shouldSendExposureEvent?: boolean;
}

/**
 * Used for feature flags tracking experiments.
 * This could be available from the FeatureFlag beyond MVP.
 *
 * Provides an explanation to how the value was assigned.
 */
export interface EvaluationDetail {
  /**
   * The reason in LaunchDarkly for the provided value.
   */
  reason: EvaluationReason;
  /**
   * UUID of the rule on the flag which matched.
   * Only used if reason === EvaluationReason.Rule_Match.
   */
  ruleId?: string;

  /**
   * The error kind when there is a problem evaluating a FeatureFlag
   * Only use if reason === EvaluationReason.ERROR
   */
  errorKind?: EvaluationErrorKind;
}

// TODO: Not quite right, this returns the keys of the enum, not the values.
// Would be ideal if we could use the values. Else remove the uppercase keys and use values as keys
// some workaround here https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
// export type IdentifiersObject = {
//   [key in keyof typeof Identifiers]: string;
// };
export interface IdentifiersObject {
  [identifierName: string]: string;
}

export interface AnonymousFlagUser {
  identifier?: {
    type: Identifiers;
    value: string;
  };
  isAnonymous?: true;
  additionalIdentifiers?: IdentifiersObject;
  custom?: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Context specific to the logged in user.
 */
export interface FeatureFlagUserWithIdentifier {
  identifier: {
    type: Identifiers;
    value: string;
  };
  isAnonymous?: boolean;
  additionalIdentifiers?: IdentifiersObject;
  custom?: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

export type FeatureFlagUser = AnonymousFlagUser | FeatureFlagUserWithIdentifier;

export interface ClientOptions {
  productKey: string;
  environment: EnvironmentType;
  pollingInterval?: number;
  readyTimeoutInMilliseconds?: number;
  loggerOptions?: LoggerOptions;
}

export interface FlagData<T extends SupportedFlagTypes> extends RawFlag<T> {
  key: string;
}

export interface ExposureEventAttributes {
  flagKey: string;
  reason?: EvaluationReason;
  ruleId?: string;
  errorKind?: EvaluationErrorKind;
  value: SupportedFlagTypes;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export enum ExposureType {
  OptIn = 'optInExposure', // Consumer sets shouldSendExposureEvent to true
  Automatic = 'autoExposure', // Consumer does not pass in shouldSendExposureEvent (fired as part of TAC)
}

export interface FeatureExposedEventType {
  action: 'exposed';
  actionSubject: 'feature';
  attributes: ExposureEventAttributes;
  tags: ['measurement', ExposureType];
  source: '@atlassiansox/feature-flag-web-client';
  highPriority: boolean;
}

/**
 * The analytics-web-client used by the product.
 */
export interface AnalyticsClientInterface {
  sendOperationalEvent(event: FeatureExposedEventType): void;
}

/**
 * Client used to fetch, cache and evaluate flags.
 */
export interface FeatureFlagClientInterface {
  /**
   * Wait for the Feature flag client to load flags from cache,
   * or from the feature flag service
   */
  ready(): Promise<ReadyResponse>;

  getFlagValue<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): T;

  getFlagDetails<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): RawFlag<T>;

  getFlags(): RawFlags;

  on<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    callback: (flagValue: T) => void,
    options?: GetValueOptions<T>,
  ): () => void;

  onAnyFlagUpdated(callback: () => void): () => void;

  updateFeatureFlagUser(
    featureFlagUser: FeatureFlagUser,
  ): Promise<ReadyResponse>;

  setAutomaticExposuresEnabled(
    enabled: boolean,
    predicate?: AutomaticExposureEventsPredicate,
  ): void;
}

export interface FeatureFlagInterface<T extends SupportedFlagTypes> {
  getValue(options: GetValueOptions<T>): T;
}

/**
 * TrackingInfo defines the behaviour of how exposures are fired
 * from the client for a particular feature flag.
 *  - samplingRate: An integer representing the rate at which exposure
 *                  events should be emitted. It is represented as 1/x,
 *                  where x >= 0. When x = 0 -> 0%, 1 -> 100%, 2 -> 50% ...
 */
export interface TrackingInfo {
  samplingRate: number;
}

export interface RawFlag<T extends SupportedFlagTypes> {
  value: T;
  trackingInfo?: TrackingInfo;
  evaluationDetail?: EvaluationDetail;
}

export interface RawFlags {
  [flagKey: string]: RawFlag<SupportedFlagTypes>;
}

export enum EnvironmentType {
  LOCAL = 'local',
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod',
}

export enum ReadyReason {
  CACHE = 'CACHE',
  FETCH = 'FETCH',
  CLIENT_ERROR = 'CLIENT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface ReadyResponse {
  reason: ReadyReason;
  message?: string;
  serverResponse?: string;
}

// Loggers

export enum LogLevel {
  // Dont use 0 to prevent falsy values
  DEBUG = 1,
  INFO = 2,
  LOG = 3,
  WARN = 4,
  ERROR = 5,
}

export interface LoggerType {
  debug: Console['debug'];
  info: Console['info'];
  log: Console['log'];
  warn: Console['warn'];
  error: Console['error'];
}

export interface LoggerOptions {
  enabled?: boolean;
  logger?: LoggerType;
  level?: LogLevel;
}

export type AutomaticExposureEventsPredicate = (
  exposure: ExposureEventAttributes,
) => boolean;
