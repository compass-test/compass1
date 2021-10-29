import { defineMessages } from 'react-intl';

import { ValidationMessages } from './types';

export const messages = defineMessages<ValidationMessages>({
  validationRunning: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.plan-name-field.plan-name-validation-message.running',
    defaultMessage: 'Validating...',
    description:
      'Validation message for plan name field when validation is running',
  },
  duplicateValidationError: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.plan-name-field.plan-name-validation-message.duplicate-validation-error',
    defaultMessage: 'You have already used this name, try a different one.',
    description:
      'Validation message for plan name field when there is a duplicate plan name error',
  },
  emptyPlanNameError: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.plan-name-field.plan-name-validation-message.empty-plan-name-error',
    defaultMessage: 'Add a name for your migration.',
    description:
      'Validation message for plan name field when there the name is empty',
  },
  validPlanName: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.plan-name-field.plan-name-validation-message.valid-plan-name',
    defaultMessage: 'This name is available to use.',
    description:
      'Validation message for plan name field when the name is valid',
  },
});
