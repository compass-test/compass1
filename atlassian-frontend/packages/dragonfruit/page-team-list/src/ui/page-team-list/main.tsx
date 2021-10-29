import React from 'react';

import { PageTeamListProps } from './types';

export default function PageTeamList({ testId }: PageTeamListProps) {
  return <div data-testid={testId}>Hello world 👋</div>;
}
