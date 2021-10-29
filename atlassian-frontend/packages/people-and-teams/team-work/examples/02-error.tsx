import React from 'react';

import { AppWrapper } from '../src/mocks';
import TeamWork from '../src/ui';

const teamId = 'test-teamId-error';
const mocks = new Error('Team work mock request error');

export default function ExampleError() {
  return (
    <AppWrapper mocks={mocks}>
      <TeamWork teamId={teamId} jiraAvailable testId="team-work-error" />
    </AppWrapper>
  );
}
