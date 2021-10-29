import { defineMessages } from 'react-intl';

export enum ExportApiModalMessage {
  Heading = 'Heading',
  OpenCustomerApi = 'OpenCustomerApi',
  Description = 'Description',
  LiteUpgradeTitle = 'LiteUpgradeTitle',
  LiteUpgradeContents1 = 'LiteUpgradeContents1',
}

export const IntlExportApiModalMessages = defineMessages({
  [ExportApiModalMessage.Heading]: {
    id: 'ui-admin.ExportApiModal.Heading',
    defaultMessage: 'Export Forms using the ProForma API',
  },
  [ExportApiModalMessage.OpenCustomerApi]: {
    id: 'ui-admin.ExportApiModal.OpenCustomerApi',
    defaultMessage: 'Open the Developer Documentation',
  },
  [ExportApiModalMessage.Description]: {
    id: 'ui-admin.ExportApiModal.Description',
    defaultMessage:
      'Use the ProForma API to select which custom fields and form should be included in the export. Exports can be in XLSX or JSON format.',
  },
  [ExportApiModalMessage.LiteUpgradeTitle]: {
    id: 'ui-admin.ExportApiModal.LiteUpgradeTitle',
    defaultMessage: 'Want to run this export?',
  },
  [ExportApiModalMessage.LiteUpgradeContents1]: {
    id: 'ui-admin.ExportApiModal.LiteUpgradeContents1',
    defaultMessage:
      'Upgrade to the paid version of ProForma Forms to use this feature.',
  },
});
