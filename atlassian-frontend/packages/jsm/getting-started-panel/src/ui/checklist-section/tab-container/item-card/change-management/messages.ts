import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface ChangeManagementElements {
  bestPracticesForChangeManagement: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    changeManagementDescription: {
      id: 'jsm.gettingStartedPanel.changeManagementDescription',
      defaultMessage:
        'Now that you’ve set up the essentials for change management, check out our documentation to find out how to do even more with changes.',
      description: 'What to learn more about change management',
    },
    changeManagementStep1: {
      id: 'jsm.gettingStartedPanel.changeManagementStep1',
      defaultMessage: '1. Go to {bestPracticesForChangeManagement}',
      description: `
    The first step to learn more about change management.
    {bestPracticesForChangeManagement} will match 'jsm.gettingStartedPanel.bestPracticesForChangeManagement' - Link to the "Best practices for change management" page on SAC.
    `,
    },
    changeManagementStep2: {
      id: 'jsm.gettingStartedPanel.changeManagementStep2',
      defaultMessage: '2. Find an article that interests you!',
      description: 'The second step to learn more about change management',
    },
  }),
};
