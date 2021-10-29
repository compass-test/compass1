import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export const useAnnouncementUpdateMutationFlags = () => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const showAnnouncementUpdateSuccessFlag = () => {
    showFlag({
      ...BaseSuccessFlagProps,
      title: formatMessage(messages.updateAnnouncementSuccessFlagTitle),
    });
  };

  const showAnnouncementUpdateErrorFlag = (
    description: FormattedMessage.MessageDescriptor,
  ) => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.updateAnnouncementErrorFlagTitle),
      description: formatMessage(description),
    });
  };

  const showGenericAnnouncementUpdateErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.updateAnnouncementErrorFlagTitle),
      description: formatMessage(
        CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
      ),
    });
  };

  return {
    showAnnouncementUpdateErrorFlag,
    showAnnouncementUpdateSuccessFlag,
    showGenericAnnouncementUpdateErrorFlag,
  };
};
