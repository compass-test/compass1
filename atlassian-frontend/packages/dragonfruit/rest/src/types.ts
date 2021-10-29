import { FetchableServiceState } from '@atlassian/dragonfruit-utils';

export type TeamDetails = {
  id: string;
  displayName: string;
  description: string;
  largeAvatarImageUrl: string;
  largeHeaderImageUrl: string;
  smallAvatarImageUrl: string;
  smallHeaderImageUrl: string;
  organizationId: string;
  permission: string;
  restriction: string;
  state: string;
  membershipSettings?: TeamMembershipSettings;
};

export enum TeamMembershipSettings {
  OPEN = 'OPEN',
  MEMBER_INVITE = 'MEMBER_INVITE',
  ADMIN_INVITE = 'ADMIN_INVITE',
}

export type TeamsSearchResponse = TeamDetails[];

export type TeamMember = {
  accountId: string;
  name: string;
  picture: string;
};

export type UseGetTeamMembersResponse = {
  data: TeamMember[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
  errorCode: number | undefined;
};

export type TeamsMembershipResponse = {
  entities: {
    membershipId: {
      teamId: string;
      memberId: string;
    };
    state: 'REQUESTING_TO_JOIN' | 'INVITED' | 'FULL_MEMBER' | 'ALUMNI';
    role: 'REGULAR' | 'ADMIN';
  }[];
  cursor: null;
};

export type UsersQueryResponse = {
  users: TeamMember[];
};

export type UsersQueryVariables = {
  accountIds: string[];
};

export type TeamsListResult = FetchableServiceState<TeamDetails[]>;
