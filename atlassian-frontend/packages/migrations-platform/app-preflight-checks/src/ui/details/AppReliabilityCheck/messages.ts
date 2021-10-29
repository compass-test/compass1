import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  appReliabilityMessage: {
    id: 'migration.preflight.apps.reliability.message',
    defaultMessage:
      'The apps listed below were marked as ‘Needed in cloud’, but have unknown or low migration success rates as their migration path is in {stageOne}. To continue, choose an option below:',
    description:
      '{stageOne} is the link that comes with the text migration.preflight.apps.reliability.stage-one',
  },
  stageOne: {
    id: 'migration.preflight.apps.reliability.stage-one',
    defaultMessage: 'Stage 1',
    description: 'Description for preflight check error message',
  },
  changeAppsInAssessmentOption: {
    id: 'migration.preflight.apps.change-in-assessment.list-item.first',
    defaultMessage:
      'reassess these apps by selecting {changeInAssessmentMessage}',
    description:
      'First list item to proceed. {changeInAssessmentMessage} text is in bold and is described in migration.preflight.apps.change-in-assessment.button.message',
  },
  changeDecisionInAppAssessment: {
    id: 'migration.preflight.apps.change-in-assessment.button.message',
    defaultMessage: 'Change my decision in app assessment',
    description:
      'This text is bolded in the first option, and is also the description for the button',
  },
  removeAppsFromMigrationOption: {
    id: 'migration.preflight.apps.remove-apps.list-item.second',
    defaultMessage:
      'remove listed apps now from this migration by selecting {removeAppsMessage}',
    description:
      'Second list item to proceed. {removeAppsMessage} text is in bold and is described in migration.preflight.apps.remove-apps.button.message',
  },
  removeAppsMessage: {
    id: 'migration.preflight.apps.remove-apps.button.message',
    defaultMessage:
      'Remove these {count} {count, plural, zero {apps} one {app} other {apps}} from this migration',
    description:
      'This text will be the text in a button as well as bold in option 2.',
  },
  proceedWithMigrationOption: {
    id: 'migration.preflight.apps.proceed.list-item.third',
    defaultMessage: 'proceed to migrate with these apps',
    description: 'Third option in the list item.',
  },
  appsListHeader: {
    id: 'migration.preflight.apps.apps-list.header',
    defaultMessage: 'Apps with unknown or low migration success rates:',
    description: 'Header text for the list of apps table',
  },
});
