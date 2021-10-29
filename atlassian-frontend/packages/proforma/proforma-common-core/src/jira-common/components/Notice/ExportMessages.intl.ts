import { defineMessages } from 'react-intl';

export enum ExportMessage {
  NoIssueKeysTitle = 'NoIssueKeysTitle',
  NoIssueKeysMessage = 'NoIssueKeysMessage',
}

export const IntlExportMessages = defineMessages({
  [ExportMessage.NoIssueKeysTitle]: {
    id: 'ui-user.Export.NoIssueKeysTitle',
    defaultMessage: 'Missing issue keys',
  },
  [ExportMessage.NoIssueKeysMessage]: {
    id: 'ui-user.Export.NoIssueKeysMessage',
    defaultMessage:
      'No issue keys appear to have been selected. The export will be empty.',
  },
});
