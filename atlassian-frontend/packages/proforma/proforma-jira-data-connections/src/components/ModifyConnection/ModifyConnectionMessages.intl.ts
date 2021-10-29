import { defineMessages } from 'react-intl';

export enum ModifyConnectionMessage {
  EditConnectionsHeader = 'EditConnectionsHeader',
  AddConnectionsHeader = 'AddConnectionsHeader',
  LicenceWarningPara1 = 'LicenceWarningPara1',
  LicenceWarningPara2Upgrade = 'LicenceWarningPara2Upgrade',
  LicenceWarningPara2Licence = 'LicenceWarningPara2Licence',
  WizardStepConnectLabel = 'WizardStepConnectLabel',
  WizardStepTestLabel = 'WizardStepTestLabel',
  WizardStepConfigureLabel = 'WizardStepConfigureLabel',
  WizardStepConfirmLabel = 'WizardStepConfirmLabel',
  WizardStepLog = 'WizardStepLog',
  WizardStepUnrecognised = 'WizardStepUnrecognised',
}

export const IntlModifyConnectionMessages = defineMessages({
  [ModifyConnectionMessage.AddConnectionsHeader]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.AddConnectionsHeader',
    defaultMessage: 'Add Data Connection',
  },
  [ModifyConnectionMessage.EditConnectionsHeader]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.EditConnectionsHeader',
    defaultMessage: 'Edit Data Connection',
  },
  [ModifyConnectionMessage.LicenceWarningPara1]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.LicenceWarningPara1',
    defaultMessage:
      'Creating data connections requires a licenced version of ProForma Full.',
  },
  [ModifyConnectionMessage.LicenceWarningPara2Upgrade]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.LicenceWarningPara2Upgrade',
    defaultMessage:
      'Upgrade to ProForma Full to create and use data connections.',
  },
  [ModifyConnectionMessage.LicenceWarningPara2Licence]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.LicenceWarningPara2Licence',
    defaultMessage:
      'Add a licence to ProForma to create and use data connections.',
  },
  [ModifyConnectionMessage.WizardStepConnectLabel]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.WizardStepConnectLabel',
    defaultMessage: 'Connect',
  },
  [ModifyConnectionMessage.WizardStepTestLabel]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.WizardStepTestLabel',
    defaultMessage: 'Test',
  },
  [ModifyConnectionMessage.WizardStepConfigureLabel]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.WizardStepConfigureLabel',
    defaultMessage: 'Configure',
  },
  [ModifyConnectionMessage.WizardStepConfirmLabel]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.WizardStepConfirmLabel',
    defaultMessage: 'Confirm',
  },
  [ModifyConnectionMessage.WizardStepLog]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.WizardStepLog',
    defaultMessage: 'Clicked: {label}',
  },
  [ModifyConnectionMessage.WizardStepUnrecognised]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.WizardStepUnrecognised',
    defaultMessage: 'Unrecognised step: {wizardStep}',
  },
});
