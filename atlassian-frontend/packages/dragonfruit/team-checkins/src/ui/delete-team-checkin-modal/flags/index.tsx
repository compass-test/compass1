import { useCallback } from 'react';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type DeleteTeamCheckinFlags = {
  showDeleteTeamCheckinGenericErrorFlag: (testId?: string) => void;
  showDeleteTeamCheckinSuccessFlag: (testId?: string) => void;
};

export const useDeleteTeamCheckinFlags = (): DeleteTeamCheckinFlags => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const showDeleteTeamCheckinGenericErrorFlag = useCallback(
    testId => {
      showFlag({
        ...BaseErrorFlagProps,
        id:
          'dragonfruit-team-checkins.ui.delete-team-checkin-modal.flags.delete-team-checkin-generic-error-flag-id',
        title: formatMessage(CommonMessages.somethingWentWrongFullStop),
        description: formatMessage(
          CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
        ),
        testId:
          testId ||
          'dragonfruit-team-checkins.ui.delete-team-checkin-modal.flags.delete-team-checkin-generic-error-flag',
      });
    },
    [formatMessage, showFlag],
  );

  const showDeleteTeamCheckinSuccessFlag = useCallback(
    (testId?: string) => {
      showFlag({
        ...BaseSuccessFlagProps,
        id:
          'dragonfruit-team-checkins.ui.delete-team-checkin-modal.flags.delete-team-checkin-success-flag-id',
        title: formatMessage(messages.deleteTeamCheckinSuccessFlagTitle),
        description: formatMessage(
          messages.deleteTeamCheckinSuccessFlagDescription,
        ),
        testId:
          testId ||
          'dragonfruit-team-checkins.ui.delete-team-checkin-modal.flags.delete-team-checkin-success-flag',
      });
    },
    [formatMessage, showFlag],
  );

  return {
    showDeleteTeamCheckinGenericErrorFlag,
    showDeleteTeamCheckinSuccessFlag,
  };
};
