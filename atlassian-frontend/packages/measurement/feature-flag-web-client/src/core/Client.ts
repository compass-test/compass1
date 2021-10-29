import jsonStringfy from 'fast-json-stable-stringify';

import {
  AutomaticExposureEventsPredicate,
  ReadyReason,
  ReadyResponse,
} from '../api/types';
import ExposureEvents from '../exposureEvents';
import {
  AnalyticsClientInterface,
  ClientOptions,
  FeatureFlagUser,
  FeatureFlagUserWithIdentifier,
  GetValueOptions,
  RawFlag,
  RawFlags,
  SupportedFlagTypes,
} from '../index';
import getLogger from '../logger';
import Storage from '../storage';
import Subscriptions, { Broadcast } from '../subscriptions';
import cloneObject from '../util/clone-object';
import { FeatureFlagState } from '../util/types';

import Anonymous from './Anonymous';
import Ready, { READY_CACHE, READY_FETCH } from './Ready';
import Refresh from './Refresh';
import { FeatureFlagUpdate } from './types';
import {
  flagStateToFlagUpdate,
  getReadyMessageForStatusCode,
  getReasonForStatusCode,
  hasFlagValueChanged,
  validateConstructorArgs,
  validateDefaultValue,
  validateFlag,
} from './util';

export const STORAGE_PURGE_TIMEOUT = 10000;

export default class Client {
  private flags!: RawFlags;

  private lastUpdatedTimestamp!: number;

  private dataVersion?: string;

  private userData: FeatureFlagUserWithIdentifier;

  private readonly refresh: Refresh;

  private readonly storage: Storage<FeatureFlagState>;

  private readonly broadcast: Broadcast;

  private readonly exposureEvents: ExposureEvents;

  private readonly subscriptions: Subscriptions;

  private readonly readyResolver: Ready;

  constructor(
    apiKey: string,
    analyticsWebClient: AnalyticsClientInterface,
    originalFeatureFlagUser: FeatureFlagUser,
    options: ClientOptions,
  ) {
    // Should be done ASAP to prevent calls to console before usage
    getLogger(options?.loggerOptions);
    validateConstructorArgs(
      apiKey,
      analyticsWebClient,
      originalFeatureFlagUser,
      options,
    );
    const featureFlagUser = cloneObject(originalFeatureFlagUser);
    const user: FeatureFlagUserWithIdentifier = Anonymous.processAnonymousUser(
      featureFlagUser,
    );

    this.featureFlagUpdateBroadcastHandler = this.featureFlagUpdateBroadcastHandler.bind(
      this,
    );
    this.featureFlagUpdateHttpHandler = this.featureFlagUpdateHttpHandler.bind(
      this,
    );
    this.featureFlagUpdateFailedHandler = this.featureFlagUpdateFailedHandler.bind(
      this,
    );

    this.readyResolver = new Ready({
      readyTimeoutInMilliseconds: options.readyTimeoutInMilliseconds,
    });
    this.exposureEvents = new ExposureEvents(analyticsWebClient);
    this.storage = new Storage<FeatureFlagState>(
      options.environment,
      options.productKey,
      apiKey,
      user,
    );
    this.broadcast = new Broadcast(
      apiKey,
      user,
      this.featureFlagUpdateBroadcastHandler,
    );
    this.restoreFlagStateFromStorage();
    this.userData = user;
    this.refresh = new Refresh(
      apiKey,
      options.environment,
      this.userData,
      this.featureFlagUpdateHttpHandler,
      {
        interval: options.pollingInterval,
      },
      this.dataVersion,
      this.lastUpdatedTimestamp,
      this.featureFlagUpdateFailedHandler,
    );

    this.refresh.start();
    this.subscriptions = new Subscriptions();

    // Dont run on startup to prevent slowdown
    setTimeout(() => this.storage.purgeStaleFlagState(), STORAGE_PURGE_TIMEOUT);
  }

  ready(): Promise<ReadyResponse> {
    return this.readyResolver.getPromise();
  }

  getFlagValue<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): T {
    const validatedFlag: RawFlag<T> = this.getFlagDetails(
      flagKey,
      defaultValue,
      options,
    );
    return validatedFlag.value;
  }

  getFlagDetails<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    options?: GetValueOptions<T>,
  ): RawFlag<T> {
    validateDefaultValue(defaultValue);

    const flag = this.flags[flagKey] as RawFlag<T> | undefined;
    const validatedFlag = validateFlag(
      flag,
      defaultValue,
      this.refresh.getStatus(),
      options,
    );

    if (options?.shouldSendExposureEvent !== false) {
      // If the shouldSendExposureEvent is not defined at all, we may fire an automatic event.
      const isExplicitlyRequested = options?.shouldSendExposureEvent === true;
      this.exposureEvents.sendExposureEvent(
        flagKey,
        validatedFlag,
        isExplicitlyRequested,
        options?.exposureData,
      );
    }

    return validatedFlag;
  }

  getFlags(): RawFlags {
    return cloneObject(this.flags);
  }

  on<T extends SupportedFlagTypes>(
    flagKey: string,
    defaultValue: T,
    callback: (flagValue: T) => void,
    options?: GetValueOptions<T>,
  ): () => void {
    validateDefaultValue(defaultValue);
    return this.subscriptions.on(
      flagKey,
      defaultValue,
      callback,
      this.getFlagValue.bind(this),
      options,
    );
  }

  onAnyFlagUpdated(callback: () => void): () => void {
    return this.subscriptions.onAnyFlagUpdated(callback);
  }

  updateFeatureFlagUser(
    originalFeatureFlagUser: FeatureFlagUser,
  ): Promise<ReadyResponse> {
    if (!originalFeatureFlagUser) {
      throw new Error('featureFlagUser is missing');
    }
    const featureFlagUser = cloneObject(originalFeatureFlagUser);

    const user: FeatureFlagUserWithIdentifier = Anonymous.processAnonymousUser(
      featureFlagUser,
    );
    if (jsonStringfy(this.userData) === jsonStringfy(user)) {
      return this.ready();
    }
    this.readyResolver.reset();
    this.userData = user;
    this.storage.updateUserContext(user);

    const storedData = this.storage.getFlagsState();
    if (storedData) {
      const changedFlagKeys = this.updateInMemoryFlags(
        flagStateToFlagUpdate(this.flags, storedData),
      );
      this.sendSubscriptionUpdates(changedFlagKeys);
      this.readyResolver.triggerReady(READY_CACHE);
    }
    this.lastUpdatedTimestamp = storedData?.timestamp || 0;
    this.dataVersion = storedData?.version;

    this.refresh.stop();
    this.refresh.updateUserContext(
      user,
      this.dataVersion,
      this.lastUpdatedTimestamp,
    );
    this.refresh.start();
    this.broadcast.updateUserContext(user);
    return this.ready();
  }

  addFlag(flagKey: string, flag: RawFlag<SupportedFlagTypes>): void {
    this.flags[flagKey] = flag;
  }

  // Convenience API, not official
  destroy(): void {
    this.refresh.stop();
    this.subscriptions.stop();
    this.broadcast.stop();
    this.readyResolver.triggerReady({
      reason: ReadyReason.CLIENT_ERROR,
      message: 'Client got destroyed.',
    });
  }

  setAutomaticExposuresEnabled(
    enabled: boolean,
    predicate?: AutomaticExposureEventsPredicate,
  ): void {
    this.exposureEvents.setAutomaticExposuresEnabled(enabled, predicate);
  }

  private restoreFlagStateFromStorage(): void {
    const storedData = this.storage.getFlagsState();
    this.flags = storedData?.flags || {};
    this.lastUpdatedTimestamp = storedData?.timestamp || 0;
    this.dataVersion = storedData?.version;
    if (storedData !== null && storedData !== undefined) {
      this.readyResolver.triggerReady(READY_CACHE);
    } else {
      // Attempt to recover old flags
      const oldFlagState = this.storage.getFlagsFromOldState();
      if (oldFlagState) {
        // Do not update lastUpdatedTimestamp or dataVersion
        // to force refresh to run immediately without the cache
        this.flags = oldFlagState.flags;
        this.readyResolver.triggerReady(READY_CACHE);
      }
    }
  }

  private getCurrentFeatureFlagState(): FeatureFlagState {
    return {
      timestamp: this.lastUpdatedTimestamp,
      version: this.dataVersion,
      flags: this.flags,
    };
  }

  private featureFlagUpdateFailedHandler(
    statusCode?: number,
    rawBody?: string,
  ): void {
    this.readyResolver.triggerReady({
      reason: getReasonForStatusCode(statusCode),
      message: getReadyMessageForStatusCode(statusCode),
      serverResponse: rawBody,
    });
  }

  private featureFlagUpdateHttpHandler(update: FeatureFlagUpdate): void {
    if (this.dataVersion) {
      this.processFeatureFlagUpdate(update);
    } else {
      // If dataVersion is undefined, then the request had no versionData.
      // This would mean that the API cannot tell us what flags to delete,
      // and has just given us every flag available at its latest state.
      // We should replace all flags instead of merging the flags.
      this.processFeatureFlagUpdate(flagStateToFlagUpdate(this.flags, update));
    }
    // broadcast the flag state to other tabs
    this.broadcast.sendFeatureFlagState(this.getCurrentFeatureFlagState());
  }

  private featureFlagUpdateBroadcastHandler(
    featureFlagState: FeatureFlagState,
  ): void {
    // return if broadcasted ff state is stale
    if (featureFlagState.timestamp < this.lastUpdatedTimestamp) {
      return;
    }

    this.processFeatureFlagUpdate(
      flagStateToFlagUpdate(this.flags, featureFlagState),
    );
  }

  private processFeatureFlagUpdate(update: FeatureFlagUpdate): void {
    this.lastUpdatedTimestamp = Date.now();

    this.dataVersion = update.versionData || this.dataVersion;

    const changedFlagKeys = this.updateInMemoryFlags(update);
    this.sendSubscriptionUpdates(changedFlagKeys);

    this.refresh.setVersionAndTimestamp(
      this.dataVersion,
      this.lastUpdatedTimestamp,
    );
    this.storage.setFlagsState(this.getCurrentFeatureFlagState());
    this.readyResolver.triggerReady(READY_FETCH);
  }

  private updateInMemoryFlags(update: FeatureFlagUpdate): Array<string> {
    const changedFlags: Array<string> = [];

    update.deletedFlags?.forEach((flagKey) => {
      if (flagKey in this.flags) {
        delete this.flags[flagKey];
        changedFlags.push(flagKey);
      }
    });

    Object.keys(update.flags).forEach((flagKey) => {
      if (hasFlagValueChanged(this.flags[flagKey], update.flags[flagKey])) {
        changedFlags.push(flagKey);
      }
      this.flags[flagKey] = update.flags[flagKey];
    });

    return changedFlags;
  }

  private sendSubscriptionUpdates(changedFlagKeys: Array<string>): void {
    if (changedFlagKeys.length > 0) {
      this.subscriptions.anyFlagUpdated();
      changedFlagKeys.forEach((flagKey) =>
        this.subscriptions.flagValueUpdated(flagKey),
      );
    }
  }
}
