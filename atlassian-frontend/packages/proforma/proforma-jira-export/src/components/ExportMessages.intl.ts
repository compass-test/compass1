import { defineMessages } from 'react-intl';

export enum ExportMessage {
  PageHeading = 'PageHeading',
  ReturnToJira = 'ReturnToJira',
}

export const IntlExportMessages = defineMessages({
  [ExportMessage.PageHeading]: {
    id: 'ui-user.Export.PageHeading',
    defaultMessage: 'ProForma: Export Form Responses',
  },
  [ExportMessage.ReturnToJira]: {
    id: 'ui-user.Export.ReturnToJira',
    defaultMessage: 'Return to Jira search',
  },
});
