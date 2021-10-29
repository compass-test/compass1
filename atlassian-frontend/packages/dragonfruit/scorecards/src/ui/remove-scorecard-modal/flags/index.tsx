import { useCallback } from 'react';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type RemoveScorecardFlags = {
  showRemoveScorecardGenericErrorFlag: (testId?: string) => void;
  showRemoveScorecardSuccessFlag: (
    scorecardName: string,
    testId?: string,
  ) => void;
};

export const useRemoveScorecardFlags = (): RemoveScorecardFlags => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const showRemoveScorecardGenericErrorFlag = useCallback(
    (testId) => {
      showFlag({
        ...BaseErrorFlagProps,
        id:
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-generic-error-flag-id',
        title: formatMessage(CommonMessages.somethingWentWrongFullStop),
        description: formatMessage(
          CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
        ),
        testId:
          testId ||
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-generic-error-flag',
      });
    },
    [formatMessage, showFlag],
  );

  const showRemoveScorecardSuccessFlag = useCallback(
    (scorecardName: string, testId?: string) => {
      showFlag({
        ...BaseSuccessFlagProps,
        id:
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-success-flag-id',
        title: formatMessage(messages.removeScorecardSuccessFlagTitle),
        description: formatMessage(
          messages.removeScorecardSuccessFlagDescription,
          { scorecardName },
        ),
        testId:
          testId ||
          'dragonfruit-scorecards.ui.remove-scorecard-modal.flags.remove-scorecard-success-flag',
      });
    },
    [formatMessage, showFlag],
  );

  return {
    showRemoveScorecardGenericErrorFlag,
    showRemoveScorecardSuccessFlag,
  };
};
