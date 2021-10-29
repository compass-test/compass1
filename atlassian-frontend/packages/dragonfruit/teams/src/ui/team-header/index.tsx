import React, { useEffect } from 'react';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import { SkeletonItem } from '@atlaskit/menu';
import PageHeader from '@atlaskit/page-header';
import { gridSize } from '@atlaskit/theme/constants';
import { useCompassRecents } from '@atlassian/compass-search-cache';
import { useTeamService } from '@atlassian/dragonfruit-rest';
import { useIntl } from '@atlassian/dragonfruit-utils';

import teamCommonMessages from '../../common/ui/messages';

import { TeamBreadcrumbs } from './breadcrumbs';
import messages from './messages';
import { Error, InlineAvatars, TeamNameWrapper } from './styled';
import TeamDescription from './team-description';
import TeamMembership from './team-membership-settings';

interface TeamHeaderProps {
  teamId: string;
  inline?: boolean;
  link?: boolean;
}

const teamNameSkeletonCssFn = (currentStyles: any) => ({
  ...currentStyles,
  minHeight: `${gridSize() * 3.5}px`,
  width: '250px',
  paddingLeft: '0px',
  '&&::after': {
    // To align with the baseline text
    marginBottom: '-6px',
  },
});

function TeamHeader(props: TeamHeaderProps) {
  const { teamId, inline = false } = props;
  const { formatMessage } = useIntl();

  const { data: team, loading, error } = useTeamService(teamId);

  const { addRecentTeam } = useCompassRecents();

  useEffect(() => {
    if (loading || error || !team || !addRecentTeam) {
      return;
    }
    addRecentTeam({
      id: teamId,
      displayName: team.displayName,
      smallAvatarImageUrl: team.smallAvatarImageUrl,
    });
  }, [teamId, loading, error, team, addRecentTeam]);

  const Wrapper = inline ? InlineAvatars : 'div';
  const breadcrumbs = (
    <TeamBreadcrumbs teamId={teamId} teamName={team?.displayName} />
  );

  return (
    <Wrapper>
      <TeamNameWrapper inline={inline}>
        {!team && !error && (
          <SkeletonItem isShimmering cssFn={teamNameSkeletonCssFn} />
        )}

        {team && (
          <div data-testid="dragonfruit-page-team-details.ui.team-name">
            <PageHeader
              truncateTitle={true}
              breadcrumbs={breadcrumbs}
              bottomBar={
                <TeamMembership
                  testId={'team-header.membership-settings'}
                  membershipSettings={team.membershipSettings}
                />
              }
            >
              {team.displayName}
            </PageHeader>
            <TeamDescription
              testId={'team-header.description'}
              description={team.description}
              teamId={team.id}
            />
          </div>
        )}

        {error &&
          (error.statusCode === 403 ? (
            <Error>
              <ErrorIcon label={formatMessage(messages.errorLoading)} />
              <span>
                {formatMessage(teamCommonMessages.errorLoadingOrgPermissions)}
              </span>
            </Error>
          ) : (
            <Error>
              <ErrorIcon label={formatMessage(messages.errorLoading)} />
              <span>{formatMessage(messages.errorLoading)}</span>
            </Error>
          ))}
      </TeamNameWrapper>
    </Wrapper>
  );
}

export default TeamHeader;
