// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  modalExclude: {
    id: 'jira-portfolio-plan-wizard.view-releases.modal-exclude',
    defaultMessage: 'Exclude',
    description: 'Action to Exclude selection',
  },
  modalInclude: {
    id: 'jira-portfolio-plan-wizard.view-releases.modal-include',
    defaultMessage: 'Include',
    description: 'Action to Include selection',
  },
  modalClose: {
    id: 'jira-portfolio-plan-wizard.view-releases.modal-close',
    defaultMessage: 'Cancel',
    description: 'Dismisses the modal',
  },
  selectedReleaseCountLabel: {
    id: 'jira-portfolio-plan-wizard.view-releases.selected-release-count-label',
    defaultMessage:
      '{numSelectedReleases} {numSelectedReleases, plural, one {release} other {releases}} selected',
    description: 'The label indicating the number of selected releases',
  },
});
