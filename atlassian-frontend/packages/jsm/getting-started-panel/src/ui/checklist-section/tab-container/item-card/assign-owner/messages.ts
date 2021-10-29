import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface AssignOwnerElements {
  services: ReactElement;
  addService: ReactElement;
  serviceName: ReactElement;
  ownerTeam: ReactElement;
  addServiceSubmit: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    assignOwnerDescription: {
      id: 'jsm.gettingStartedPanel.assignOwnerDescription',
      defaultMessage:
        'Inform the right teams so they can start working to resolve incidents instantly.',
      description:
        'Summary of why we want to assign an owner team to your services',
    },
    assignOwnerStep1: {
      id: 'jsm.gettingStartedPanel.assignOwnerStep1',
      defaultMessage: '1. From Opsgenie, go to {services} to list all services',
      description: `
    The first step to assign an owner team to your services.
    {services} will be the untranslated string "Services" - the Services page in Opsgenie.
    `,
    },
    assignOwnerStep2: {
      id: 'jsm.gettingStartedPanel.assignOwnerStep2',
      defaultMessage: '2. Select {addService}',
      description: `
    The second step to assign an owner team to your services
    {addService} will be the untranslated string "Add service" - the button to add a service in Opsgenie.
    `,
    },
    assignOwnerStep3: {
      id: 'jsm.gettingStartedPanel.assignOwnerStep3',
      defaultMessage: '3. Enter a {serviceName} and select an {ownerTeam}',
      description: `
    The third step to assign an owner team to your services
    {serviceName} will be the untranslated string "Service name" - the form field in the "Add service" form in Opsgenie.
    {ownerTeam} will be the untranslated string "Owner team" - the team owning an Opsgenie service.
    `,
    },
    assignOwnerStep4: {
      id: 'jsm.gettingStartedPanel.assignOwnerStep4',
      defaultMessage: '4. Select {addServiceSubmit} to save the service',
      description: `
    The fourth step to assign an owner team to your services.
    {addServiceSubmit} will be the untranslated string "Add service" - The button to submit the dialogue to add a new Opsgenie service.
    `,
    },
    assignOwnerStep5: {
      id: 'jsm.gettingStartedPanel.assignOwnerStep5',
      defaultMessage:
        '5. Later, go to your team’s service settings to explore more options',
      description: `
    The fifth step to assign an owner team to your services.
    `,
    },
    assignOwnerDescriptionNote: {
      id: 'jsm.gettingStartedPanel.assignOwnerDescriptionNote',
      defaultMessage:
        'Note: Services are synced and will appear in both Opsgenie and Jira Service Management.',
      description: `
    A note text that appears after the assign owner team steps
    `,
    },
    assignOwnerLearnMore: {
      id: 'jsm.gettingStartedPanel.assignOwnerLearnMore',
      defaultMessage: 'Learn more about connecting teams and services',
      description: 'Button to learn more about connecting teams and services',
    },
  }),
};
