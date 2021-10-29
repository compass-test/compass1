// raw data is returned from Legion API
export interface RawTeamData {
  cursor: string;
  entities: Pick<Team, 'teamAri' | 'displayName' | 'smallHeaderImageUrl'>[];
}

export enum TeamState {
  ACTIVE = 'ACTIVE',
  DISBANDED = 'DISBANDED',
  PURGED = 'PURGED',
}

export enum TeamMembershipSettings {
  OPEN = 'OPEN',
}

export enum TeamDiscoverability {
  DISCOVERABLE = 'DISCOVERABLE',
}

export enum TeamRestriction {
  ORG_MEMBERS = 'ORG_MEMBERS',
  NO_RESTRICTION = 'NO_RESTRICTION',
}

export enum TeamPermission {
  FULL_WRITE = 'FULL_WRITE',
  FULL_READ = 'FULL_READ',
  NONE = 'NONE', // Note: Should never see this, as UI should get a 404 instead. Included for completeness.
}

export interface TeamAvatarImage {
  // new avatar group
  largeAvatarImageUrl?: string;
  smallAvatarImageUrl?: string;
  largeHeaderImageUrl?: string;
  smallHeaderImageUrl?: string;
}

export interface Team extends TeamAvatarImage {
  id: string;
  teamAri?: string;
  displayName: string;
  description: string;
  state: TeamState;
  membershipSettings: TeamMembershipSettings;
  discoverable: TeamDiscoverability;
  organizationId?: string;
  restriction: TeamRestriction;
  creatorId?: string;
  permission?: TeamPermission;
  creatorDomain?: string;
  memberIds?: string[];
}

// a data returned by creating a new team endpoint
export type CreatedTeamData = Pick<
  Team,
  | 'id'
  | 'displayName'
  | 'permission'
  | 'description'
  | 'state'
  | 'membershipSettings'
  | 'discoverable'
  | 'organizationId'
  | 'restriction'
  | 'creatorId'
  | 'creatorDomain'
> & {
  headerImageId?: string;
};

// a data returned by inviting team member
export type Membership = {
  membershipId: {
    teamId: string;
    memberId: string;
  };
  state: 'FULL_MEMBER' | string;
  role: 'REGULAR' | string;
};
