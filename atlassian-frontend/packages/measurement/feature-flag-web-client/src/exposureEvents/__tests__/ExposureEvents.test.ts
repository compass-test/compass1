import {
  AnalyticsClientInterface,
  EvaluationErrorKind,
  EvaluationReason,
} from '../../index';
import generateChance from '../../testUtil/chance';
import ExposureEvents, { ONE_HOUR } from '../ExposureEvents';

describe('ExposureEvents', () => {
  const chance = generateChance('ExposureEvents');

  let analyticsWebClient: AnalyticsClientInterface;
  let exposureEvents: ExposureEvents;

  beforeEach(() => {
    analyticsWebClient = { sendOperationalEvent: jest.fn() };
    exposureEvents = new ExposureEvents(analyticsWebClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('opt-in events', () => {
    test('sends exposure event with minimal fields', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: chance.integer() };

      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, true);

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          flagKey,
          value,
        },
        tags: ['measurement', 'optInExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: true,
      });
    });

    test('sends full exposure event', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const samplingRate = chance.integer();
      const trackingInfo = { samplingRate };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const errorKind = chance.pickone(Object.values(EvaluationErrorKind));
      const attrStr = chance.string();
      const attrNum = chance.second();
      const attrBool = chance.bool();
      const evaluationDetail = { reason, ruleId, errorKind };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
        { attrStr, attrNum, attrBool },
      );

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          flagKey,
          reason,
          ruleId,
          errorKind,
          value,
          attrStr,
          attrNum,
          attrBool,
        },
        tags: ['measurement', 'optInExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: true,
      });
    });

    test('exposure data does not override primary attributes', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const samplingRate = chance.integer();
      const trackingInfo = { samplingRate };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const errorKind = chance.pickone(Object.values(EvaluationErrorKind));
      const attribute = chance.string();
      const evaluationDetail = { reason, ruleId, errorKind };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
        {
          flagKey: attribute,
          reason: attribute,
          ruleId: attribute,
          errorKind: attribute,
          value: attribute,
          attribute,
        },
      );

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          flagKey,
          reason,
          ruleId,
          errorKind,
          value,
          attribute,
        },
        tags: ['measurement', 'optInExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: true,
      });
    });

    test('Same event doesnt get sent twice in a row', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const samplingRate = chance.integer();
      const trackingInfo = { samplingRate };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const evaluationDetail = { reason, ruleId };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
      );
      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
      );
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
    });

    test('Same event gets sent after waiting an hour', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const samplingRate = chance.integer();
      const trackingInfo = { samplingRate };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const evaluationDetail = { reason, ruleId };

      const now = chance.integer();

      jest
        .spyOn(global.Date, 'now')
        .mockReturnValueOnce(now)
        .mockReturnValue(now + ONE_HOUR + 1);

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
      );

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
      );
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(2);
    });

    test('Same flag different value doesnt get blocked from being sent', () => {
      const flagKey = chance.string();
      const flagValue1 = chance.string();
      const flagValue2 = chance.string();
      const samplingRate = chance.integer();
      const trackingInfo = { samplingRate };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const evaluationDetail = { reason, ruleId };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value: flagValue1, evaluationDetail, trackingInfo },
        true,
      );
      exposureEvents.sendExposureEvent(
        flagKey,
        { value: flagValue2, evaluationDetail, trackingInfo },
        true,
      );
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(2);
    });

    test('Same flag different attributes doesnt get blocked from being sent', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const samplingRate = chance.integer();
      const trackingInfo = { samplingRate };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const attribute1 = chance.string();
      const attribute2 = chance.string();
      const evaluationDetail = { reason, ruleId };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
        { attribute: attribute1 },
      );
      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
        { attribute: attribute2 },
      );
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(2);
    });
  });

  describe('automatic events', () => {
    beforeEach(() => {
      exposureEvents.setAutomaticExposuresEnabled(true);
    });

    test('sends an event when there is no exposure data', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };

      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, false);

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          flagKey,
          value,
        },
        tags: ['measurement', 'autoExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: false,
      });
    });

    test('sends an event when there is exposure data, but does not attach it to the generated event', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const errorKind = chance.pickone(Object.values(EvaluationErrorKind));
      const attrStr = chance.string();
      const attrNum = chance.second();
      const attrBool = chance.bool();
      const evaluationDetail = { reason, ruleId, errorKind };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        false,
        { attrStr, attrNum, attrBool },
      );

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          flagKey,
          reason,
          ruleId,
          errorKind,
          value,
        },
        tags: ['measurement', 'autoExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: false,
      });
    });

    test('does not send an event when the sampling is disabled (ie. the sampling rate is set to 0)', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 0 };

      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, false);

      expect(analyticsWebClient.sendOperationalEvent).not.toHaveBeenCalled();
    });

    test('does not send an event when the sampling rate is set to a value that is not 1 (ie. less than 100%)', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = {
        samplingRate: chance.integer({ min: 1, max: 1000000 }),
      };

      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, false);

      expect(analyticsWebClient.sendOperationalEvent).not.toHaveBeenCalled();
    });

    test('does not send opt-in events with no exposure data if an automatic exposure event has already fired', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };

      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, false);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, true);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
    });

    test('sends opt-in events with exposure data even if an automatic exposure event has already fired', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const errorKind = chance.pickone(Object.values(EvaluationErrorKind));
      const attrStr = chance.string();
      const attrNum = chance.second();
      const attrBool = chance.bool();
      const evaluationDetail = { reason, ruleId, errorKind };

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        false,
        { attrStr, attrNum, attrBool },
      );

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);

      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        true,
        { attrStr, attrNum, attrBool },
      );

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(2);
    });

    test('does not send an automatic event if an opt-in event with no exposure data has already fired', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };

      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, true);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      exposureEvents.sendExposureEvent(flagKey, { value, trackingInfo }, false);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
    });

    test('does not send an event if it does not pass the custom predicate', () => {
      const predicate = jest.fn(() => false);
      exposureEvents.setAutomaticExposuresEnabled(true, predicate);
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const errorKind = chance.pickone(Object.values(EvaluationErrorKind));
      const evaluationDetail = { reason, ruleId, errorKind };
      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        false,
      );
      expect(predicate).toHaveBeenCalledWith({
        flagKey,
        value,
        reason,
        ruleId,
        errorKind,
      });
      expect(analyticsWebClient.sendOperationalEvent).not.toHaveBeenCalled();
    });

    test('does not send an event if it does not pass the custom predicate', () => {
      const predicate = jest.fn(() => true);
      exposureEvents.setAutomaticExposuresEnabled(true, predicate);
      const flagKey = chance.string();
      const value = chance.string();
      const trackingInfo = { samplingRate: 1 };
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const errorKind = chance.pickone(Object.values(EvaluationErrorKind));
      const evaluationDetail = { reason, ruleId, errorKind };
      exposureEvents.sendExposureEvent(
        flagKey,
        { value, evaluationDetail, trackingInfo },
        false,
      );
      expect(predicate).toHaveBeenCalledWith({
        flagKey,
        value,
        reason,
        ruleId,
        errorKind,
      });
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
    });
  });
});
