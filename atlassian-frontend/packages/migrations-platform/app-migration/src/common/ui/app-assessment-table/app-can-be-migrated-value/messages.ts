import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  | 'trackRequest'
  | 'signUpForEap'
  | 'automatedPath'
  | 'viewPath'
  | 'contactVendorTooltip'
  | 'contactVendor'
  | 'upgradeAppTooltip'
  | 'upgradeApp'
  | 'appReliabilityStageOne'
  | 'appReliabilityStageTwo'
  | 'appReliabilityStageOneTooltip'
  | 'appReliabilityStageTwoTooltip',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  trackRequest: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.track-request',
    defaultMessage: 'Track request',
    description:
      'Description for the link which indicates that user can see the vendor’s migration ticket so that user can vote and watch vendor’s migration path progress.',
  },
  signUpForEap: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.sign-up-for-eap',
    defaultMessage: 'Sign up for EAP',
    description: 'Description for the link to sign up for the EAP.',
  },
  automatedPath: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.automated-path',
    defaultMessage: 'Automated path',
    description:
      'Description for the link which indicates that this app has an automated path migration.',
  },
  viewPath: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.view-path',
    defaultMessage: 'View path',
    description:
      'Description for the link that highlights that the use can view the path of the app migration.',
  },
  contactVendorTooltip: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.contact-vendor-tooltip',
    defaultMessage: 'Contact your vendor about migrating this app',
    description:
      'Tooltip for the link explaining that a use can contact the vendor about migrating the app.',
  },
  contactVendor: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.contact-vendor',
    defaultMessage: 'Contact vendor',
    description:
      'Description for the link indicating that a user can contact the vendor of the app.',
  },
  upgradeAppTooltip: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.upgrade-app-tooltip',
    defaultMessage:
      'This app version does not support automated migration, but a later version does',
    description:
      'Tooltip for the link that explains that the app can be migrated.',
  },
  upgradeApp: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.upgrade-app',
    defaultMessage: 'Upgrade app',
    description:
      'Text for the link indicating to the user that an app can be upgraded.',
  },
  appReliabilityStageOne: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.reliability-stage-one',
    defaultMessage: 'Stage 1',
    description:
      'Text for the link indicating to the user this app is in stage one',
  },
  appReliabilityStageTwo: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.reliability-stage-beta',
    defaultMessage: 'Stage 2',
    description:
      'Text for the link indicating to the user this app is in stage two',
  },
  appReliabilityStageOneTooltip: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.reliability-stage-one-tooltip',
    defaultMessage:
      'Apps that are currently in this stage have unknown or low migration success rates.',
    description:
      'Tooltip for the link that explains that this app has low success rate migrating',
  },
  appReliabilityStageTwoTooltip: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-can-be-migrated.reliability-stage-beta-tooltip',
    defaultMessage: 'Apps in this stage have high migration success rates. ',
    description:
      'Tooltip for the link that explains that this app has high success rate migrating',
  },
});
