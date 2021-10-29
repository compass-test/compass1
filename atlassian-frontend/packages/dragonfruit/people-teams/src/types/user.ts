export enum UserPrivacyLevel {
  private = 'private',
  domain = 'domain',
  public = 'public',
}

export enum UserStatus {
  active = 'active',
  inactive = 'inactive',
  closed = 'closed',
}

export interface UserPrivacy {
  level: UserPrivacyLevel;
  domain: string;
  isBlacklistedDomain: boolean;
}

export interface User {
  id: string;
  isCurrentUser?: boolean;
  fullName: string;
  nickname?: string;
  email?: string;
  title?: string;
  timezone?: string;
  localTime?: string;
  locale?: string;
  preferredLanguage?: string;
  location?: string;
  companyName?: string;
  department?: string;
  position?: string;
  avatarUrl?: string;
  headerImageUrl?: string;
  privacy?: UserPrivacy;
  status?: UserStatus;
  statusModifiedDate?: number;
  isBot?: boolean;
  isNotMentionable?: boolean;
  phoneNumber?: string;
  collaborationGraphScore?: number;
}

// The minimal user required to invited someone
export type InvitedUser = Pick<
  User,
  'id' | 'email' | 'fullName' | 'nickname' | 'avatarUrl'
>;
