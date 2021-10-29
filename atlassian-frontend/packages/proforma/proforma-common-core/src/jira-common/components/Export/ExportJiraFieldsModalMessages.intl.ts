import { defineMessages } from 'react-intl';

export enum ExportJiraFieldsModalMessage {
  Continue = 'Continue',
  Heading = 'Heading',
  Instructions = 'Instructions',
  Step1 = 'Step1',
  Step2 = 'Step2',
  Step3 = 'Step3',
  SearchRequestViewLabelCloud = 'SearchRequestViewLabelCloud',
  LiteUpgradeTitle = 'LiteUpgradeTitle',
  LiteUpgradeContents1 = 'LiteUpgradeContents1',
}

export const IntlExportJiraFieldsModalMessages = defineMessages({
  [ExportJiraFieldsModalMessage.Continue]: {
    id: 'ui-admin.ExportJiraFieldsModal.Continue',
    defaultMessage: 'Continue',
  },
  [ExportJiraFieldsModalMessage.Heading]: {
    id: 'ui-admin.ExportJiraFieldsModal.Heading',
    defaultMessage: 'Export Forms with Jira Fields',
  },
  [ExportJiraFieldsModalMessage.Instructions]: {
    id: 'ui-admin.ExportJiraFieldsModal.Instructions',
    defaultMessage:
      'To export forms, use the issue search/filter functionality and:',
  },
  [ExportJiraFieldsModalMessage.Step1]: {
    id: 'ui-admin.ExportJiraFieldsModal.Step1',
    defaultMessage: 'Filter the issues you wish to export',
  },
  [ExportJiraFieldsModalMessage.Step2]: {
    id: 'ui-admin.ExportJiraFieldsModal.Step2',
    defaultMessage: 'Select any columns you wish to include in the export',
  },
  [ExportJiraFieldsModalMessage.Step3]: {
    id: 'ui-admin.ExportJiraFieldsModal.Step3',
    defaultMessage: 'Select {searchRequestViewLabel} from the export menu',
  },
  [ExportJiraFieldsModalMessage.SearchRequestViewLabelCloud]: {
    id: 'ui-admin.ExportJiraFieldsModal.SearchRequestViewLabelCloud',
    defaultMessage: 'Export Forms (current fields)',
  },
  [ExportJiraFieldsModalMessage.LiteUpgradeTitle]: {
    id: 'ui-admin.ExportJiraFieldsModal.LiteUpgradeTitle',
    defaultMessage: 'Want to run this export?',
  },
  [ExportJiraFieldsModalMessage.LiteUpgradeContents1]: {
    id: 'ui-admin.ExportJiraFieldsModal.LiteUpgradeContents1',
    defaultMessage:
      'Upgrade to the paid version of ProForma Forms to use this feature.',
  },
});
