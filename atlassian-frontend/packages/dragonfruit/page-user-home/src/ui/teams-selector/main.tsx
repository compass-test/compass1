import React, { useEffect, useState } from 'react';

import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import Spinner from '@atlaskit/spinner';
import { TeamDetails, useTeamsOfUser } from '@atlassian/dragonfruit-rest';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import { CenteredContentWrapper } from '../../common/ui/styled';

import { TeamsCard } from './team-card';

type TeamsSelectorProps = {};

export const TeamsSelector = (props: TeamsSelectorProps) => {
  const { accountId, orgId } = useTenantInfo();
  const [selectedTeam, setSelectedTeam] = useState<TeamDetails>();
  const { data, loading, error } = useTeamsOfUser(accountId, orgId);
  const myTeams = data?.entities;

  useEffect(() => {
    if (myTeams && myTeams.length > 0) {
      setSelectedTeam(myTeams[0]);
    }
  }, [myTeams]);

  if (loading) {
    return (
      <CenteredContentWrapper>
        <Spinner size="large" />
      </CenteredContentWrapper>
    );
  }

  if (error) {
    return (
      <CenteredContentWrapper>
        <EditorWarningIcon size="xlarge" label="error" />
      </CenteredContentWrapper>
    );
  }

  return (
    <>
      {selectedTeam && myTeams ? (
        <TeamsCard
          teams={myTeams}
          team={selectedTeam}
          selectTeam={team => setSelectedTeam(team)}
        />
      ) : (
        <div>No teams available.</div>
      )}
    </>
  );
};
