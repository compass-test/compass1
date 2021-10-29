import jsonStringfy from 'fast-json-stable-stringify';

import { ReadyReason } from '../api/types';
import { FeatureFlag, FeatureFlagResponse } from '../fetcher/types';
import {
  AnalyticsClientInterface,
  ClientOptions,
  EnvironmentType,
  EvaluationErrorKind,
  EvaluationReason,
  FeatureFlagUser,
  GetValueOptions,
  RawFlag,
  RawFlags,
  SupportedFlagTypes,
} from '../index';
import getLogger from '../logger';
import cloneObject from '../util/clone-object';
import { FeatureFlagState } from '../util/types';

import { FeatureFlagUpdate, RefreshStatus } from './types';

export function featureFlagToRawFlag(
  featureFlag: FeatureFlag,
): RawFlag<SupportedFlagTypes> {
  const rawFlag: RawFlag<SupportedFlagTypes> = {
    value: featureFlag.value,
    trackingInfo: featureFlag.trackingInfo || {
      samplingRate: 0,
    },
  };
  if (featureFlag.reason) {
    rawFlag.evaluationDetail = {
      reason: featureFlag.reason,
      ruleId: featureFlag.ruleId,
    };
  }
  return rawFlag;
}

export function flagResponseToFlagUpdate(
  response: FeatureFlagResponse,
): FeatureFlagUpdate {
  const flags: RawFlags = {};
  response.featureFlagValues?.forEach((featureFlag) => {
    flags[featureFlag.key] = featureFlagToRawFlag(featureFlag);
  });

  return {
    flags,
    deletedFlags: response.deletedFlags || [],
    versionData: response.versionData,
  };
}

export function flagStateToFlagUpdate(
  currentFlags: RawFlags,
  newFlagState: FeatureFlagState | FeatureFlagUpdate,
): FeatureFlagUpdate {
  const newFlags = newFlagState?.flags || {};

  const deletedFlags: Array<string> = Object.keys(currentFlags).filter(
    (flagKey) => newFlags[flagKey] === undefined,
  );

  const versionData = getVersionData(newFlagState);

  return {
    flags: newFlags,
    deletedFlags,
    versionData,
  };
}

const getVersionData = (
  flagState: FeatureFlagState | FeatureFlagUpdate,
): string | undefined => {
  if ('version' in flagState) {
    return flagState.version;
  } else if ('versionData' in flagState) {
    return flagState.versionData;
  }
  return undefined;
};

export function hasFlagValueChanged(
  oldFlag?: RawFlag<any>,
  newFlag?: RawFlag<any>,
): boolean {
  return jsonStringfy(oldFlag?.value) !== jsonStringfy(newFlag?.value);
}

export function refreshStatusToEvaluationErrorKind(
  status: RefreshStatus,
): EvaluationErrorKind {
  switch (status) {
    case RefreshStatus.INITIALISED:
      return EvaluationErrorKind.CLIENT_NOT_READY;
    case RefreshStatus.ERROR:
      return EvaluationErrorKind.SERVER_ERROR;
    case RefreshStatus.SUCCESS:
      return EvaluationErrorKind.FLAG_NOT_FOUND;
    default:
      return EvaluationErrorKind.OTHER;
  }
}

export function validateFlag<T extends SupportedFlagTypes>(
  flag: RawFlag<T> | undefined,
  defaultValue: T,
  refreshStatus: RefreshStatus,
  options?: GetValueOptions<T>,
): RawFlag<T> {
  if (!flag) {
    return {
      value: defaultValue,
      evaluationDetail: {
        reason: EvaluationReason.ERROR,
        errorKind: refreshStatusToEvaluationErrorKind(refreshStatus),
      },
    };
  }

  if (typeof flag.value !== typeof defaultValue) {
    return {
      value: defaultValue,
      trackingInfo: flag.trackingInfo,
      evaluationDetail: {
        reason: EvaluationReason.ERROR,
        errorKind: EvaluationErrorKind.WRONG_TYPE,
      },
    };
  }

  if (options?.oneOf?.length && options.oneOf.indexOf(flag.value) < 0) {
    return {
      value: defaultValue,
      trackingInfo: flag.trackingInfo,
      evaluationDetail: {
        reason: EvaluationReason.ERROR,
        errorKind: EvaluationErrorKind.VALIDATION_ERROR,
      },
    };
  }

  return cloneObject(flag);
}

export function isBlank(str?: string): boolean {
  return !str || /^\s*$/.test(str);
}

export function isFunction(func: any): boolean {
  return typeof func === 'function';
}

export function validateConstructorArgs(
  apiKey: string,
  analyticsWebClient: AnalyticsClientInterface,
  featureFlagUser: FeatureFlagUser,
  options: ClientOptions,
): void {
  if (isBlank(apiKey)) {
    throw new Error('apiKey is missing');
  }

  if (!isFunction(analyticsWebClient?.sendOperationalEvent)) {
    throw new Error(
      'analyticsWebClient.sendOperationalEvent is missing or not a function',
    );
  }

  if (!featureFlagUser) {
    throw new Error('featureFlagUser is missing');
  }

  if (isBlank(options?.productKey)) {
    throw new Error('options.productKey is missing');
  }

  if (Object.values(EnvironmentType).indexOf(options?.environment) === -1) {
    throw new Error('options.environment is missing or invalid');
  }

  if (
    options.pollingInterval !== undefined &&
    options.pollingInterval !== null
  ) {
    const prodMinInterval = 60000;
    const nonProdMinInterval = 1000;
    if (options.pollingInterval <= prodMinInterval) {
      if (options.environment === EnvironmentType.PROD) {
        // eslint-disable-next-line no-param-reassign
        options.pollingInterval = prodMinInterval;
        getLogger().log(
          `options.pollingInterval needs to be greater than ${prodMinInterval}`,
        );
      } else if (options.pollingInterval <= nonProdMinInterval) {
        throw new Error(
          `options.pollingInterval needs to be greater than ${nonProdMinInterval}`,
        );
      } else {
        getLogger().log(
          `options.pollingInterval needs to be greater than ${prodMinInterval} in Production`,
        );
      }
    }
  }
}

export function validateDefaultValue(value: any): void {
  if (value === undefined || value === null) {
    throw new Error('defaultValue is missing');
  }
}

/* eslint-disable no-bitwise */
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const uuid = char === 'x' ? random : (random & 0x3) | 0x8;
    return uuid.toString(16);
  });
}
/* eslint-enable no-bitwise */

export function getReadyMessageForStatusCode(statusCode?: number): string {
  switch (statusCode) {
    case 0:
      return 'Request took too long to finish, client aborted the request.';
    case 400:
      return 'Service returned bad request response code. The version data maybe malformed or out of sync with the server.';
    case 401:
      return 'Service returned unauthorized response code. Ensure that the API token is valid for this environment.';
    case 429:
      return 'Service rate limit exceeded.';
    case 500:
    case 502:
    case 503:
    case 504:
      return `Service is unavailable, status code: ${statusCode}`;
    default:
      return `Unsure what went wrong, status code: ${statusCode}`;
  }
}

export function getReasonForStatusCode(statusCode?: number): ReadyReason {
  if (statusCode && statusCode >= 500) {
    return ReadyReason.SERVER_ERROR;
  }
  return ReadyReason.CLIENT_ERROR;
}
