import React from 'react';

import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { TeamCheckinCard } from '../../common/ui/team-checkin-card';
import { TeamCheckin } from '../../common/ui/types';

import messages from './messages';
import {
  Heading,
  PastTeamCheckinsList,
  PastTeamCheckinsWrapper,
} from './styled';

interface Props {
  testId?: string;
  teamCheckins: TeamCheckin[];
  onEdit: (teamCheckinId: string) => void;
  onDelete: (teamCheckinId: string) => void;
}

export function PastTeamCheckins({
  testId = 'past-team-checkins',
  teamCheckins,
  onEdit,
  onDelete,
}: Props) {
  const { formatMessage } = useIntl();

  const pastTeamCheckinsTestId = testId;
  const headingTestid = `${pastTeamCheckinsTestId}.heading`;
  const teamCheckinTestId = `${pastTeamCheckinsTestId}.team-checkin`;

  return (
    <PastTeamCheckinsWrapper data-testid={pastTeamCheckinsTestId}>
      <Heading data-testid={headingTestid}>
        {formatMessage(messages.heading)}
      </Heading>
      <PastTeamCheckinsList>
        {teamCheckins.map((teamCheckin, index) => (
          <TeamCheckinCard
            key={teamCheckin.id}
            testId={`${teamCheckinTestId}-${index}`}
            teamCheckin={teamCheckin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </PastTeamCheckinsList>
    </PastTeamCheckinsWrapper>
  );
}

export default withErrorBoundary(PastTeamCheckins, {
  componentName: 'pastTeamCheckins',
});
