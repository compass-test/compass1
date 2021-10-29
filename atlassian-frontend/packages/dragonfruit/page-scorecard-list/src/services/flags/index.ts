import { useFlags } from '@atlaskit/flag';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import ScorecardFlagMessages from './messages';

type CustomFlags = {
  showScorecardOwnerErrorFlag: () => void;
  showScorecardDeleteSuccessFlag: () => void;
  showScorecardDeleteErrorFlag: () => void;
  showScorecardCreateSuccessFlag: () => void;
  showScorecardCreateErrorFlag: () => void;
  showScorecardUpdateSuccessFlag: () => void;
  showScorecardUpdateErrorFlag: () => void;
};
export const useScorecardFlags = (): CustomFlags => {
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();
  const showScorecardOwnerErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      id: `dragonfruitScorecardOwnerError`,
      title: formatMessage(ScorecardFlagMessages.OwnerLoadingErrorFlagTitle),
      description: formatMessage(
        ScorecardFlagMessages.OwnerLoadingErrorFlagDescription,
      ),
      testId: 'page-scorecard-templates.ui.flag.owner-failed-to-load',
    });
  };

  const showScorecardDeleteSuccessFlag = () => {
    showFlag({
      ...BaseSuccessFlagProps,
      id: `dragonfruitScorecardDeleteSuccess`,
      title: formatMessage(
        ScorecardFlagMessages.ScorecardDeleteSuccessFlagTitle,
      ),
      testId: 'page-scorecard-templates.ui.flag.scorecard-success-delete',
    });
  };

  const showScorecardDeleteErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      id: `dragonfruitScorecardDeleteError`,
      title: formatMessage(ScorecardFlagMessages.ScorecardDeleteErrorFlagTitle),
      description: formatMessage(
        ScorecardFlagMessages.ScorecardDeleteErrorFlagDescription,
      ),
      testId: 'page-scorecard-templates.ui.flag.scorecard-failure-delete',
    });
  };

  const showScorecardCreateErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      id: `dragonfruitScorecardCreateError`,
      title: formatMessage(ScorecardFlagMessages.ScorecardCreateErrorFlagTitle),
      description: formatMessage(
        ScorecardFlagMessages.ScorecardCreateErrorFlagDescription,
      ),
      testId: 'page-scorecard-templates.ui.flag.scorecard-create-error',
    });
  };

  const showScorecardCreateSuccessFlag = () => {
    showFlag({
      ...BaseSuccessFlagProps,
      id: `dragonfruitScorecardCreateSuccess`,
      title: formatMessage(
        ScorecardFlagMessages.ScorecardCreateSuccessFlagTitle,
      ),
      testId: 'page-scorecard-templates.ui.flag.scorecard-create-success',
    });
  };

  const showScorecardUpdateErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      id: `dragonfruitScorecardUpdateError`,
      title: formatMessage(ScorecardFlagMessages.ScorecardUpdateErrorFlagTitle),
      description: formatMessage(
        ScorecardFlagMessages.ScorecardUpdateErrorFlagDescription,
      ),
      testId: 'page-scorecard-templates.ui.flag.scorecard-update-error',
    });
  };

  const showScorecardUpdateSuccessFlag = () => {
    showFlag({
      ...BaseSuccessFlagProps,
      id: `dragonfruitScorecardUpdateSuccess`,
      title: formatMessage(
        ScorecardFlagMessages.ScorecardUpdateSuccessFlagTitle,
      ),
      testId: 'page-scorecard-templates.ui.flag.scorecard-update-success',
    });
  };

  return {
    showScorecardOwnerErrorFlag,
    showScorecardDeleteSuccessFlag,
    showScorecardDeleteErrorFlag,
    showScorecardCreateErrorFlag,
    showScorecardCreateSuccessFlag,
    showScorecardUpdateErrorFlag,
    showScorecardUpdateSuccessFlag,
  };
};
