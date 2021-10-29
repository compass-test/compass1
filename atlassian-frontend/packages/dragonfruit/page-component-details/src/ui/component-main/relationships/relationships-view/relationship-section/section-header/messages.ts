import { defineMessages } from 'react-intl';

export default defineMessages({
  relationshipsDependsOnTitle: {
    id:
      'page-team-details.component-main.relationships.relationship-section.section-title.depends-on',
    defaultMessage: 'Depends on',
    description:
      'Refers to the title for the section that shows the components that are dependency for the current component.',
  },
  relationshipsDependendOnByTitle: {
    id:
      'page-team-details.component-main.relationships.relationship-section.section-title.depended-on-by',
    defaultMessage: 'Depended on by',
    description:
      'Refers to the title for the section that shows the components uses the current component as a dependency',
  },
});
