import { defineMessages } from 'react-intl';

export enum ValidationFailedMessage {
  ValidationBannerMsg = 'ValidationBannerMsg',
}

export const IntlValidationFailedMessages = defineMessages({
  [ValidationFailedMessage.ValidationBannerMsg]: {
    id: 'form-system.ValidationFailed.ValidationBannerMsg',
    defaultMessage:
      'Submission failed. Please change any invalid answers and ensure all required fields are completed.',
  },
});
