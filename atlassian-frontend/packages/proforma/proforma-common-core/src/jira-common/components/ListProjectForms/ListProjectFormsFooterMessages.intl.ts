import { defineMessages } from 'react-intl';

export enum ListProjectFormsFooterMessage {
  FormsDisabledTitle = 'FormsDisabledTitle',
  FormsDisabledMsg = 'FormsDisabledMsg',
  WithFormsYouCan = 'WithFormsYouCan',
  EasilyBuildAndMaintainForms = 'EasilyBuildAndMaintainForms',
  EasilyBuildAndMaintainFormsDesc = 'EasilyBuildAndMaintainFormsDesc',
  CollectBetterData = 'CollectBetterData',
  CollectBetterDataDesc1 = 'CollectBetterDataDesc1',
  CollectBetterDataDesc2 = 'CollectBetterDataDesc2',
  CollectBetterDataDesc3 = 'CollectBetterDataDesc3',
  PublishForms = 'PublishForms',
  PublishFormsDesc = 'PublishFormsDesc',
  PublishFormsLink = 'PublishFormsLink',
}

export const IntlListProjectFormsFooterMessages = defineMessages({
  [ListProjectFormsFooterMessage.FormsDisabledTitle]: {
    id: 'jira-common.ListProjectFormsFooter.FormsDisabledTitle',
    defaultMessage: 'Forms are disabled!',
  },
  [ListProjectFormsFooterMessage.FormsDisabledMsg]: {
    id: 'jira-common.ListProjectFormsFooter.FormsDisabledMsg',
    defaultMessage:
      'Forms are disabled for this project and will not appear on issues and they cannot be used to create issues or requests; however, you can still create and edit form templates.  Ask your Jira administrator to enable ProForma for this project if you need to use forms.',
  },
  [ListProjectFormsFooterMessage.WithFormsYouCan]: {
    id: 'jira-common.ListProjectFormsFooter.WithFormsYouCan',
    defaultMessage: 'With forms you can:',
  },
  [ListProjectFormsFooterMessage.EasilyBuildAndMaintainForms]: {
    id: 'jira-common.ListProjectFormsFooter.EasilyBuildAndMaintainForms',
    defaultMessage: 'Easily build and maintain forms',
  },
  [ListProjectFormsFooterMessage.EasilyBuildAndMaintainFormsDesc]: {
    id: 'jira-common.ListProjectFormsFooter.EasilyBuildAndMaintainFormsDesc',
    defaultMessage:
      'collect all of the information your team needs, without having to rely on custom fields.',
  },
  [ListProjectFormsFooterMessage.CollectBetterData]: {
    id: 'jira-common.ListProjectFormsFooter.CollectBetterData',
    defaultMessage: 'Collect better data',
  },
  [ListProjectFormsFooterMessage.CollectBetterDataDesc1]: {
    id: 'jira-common.ListProjectFormsFooter.CollectBetterDataDesc1',
    defaultMessage: 'use validation, conditional logic, data connections and',
  },
  [ListProjectFormsFooterMessage.CollectBetterDataDesc2]: {
    id: 'jira-common.ListProjectFormsFooter.CollectBetterDataDesc2',
    defaultMessage: 'other features',
  },
  [ListProjectFormsFooterMessage.CollectBetterDataDesc3]: {
    id: 'jira-common.ListProjectFormsFooter.CollectBetterDataDesc3',
    defaultMessage: "to build your teams' processes into your forms.",
  },
  [ListProjectFormsFooterMessage.PublishForms]: {
    id: 'jira-common.ListProjectFormsFooter.PublishForms',
    defaultMessage: 'Publish forms',
  },
  [ListProjectFormsFooterMessage.PublishFormsDesc]: {
    id: 'jira-common.ListProjectFormsFooter.PublishFormsDesc',
    defaultMessage:
      'either publish forms to the Jira Service Management portal or use them to create issues within Jira.',
  },
  [ListProjectFormsFooterMessage.PublishFormsLink]: {
    id: 'jira-common.ListProjectFormsFooter.PublishFormsLink',
    defaultMessage: 'See the full list of ProForma features',
  },
});
