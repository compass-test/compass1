import { defineMessages } from 'react-intl';

export enum ListProjectFormsHeaderMessage {
  LiteLicenseTitle = 'LiteLicenseTitle',
  LiteLicenseDesc1 = 'LiteLicenseDesc1',
  LiteLicenseDesc2 = 'LiteLicenseDesc2',
  LiteLicenseDesc3 = 'LiteLicenseDesc3',
  LiteLicenseDesc4 = 'LiteLicenseDesc4',
  LiteLicenseDesc5 = 'LiteLicenseDesc5',
}

export const IntlListProjectFormsHeaderMessages = defineMessages({
  [ListProjectFormsHeaderMessage.LiteLicenseTitle]: {
    id: 'jira-common.ListProjectFormsHeader.LiteLicenseTitle',
    defaultMessage: 'Want to build more than three form templates?',
  },
  [ListProjectFormsHeaderMessage.LiteLicenseDesc1]: {
    id: 'jira-common.ListProjectFormsHeader.LiteLicenseDesc1',
    defaultMessage:
      'Upgrade to the paid version of ProForma to take advantage of these great features:',
  },
  [ListProjectFormsHeaderMessage.LiteLicenseDesc2]: {
    id: 'jira-common.ListProjectFormsHeader.LiteLicenseDesc2',
    defaultMessage:
      'Unlimited Forms - Build as many form templates as you need',
  },
  [ListProjectFormsHeaderMessage.LiteLicenseDesc3]: {
    id: 'jira-common.ListProjectFormsHeader.LiteLicenseDesc3',
    defaultMessage: 'User Lookup - Add user lookup questions to forms',
  },
  [ListProjectFormsHeaderMessage.LiteLicenseDesc4]: {
    id: 'jira-common.ListProjectFormsHeader.LiteLicenseDesc4',
    defaultMessage:
      'Data Connections - Populate choice lists with data from third party APIs',
  },
  [ListProjectFormsHeaderMessage.LiteLicenseDesc5]: {
    id: 'jira-common.ListProjectFormsHeader.LiteLicenseDesc5',
    defaultMessage: 'Export - Export forms and Jira fields to JSON or XLSX',
  },
});
