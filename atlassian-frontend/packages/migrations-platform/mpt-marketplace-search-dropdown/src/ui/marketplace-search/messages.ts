import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  'selectAlternativeApps' | 'noAppsFound',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  selectAlternativeApps: {
    id:
      'com.atlassian.migrations-platform.marketplace-search-dropdown.select-alternative-apps',
    defaultMessage: 'Select alternative apps',
    description:
      'The placeholder to hint the user that this select element is for searching alternative apps',
  },
  noAppsFound: {
    id:
      'com.atlassian.migrations-platform.marketplace-search-dropdown.no-apps-found',
    defaultMessage: 'No apps found',
    description:
      'The placeholder to hint the user that the keyword found no marketplace app',
  },
});
