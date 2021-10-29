import { defineMessages } from 'react-intl';

export enum ExportConfigMessage {
  Step1Title = 'Step1Title',
  Step1Desc = 'Step1Desc',
  SelectProject = 'SelectProject',
  SelectForm = 'SelectForm',
  Step2Title = 'Step2Title',
  Step3Title = 'Step3Title',
  Step3Desc = 'Step3Desc',
  BeginExport = 'BeginExport',
  NoProjectSelectedErrorMessage = 'NoProjectSelectedErrorMessage',
  NoTemplateFormSelectedErrorMessage = 'NoTemplateFormSelectedErrorMessage',
}

export const IntlExportConfigMessages = defineMessages({
  [ExportConfigMessage.Step1Title]: {
    id: 'ui-user.ExportConfig.Step1Title',
    defaultMessage: '1. Select a form template',
  },
  [ExportConfigMessage.Step1Desc]: {
    id: 'ui-user.ExportConfig.Step1Desc',
    defaultMessage:
      'ProForma will export the Jira fields selected on the previous screen and the form template responses.',
  },
  [ExportConfigMessage.SelectProject]: {
    id: 'ui-user.ExportConfig.SelectProject',
    defaultMessage: 'Select a project',
  },
  [ExportConfigMessage.SelectForm]: {
    id: 'ui-user.ExportConfig.SelectForm',
    defaultMessage: 'Select a form',
  },
  [ExportConfigMessage.Step2Title]: {
    id: 'ui-user.ExportConfig.Step2Title',
    defaultMessage: '2. Select an export format',
  },
  [ExportConfigMessage.Step3Title]: {
    id: 'ui-user.ExportConfig.Step3Title',
    defaultMessage: '3. Export the form responses',
  },
  [ExportConfigMessage.Step3Desc]: {
    id: 'ui-user.ExportConfig.Step3Desc',
    defaultMessage:
      'Depending on the number of records, exporting Jira fields and form template responses can take some time.',
  },
  [ExportConfigMessage.BeginExport]: {
    id: 'ui-user.ExportConfig.BeginExport',
    defaultMessage: 'Begin export',
  },
  [ExportConfigMessage.NoProjectSelectedErrorMessage]: {
    id: 'ui-user.ExportConfig.NoProjectSelectedErrorMessage',
    defaultMessage: 'Please select a project.',
  },
  [ExportConfigMessage.NoTemplateFormSelectedErrorMessage]: {
    id: 'ui-user.ExportConfig.NoTemplateFormSelectedErrorMessage',
    defaultMessage: 'Please select a form.',
  },
});
