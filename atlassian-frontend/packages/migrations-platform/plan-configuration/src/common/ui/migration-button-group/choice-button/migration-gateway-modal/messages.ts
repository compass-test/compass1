import { defineMessages } from 'react-intl';

export default defineMessages({
  chooseDestination: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.migration-gateway-modal-dialog.choose-destination',
    defaultMessage: 'Choose your cloud destination',
    description: 'Header message for cloud destination modal',
  },
  continueButtonText: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.migration-gateway-modal-dialog.continue-button-text',
    defaultMessage: 'Continue',
    description: 'Continue button text for cloud destination modal',
  },
  chooseDestinationSummary: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.migration-gateway-modal-dialog.choose-destination-summary',
    defaultMessage: `
      <p>You are about to be redirected to choose your destination {destination}.</p>
      <p>You may need to sign in to the Atlassian account that is the <strong>{administrator}</strong> for the {destination} you’re migrating to.</p>
    `,
    description: 'Description message for cloud destination modal',
  },
  administratorText: {
    id:
      'com.atlassian.migrations-platform.plan-configuration.migration-gateway-modal-dialog.administrator-text',
    defaultMessage: 'Site administrator',
    description: 'Type of administrator',
  },
});
