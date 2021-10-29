import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  appSelectionTooltip01: {
    id: 'migration.choose.what.to.migrate.app.selection.tooltip.no-apps',
    defaultMessage:
      'You have not marked any apps as Needed in cloud. If you want to migrate app data, change your decision in app Assessment.',
    description: 'Tooltip content when there are no apps selected',
  },
  appSelectionRadioAllLabel: {
    id: 'migration.choose.what.to.migrate.app.selection.radio.all.label.main',
    defaultMessage: 'All',
    description: 'for the label for the radio button "all" option',
  },
  appSelectionRadioAllLabelSub: {
    id: 'migration.choose.what.to.migrate.app.selection.radio.all.label.sub',
    defaultMessage:
      'All - {appsCount} marked as Needed in cloud with a migration path',
    description: 'for the label definition for the radio button "all" option',
  },
  appSelectionRadioNoneOption: {
    id: 'migration.choose.what.to.migrate.app.selection.radio.none.label',
    defaultMessage: 'None',
    description: 'for the label definition for the radio button "none" option',
  },
});
