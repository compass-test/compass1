import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export const useAnnouncementDeleteMutationFlags = () => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const showAnnouncementDeleteSuccessFlag = () => {
    showFlag({
      ...BaseSuccessFlagProps,
      title: formatMessage(messages.deleteAnnouncementSuccessFlagTitle),
    });
  };

  const showAnnouncementDeleteErrorFlag = (
    description: FormattedMessage.MessageDescriptor,
  ) => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.deleteAnnouncementErrorFlagTitle),
      description: formatMessage(description),
    });
  };

  const showGenericAnnouncementDeleteErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.deleteAnnouncementErrorFlagTitle),
      description: formatMessage(
        CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
      ),
    });
  };

  return {
    showAnnouncementDeleteErrorFlag,
    showAnnouncementDeleteSuccessFlag,
    showGenericAnnouncementDeleteErrorFlag,
  };
};
