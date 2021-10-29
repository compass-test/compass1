import React from 'react';

import { AppWrapper } from '../src/mocks';
import TeamWork from '../src/ui';

import StoryIcon from './assets/StoryIcon.svg';

const teamId = 'test-teamId-basic';
const mocks = JSON.stringify({
  issues: [
    {
      id: '10001',
      key: 'TWEX-1',
      fields: {
        project: {
          name: 'TeamWork example project',
        },
        issuetype: {
          name: 'Story',
          iconUrl: StoryIcon,
        },
        priority: {
          name: 'High',
        },
        status: {
          name: 'In Progress',
        },
        summary: 'Example jira ticket',
      },
    },
  ],
});

export default function ExampleBasic() {
  return (
    <AppWrapper mocks={mocks}>
      <TeamWork teamId={teamId} jiraAvailable testId="team-work-basic" />
    </AppWrapper>
  );
}
