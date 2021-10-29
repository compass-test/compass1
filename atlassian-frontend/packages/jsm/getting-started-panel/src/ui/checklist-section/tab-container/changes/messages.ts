import { defineMessages } from 'react-intl';

export default defineMessages({
  tabDescription: {
    id: 'jsm.gettingStartedPanel.checklist.changes.tabDescription',
    defaultMessage:
      '{changes} help you record, review, and approve changes so your teams can quickly deploy changes and minimize risk.',
    description: `
      Description explaining what changes are to set the context for the subsequent tasks that the user can complete
      {changes} will match 'jsm.gettingStartedPanel.common.tabTitle.checklist.changes'
      `,
  },
});
