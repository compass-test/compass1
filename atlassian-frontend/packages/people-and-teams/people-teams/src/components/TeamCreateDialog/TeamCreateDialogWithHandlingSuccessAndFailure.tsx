import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import { CreatedTeamData } from '../../types/team';
import { InvitedUser } from '../../types/user';
import { VOID_FUNC } from '../../utils/constants';
import { ErrorWithStatus } from '../../utils/fetch';
import { getTeamUrl } from '../../utils/url';
import {
  triggerAnalyticsForClickTeamLinkInSuccessFlag,
  triggerAnalyticsForCreateTeamFailed,
  triggerAnalyticsForCreateTeamSuccess,
  triggerAnalyticsForInviteMembersFailed,
  triggerAnalyticsForInviteMembersSuccess,
} from '../analytics';
import { CustomIntlProvider, messages } from '../i18n';

import TeamCreateDialogMutation from './TeamCreateDialogMutation';
import { TeamCreateDialogProps } from './types';

function isSeriousError(error: ErrorWithStatus | Error) {
  // Check for ' 403' with space beforehand to not count urls containing 403 in cloud or team id
  if (
    ('status' in error && error['status'] === 403) ||
    error.message.includes(' 403')
  ) {
    return false;
  }

  if (error.message === 'Failed to fetch') {
    return false;
  }

  return true;
}

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
    disableSuccessFlag,
    extraAnalyticsAttrs,
  } = props;

  const handleOnClickTeamLinkInFlag = useCallback(
    (teamData, invitedMembers) => {
      triggerAnalyticsForClickTeamLinkInSuccessFlag(
        createAnalyticsEvent,
        teamData.id,
        invitedMembers.length,
        extraAnalyticsAttrs,
      );
      // redirect to team page
      pushRoute(getTeamUrl(teamData.id, product));
    },
    [createAnalyticsEvent, extraAnalyticsAttrs, product, pushRoute],
  );

  const handleCreateTeamSuccess = useCallback(
    (teamData: CreatedTeamData, invitedMembers: InvitedUser[]) => {
      triggerAnalyticsForCreateTeamSuccess(
        createAnalyticsEvent,
        invitedMembers.length,
        extraAnalyticsAttrs,
      );

      onCreateTeamSuccess(teamData, invitedMembers);

      if (!disableSuccessFlag) {
        addFlag({
          title: (
            <FormattedMessage
              {...messages.flagSuccessCreateTeamTitle}
              values={{
                teamName: teamData.displayName,
              }}
            />
          ),
          description: (
            <FormattedMessage {...messages.flagSuccessCreateTeamDesc} />
          ),
          appearance: 'success',
          id: 'create.team.success',
          actions: [
            {
              content: (
                <FormattedMessage {...messages.flagSuccessCreateTeamAction} />
              ),
              onClick: () =>
                handleOnClickTeamLinkInFlag(teamData, invitedMembers),
              href: getTeamUrl(teamData.id, product),
            },
          ],
        });
      }
    },
    [
      createAnalyticsEvent,
      extraAnalyticsAttrs,
      onCreateTeamSuccess,
      disableSuccessFlag,
      addFlag,
      product,
      handleOnClickTeamLinkInFlag,
    ],
  );

  const handleCreateTeamFailed = useCallback(
    (error: ErrorWithStatus, invitedMembers) => {
      if (isSeriousError(error)) {
        triggerAnalyticsForCreateTeamFailed(
          createAnalyticsEvent,
          invitedMembers.length,
          {
            ...extraAnalyticsAttrs,
            errorMessage: error.message,
            errorStack: error.stack,
            errorStatus: error.status,
          },
        );
      }

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
    [createAnalyticsEvent, extraAnalyticsAttrs, onCreateTeamFailed, addFlag],
  );

  const handleInviteMembersSuccess = useCallback(
    (teamData, selectedUsers) => {
      triggerAnalyticsForInviteMembersSuccess(
        createAnalyticsEvent,
        selectedUsers.length,
        teamData.id,
        extraAnalyticsAttrs,
      );

      onInviteMembersSuccess(teamData, selectedUsers);
    },
    [createAnalyticsEvent, extraAnalyticsAttrs, onInviteMembersSuccess],
  );

  const handleInviteMembersFailed = useCallback(
    (teamData, selectedUsers, error: Error) => {
      if (isSeriousError(error)) {
        triggerAnalyticsForInviteMembersFailed(
          createAnalyticsEvent,
          selectedUsers.length,
          teamData && teamData.id,
          {
            ...extraAnalyticsAttrs,
            errorMessage: error.message,
            errorStack: error.stack,
          },
        );
      }

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
    [addFlag, createAnalyticsEvent, extraAnalyticsAttrs, onInviteMembersFailed],
  );

  return (
    <CustomIntlProvider>
      <TeamCreateDialogMutation
        {...props}
        onCreateTeamSuccess={handleCreateTeamSuccess}
        onCreateTeamFailed={handleCreateTeamFailed}
        onInviteMembersSuccess={handleInviteMembersSuccess}
        onInviteMembersFailed={handleInviteMembersFailed}
      />
    </CustomIntlProvider>
  );
}

export default withAnalyticsEvents()(
  TeamCreateDialogWithHandlingSuccessAndFailure,
);
