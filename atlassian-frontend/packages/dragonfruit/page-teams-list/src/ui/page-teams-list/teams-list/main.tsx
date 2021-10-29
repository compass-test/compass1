import React, { useMemo } from 'react';

import { Link } from 'react-resource-router';

import Avatar from '@atlaskit/avatar';
import DynamicTable from '@atlaskit/dynamic-table';
import EmptyState from '@atlaskit/empty-state';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  ErrorIcon,
  NoOwnerIcon as NoTeamsIcon,
} from '@atlassian/dragonfruit-common-ui/assets';
import {
  TeamDetails,
  useSearchTeams,
  useTeamsOfUser,
} from '@atlassian/dragonfruit-rest';
import { routes } from '@atlassian/dragonfruit-routes';
import { TeamAvatarGroup } from '@atlassian/dragonfruit-teams';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { Actions } from './actions';
import messages from './messages';
import { ActionsWrapper, DescriptionStyled, TeamDisplay } from './styled';

type TeamsListProps = {
  yourTeamsEnabled: boolean;
  searchText: string;
  testId?: string;
};

const MAX_TEAMS_SHOWN = 20;
const TEAMS_ARI_PREFIX = 'ari:cloud:teams::team/';

export const TeamsList = ({
  yourTeamsEnabled,
  searchText,
  testId,
}: TeamsListProps) => {
  const { orgId, accountId } = useTenantInfo();
  const { formatMessage } = useIntl();
  const dataTestId = testId || 'dragonfruit-page-teams-list.ui.teams-list';
  const {
    loading: searchTeamsLoading,
    error: searchTeamsError,
    data: searchTeams,
  } = useSearchTeams(searchText, orgId, MAX_TEAMS_SHOWN);

  const {
    loading: yourTeamsLoading,
    error: yourTeamsError,
    data: yourTeams,
  } = useTeamsOfUser(accountId, orgId, MAX_TEAMS_SHOWN);
  const headerCells = [
    {
      key: 'title',
      content: formatMessage(CommonMessages.name),
      width: 25,
      isSortable: false,
    },
    {
      key: 'description',
      content: formatMessage(CommonMessages.description),
      width: 40,
      isSortable: false,
    },
    {
      key: 'members',
      content: formatMessage(messages.membersLabel),
      width: 30,
      isSortable: false,
    },
    {
      key: 'actions',
      content: formatMessage(CommonMessages.actions),
      width: 5,
      isSortableFalse: false,
    },
  ];

  const tableHeader = {
    cells: headerCells,
  };

  const loading = yourTeamsEnabled ? yourTeamsLoading : searchTeamsLoading;
  const error = yourTeamsEnabled ? yourTeamsError : searchTeamsError;
  const teams = yourTeamsEnabled ? yourTeams?.entities : searchTeams;

  const TeamNameDisplay = (team: TeamDetails, accountId: string) => (
    <TeamDisplay>
      <Avatar
        appearance="circle"
        src={team.smallAvatarImageUrl || undefined}
        size="small"
        name={team.displayName}
      />
      <Link to={routes.TEAM_DETAILS(accountId)}>{team.displayName}</Link>
    </TeamDisplay>
  );

  const rows = useMemo(() => {
    return (teams ?? []).map(team => {
      const accountId = team.id.replace(TEAMS_ARI_PREFIX, '');
      const cells = [
        {
          key: `${team.displayName}-${accountId}`,
          content: TeamNameDisplay(team, accountId),
        },
        {
          key: `${team.displayName}-description`,
          content: <DescriptionStyled>{team.description}</DescriptionStyled>,
        },
        {
          key: `${team.displayName}-members`,
          content: (
            <TeamAvatarGroup
              teamId={accountId}
              testId={dataTestId}
              size="small"
            />
          ),
        },
        {
          key: `${team.displayName}-actions`,
          content: (
            <ActionsWrapper>
              <Actions
                teamName={team.displayName}
                accountId={accountId}
                testId={dataTestId}
              />
            </ActionsWrapper>
          ),
        },
      ];
      return {
        key: `team-row.${accountId}`,
        cells: cells,
      };
    });
  }, [teams, dataTestId]);

  return (
    <>
      <DynamicTable
        isLoading={loading}
        head={tableHeader}
        rows={rows}
        sortKey="title"
        sortOrder="ASC"
        isFixedSize
        emptyView={
          error ? (
            <EmptyState
              testId={`${dataTestId}.error`}
              header={formatMessage(messages.errorStateTitle)}
              description={formatMessage(messages.errorStateBody)}
              imageUrl={ErrorIcon}
            />
          ) : (
            <EmptyState
              testId={`${dataTestId}.no-teams`}
              header={formatMessage(messages.emptyStateHeader)}
              description={formatMessage(messages.emptyStateBody)}
              imageUrl={NoTeamsIcon}
            />
          )
        }
        testId={dataTestId}
      />
    </>
  );
};
