import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  errorLoading: {
    id: 'dragonfruit-page-team-details.team-header.error-loading',
    defaultMessage: 'Error loading',
    description: 'Error message shown if the team name fails to load',
  },
  editOwner: {
    id: 'dragonfruit-page-team-details.team-header.edit-owner',
    defaultMessage: 'Edit owner',
    description: 'Change owner of a component',
  },
  removeOwner: {
    id: 'dragonfruit-page-team-details.team-header.remove-owner',
    defaultMessage: 'Remove owner',
    description: 'Remove owner of a component',
  },
  actionsLabel: {
    id: 'dragonfruit-page-team-details.team-header.dropdown-label',
    defaultMessage: 'Actions for component owner',
    description: 'Dropdown menu actions for component owner',
  },
  actionsTooltip: {
    id: 'dragonfruit-page-team-details.team-header.dropdown-tooltip',
    defaultMessage: 'More actions',
    description: 'The tooltip for the component owner card dropdown menu',
  },
  editOwnerWithConfigAsCode: {
    id: 'dragonfruit-page-team-details.team-header.edit-owner-when-managed',
    defaultMessage: `Change owner team in ${CONFIG_AS_CODE_FILE_NAME}`,
    description: 'Change owner of a component in config-as-code file',
  },
});
