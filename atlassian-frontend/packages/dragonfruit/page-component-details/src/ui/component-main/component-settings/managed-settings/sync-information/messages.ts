import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  errorCardNotice: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.error-notice.nonfinal',
    defaultMessage: `Last ${CONFIG_AS_CODE_FILE_NAME} sync failed`,
    description:
      'Error section heading on managed settings on the component details settings page',
  },
  serverErrorCardNotice: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.server-error.nonfinal',
    defaultMessage:
      'Something went wrong. Try repushing the commit or checking our <a href={statusPageLink}>status page</a>.',
    description:
      'Server error description on managed settings on the component details settings page',
  },
  userErrorCardNotice: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.user-error.nonfinal',
    defaultMessage: `The most recent ${CONFIG_AS_CODE_FILE_NAME} had errors`,
    description:
      'User error description on managed settings on the component details settings page',
  },
  learnMoreErrorNotice: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.learn-more-error.nonfinal',
    defaultMessage: `Learn more about formatting a ${CONFIG_AS_CODE_FILE_NAME} file`,
    description:
      'Learn more message for managed settings on the component details settings page',
  },
});
