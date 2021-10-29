import React from 'react';

import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import Spinner from '@atlaskit/spinner';
import { Card } from '@atlassian/dragonfruit-common-ui';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { TeamDetails, useGetTeamMembers } from '@atlassian/dragonfruit-rest';
import { routes } from '@atlassian/dragonfruit-routes';

import { ComponentStatistic } from './component-statistic';
import {
  AvatarGroupWrapper,
  CardContent,
  StatsWrapper,
  TeamDetailsWrapper,
  TeamMembersWrapper,
  TeamName,
  TeamWrapper,
  TopContent,
} from './styled';

type TeamsCardProps = {
  teams: TeamDetails[];
  team: TeamDetails;
  selectTeam: (team: TeamDetails) => void;
};

export const TeamsCard = (props: TeamsCardProps) => {
  const { team, teams, selectTeam } = props;
  const idParts = team.id.split('/');
  const nonARITeamId = idParts[idParts.length - 1];
  const { data, isLoading, error } = useGetTeamMembers(nonARITeamId);

  return (
    <Card>
      <CardContent>
        <TopContent>
          <TeamWrapper>
            <Avatar
              appearance="square"
              size="medium"
              src={team.smallAvatarImageUrl}
              href={routes.TEAM_DETAILS(nonARITeamId)}
            />
            <TeamDetailsWrapper>
              {teams.length > 1 ? (
                <DropdownMenu
                  trigger={
                    <TeamName>
                      {team.displayName}
                      {teams.length > 1 && (
                        <ChevronDownIcon label="down-icon" />
                      )}
                    </TeamName>
                  }
                >
                  <DropdownItemGroup>
                    {teams.map(team => (
                      <DropdownItem onClick={() => selectTeam(team)}>
                        {team.displayName}
                      </DropdownItem>
                    ))}
                  </DropdownItemGroup>
                </DropdownMenu>
              ) : (
                <TeamName>{team.displayName}</TeamName>
              )}
              <TeamMembersWrapper>
                {isLoading ? (
                  <Spinner size="small" />
                ) : error ? (
                  <EditorWarningIcon label="error" />
                ) : (
                  `${data?.length} members`
                )}
              </TeamMembersWrapper>
            </TeamDetailsWrapper>
          </TeamWrapper>
        </TopContent>
        <StatsWrapper>
          {Object.keys(CompassComponentType).map(type => (
            <ComponentStatistic
              team={team}
              type={type as CompassComponentType}
            />
          ))}
        </StatsWrapper>
        {isLoading ? (
          <Spinner size="small" />
        ) : error ? (
          <EditorWarningIcon label="error" />
        ) : (
          <AvatarGroupWrapper>
            <AvatarGroup
              data={(data || []).map(member => ({
                key: member.accountId,
                name: member.name,
                src: member.picture,
              }))}
            />
          </AvatarGroupWrapper>
        )}
      </CardContent>
    </Card>
  );
};
