import React from 'react';

import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';

const GENERIC_ERROR_FLAG = {
  ...BaseErrorFlagProps,
  id: 'dragonfruitSearchComponentsGenericError',
  title: <FormattedMessage {...CommonMessages.somethingWentWrongFullStop} />,
  description: (
    <FormattedMessage
      {...CommonMessages.somethingWentWrongPleaseTryAgainFullStop}
    />
  ),
};

const errorTypeToErrorFlag = (errorType: string | null) => {
  switch (errorType) {
    default:
      return GENERIC_ERROR_FLAG;
  }
};

export const useErrorFlags = () => {
  const { showFlag } = useFlags();
  const showErrorFlag = (errorType: string | null) => {
    showFlag(errorTypeToErrorFlag(errorType));
  };

  return { showErrorFlag };
};
