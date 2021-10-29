import { defineMessages } from 'react-intl';

export default defineMessages({
  relationshipsDependsOnOutward: {
    id:
      'page-team-details.component-main.relationships.relationship-section.section-empty-state.depends-on.outward',
    defaultMessage: 'Add upstream dependencies to this component',
    description:
      'Refers to the content displayed for the depends on section when there are no components',
  },
  relationshipsManagedDependsOnOutward: {
    id:
      'page-team-details.component-main.relationships.relationship-section.section-empty-state.managed.depends-on.outward',
    defaultMessage: 'Add upstream dependencies in compass.yml',
    description:
      'Refers to the content displayed for the depends on section when there are no components and its a managed component.' +
      'compass.yml is the name of the file, and should not be translated',
  },
});
