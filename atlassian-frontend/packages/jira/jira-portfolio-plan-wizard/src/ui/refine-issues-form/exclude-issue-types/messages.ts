// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  type: {
    id: 'jira-portfolio-plan-wizard.refine-issues.type',
    defaultMessage: 'Type',
    description: 'The word type for issue type',
  },
  noTypesExcluded: {
    id: 'jira-portfolio-plan-wizard.refine-issues.no-types-excluded',
    defaultMessage: '0 issue types excluded from the plan',
    description: 'When nothing is excluded',
  },
  typesLoading: {
    id: 'jira-portfolio-plan-wizard.refine-issues.types-loading',
    defaultMessage: 'loading...',
    description: 'Message for loading',
  },
  typesNoOptions: {
    id: 'jira-portfolio-plan-wizard.refine-issues.types-no-options',
    defaultMessage: 'No options',
    description: 'Message for when there are no options',
  },
  chooseTypePlaceholder: {
    id: 'jira-portfolio-plan-wizard.refine-issues.choose-type-placeholder',
    defaultMessage: 'Choose type',
    description: 'Placeholder for input box when choosing issue types',
  },
});
