import {
  createViralSettingsMapWithDefaultValues,
  getDomainFromResults,
  getGetDirectAccessSettingSuccessResponses,
  createViralSettingMap,
} from '../../../components/ViralSettings/utils';
import {
  ViralSettingsByDomainValueObject,
  GetDirectAccessSettingSuccessResponseValue,
  GetDirectAccessSettingFailureResponse,
  GetOpenInviteInfo,
} from '../../../types';
import { RejectedResult, FulfilledResult, ResultStatus } from '../../../utils';

const basicFulfilledResultGetDirectAccessSettingSuccessResponse: FulfilledResult<GetDirectAccessSettingSuccessResponseValue> = {
  status: ResultStatus.FULFILLED,
  value: {
    domain: 'domain.com',
    desPromotionEligible: true,
    role: 'basic',
    getAccessSuccessReponse: true,
  },
};
const basicRejectedResultGetDirectAccessSettingFailureResponse: RejectedResult<GetDirectAccessSettingFailureResponse> = {
  status: ResultStatus.FAILED,
  errorDetails: {
    domain: 'domain.com',
    errorMessage: 'error',
  },
};
const basicFulfilledResultGetOpenInviteInfo: FulfilledResult<GetOpenInviteInfo> = {
  status: ResultStatus.FULFILLED,
  value: {
    mode: 'DIRECT_ACCESS',
    getOpenInvite: true,
  },
};

describe('Viral Settings Utils', () => {
  describe('createViralSettingsMapWithDefaultValues', () => {
    const previousViralSettingMap = {
      'domain.com': {
        isChecked: false,
        desPromotionEligible: true,
      },
    };
    const domainResults: ViralSettingsByDomainValueObject[] = [
      {
        key: 'domain.com',
        value: { isChecked: true, desPromotionEligible: true },
      },
    ];
    it('Should handle empty inputs', () => {
      expect(createViralSettingsMapWithDefaultValues({}, [])).toEqual({});
    });
    it('Should handle domain results input', () => {
      expect(
        createViralSettingsMapWithDefaultValues({}, domainResults),
      ).toEqual({
        'domain.com': {
          isChecked: true,
          desPromotionEligible: true,
        },
      });
    });
    it('Should handle previousViralSettingMap input', () => {
      expect(
        createViralSettingsMapWithDefaultValues(previousViralSettingMap, []),
      ).toEqual({});
    });
    it('Should handle both inputs', () => {
      expect(
        createViralSettingsMapWithDefaultValues(
          previousViralSettingMap,
          domainResults,
        ),
      ).toEqual({
        'domain.com': {
          desPromotionEligible: true,
          isChecked: false,
        },
      });
    });
  });
  describe('getDomainFromResults', () => {
    it('Should handle RejectedResult<GetDirectAccessSettingFailureResponse>', () => {
      expect(
        getDomainFromResults(
          basicRejectedResultGetDirectAccessSettingFailureResponse,
        ),
      ).toEqual('domain.com');
    });
    it('Should handle FulfilledResult<GetDirectAccessSettingSuccessResponse>', () => {
      expect(
        getDomainFromResults(
          basicFulfilledResultGetDirectAccessSettingSuccessResponse,
        ),
      ).toEqual('domain.com');
    });
  });
  describe('getGetDirectAccessSettingSuccessResponses', () => {
    it('should handle empty input', () =>
      expect(getGetDirectAccessSettingSuccessResponses([])).toEqual([]));
    it('should handle RejectedResult<GetDirectAccessSettingFailureResponse> input', () =>
      expect(
        getGetDirectAccessSettingSuccessResponses([
          basicRejectedResultGetDirectAccessSettingFailureResponse,
        ]),
      ).toEqual([]));
    it('should handle FulfilledResult<GetDirectAccessSettingSuccessResponse> input', () =>
      expect(
        getGetDirectAccessSettingSuccessResponses([
          basicFulfilledResultGetDirectAccessSettingSuccessResponse,
        ]),
      ).toEqual([
        {
          domain: 'domain.com',
          desPromotionEligible: true,
          role: 'basic',
          getAccessSuccessReponse: true,
        },
      ]));
    it('should handle FulfilledResult<GetOpenInviteInfo> input', () =>
      expect(
        getGetDirectAccessSettingSuccessResponses([
          basicFulfilledResultGetOpenInviteInfo,
        ]),
      ).toEqual([]));
    it('should handle FulfilledResult<undefined> input', () =>
      expect(
        getGetDirectAccessSettingSuccessResponses([
          { status: ResultStatus.FULFILLED, value: undefined },
        ]),
      ).toEqual([]));
    it('should handle a combination of inputs', () =>
      expect(
        getGetDirectAccessSettingSuccessResponses([
          basicFulfilledResultGetDirectAccessSettingSuccessResponse,
          basicRejectedResultGetDirectAccessSettingFailureResponse,
          basicFulfilledResultGetOpenInviteInfo,
          { status: ResultStatus.FULFILLED, value: undefined },
        ]),
      ).toEqual([
        {
          domain: 'domain.com',
          desPromotionEligible: true,
          role: 'basic',
          getAccessSuccessReponse: true,
        },
      ]));
  });
  describe('createViralSettingMap', () => {
    const previousViralSettingMap = {
      'domain.com': {
        isChecked: true,
        desPromotionEligible: true,
      },
    };
    const domainResults: GetDirectAccessSettingSuccessResponseValue[] = [
      {
        domain: 'domain.com',
        desPromotionEligible: true,
        role: 'basic',
        getAccessSuccessReponse: true,
      },
    ];
    it('Should handle empty inputs', () => {
      expect(createViralSettingMap({}, [])).toEqual({});
    });
    it('Should handle domain results input', () => {
      expect(createViralSettingMap({}, domainResults)).toEqual({
        'domain.com': {
          isChecked: false,
          desPromotionEligible: true,
        },
      });
    });
    it('Should handle previousViralSettingMap input', () => {
      expect(createViralSettingMap(previousViralSettingMap, [])).toEqual({});
    });
    it('Should handle both inputs', () => {
      expect(
        createViralSettingMap(previousViralSettingMap, domainResults),
      ).toEqual({
        'domain.com': {
          desPromotionEligible: true,
          isChecked: true,
        },
      });
    });
  });
});
