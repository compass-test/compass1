import React from 'react';

import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
} from '@atlassian/dragonfruit-common-ui';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type CustomFlags = {
  showCopyOwnerAriSuccessFlag: (teamId: string) => void;
  showCopyOwnerAriFailureFlag: () => void;
  showUpdateOwnerSuccessFlag: (
    componentId: string,
    componentName: string,
    componentType: CompassComponentType,
  ) => void;
  showUpdateOwnerFailureFlag: () => void;
};

export const useTeamDashboardFlags = (): CustomFlags => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  function getComponentTypeMessage(type: CompassComponentType) {
    switch (type) {
      case CompassComponentType.APPLICATION:
        return formatMessage(CommonMessages.application).toLowerCase();
      case CompassComponentType.LIBRARY:
        return formatMessage(CommonMessages.library).toLowerCase();
      case CompassComponentType.SERVICE:
        return formatMessage(CommonMessages.service).toLowerCase();
      case CompassComponentType.OTHER:
        return formatMessage(CommonMessages.other).toLowerCase();
      default:
        return '';
    }
  }

  const showCopyOwnerAriSuccessFlag = (teamId: string) => {
    showFlag({
      ...BaseSuccessFlagProps,
      id: 'dragonfruitCopyOwnerAriSuccess',
      title: formatMessage(messages.copyAriFlagSuccessTitle),
      description: `${teamId.substring(0, 30)}...`,
    });
  };

  const showCopyOwnerAriFailureFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruitCopyOwnerAriFailure',
      title: formatMessage(CommonMessages.error),
      description: formatMessage(messages.copyAriFlagFailureDescription),
    });
  };

  const showUpdateOwnerSuccessFlag = (
    componentId: string,
    componentName: string,
    componentType: CompassComponentType,
  ) => {
    showFlag({
      ...BaseSuccessFlagProps,
      id: 'dragonfruitUpdateOwnerSuccess',
      title: (
        <FormattedMessage
          {...messages.updateOwnerFlagSuccessTitle}
          values={{
            componentName,
          }}
        />
      ),
      description: (
        <FormattedMessage
          {...messages.updateOwnerFlagSuccessDescription}
          values={{
            componentName,
            componentType: getComponentTypeMessage(componentType),
          }}
        />
      ),
      actions: [
        {
          content: formatMessage(messages.updateOwnerFlagSuccessAction),
          href: routes.COMPONENT_DETAILS(componentId),
        },
      ],
      testId:
        'dragonfruit-page-team-details.services.flags.update-owner-flag-success',
    });
  };

  const showUpdateOwnerFailureFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruitCopyOwnerAriFailure',
      title: formatMessage(CommonMessages.error),
      description: formatMessage(messages.copyAriFlagFailureDescription),
    });
  };

  return {
    showCopyOwnerAriSuccessFlag,
    showCopyOwnerAriFailureFlag,
    showUpdateOwnerSuccessFlag,
    showUpdateOwnerFailureFlag,
  };
};
