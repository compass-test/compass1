import { defineMessages } from 'react-intl';

export enum ProjectFormsMessages {
  CreateForm = 'CreateForm',
  Description = 'Description',
  Forms = 'Forms',
  LearnMore = 'LearnMore',
  NewForm = 'NewForm',
}

export const IntlProjectFormsMessages = defineMessages({
  [ProjectFormsMessages.CreateForm]: {
    id: 'proforma-project-forms.CreateForm',
    defaultMessage: 'Create',
    description: 'Text for a button for creating a new Jira form',
  },
  [ProjectFormsMessages.Description]: {
    id: 'proforma-project-forms.Description',
    defaultMessage:
      'Create or edit forms with dynamic fields, rich formatting, tables and validation.',
    description:
      'A description of actions available on the forms page and some features of forms',
  },
  [ProjectFormsMessages.Forms]: {
    id: 'proforma-project-forms.Forms',
    defaultMessage: 'Forms',
    description: 'Heading of a page showing a list of forms',
  },
  [ProjectFormsMessages.LearnMore]: {
    id: 'proforma-project-forms.LearnMore',
    defaultMessage: 'Learn more',
    description: 'Text for a button with more information about Jira forms',
  },
  [ProjectFormsMessages.NewForm]: {
    id: 'proforma-project-forms.NewForm',
    defaultMessage: '{date} New Form',
    description: 'Text for a button with more information about Jira forms',
  },
});
