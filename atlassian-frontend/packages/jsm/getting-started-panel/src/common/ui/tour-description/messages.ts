import { defineMessages } from 'react-intl';

export default defineMessages({
  welcomeTour: {
    id: 'jsm.gettingStartedPanel.common.tourDescription.welcome',
    defaultMessage: 'Start with a guided tour through the essentials.',
    description: 'Description for the welcome tour',
  },
  incidentManagementTour: {
    id: 'jsm.gettingStartedPanel.common.tourDescription.incidentManagement',
    defaultMessage:
      'Take a guided tour through incident management.  Any demo tickets left over from previous incident management tours will be closed.',
    description: 'Description for the incident management tour',
  },
  changeManagementTour: {
    id: 'jsm.gettingStartedPanel.common.tourDescription.changeManagement',
    defaultMessage:
      'Take a guided tour through change management.  Any demo tickets left over from previous change management tours will be closed.',
    description: 'Description for the change management tour',
  },
});
