import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  quickStart: {
    id: 'jsm.gettingStartedPanel.quickStart',
    defaultMessage: 'Quickstart',
    description: 'Heading for the quick start checklist',
  },
  countCompleted: {
    id: 'jsm.gettingStartedPanel.countCompleted',
    defaultMessage: '{completedTaskCount} of {totalTaskCount} completed',
    description:
      'Compares the number of completed items in a checklist to the total list of items in that checklist',
  },
});
