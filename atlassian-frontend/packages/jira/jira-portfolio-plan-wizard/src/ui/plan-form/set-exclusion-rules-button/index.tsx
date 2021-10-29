import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';
import Tooltip from '@atlaskit/tooltip';

import { useProjectLimit } from '../../../controllers/over-limit';
import { usePlan } from '../../../controllers/plan';

import msgs from './messages';

type Props = React.ComponentProps<typeof Button>;

const useButtonState = (): {
  isLoading: boolean;
  isDisabled: boolean;
  tooltipContent: React.ReactNode;
} => {
  const { plan } = usePlan();
  const {
    pending: projectLimitIsPending,
    over: projectLimitIsOver,
  } = useProjectLimit();

  const isLoading = projectLimitIsPending;

  if (plan.issueSources.length === 0) {
    return {
      isLoading,
      isDisabled: true,
      tooltipContent: <FormattedMessage {...msgs.noIssueSourcesTooltip} />,
    };
  }

  if (projectLimitIsOver) {
    return {
      isLoading,
      isDisabled: true,
      tooltipContent: (
        <FormattedMessage
          {...msgs.projectsOverLimitTooltip}
          values={{ limit: 2 }}
        />
      ),
    };
  }

  return {
    isLoading,
    isDisabled: false,
    tooltipContent: null,
  };
};

const SetExclusionRulesButton: React.FC<Props> = (props) => {
  const { isLoading, isDisabled, tooltipContent } = useButtonState();

  return (
    <Tooltip content={tooltipContent}>
      <Button
        {...props}
        isLoading={isLoading}
        isDisabled={props.isDisabled || isDisabled}
      >
        <FormattedMessage {...msgs.label} />
      </Button>
    </Tooltip>
  );
};

export default SetExclusionRulesButton;
