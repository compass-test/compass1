import { defineMessages } from 'react-intl';

export enum ExportProgressMessage {
  ExportingForms = 'ExportingForms',
  ExportingFormsDesc = 'ExportingFormsDesc',
  DownloadExport = 'DownloadExport',
  ApiExportTitle = 'ApiExportTitle',
  ApiExportDesc = 'ApiExportDesc',
}

export const IntlExportProgressMessages = defineMessages({
  [ExportProgressMessage.ExportingForms]: {
    id: 'ui-user.ExportProgress.ExportingForms',
    defaultMessage: 'Exporting Forms',
  },
  [ExportProgressMessage.ExportingFormsDesc]: {
    id: 'ui-user.ExportProgress.ExportingFormsDesc',
    defaultMessage:
      'Your export has begun. If the file does not automatically download click the download button below.',
  },
  [ExportProgressMessage.DownloadExport]: {
    id: 'ui-user.ExportProgress.DownloadExport',
    defaultMessage: 'Download Export',
  },
  [ExportProgressMessage.ApiExportTitle]: {
    id: 'ui-user.ExportProgress.ApiExportTitle',
    defaultMessage: 'API Export - advanced use',
  },
  [ExportProgressMessage.ApiExportDesc]: {
    id: 'ui-user.ExportProgress.ApiExportDesc',
    defaultMessage:
      'This export can also be triggered by using the ProForma API.',
  },
});
