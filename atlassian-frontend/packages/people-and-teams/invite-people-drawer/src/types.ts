import type { InvitePeopleProps } from '@atlassian/invite-people';

export interface InvitePeopleDrawerProps {
  testId?: string;
  addFlag?: GenericShowFlag<any>;
  userRole?: UserRole;
  enableInviteInviteeList?: boolean;
  enableCustomizedProductSelect?: boolean;
  product: string;
  subProduct?: SubProduct;
  cloudId: string;
  isOpen?: boolean;
  onCloseHandler?: () => void;
  continueUrl?: string;
  source?: string;
  jiraProjectName?: string;
  jiraProjectKey?: string;
  enableThirdParty?: boolean;
  thirdPartyInvitesCohort?: InvitePeopleProps['thirdPartyInvitesCohort'];
  thirdPartyApiV2?: boolean;
  thirdPartySlackv2Enabled?: boolean;
  userRecommendationsCohort?: InvitePeopleProps['userRecommendationsCohort'];
  viralSettingsCohort?: InvitePeopleProps['viralSettingsCohort'];
  viralOptionsDefaultToCheckedFeatureFlag?: InvitePeopleProps['viralOptionsDefaultToCheckedFeatureFlag'];
  invitePeopleDrawerMigrationCohort?: InvitePeopleProps['invitePeopleDrawerMigrationCohort'];
}

export enum AnalyticsActionSubject {
  BUTTON = 'button',
  FEATURE = 'feature',
}

export enum AnalyticsAction {
  CLICKED = 'clicked',
  EXPOSED = 'exposed',
}

export enum AnalyticsSource {
  ADD_PEOPLE_DRAWER = 'addPeopleDrawer',
}

export interface GenericShowFlag<T> {
  (arg: T): T;
}

export type UserRole = 'admin' | 'trusted' | 'basic';

export type SubProduct = 'core' | 'software' | 'servicedesk';
