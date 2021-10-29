import React from 'react';

import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { TeamCheckinCard } from '../../common/ui/team-checkin-card';
import { TeamCheckin } from '../../common/ui/types';

import messages from './messages';
import { Heading, RecentTeamCheckinWrapper } from './styled';

interface Props {
  testId?: string;
  teamCheckin: TeamCheckin;
  onEdit: (teamCheckinId: string) => void;
  onDelete: (teamCheckinId: string) => void;
}

export function RecentTeamCheckin({
  testId = 'recent-team-checkin',
  teamCheckin,
  onEdit,
  onDelete,
}: Props) {
  const { formatMessage } = useIntl();

  const recentTeamCheckinTestId = testId;
  const headingTestid = `${recentTeamCheckinTestId}.heading`;
  const teamCheckinTestId = `${recentTeamCheckinTestId}.team-checkin`;

  return (
    <RecentTeamCheckinWrapper data-testid={recentTeamCheckinTestId}>
      <Heading data-testid={headingTestid}>
        {formatMessage(messages.heading)}
      </Heading>
      <TeamCheckinCard
        testId={teamCheckinTestId}
        teamCheckin={teamCheckin}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </RecentTeamCheckinWrapper>
  );
}

export default withErrorBoundary(RecentTeamCheckin, {
  componentName: 'recentTeamCheckin',
});
