// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  subscript: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-days-subscript',
    defaultMessage:
      'Any issues in the Done status category for more than {value} {value, plural, one {day} other {days}} won’t appear in this plan. {LearnMoreLink}',
    description: 'Subscript under the exclude completed issues after input',
  },
  subscriptStatusCategoryChangeDate: {
    id:
      'jira-portfolio-plan-wizard.refine-issues.exclude-days-subscript-status-change-category-done',
    defaultMessage:
      'Any issues marked as Done for more than {value} {value, plural, one {day} other {days}} won’t show in the plan. {LearnMoreLink}',
    description: 'Subscript under the exclude completed issues after input',
  },
  learnMore: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-days-learn-more',
    defaultMessage: 'Learn more',
    description: 'Subscript Learn more link',
  },
  after: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-days-after',
    defaultMessage: '{value, plural, one {day} other {days}}',
    description: 'After input for excluded days',
  },
});
