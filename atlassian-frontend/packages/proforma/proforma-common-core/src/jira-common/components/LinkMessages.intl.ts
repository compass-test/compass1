import { defineMessages } from 'react-intl';

export enum LinkMessage {
  LearnMore = 'LearnMore',
}

export const IntlLinkMessages = defineMessages({
  [LinkMessage.LearnMore]: {
    id: 'jira-common.Link.LearnMore',
    defaultMessage: 'Learn more',
  },
});
