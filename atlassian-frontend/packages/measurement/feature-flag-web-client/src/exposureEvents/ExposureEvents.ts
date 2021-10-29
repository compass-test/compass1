import {
  AnalyticsClientInterface,
  AutomaticExposureEventsPredicate,
  ExposureData,
  ExposureEventAttributes,
  ExposureType,
  RawFlag,
  SupportedFlagTypes,
  TrackingInfo,
} from '../index';
import hashFn from '../util/hash';

type SpamBuster = {
  [key: string]: number;
};

export const ONE_HOUR = 1000 * 60 * 60;

export default class ExposureEvents {
  private readonly analyticsWebClient: AnalyticsClientInterface;

  private spamBuster: SpamBuster = {};

  private automaticExposuresEnabled: boolean = false;
  private automaticExposuresPredicate: AutomaticExposureEventsPredicate = () =>
    true;

  constructor(analyticsWebClient: AnalyticsClientInterface) {
    this.analyticsWebClient = analyticsWebClient;
  }

  sendExposureEvent(
    flagKey: string,
    validatedFlag: RawFlag<SupportedFlagTypes>,
    isExplicitlyRequested: boolean,
    exposureData?: ExposureData,
  ): void {
    const {
      evaluationDetail,
      trackingInfo = { samplingRate: 0 },
    } = validatedFlag;

    // Only attach custom exposure data to opt-in exposure events.
    // This is done because the compression and storage for automatic exposure events do not currently
    // support custom attributes. By intentionally excluding them, we ensure that we are not collecting
    // data that will eventually be dropped further in the pipeline.
    // See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/1316354396/RFC-002+Automatic+exposure+event+collection+in+the+Fx3+web+client for more information.
    const customAttributes = isExplicitlyRequested ? exposureData : {};

    const attributes: ExposureEventAttributes = {
      ...customAttributes,
      flagKey,
      value: validatedFlag.value,
      reason: evaluationDetail?.reason,
      ruleId: evaluationDetail?.ruleId,
      errorKind: evaluationDetail?.errorKind,
    };

    const shouldSendExposureEvent = this.shouldSendExposureEvent(
      attributes,
      trackingInfo,
      isExplicitlyRequested,
    );

    if (shouldSendExposureEvent) {
      this.analyticsWebClient.sendOperationalEvent({
        actionSubject: 'feature',
        action: 'exposed',
        attributes,
        tags: [
          'measurement',
          isExplicitlyRequested ? ExposureType.OptIn : ExposureType.Automatic,
        ],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: isExplicitlyRequested,
      });

      this.markExposureAsTracked(attributes);
    }
  }

  private shouldSendExposureEvent(
    exposureAttributes: ExposureEventAttributes,
    trackingInfo: TrackingInfo,
    isExplicitlyRequested: boolean,
  ): boolean {
    if (this.hasAlreadyTrackedExposure(exposureAttributes)) {
      return false;
    }

    if (isExplicitlyRequested) {
      return true;
    }

    const samplingRate = trackingInfo.samplingRate;
    const shouldSendAutomaticEvent =
      this.automaticExposuresEnabled &&
      samplingRate === 1 &&
      this.automaticExposuresPredicate(exposureAttributes);

    return shouldSendAutomaticEvent;
  }

  private hasAlreadyTrackedExposure(
    attributes: ExposureEventAttributes,
  ): boolean {
    const hash = hashFn(attributes);
    if (
      this.spamBuster[hash] === undefined ||
      this.spamBuster[hash] + ONE_HOUR < Date.now()
    ) {
      return false;
    }
    return true;
  }

  private markExposureAsTracked(attributes: ExposureEventAttributes) {
    const hash = hashFn(attributes);
    this.spamBuster[hash] = Date.now();
  }

  setAutomaticExposuresEnabled(
    enabled: boolean,
    predicate: AutomaticExposureEventsPredicate = () => true,
  ): void {
    this.automaticExposuresEnabled = enabled;
    this.automaticExposuresPredicate = predicate;
  }
}
