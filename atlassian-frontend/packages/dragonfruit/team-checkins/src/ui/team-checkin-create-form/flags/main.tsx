import { useFlags as useAtlaskitFlags } from '@atlaskit/flag';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export const useFlags = () => {
  const { showFlag } = useAtlaskitFlags();
  const { formatMessage } = useIntl();

  const showSuccessFlag = () => {
    showFlag({
      ...BaseSuccessFlagProps,
      title: formatMessage(messages.successFlagTitle),
    });
  };

  const showErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.errorFlagTitle),
    });
  };

  return {
    showSuccessFlag,
    showErrorFlag,
  };
};
