import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface GoBeyondBasicsElements {
  bestPractices: ReactElement;
  jsmMobileApp: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    goBeyondBasicsDescription: {
      id: 'jsm.gettingStartedPanel.goBeyondBasicsDescription',
      defaultMessage:
        'Now that you’re done with the basics, take your project to the next level with our collection of helpful how-to guides, explainers and documentation. There’s plenty more to learn…',
      description: 'What to learn more',
    },
    goBeyondBasicsBestPractisesStep1: {
      id: 'jsm.gettingStartedPanel.goBeyondBasicsBestPractisesStep1',
      defaultMessage: '1. Go to {bestPractices}',
      description: `
    The first step to go beyond the basics.
    {bestPractices} will match 'jsm.gettingStartedPanel.bestPractices' - Link to the "Best practices for IT teams using Jira Service Desk" page on SAC.
    `,
    },
    goBeyondBasicsDownloadAppStep2: {
      id: 'jsm.gettingStartedPanel.goBeyondBasicsDownloadAppStep2',
      defaultMessage: '2. Download {jsmMobileApp}',
      description: `The second step to go beyond the basics.
      {jsmMobileApp} will match 'jsm.gettingStartedPanel.jsmMobileApp' - Jira Service Management for mobile app download page.
      `,
    },
    goBeyondBasicsDiscoverNewStep2: {
      id: 'jsm.gettingStartedPanel.goBeyondBasicsDiscoverNewStep2',
      defaultMessage: '2. Discover something new!',
      description: 'The second step to go beyond the basics',
    },
    goBeyondBasicsDiscoverNewStep3: {
      id: 'jsm.gettingStartedPanel.goBeyondBasicsDiscoverNewStep3',
      defaultMessage: '3. Discover something new!',
      description: 'The third step to go beyond the basics',
    },
    jsmMobileApp: {
      id: 'jsm.gettingStartedPanel.jsmMobileApp',
      defaultMessage: 'Jira Service Management for mobile',
      description: 'Link to downlad JSM mobile app',
    },
  }),
};
