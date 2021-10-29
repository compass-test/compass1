import { defineMessages } from 'react-intl';

export enum ExportProgressMessage {
  ExportFailedTitle = 'ExportFailedTitle',
  ExportFailedMessage = 'ExportFailedMessage',
}

export const IntlExportProgressMessages = defineMessages({
  [ExportProgressMessage.ExportFailedTitle]: {
    id: 'ui-user.ExportProgress.ExportFailedTitle',
    defaultMessage: 'Export failed',
  },
  [ExportProgressMessage.ExportFailedMessage]: {
    id: 'ui-user.ExportProgress.ExportFailedMessage',
    defaultMessage:
      'The export process has failed. Please go back and try again. If this continues, please contact support.',
  },
});
