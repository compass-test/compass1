import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  fireOperationalAnalytics,
  fireTrackAnalytics,
  fireUIAnalytics,
} from '@atlassian/analytics-bridge';

export enum AnalyticsActionSubject {
  ERROR_BOUNDARY = 'errorBoundary',
  MEMBER_PICKER = 'memberPicker',
  TEAM_CREATE_DIALOG = 'teamCreateDialog',
  INVITE_MEMBERS = 'inviteMembers',
}

export enum AnalyticsAction {
  RENDERED = 'rendered',
  CLICKED = 'clicked',
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
  VIEWED = 'viewed',
  CLOSED = 'closed',
  ERROR = 'error',
  SUBMITTED = 'submitted',
}

export enum AnalyticsSource {
  PEOPLE_TEAMS = 'peopleTeams',
}

export const triggerAnalyticsForMemberPickerError = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({});

    const eventName = `${AnalyticsActionSubject.MEMBER_PICKER} ${AnalyticsAction.ERROR}`;
    fireTrackAnalytics(event, eventName);
  }
};

export const triggerAnalyticsForViewTeamCreateDialog = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  proposedMembersLength?: number,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({
      action: AnalyticsAction.VIEWED,
      actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    });

    fireUIAnalytics(event, {
      proposedMembersLength,
    });
  }
};

export const triggerAnalyticsForCloseTeamCreateDialog = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({
      action: AnalyticsAction.CLOSED,
      actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    });

    fireUIAnalytics(event);
  }
};

export const triggerAnalyticsForSubmitTeamCreateDialog = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  canCreateTeam?: boolean,
  numberOfMembers?: number,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({
      action: AnalyticsAction.SUBMITTED,
      actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    });

    fireUIAnalytics(event, {
      canCreateTeam,
      numberOfMembers,
    });
  }
};

export const triggerAnalyticsForCreateTeamFailed = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({});

    const eventName = `${AnalyticsActionSubject.TEAM_CREATE_DIALOG} ${AnalyticsAction.FAILED}`;
    const attributes = {
      numberOfMembers,
    };

    fireOperationalAnalytics(event, eventName, attributes);
    fireTrackAnalytics(event, eventName, attributes);
  }
};

export const triggerAnalyticsForCreateTeamSuccess = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  teamId?: string,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({});

    const eventName = `${AnalyticsActionSubject.TEAM_CREATE_DIALOG} ${AnalyticsAction.SUCCEEDED}`;
    const attributes = {
      numberOfMembers,
      teamId,
    };

    fireOperationalAnalytics(event, eventName, attributes);
    fireTrackAnalytics(event, eventName, attributes);
  }
};

export const triggerAnalyticsForInviteMembersFailed = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  teamId?: string,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({});

    const eventName = `${AnalyticsActionSubject.INVITE_MEMBERS} ${AnalyticsAction.FAILED}`;
    const attributes = {
      numberOfMembers,
      teamId,
    };

    fireOperationalAnalytics(event, eventName, attributes);
    fireTrackAnalytics(event, eventName, attributes);
  }
};

export const triggerAnalyticsForInviteMembersSuccess = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  teamId?: string,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({});

    const eventName = `${AnalyticsActionSubject.INVITE_MEMBERS} ${AnalyticsAction.SUCCEEDED}`;
    const attributes = {
      numberOfMembers,
      teamId,
    };

    fireOperationalAnalytics(event, eventName, attributes);
    fireTrackAnalytics(event, eventName, attributes);
  }
};

export const triggerAnalyticsForClickTeamLinkInSuccessFlag = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  teamId?: string,
  numberOfMembers?: number,
) => {
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent({
      action: AnalyticsAction.CLICKED,
      actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    });

    const eventName = `${AnalyticsActionSubject.TEAM_CREATE_DIALOG} ${AnalyticsAction.CLICKED}`;

    fireUIAnalytics(event, eventName, 'teamLinkSuccessFlag', {
      teamId,
      numberOfMembers,
    });
  }
};
