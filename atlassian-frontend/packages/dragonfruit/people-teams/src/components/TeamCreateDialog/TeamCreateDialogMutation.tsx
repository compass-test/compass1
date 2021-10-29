import React, { useCallback, useEffect, useState } from 'react';

import { useCreateTeamService } from '../../hooks/use-create-team-service';
import { useInviteTeamMembers } from '../../hooks/use-invite-team-members-service';
import { useOnceWhen } from '../../hooks/use-once-when';
import { InvitedUser } from '../../types/user';
import { VOID_FUNC } from '../../utils/constants';

import TeamCreateDialogInternal from './TeamCreateDialogInternal';
import { TeamCreateDialogProps } from './types';

export default function TeamCreateDialogMutation(props: TeamCreateDialogProps) {
  const {
    cloudId,
    orgId,
    product,
    onCreateTeamSuccess = VOID_FUNC,
    onCreateTeamFailed = VOID_FUNC,
    onInviteMembersSuccess = VOID_FUNC,
    onInviteMembersFailed = VOID_FUNC,
  } = props;

  const [selectedMembers, setSelectedMembers] = useState<InvitedUser[]>([]);
  // need a state to keep sync status of 2 requests: Create team and Invite members
  const [isFetching, setIsFetching] = useState(false);

  const {
    loading: isCreatingTeam,
    error: errorCreateTeam,
    data: teamData,
    createTeam,
  } = useCreateTeamService(cloudId, orgId, product);

  const {
    loading: isInvitingTeamMembers,
    error: errorInviteTeamMembers,
    data: membershipData,
    inviteTeamMembers,
  } = useInviteTeamMembers(cloudId, product);

  const handleCreateTeamAndAddMembers = useCallback(
    (teamName: string, selectedMembers: InvitedUser[]) => {
      if (isCreatingTeam || isInvitingTeamMembers) {
        return;
      }

      // save selected users/members for step 2
      setSelectedMembers(selectedMembers);
      setIsFetching(true);

      // step 1: create a new team
      return createTeam(teamName);
    },
    [createTeam, isCreatingTeam, isInvitingTeamMembers],
  );

  // step 2: invite users to team
  useEffect(() => {
    const isFinishedCreateTeam =
      !errorCreateTeam &&
      !isCreatingTeam &&
      !isInvitingTeamMembers &&
      !!teamData;

    if (isFinishedCreateTeam) {
      inviteTeamMembers(teamData.id, selectedMembers);
    }
  }, [
    errorCreateTeam,
    inviteTeamMembers,
    isCreatingTeam,
    isInvitingTeamMembers,
    selectedMembers,
    teamData,
  ]);

  const isFinishedCreateTeam =
    !errorCreateTeam && !isCreatingTeam && !isInvitingTeamMembers && teamData;

  // call callbacks for creating teams
  useOnceWhen(
    !!(isFinishedCreateTeam || errorCreateTeam),
    () => {
      if (errorCreateTeam) {
        onCreateTeamFailed(errorCreateTeam, selectedMembers);
        // no need to invite anyone to team
        setIsFetching(false);
      }
    },
    [
      errorCreateTeam,
      isFinishedCreateTeam,
      onCreateTeamFailed,
      onCreateTeamSuccess,
      selectedMembers,
      teamData,
      setIsFetching,
    ],
  );

  const teamLoaded = !!teamData && !!teamData.id;
  const noMembersInvited = !selectedMembers.length;
  const isInvitingMembersFinished =
    !isInvitingTeamMembers &&
    (errorInviteTeamMembers || (membershipData && membershipData.length));

  const invitingComplete = noMembersInvited || !!isInvitingMembersFinished;

  // call callbacks for inviting members
  useOnceWhen(
    teamLoaded && invitingComplete,
    () => {
      // always call onCreateTeamSuccess when creating team successfully, though inviting members can fail
      // since users can work around by re-inviting members in the team profile page.
      onCreateTeamSuccess(teamData, selectedMembers);

      if (noMembersInvited) {
        setIsFetching(false);
        return;
      }

      if (isInvitingMembersFinished) {
        if (errorInviteTeamMembers) {
          onInviteMembersFailed(
            teamData,
            selectedMembers,
            errorInviteTeamMembers,
          );
        } else {
          onInviteMembersSuccess(teamData, selectedMembers);
        }

        setIsFetching(false);
      }
    },
    [
      errorInviteTeamMembers,
      isInvitingMembersFinished,
      noMembersInvited,
      onInviteMembersFailed,
      onInviteMembersSuccess,
      selectedMembers,
      teamData,
      setIsFetching,
    ],
  );

  return (
    <TeamCreateDialogInternal
      {...props}
      createTeamAndAddMembers={handleCreateTeamAndAddMembers}
      isFetching={isFetching}
    />
  );
}
