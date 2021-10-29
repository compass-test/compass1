import { defineMessages } from 'react-intl';

export default defineMessages({
  tabDescription: {
    id: 'jsm.gettingStartedPanel.checklist.incidents.tabDescription',
    defaultMessage:
      '{incidents} help you resolve disruptions to the quality of your service or escalate to on-call teams for a coordinated response.',
    description: `
      Description explaining what incidents are to set the context for the subsequent tasks that the user can complete
      {incidents} will match 'jsm.gettingStartedPanel.common.tabTitle.checklist.incidents'
    `,
  },
});
