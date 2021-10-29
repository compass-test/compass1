import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface EmailSetupElements {
  projectSettings: ReactElement;
  emailRequests: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    emailSetupDescription: {
      id: 'jsm.gettingStartedPanel.emailSetupDescription',
      defaultMessage:
        'Add an email address so your end-users can email requests directly to your project.',
      description: 'Summary of what setting up email requests can do',
    },
    emailSetupStep1: {
      id: 'jsm.gettingStartedPanel.emailSetupStep1',
      defaultMessage: '1. Go to {projectSettings} > {emailRequests}',
      description: `
      The first step to set up email requests.
      {projectSettings} will match 'jsm.gettingStartedPanel.projectSettings' - Heading/button for the project settings page.
      {emailRequests} will match 'jsm.gettingStartedPanel.emailRequests' - The "Email requests" page in project settings.
      `,
    },
    emailSetupStep2: {
      id: 'jsm.gettingStartedPanel.emailSetupStep2',
      defaultMessage:
        '2. Choose your email service provider and complete the steps to link your account',
      description: 'The first step to set up email requests',
    },
    emailSetupLearnMore: {
      id: 'jsm.gettingStartedPanel.emailSetupLearnMore',
      defaultMessage: 'Learn more about setting up email',
      description: 'Button to learn more about setting up email',
    },
  }),
};
