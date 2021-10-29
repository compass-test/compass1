import { defineMessages } from 'react-intl';

import { FieldMessages } from './types';

export const messages = defineMessages<FieldMessages>({
  placeholder: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.plan-name-field.placeholder',
    defaultMessage: 'Enter a migration name',
    description: 'Placeholder for plan name field',
  },
  label: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.plan-name-field.label',
    defaultMessage: 'Name your migration',
    description: 'Label for plan name field',
  },
});
