// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  modalHeading: {
    id: 'jira-portfolio-plan-wizard.view-releases.modal-heading',
    defaultMessage: 'Releases',
    description: 'The heading for the modal',
  },
  selectedReleaseCountLabel: {
    id: 'jira-portfolio-plan-wizard.view-releases.selected-release-count-label',
    defaultMessage:
      '{numSelectedReleases} {numSelectedReleases, plural, one {release} other {releases}} selected',
    description: 'The label indicating the number of selected releases',
  },
});
