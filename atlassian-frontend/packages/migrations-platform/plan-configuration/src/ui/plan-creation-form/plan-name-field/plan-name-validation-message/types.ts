import { FormattedMessage } from 'react-intl';

import { PlanNameValidation as Validation } from '../../../../common/types';

export type ValidationMessageKey =
  | 'validationRunning'
  | 'duplicateValidationError'
  | 'emptyPlanNameError'
  | 'validPlanName';

export type ValidationMessages = {
  [K in ValidationMessageKey]: FormattedMessage.MessageDescriptor;
};

export type PlanNameFieldMessageProps = {
  validation: Validation;
};
