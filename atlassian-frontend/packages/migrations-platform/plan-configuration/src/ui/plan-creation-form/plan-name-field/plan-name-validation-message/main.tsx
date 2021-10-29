import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';

import { messages } from './messages';
import { PlanNameFieldMessageProps } from './types';

const PlanNameValidationMessage: React.FC<
  PlanNameFieldMessageProps & InjectedIntlProps
> = ({ validation, intl: { formatMessage } }) => {
  switch (validation) {
    case 'Running':
      return (
        <HelperMessage>
          {formatMessage(messages.validationRunning)}
        </HelperMessage>
      );
    case 'Valid':
      return (
        <ValidMessage>{formatMessage(messages.validPlanName)}</ValidMessage>
      );
    case 'Duplicate':
      return (
        <ErrorMessage>
          {formatMessage(messages.duplicateValidationError)}
        </ErrorMessage>
      );
    case 'Empty':
      return (
        <ErrorMessage>
          {formatMessage(messages.emptyPlanNameError)}
        </ErrorMessage>
      );
    default:
      return null;
  }
};

export default injectIntl(PlanNameValidationMessage);
