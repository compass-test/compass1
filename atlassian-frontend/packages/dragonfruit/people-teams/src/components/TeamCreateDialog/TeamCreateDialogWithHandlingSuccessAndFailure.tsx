import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import { CreatedTeamData } from '../../types/team';
import { InvitedUser } from '../../types/user';
import { VOID_FUNC } from '../../utils/constants';
import { getTeamUrl } from '../../utils/url';
import {
  triggerAnalyticsForCreateTeamFailed,
  triggerAnalyticsForCreateTeamSuccess,
  triggerAnalyticsForInviteMembersFailed,
  triggerAnalyticsForInviteMembersSuccess,
} from '../analytics';
import { messages, PeopleTeamsIntlProvider } from '../i18n';

import TeamCreateDialogMutation from './TeamCreateDialogMutation';
import { TeamCreateDialogProps } from './types';

export function TeamCreateDialogWithHandlingSuccessAndFailure(
  props: WithAnalyticsEventsProps & TeamCreateDialogProps,
) {
  const {
    product,
    createAnalyticsEvent,
    onCreateTeamSuccess = VOID_FUNC,
    onCreateTeamFailed = VOID_FUNC,
    onInviteMembersSuccess = VOID_FUNC,
    onInviteMembersFailed = VOID_FUNC,
    addFlag = VOID_FUNC,
    pushRoute = VOID_FUNC,
  } = props;

  const handleCreateTeamSuccess = useCallback(
    (teamData: CreatedTeamData, invitedMembers: InvitedUser[]) => {
      const teamUrl = getTeamUrl(teamData.id, product);

      triggerAnalyticsForCreateTeamSuccess(
        createAnalyticsEvent,
        invitedMembers.length,
        teamData.id,
      );

      onCreateTeamSuccess(teamData, invitedMembers);

      pushRoute(teamUrl);
    },
    [createAnalyticsEvent, onCreateTeamSuccess, product, pushRoute],
  );

  const handleCreateTeamFailed = useCallback(
    (error, invitedMembers) => {
      triggerAnalyticsForCreateTeamFailed(
        createAnalyticsEvent,
        invitedMembers.length,
      );

      onCreateTeamFailed(error, invitedMembers);

      if (addFlag) {
        addFlag({
          title: <FormattedMessage {...messages.flagErrorCreateTeamTitle} />,
          description: (
            <FormattedMessage {...messages.flagErrorCreateTeamDesc} />
          ),
          appearance: 'error',
          id: 'create.team.failed',
        });
      }
    },
    [onCreateTeamFailed, addFlag, createAnalyticsEvent],
  );

  const handleInviteMembersSuccess = useCallback(
    (teamData, selectedUsers) => {
      triggerAnalyticsForInviteMembersSuccess(
        createAnalyticsEvent,
        selectedUsers.length,
      );

      onInviteMembersSuccess(teamData, selectedUsers);
    },
    [createAnalyticsEvent, onInviteMembersSuccess],
  );

  const handleInviteMembersFailed = useCallback(
    (teamData, selectedUsers, error) => {
      triggerAnalyticsForInviteMembersFailed(
        createAnalyticsEvent,
        selectedUsers.length,
        teamData && teamData.id,
      );

      onInviteMembersFailed(teamData, selectedUsers, error);

      if (addFlag) {
        addFlag({
          title: <FormattedMessage {...messages.flagErrorInviteMembersTitle} />,
          description: (
            <FormattedMessage {...messages.flagErrorInviteMembersDesc} />
          ),
          appearance: 'error',
          id: 'create.team.with.invite.failed',
        });
      }
    },
    [addFlag, createAnalyticsEvent, onInviteMembersFailed],
  );

  return (
    <PeopleTeamsIntlProvider>
      <TeamCreateDialogMutation
        {...props}
        onCreateTeamSuccess={handleCreateTeamSuccess}
        onCreateTeamFailed={handleCreateTeamFailed}
        onInviteMembersSuccess={handleInviteMembersSuccess}
        onInviteMembersFailed={handleInviteMembersFailed}
      />
    </PeopleTeamsIntlProvider>
  );
}

export default withAnalyticsEvents()(
  TeamCreateDialogWithHandlingSuccessAndFailure,
);
