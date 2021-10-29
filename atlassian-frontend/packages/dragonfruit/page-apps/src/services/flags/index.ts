import { useFlags } from '@atlaskit/flag';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export const useAppFlags = () => {
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  const showAppUninstallSuccessFlag = (appName: string) => {
    showFlag({
      ...BaseSuccessFlagProps,
      id: 'dragonfruit-page-apps.ui.app-config-page.flags.app-uninstall',
      title: formatMessage(messages.flagUninstallSuccessAppTitle),
      description: formatMessage(messages.flagUninstallSuccessAppContent, {
        name: appName,
      }),
      testId: 'dragonfruit-page-apps.ui.app-config-page.flags.app-uninstall',
    });
  };

  const showAppUninstallErrorFlag = (appName: string) => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruit-page-apps.ui.app-config-page.flags.app-uninstall.error',
      title: formatMessage(messages.flagUninstallErrorAppTitle),
      description: formatMessage(messages.flagUninstallErrorAppDesc, {
        name: appName,
      }),
      testId:
        'dragonfruit-page-apps.ui.app-config-page.flags.app-uninstall.error',
    });
  };

  return {
    showAppUninstallSuccessFlag,
    showAppUninstallErrorFlag,
  };
};
