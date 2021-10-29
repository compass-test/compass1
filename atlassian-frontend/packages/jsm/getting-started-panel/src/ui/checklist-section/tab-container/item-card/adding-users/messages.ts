import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface AddingUsersElements {
  projectSettings: ReactElement;
  people: ReactElement;
  addPeople: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    addingUsersDescription: {
      id: 'jsm.gettingStartedPanel.addingUsersDescription',
      defaultMessage:
        'Get your team involved by adding them as agents to a service project.',
      description: 'Summary of how we can add new agents',
    },
    addingUsersStep1: {
      id: 'jsm.gettingStartedPanel.addingUsersStep1',
      defaultMessage: '1. Go to {projectSettings} > {people}',
      description: `
      The first step to add new agents.
      {projectSettings} will match 'jsm.gettingStartedPanel.projectSettings' - Heading/button for the project settings page.
      {people} will match 'jsm.gettingStartedPanel.people' - The People page in project settings.
      `,
    },
    addingUsersStep2: {
      id: 'jsm.gettingStartedPanel.addingUsersStep2',
      defaultMessage: '2. Select {addPeople}',
      description: `
      The second step to add new agents.
      {addPeople} will match 'jsm.gettingStartedPanel.addPeople' - Button to add people to the project in the People page.
      `,
    },
    addingUsersStep3: {
      id: 'jsm.gettingStartedPanel.addingUsersStep3',
      defaultMessage: '3. Enter the agent’s username or email',
      description: 'The third step to add new agents',
    },
    addingUsersStep4: {
      id: 'jsm.gettingStartedPanel.addingUsersStep4',
      defaultMessage:
        '4. Choose their role from the dropdown (Service Desk Team)',
      description: 'The fourth step to add new agents',
    },
    addingUsersStep5: {
      id: 'jsm.gettingStartedPanel.addingUsersStep5',
      defaultMessage: '5. Select {add}',
      description: `
      The fifth step to add new agents
      {add} will match 'jsm.gettingStartedPanel.add' - The button for adding new agents to the project.`,
    },
    addingUsersStep6: {
      id: 'jsm.gettingStartedPanel.addingUsersStep6',
      defaultMessage: "6. They'll get an email with a link to your project",
      description: 'The sixth step to add new agents',
    },
    addingUsersLearnMore: {
      id: 'jsm.gettingStartedPanel.addingUsersLearnMore',
      defaultMessage: 'Learn more about adding team members',
      description: 'Button to learn more about adding team members',
    },
  }),
};
