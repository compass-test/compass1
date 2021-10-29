import {
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import {
  createAndFireEvent,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';

import { AnalyticsEventAttributes } from '../TeamCreateDialog/types';

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
  SUBMITED = 'submitted',
}

export enum AnalyticsSource {
  PEOPLE_TEAMS = 'peopleTeams',
}

const ANALYTICS_CHANNEL = 'peopleTeams';
const createAndFireEventOnPeopleTeams = createAndFireEvent(ANALYTICS_CHANNEL);

export const triggerAnalyticsForMemberPickerError = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.MEMBER_PICKER,
    action: AnalyticsAction.ERROR,
    attributes: {
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForViewTeamCreateDialog = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  proposedMembersLength?: number,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: SCREEN_EVENT_TYPE,
    name: 'teamCreateDialog',
    attributes: {
      proposedMembersLength,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForCloseTeamCreateDialog = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    action: AnalyticsAction.CLOSED,
    attributes: {
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForSubmitTeamCreateDialog = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  canCreateTeam?: boolean,
  numberOfMembers?: number,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    action: AnalyticsAction.SUBMITED,
    attributes: {
      canCreateTeam,
      numberOfMembers,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForCreateTeamFailed = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireOperationalEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    action: AnalyticsAction.FAILED,
    attributes: {
      numberOfMembers,
      ...extraAnalyticsAttrs,
    },
  });

  const fireTrackEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    action: AnalyticsAction.FAILED,
    attributes: {
      numberOfMembers,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireOperationalEvent(createAnalyticsEvent);
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForCreateTeamSuccess = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireOperationalEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      numberOfMembers,
      ...extraAnalyticsAttrs,
    },
  });

  const fireTrackEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      numberOfMembers,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireOperationalEvent(createAnalyticsEvent);
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForInviteMembersFailed = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  teamId?: string,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireOperationalEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_MEMBERS,
    action: AnalyticsAction.FAILED,
    attributes: {
      numberOfMembers,
      teamId,
      ...extraAnalyticsAttrs,
    },
  });

  const fireTrackEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_MEMBERS,
    action: AnalyticsAction.FAILED,
    attributes: {
      numberOfMembers,
      teamId,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireOperationalEvent(createAnalyticsEvent);
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForInviteMembersSuccess = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  numberOfMembers?: number,
  teamId?: string,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireOperationalEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_MEMBERS,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      numberOfMembers,
      teamId,
      ...extraAnalyticsAttrs,
    },
  });

  const fireTrackEvent = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_MEMBERS,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      numberOfMembers,
      teamId,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireOperationalEvent(createAnalyticsEvent);
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForClickTeamLinkInSuccessFlag = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  teamId?: string,
  numberOfMembers?: number,
  extraAnalyticsAttrs: AnalyticsEventAttributes = {},
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    source: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_CREATE_DIALOG,
    actionSubjectId: 'teamLinkSuccessFlag',
    action: AnalyticsAction.CLICKED,
    attributes: {
      teamId,
      numberOfMembers,
      ...extraAnalyticsAttrs,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};
