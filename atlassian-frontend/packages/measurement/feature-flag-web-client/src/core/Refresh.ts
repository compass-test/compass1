import jsonStringfy from 'fast-json-stable-stringify';

import Fetcher from '../fetcher';
import { ResponseError } from '../fetcher/errors';
import {
  ClientCauseReason,
  ClientUserState,
  FeatureFlagResponse,
} from '../fetcher/types';
import { EnvironmentType, FeatureFlagUserWithIdentifier } from '../index';
import getLogger, { LoggerType } from '../logger';

import MetadataManager from './MetadataManager';
import { FeatureFlagUpdate, PollingConfig, RefreshStatus } from './types';
import { flagResponseToFlagUpdate } from './util';

export const SCHEDULER_OPTIONS_DEFAULT: PollingConfig = {
  minWaitInterval: 300000, // 300 second = 5 mins
  maxWaitInterval: 1200000, // 1200 second = 20 mins
  backOffFactor: 2,
  backOffJitter: 0.1, // Jitter is upto 10% of wait time
  interval: 300000, // 300 second = 5 mins
  tabHiddenPollingFactor: 12, // for hidden tabs, use hiddenTabFactor * interval for polling = 1 hour (default)
  maxInstantRetryTimes: 0,
};

export const NO_CACHE_RETRY_OPTIONS_DEFAULT: PollingConfig = {
  ...SCHEDULER_OPTIONS_DEFAULT,
  minWaitInterval: 500,
  interval: 500,
  maxInstantRetryTimes: 1,
};

type OnErrorType = (statusCode?: number, rawBody?: string) => void;

export default class Refresh {
  private readonly fetcher: Fetcher;

  private readonly metadataManager: MetadataManager;

  private timerId: number | undefined;

  private readonly pollingConfig: PollingConfig;

  private readonly noCachePollingConfig: PollingConfig;

  private failureCount = 0;

  private status: RefreshStatus;

  private user: FeatureFlagUserWithIdentifier;

  private onFeatureFlagUpdate: (response: FeatureFlagUpdate) => void;

  private version: string | undefined;

  private lastUpdateTimestamp: number;

  private onError: OnErrorType;

  private logger: LoggerType;

  constructor(
    apiKey: string,
    env: EnvironmentType,
    user: FeatureFlagUserWithIdentifier,
    onFeatureFlagUpdate: (response: FeatureFlagUpdate) => void,
    pollingConfig?: Partial<PollingConfig>,
    version?: string,
    lastUpdateTimestamp = 0,
    onError: OnErrorType = (): void => {},
    noCachePollingConfig?: Partial<PollingConfig>,
  ) {
    this.logger = getLogger();
    this.user = user;
    this.onFeatureFlagUpdate = onFeatureFlagUpdate;
    this.version = version;
    this.lastUpdateTimestamp = lastUpdateTimestamp;
    this.pollingConfig = {
      minWaitInterval:
        pollingConfig?.minWaitInterval ||
        SCHEDULER_OPTIONS_DEFAULT.minWaitInterval,
      maxWaitInterval:
        pollingConfig?.maxWaitInterval ||
        SCHEDULER_OPTIONS_DEFAULT.maxWaitInterval,
      backOffFactor:
        pollingConfig?.backOffFactor || SCHEDULER_OPTIONS_DEFAULT.backOffFactor,
      backOffJitter:
        pollingConfig?.backOffJitter !== undefined
          ? pollingConfig.backOffJitter
          : SCHEDULER_OPTIONS_DEFAULT.backOffJitter,
      interval: pollingConfig?.interval || SCHEDULER_OPTIONS_DEFAULT.interval,
      tabHiddenPollingFactor:
        pollingConfig?.tabHiddenPollingFactor ||
        SCHEDULER_OPTIONS_DEFAULT.tabHiddenPollingFactor,
      maxInstantRetryTimes: 0, // Force this to 0 so this never reschdules instantly with cache
    };
    this.noCachePollingConfig = {
      minWaitInterval:
        noCachePollingConfig?.minWaitInterval ||
        NO_CACHE_RETRY_OPTIONS_DEFAULT.minWaitInterval,
      maxWaitInterval:
        noCachePollingConfig?.maxWaitInterval ||
        NO_CACHE_RETRY_OPTIONS_DEFAULT.maxWaitInterval,
      backOffFactor:
        noCachePollingConfig?.backOffFactor ||
        NO_CACHE_RETRY_OPTIONS_DEFAULT.backOffFactor,
      backOffJitter:
        noCachePollingConfig?.backOffJitter !== undefined
          ? noCachePollingConfig.backOffJitter
          : NO_CACHE_RETRY_OPTIONS_DEFAULT.backOffJitter,
      interval:
        noCachePollingConfig?.interval ||
        NO_CACHE_RETRY_OPTIONS_DEFAULT.interval,
      tabHiddenPollingFactor:
        pollingConfig?.tabHiddenPollingFactor ||
        SCHEDULER_OPTIONS_DEFAULT.tabHiddenPollingFactor,
      maxInstantRetryTimes:
        noCachePollingConfig?.maxInstantRetryTimes !== undefined
          ? noCachePollingConfig.maxInstantRetryTimes
          : NO_CACHE_RETRY_OPTIONS_DEFAULT.maxInstantRetryTimes,
    };
    this.onError = onError;
    this.fetcher = new Fetcher(apiKey, env);
    this.metadataManager = new MetadataManager(this.pollingConfig);
    this.status = RefreshStatus.INITIALISED;
    this.updateMetadataOnInitialisation();
    this.visibilityChangeHandler = this.visibilityChangeHandler.bind(this);
  }

  // start refresh by fetchAndReschedule
  start(): void {
    this.stop();
    this.bindVisibilityChange();
    this.fetchAndReschedule();
  }

  // cancel pending schedule
  stop(): void {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = undefined;
      this.unbindVisibilityChange();
    }
  }

  // update user, with optional version and timestamp
  updateUserContext(
    user: FeatureFlagUserWithIdentifier,
    version?: string,
    lastUpdateTimestamp = 0,
  ): void {
    this.user = user;
    this.version = version;
    this.lastUpdateTimestamp = lastUpdateTimestamp;
    this.failureCount = 0;
    this.updateMetadataOnUserChange();
  }

  // update version and timestamp
  setVersionAndTimestamp(
    version: string | undefined,
    lastUpdateTimestamp: number,
  ): void {
    this.version = version;
    this.lastUpdateTimestamp = lastUpdateTimestamp;
  }

  getStatus(): RefreshStatus {
    return this.status;
  }

  private visibilityChangeHandler(): void {
    // cancel existing schedule
    window.clearTimeout(this.timerId);
    this.timerId = undefined;
    // get current tab hidden state (for unsupported browser isTabHidden() will return false), so
    // if isTabHidden true: create a new schedule with a longer interval
    // if isTabHidden false: do a fetchAndReschedule (conditional do a fetch, schedule with normal interval)
    if (Refresh.isTabHidden()) {
      this.schedule();
    } else {
      this.fetchAndReschedule();
    }
  }

  private static isTabHidden(): boolean {
    return document.visibilityState === 'hidden';
  }

  // bind tab visibility change callback
  private bindVisibilityChange(): void {
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  // unbind tab visibility change callback
  private unbindVisibilityChange(): void {
    document.removeEventListener(
      'visibilitychange',
      this.visibilityChangeHandler,
    );
  }

  // schedule a fetchAndReschedule
  private schedule(): void {
    this.timerId = window.setTimeout(() => {
      this.fetchAndReschedule();
    }, this.calculateInterval());
  }

  // conditional fetch ffs via fetcher, and schedule another fetchAndReschedule unless we have 400/401 from ffs
  private fetchAndReschedule(): void {
    const fetchedUser = jsonStringfy(this.user);
    if (this.isFetchRequired()) {
      this.fetcher
        .fetchFeatureFlags(this.user, this.metadataManager.get(), this.version)
        .then((resp: FeatureFlagResponse) => {
          if (fetchedUser === jsonStringfy(this.user)) {
            this.failureCount = 0;
            this.onFeatureFlagUpdate(flagResponseToFlagUpdate(resp));
            this.schedule();
            this.status = RefreshStatus.SUCCESS;
          }
          this.updateMetadataOnRequestComplete();
        })
        .catch((err: Error) => {
          // 401 means client info or apiKey invalid, will have no retry
          // 400 means version data or request body invalid, will have at most `maxInstantRetryTimes` instant retries
          // other 4xx or 5xx will do `maxInstantRetryTimes` instant retries and continue to do backoff retries
          if (err instanceof ResponseError && err.status === 401) {
            // no retry needed
            const message = `Feature flag service returned ${err.status}, "${err.body}". This request will not be retried until the user data has been changed.`;
            this.logger.error(message);
            this.onError(err.status, err.body);
          } else if (err instanceof ResponseError && err.status === 400) {
            if (this.version) {
              // 400 could be caused by corrupted version data, so clear it and schedule a retry
              this.failureCount += 1;
              // a user with no cache will retry instantly for maxInstantRetryTimes
              // onError will be called after all allowed attempts fail
              if (
                this.failureCount > this.getPollingConfig().maxInstantRetryTimes
              ) {
                this.onError(err.status, err.body);
              }

              this.logger.error(
                `Feature flag service returned ${err.status}, "${err.body}". Clear version data and retry.`,
              );
              this.setVersionAndTimestamp(undefined, 0);
              this.schedule();
            } else {
              // no retry needed
              const message = `Feature flag service returned ${err.status}, "${err.body}". This request will not be retried until the user data has been changed.`;
              this.logger.error(message);
              this.onError(err.status, err.body);
            }
          } else if (err.name === 'AbortError') {
            this.failureCount += 1;
            // a user with no cache will retry instantly for maxInstantRetryTimes
            // onError will be called after all allowed attempts fail or timeout
            if (
              this.failureCount > this.getPollingConfig().maxInstantRetryTimes
            ) {
              this.onError(0);
            }
            this.schedule();
          } else {
            this.failureCount += 1;
            // a user with no cache will retry instantly for maxInstantRetryTimes
            // onError will be called after all allowed attempts fail or timeout
            if (
              this.failureCount > this.getPollingConfig().maxInstantRetryTimes
            ) {
              if (err instanceof ResponseError) {
                this.onError(err.status, err.body);
              } else {
                this.onError();
              }
            }
            this.schedule();
          }
          this.status = RefreshStatus.ERROR;
          this.updateMetadataOnRequestComplete();
        });
    } else {
      this.schedule();
      this.status = RefreshStatus.SUCCESS;
    }
  }

  private isFetchRequired(): boolean {
    return (
      Date.now() - this.getPollingConfig().interval >= this.lastUpdateTimestamp
    );
  }

  private updateMetadataOnUserChange(): void {
    // if fetch required, it will be a INITIALIZATION fetch, otherwise it's going to be a delay POLLING fetch
    this.metadataManager.updateClientCauseReason(
      this.isFetchRequired()
        ? ClientCauseReason.INITIALIZATION
        : ClientCauseReason.POLLING,
    );
    // always set user state to SWITCHED user for next fetch
    this.metadataManager.updateClientUserState(ClientUserState.SWITCHED);
  }

  private updateMetadataOnInitialisation(): void {
    // if fetch required, it will be a INITIALIZATION fetch, otherwise it's going to be a delay POLLING fetch
    this.metadataManager.updateClientCauseReason(
      this.isFetchRequired()
        ? ClientCauseReason.INITIALIZATION
        : ClientCauseReason.POLLING,
    );
    // no cache (lastUpdateTimestamp === 0) means we fetch for NEW user, if we have cache we fetch for SAME user
    this.metadataManager.updateClientUserState(
      this.lastUpdateTimestamp === 0
        ? ClientUserState.NEW
        : ClientUserState.SAME,
    );
  }

  private updateMetadataOnRequestComplete(): void {
    if (this.failureCount) {
      // when current fetch failed, next fetch will be a RETRY
      // the calling user has not changed
      this.metadataManager.updateClientCauseReason(ClientCauseReason.RETRY);
    } else {
      // when current fetch success, next fetch will be a POLLING
      // and the calling user will be SAME user
      this.metadataManager.updateClientCauseReason(ClientCauseReason.POLLING);
      this.metadataManager.updateClientUserState(ClientUserState.SAME);
    }
  }

  // calculate wait interval based on failure count
  private calculateInterval(): number {
    const {
      interval,
      tabHiddenPollingFactor,
      minWaitInterval,
      maxWaitInterval,
      backOffFactor,
      backOffJitter,
      maxInstantRetryTimes,
    } = this.getPollingConfig();

    if (
      maxInstantRetryTimes !== undefined &&
      maxInstantRetryTimes !== 0 &&
      maxInstantRetryTimes >= this.failureCount
    ) {
      return 0;
    }

    if (this.failureCount === 0) {
      return Refresh.isTabHidden()
        ? interval * tabHiddenPollingFactor
        : interval;
    }
    let ms = minWaitInterval * backOffFactor ** (this.failureCount - 1);
    if (backOffJitter) {
      const rand = Math.random();
      const deviation = Math.floor(rand * backOffJitter * ms);
      if (Math.floor(rand * 10) < 5) {
        ms -= deviation;
      } else {
        ms += deviation;
      }
    }
    return Number(Math.min(ms, maxWaitInterval));
  }

  private getPollingConfig(): PollingConfig {
    if (this.version === undefined && this.lastUpdateTimestamp === 0) {
      return this.noCachePollingConfig;
    }
    return this.pollingConfig;
  }
}
