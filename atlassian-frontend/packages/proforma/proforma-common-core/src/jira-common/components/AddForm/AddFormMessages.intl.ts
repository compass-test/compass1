import { defineMessages } from 'react-intl';

export enum AddFormMessage {
  AddFormTitle = 'AddFormTitle',
  AddFormSelectPlaceholder = 'AddFormSelectPlaceholder',
  AddFormSelectGroupRecommended = 'AddFormSelectGroupRecommended',
  AddFormSelectGroupOther = 'AddFormSelectGroupOther',
  AddFormPreviewMessage = 'AddFormPreviewMessage',
}

export const IntlAddFormMessages = defineMessages({
  [AddFormMessage.AddFormTitle]: {
    id: 'jira-common.AddForm.AddFormTitle',
    defaultMessage: 'Add Form',
  },
  [AddFormMessage.AddFormSelectPlaceholder]: {
    id: 'jira-common.AddForm.AddFormSelectPlaceholder',
    defaultMessage: 'Select...',
  },
  [AddFormMessage.AddFormSelectGroupRecommended]: {
    id: 'jira-common.AddForm.AddFormSelectGroupRecommended',
    defaultMessage: 'Recommended',
  },
  [AddFormMessage.AddFormSelectGroupOther]: {
    id: 'jira-common.AddForm.AddFormSelectGroupOther',
    defaultMessage: 'Other Forms',
  },
  [AddFormMessage.AddFormPreviewMessage]: {
    id: 'jira-common.AddForm.AddFormPreviewMessage',
    defaultMessage: 'Select a form to preview it here.',
  },
});
