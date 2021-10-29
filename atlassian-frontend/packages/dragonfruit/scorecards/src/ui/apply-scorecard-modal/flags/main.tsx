import { useFlags } from '@atlaskit/flag';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type CustomFlags = {
  showApplyScorecardFailureFlag: (scorecardName: string) => void;
  showApplyScorecardSuccessFlag: (scorecardName: string) => void;
};

export const useApplyScorecardFlags = (): CustomFlags => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const showApplyScorecardFailureFlag = (scorecardName: string) => {
    showFlag({
      ...BaseErrorFlagProps,
      id:
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-failure-flag-id',
      title: formatMessage(messages.applyScorecardFailureFlagTitle),
      description: formatMessage(
        messages.applyScorecardFailureFlagDescription,
        { scorecardName },
      ),
      testId:
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-failure-flag',
    });
  };

  const showApplyScorecardSuccessFlag = (scorecardName: string) => {
    showFlag({
      ...BaseSuccessFlagProps,
      id:
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag-id',
      title: formatMessage(messages.applyScorecardSuccessFlagTitle),
      description: formatMessage(
        messages.applyScorecardSuccessFlagDescription,
        { scorecardName },
      ),
      testId:
        'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag',
    });
  };

  return {
    showApplyScorecardFailureFlag,
    showApplyScorecardSuccessFlag,
  };
};
