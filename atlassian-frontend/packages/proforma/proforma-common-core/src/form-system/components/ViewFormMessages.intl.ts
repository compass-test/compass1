import { defineMessages } from 'react-intl';

export enum ViewFormMessage {
  HiddenSection = 'HiddenSection',
  ValidationBannerMsg = 'ValidationBannerMsg',
  BlankFormMsg = 'BlankFormMsg',
}

export const IntlViewFormMessages = defineMessages({
  [ViewFormMessage.HiddenSection]: {
    id: 'form-system.viewForm.HiddenSection',
    defaultMessage: 'Hidden section - Conditions apply',
  },
  [ViewFormMessage.ValidationBannerMsg]: {
    id: 'form-system.viewForm.ValidationBannerMsg',
    defaultMessage:
      'Submission failed. Please change any invalid answers and ensure all required fields are completed.',
  },
  [ViewFormMessage.BlankFormMsg]: {
    id: 'form-system.viewForm.BlankFormMsg',
    defaultMessage: 'This is a blank form',
  },
});
