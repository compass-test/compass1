import React from 'react';

import { AppWrapper } from '../src/mocks';
import TeamWork from '../src/ui';

const teamId = 'test-teamId-empty';
const mocks = {
  issues: [],
};

export default function ExampleEmpty() {
  return (
    <AppWrapper mocks={mocks}>
      <TeamWork teamId={teamId} jiraAvailable testId="team-work-empty" />
    </AppWrapper>
  );
}
