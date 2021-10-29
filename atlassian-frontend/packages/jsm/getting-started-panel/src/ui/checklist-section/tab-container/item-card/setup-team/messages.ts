import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface SetupTeamElements {
  teams: ReactElement;
  addTeam: ReactElement;
  name: ReactElement;
  addMembers: ReactElement;
  addTeamSubmit: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    setupTeamDescription: {
      id: 'jsm.gettingStartedPanel.setupTeamDescription',
      defaultMessage:
        'Next, build up a team that can respond to incidents and decide who will be notified and when by customizing your on-call schedule.',
      description: 'Summary of setting up your team and on-call schedule',
    },
    setupTeamStep1: {
      id: 'jsm.gettingStartedPanel.setupTeamStep1',
      defaultMessage: '1. From Opsgenie, go to {teams}',
      description: `
    The first step to set up your team and on-call schedule.
    {teams} will be the untranslated string "Teams" - The Teams page in Opsgenie.
    `,
    },
    setupTeamStep2: {
      id: 'jsm.gettingStartedPanel.setupTeamStep2',
      defaultMessage: '2. Select {addTeam}',
      description: `
    The second step to set up your team and on-call schedule.
    {addTeam} will be the untranslated string "Add team" - The button to add a team in Opsgenie.
    `,
    },
    setupTeamStep3: {
      id: 'jsm.gettingStartedPanel.setupTeamStep3',
      defaultMessage: '3. Give a {name} to your team ',
      description: `
    The third step to set up your team and on-call schedule.
    {name} will be the untranslated string "Name" - The "name" input in the form to create a new Opsgenie team.
    `,
    },
    setupTeamStep4: {
      id: 'jsm.gettingStartedPanel.setupTeamStep4',
      defaultMessage:
        '4. {addMembers} by searching among account users, then select {addTeam}',
      description: `
    The fourth step to set up your team and on-call schedule.
    {addMembers} will be the untranslated string "Add members" - The "add member(s)" input in the form to create a new Opsgenie team.
    {addTeamSubmit} will be the untranslated string "Add team" - The button to submit the dialogue to add a new Opsgenie team.
    `,
    },
    setupTeamStep5: {
      id: 'jsm.gettingStartedPanel.setupTeamStep5',
      defaultMessage:
        '5. Your team is ready - now explore the page to edit your default on-call schedule, routing rule, and escalation policy',
      description: `
    The fifth step to set up your team and on-call schedule.
    `,
    },
    setupTeamDashboardLearnMore: {
      id: 'jsm.gettingStartedPanel.setupTeamDashboardLearnMore',
      defaultMessage: 'Learn more about Opsgenie’s team dashboard',
      description: 'Button to learn more about Opsgenie’s team dashboard',
    },
  }),
};
