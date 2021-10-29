import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  startIcon: {
    id: 'jsm.gettingStartedPanel.startIcon',
    defaultMessage: 'Start icon',
    description: 'Label for start tour button icon',
  },
  startWelcome: {
    id: 'jsm.gettingStartedPanel.startWelcome',
    defaultMessage: 'Start welcome tour',
    description: `Button to restart the welcome tour
      This should be consistent with 'jsm.gettingStartedPanel.common.tourTitle.welcome', which defines the name of the tour.
    `,
  },
  startChangeManagement: {
    id: 'jsm.gettingStartedPanel.startChangeManagement',
    defaultMessage: 'Start change management tour',
    description: `Button to restart the change management tour
      This should be consistent with 'jsm.gettingStartedPanel.common.tourTitle.changeManagement', which defines the name of the tour.
    `,
  },
  startIncidentManagement: {
    id: 'jsm.gettingStartedPanel.startIncidentManagement',
    defaultMessage: 'Start incident management tour',
    description: `Button to restart the incident management tour
      This should be consistent with 'jsm.gettingStartedPanel.common.tourTitle.incidentManagement', which defines the name of the tour.
    `,
  },
});
