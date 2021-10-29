import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { ValidationError } from '../validation-errors';

export type BaseEventPayload = {
  action: string;
  actionSubject: string;
  actionSubjectId: string;
  source: string;
};

export type VerifiedEventAttributes = {
  attributes: {
    isSuccessful: boolean;
    country?: string;
    address1Valid: boolean;
    address2Valid: boolean;
    taxIdValid: boolean;
    cityValid: boolean;
    stateValid: boolean;
    postalCodeValid: boolean;
    nativeError?: ValidationError | HttpResponseError | Error;
  };
};

export type AdditionEventAttributes = {
  attributes: {
    companyName: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    taxId: string | null;
    addedAllRequiredFields: boolean;
  };
};

export type VerifiedTrackEvent = BaseEventPayload & VerifiedEventAttributes;

export type AdditionUIEvent = BaseEventPayload & AdditionEventAttributes;
