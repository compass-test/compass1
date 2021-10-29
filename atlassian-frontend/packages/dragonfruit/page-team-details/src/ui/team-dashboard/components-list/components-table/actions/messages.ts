import { defineMessages } from 'react-intl';

export default defineMessages({
  actionsMenuLabel: {
    id: 'dragonfruit-page-team-details.components-list.actions.label',
    defaultMessage: 'Actions for {component}',
    description: 'Label for component contextual actions',
  },
  externallyManagedTooltip: {
    id:
      'dragonfruit-page-team-details.components-list.actions.externally-managed.tooltip',
    defaultMessage: 'Component managed externally',
    description:
      'Tooltip content for calling out disabled actions for component managed by external source',
  },
  removeFromTeam: {
    id: 'dragonfruit-page-team-details.components-list.actions.remove.text',
    defaultMessage: 'Remove from team',
    description: 'Menu action to remove the component from the current team',
  },
  removeFromTeamLabel: {
    id: 'dragonfruit-page-team-details.components-list.actions.remove.label',
    defaultMessage: 'Remove {component} from team',
    description: 'Menu action label for component removal action',
  },
  settings: {
    id: 'dragonfruit-page-team-details.components-list.actions.settings.text',
    defaultMessage: 'Settings',
    description:
      'Menu action to navigate to the details page for the component',
  },
  settingsLabel: {
    id: 'dragonfruit-page-team-details.components-list.actions.settings.label',
    defaultMessage: 'Settings for {component}',
    description: 'Menu action label for component settings link',
  },
});
