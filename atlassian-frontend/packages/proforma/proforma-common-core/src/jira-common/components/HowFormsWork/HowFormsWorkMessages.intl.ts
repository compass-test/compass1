import { defineMessages } from 'react-intl';

export enum HowFormsWorkMessage {
  Title = 'Title',
  Column1Header = 'Column1Header',
  Column2Header = 'Column2Header',
  Column3Header = 'Column3Header',
  Column4Header = 'Column4Header',
  Column1Pg1 = 'Column1Pg1',
  Column1Pg2 = 'Column1Pg2',
  Column2Pg1 = 'Column2Pg1',
  Column2Pg2 = 'Column2Pg2',
  Column3Pg1 = 'Column3Pg1',
  Column3Pg2 = 'Column3Pg2',
  Column4Pg1 = 'Column4Pg1',
  Column4Pg2Cloud = 'Column4Pg2Cloud',
  Column1Link = 'Column1Link',
  Column2Link = 'Column2Link',
  Column3Link = 'Column3Link',
  Column4Link = 'Column4Link',
}

export const IntlHowFormsWorkMessages = defineMessages({
  [HowFormsWorkMessage.Title]: {
    id: 'jira-common.HowFormsWork.Title',
    defaultMessage: "Here's how forms work",
  },
  [HowFormsWorkMessage.Column1Header]: {
    id: 'jira-common.HowFormsWork.Column1Header',
    defaultMessage: 'Create beautiful forms in minutes',
  },
  [HowFormsWorkMessage.Column2Header]: {
    id: 'jira-common.HowFormsWork.Column2Header',
    defaultMessage: 'Collect data anywhere in Jira',
  },
  [HowFormsWorkMessage.Column3Header]: {
    id: 'jira-common.HowFormsWork.Column3Header',
    defaultMessage: 'Automate and integrate your data',
  },
  [HowFormsWorkMessage.Column4Header]: {
    id: 'jira-common.HowFormsWork.Column4Header',
    defaultMessage: 'Export and report on your forms',
  },
  [HowFormsWorkMessage.Column1Pg1]: {
    id: 'jira-common.HowFormsWork.Column1Pg1',
    defaultMessage: 'Every team has forms that support the way they work.',
  },
  [HowFormsWorkMessage.Column1Pg2]: {
    id: 'jira-common.HowFormsWork.Column1Pg2',
    defaultMessage:
      'Build forms with dynamic fields, rich formatting, tables and validation as easily as you can edit a Confluence page, all with no custom fields and no code required.',
  },
  [HowFormsWorkMessage.Column2Pg1]: {
    id: 'jira-common.HowFormsWork.Column2Pg1',
    defaultMessage:
      'Make your forms easy to access and you’ll get the exact data you need when you need it.',
  },
  [HowFormsWorkMessage.Column2Pg2]: {
    id: 'jira-common.HowFormsWork.Column2Pg2',
    defaultMessage:
      'Use forms to create issues in Jira, publish forms to the portal or attach multiple forms to an issue.',
  },
  [HowFormsWorkMessage.Column3Pg1]: {
    id: 'jira-common.HowFormsWork.Column3Pg1',
    defaultMessage:
      'Build rules and leverage integrations to reduce manual processes and boost efficiency.',
  },
  [HowFormsWorkMessage.Column3Pg2]: {
    id: 'jira-common.HowFormsWork.Column3Pg2',
    defaultMessage:
      'Link your form fields to Jira fields. Use Jira status changes to automatically add forms.',
  },
  [HowFormsWorkMessage.Column4Pg1]: {
    id: 'jira-common.HowFormsWork.Column4Pg1',
    defaultMessage:
      'Automatically generate documents and PDFs from your forms.',
  },
  [HowFormsWorkMessage.Column4Pg2Cloud]: {
    id: 'jira-common.HowFormsWork.Column4Pg2Cloud',
    defaultMessage: 'You can also export form and Jira fields to XLSX or JSON.',
  },
  [HowFormsWorkMessage.Column1Link]: {
    id: 'jira-common.HowFormsWork.Column1Link',
    defaultMessage: 'Use case examples',
  },
  [HowFormsWorkMessage.Column2Link]: {
    id: 'jira-common.HowFormsWork.Column2Link',
    defaultMessage: 'How to use forms ',
  },
  [HowFormsWorkMessage.Column3Link]: {
    id: 'jira-common.HowFormsWork.Column3Link',
    defaultMessage: 'See Documentation',
  },
  [HowFormsWorkMessage.Column4Link]: {
    id: 'jira-common.HowFormsWork.Column4Link',
    defaultMessage: 'Reporting options',
  },
});
