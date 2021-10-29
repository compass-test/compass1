import { FieldErrorMessageMap, FormErrorMessageMap } from './types';

export enum ValidationErrorCodes {
  ADDRESS_NOT_DELIVERABLE = 'ADDRESS_NOT_DELIVERABLE',
  ADDRESS_NOT_GEOCODED = 'ADDRESS_NOT_GEOCODED',
  CITY_NOT_DETERMINED = 'CITY_NOT_DETERMINED',
  INVALID_TAX_FORMAT = 'INVALID_TAX_FORMAT',
  INVALID_TAX_NUMBER = 'INVALID_TAX_NUMBER',
  INVALID_STREET_NAME = 'INVALID_STREET_NAME',
  INVALID_STREET_NUMBER = 'INVALID_STREET_NUMBER',
}

export const errorCodesToFieldMessagesMap: FieldErrorMessageMap = {
  [ValidationErrorCodes.INVALID_STREET_NAME]: {
    'address-line1':
      'Street name does not match the city and postcode information provided', // this can be the localization key
  },
  [ValidationErrorCodes.INVALID_STREET_NUMBER]: {
    'address-line1': 'Could not find an address for the street number provided',
  },
  [ValidationErrorCodes.CITY_NOT_DETERMINED]: {
    'address-level2':
      'City name provided does not match the state and country selected',
  },
  [ValidationErrorCodes.INVALID_TAX_NUMBER]: {
    'tax-id': 'This tax ID is invalid',
  },
  [ValidationErrorCodes.INVALID_TAX_FORMAT]: {
    'tax-id': 'Invalid tax ID format',
  },
};

export const errorCodesToFormMessagesMap: FormErrorMessageMap = {
  [ValidationErrorCodes.ADDRESS_NOT_GEOCODED]:
    'There seems to be a problem with the address you have entered. Please check if the information provided is correct. If you are still unable to submit the form, please contact support',
  [ValidationErrorCodes.ADDRESS_NOT_DELIVERABLE]:
    'There seems to be a problem with the address you have entered. Please check if the information provided is correct. If you are still unable to submit the form, please contact support',
};
