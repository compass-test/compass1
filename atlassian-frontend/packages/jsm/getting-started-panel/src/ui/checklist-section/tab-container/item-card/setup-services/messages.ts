import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface SetupServicesElements {
  serviceHub: ReactElement;
  createService: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    setupServicesDescription: {
      id: 'jsm.gettingStartedPanel.setupServicesDescription',
      defaultMessage:
        'Add a product or application that your organization uses.',
      description: 'Description of setting up services',
    },
    setupServicesStep1: {
      id: 'jsm.gettingStartedPanel.setupServicesStep1',
      defaultMessage: '1. Go to {serviceHub} ',
      description: `
      The first step to set up your services.
      {serviceHub} will match 'jsm.gettingStartedPanel.serviceHub' - The Service hub page in a service project.
      `,
    },
    setupServicesStep2: {
      id: 'jsm.gettingStartedPanel.setupServicesStep2',
      defaultMessage: '2. Select {createService}',
      description: `
      The second step to set up your services.
      {createService} will match 'jsm.gettingStartedPanel.createService' - The Service hub page in a service project.
      `,
    },
    setupServicesLearnMore: {
      id: 'jsm.gettingStartedPanel.setupServicesLearnMore',
      defaultMessage: 'Learn more about services',
      description: 'Button to learn more about services',
    },
  }),
};
