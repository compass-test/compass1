import { defineMessages } from 'react-intl';

export enum LiteUpgradeMessageMessage {
  FooterMessage = 'FooterMessage',
  FindOutMore = 'FindOutMore',
}

export const IntlLiteUpgradeMessageMessages = defineMessages({
  [LiteUpgradeMessageMessage.FooterMessage]: {
    id: 'jira-common.LiteUpgradeMessage.FooterMessage',
    defaultMessage:
      'You can upgrade quickly and easily without losing existing forms or form data.',
  },
  [LiteUpgradeMessageMessage.FindOutMore]: {
    id: 'jira-common.LiteUpgradeMessage.FindOutMore',
    defaultMessage: 'Find out more',
  },
});
