import { RejectedResult, FulfilledResult } from '../../utils';
import {
  ViralSettingsByDomain,
  ViralSettingsByDomainValueObject,
  GetDirectAccessSettingFailureResponse,
  GetDirectAccessSettingSuccessResponseValue,
  GetOpenInviteInfo,
} from '../../types';

// Update the viral settings map based on domain results providing default values
export const createViralSettingsMapWithDefaultValues = (
  previousViralSettingMap: ViralSettingsByDomain,
  domainResults: ViralSettingsByDomainValueObject[],
): ViralSettingsByDomain => {
  const viralSettingsMap: ViralSettingsByDomain = {};
  domainResults.forEach((result) => {
    const domain = result.key;
    viralSettingsMap[domain] = {
      ...result.value,
      isChecked: previousViralSettingMap[domain]
        ? previousViralSettingMap[domain].isChecked
        : result.value.isChecked,
    };
  });
  return viralSettingsMap;
};

// To filter out just the ViralSettingsByDomainValueObject from the response array.
export const getViralSettingsByDomainValueObjectFromResponse = (
  domainResults: (
    | RejectedResult<boolean | undefined>
    | FulfilledResult<boolean | ViralSettingsByDomainValueObject>
  )[],
): ViralSettingsByDomainValueObject[] => {
  return (
    domainResults
      .filter(
        (result) =>
          result.status === 'fulfilled' &&
          result.value &&
          !(typeof result.value === 'boolean'),
      )
      // @ts-ignore This is ignored as the type guard above ensures it is of type GetDirectAccessSettingSuccessResponse
      .map((item) => item.value)
  );
};

// Get the domain from the successful result or rejected result
export const getDomainFromResults = (
  result:
    | RejectedResult<GetDirectAccessSettingFailureResponse>
    | FulfilledResult<GetDirectAccessSettingSuccessResponseValue>,
): string => {
  const successDomain =
    result.status === 'fulfilled' && result.value
      ? (result.value as GetDirectAccessSettingSuccessResponseValue).domain
      : '';
  const errorDomain =
    result.status === 'failed' && result.errorDetails
      ? (result.errorDetails as GetDirectAccessSettingFailureResponse).domain
      : '';
  // '' is falsy.
  return successDomain || errorDomain;
};

// Filter out just the GetDirectAccessSettingSuccessResponse from the response array.
export const getGetDirectAccessSettingSuccessResponses = (
  domainResults: (
    | RejectedResult<GetDirectAccessSettingFailureResponse>
    | FulfilledResult<
        | GetDirectAccessSettingSuccessResponseValue
        | GetOpenInviteInfo
        | undefined
      >
  )[],
): GetDirectAccessSettingSuccessResponseValue[] => {
  return (
    domainResults
      .filter(
        (result) =>
          result.status === 'fulfilled' &&
          result.value &&
          result.value.hasOwnProperty('getAccessSuccessReponse'),
      )
      // @ts-ignore This is ignored as the type guard above ensures it is of type GetDirectAccessSettingSuccessResponse
      .map((item) => item.value)
  );
};

// Used to create the ViralSettingsByDomain object used to render the domain checkboxes
export const createViralSettingMap = (
  previousViralSettingMap: ViralSettingsByDomain,
  domainResults: GetDirectAccessSettingSuccessResponseValue[],
) => {
  const viralSettingsMap: ViralSettingsByDomain = {};
  domainResults.forEach((result) => {
    const domain = result.domain;

    viralSettingsMap[domain] = {
      isChecked: previousViralSettingMap[domain]
        ? previousViralSettingMap[domain].isChecked
        : false,
      desPromotionEligible: !!result?.desPromotionEligible,
    };
  });
  return viralSettingsMap;
};
