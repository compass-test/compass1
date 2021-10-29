import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface IncidentManagementElements {
  bestPracticesForIncidentManagement: ReactElement;
  incidentManagementSettings: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    incidentManagementDescription: {
      id: 'jsm.gettingStartedPanel.incidentManagementDescription',
      defaultMessage:
        'Now that you’re ready to respond to incidents in record time, find out how to take it to the next level.',
      description: 'What to learn more about incident management',
    },
    incidentManagementSettingsStep1: {
      id: 'jsm.gettingStartedPanel.incidentManagementSettingsStep1',
      defaultMessage:
        '1. Go to Project settings > {incidentManagementSettings} to configure and learn about new features ',
      description: `
    The step to open incident management settings.
    {incidentManagementSettings} will match 'jsm.gettingStartedPanel.incidentManagementSettings' - Link to the incident management settings.
    `,
    },
    incidentManagementBestPractisesStep1: {
      id: 'jsm.gettingStartedPanel.incidentManagementBestPractisesStep1',
      defaultMessage: '1. Go to {bestPracticesForIncidentManagement}',
      description: `
    The step to learn more about incident management.
    {bestPracticesForIncidentManagement} will match 'jsm.gettingStartedPanel.bestPracticesForIncidentManagement' - Link to the "Best practices for Incident management" page on SAC.
    `,
    },
    incidentManagementBestPractisesStep2: {
      id: 'jsm.gettingStartedPanel.incidentManagementBestPractisesStep2',
      defaultMessage: '2. Check out {bestPracticesForIncidentManagement}',
      description: `
    The  step to learn more about incident management.
    {bestPracticesForIncidentManagement} will match 'jsm.gettingStartedPanel.bestPracticesForIncidentManagement' - Link to the "Best practices for Incident management" page on SAC.
    `,
    },
    incidentManagementImproveFurtherStep2: {
      id: 'jsm.gettingStartedPanel.incidentManagementImproveFurtherStep2',
      defaultMessage: '2. Find out how to improve even further!',
      description: 'The step to learn more about incident management',
    },
    incidentManagementImproveFurtherStep3: {
      id: 'jsm.gettingStartedPanel.incidentManagementImproveFurtherStep3',
      defaultMessage: '3. Find out how to improve even further!',
      description: 'The step to learn more about incident management',
    },
    bestPracticesForIncidentManagement: {
      id: 'jsm.gettingStartedPanel.bestPracticesForIncidentManagement',
      defaultMessage: 'Best practices for incident management',
      description:
        'Link to the "Best practices for incident management" page on SAC',
    },
    incidentManagementSettings: {
      id: 'jsm.gettingStartedPanel.incidentManagementSettings',
      defaultMessage: 'Incident management',
      description:
        'Link to the "Best practices for incident management" page on SAC',
    },
  }),
};
