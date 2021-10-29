import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  addDependency: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-section.add-dependency',
    defaultMessage: 'Add dependency',
    description: 'The label on a button used to add a component relationship.',
  },
  relationshipLimitReachedErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-section.relationship-limit-reached-error-flag-description',
    defaultMessage:
      'The maximum number of dependencies a component can have is {limit}.',
    description:
      'Shown as an error flag description when a user attempts to add a relationship when the relationship limit has already been reached',
  },
  relationshipLimitReachedErrorFlagTitle: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-section.relationship-limit-reached-error-flag-title',
    defaultMessage: 'Dependency limit reached',
    description:
      'Shown as an error flag title when a user attempts to add a relationship when the relationship limit has already been reached',
  },
  configAsCodePrompt: {
    id:
      'page-team-details.component-main.relationships.relationship-section.edit-managed-component-link',
    defaultMessage: `Edit in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      "Text shown in button that prompts the user to go to the component's compass.yml file",
  },
});
