import type { InvitePeopleProps } from '@atlassian/invite-people';
import type { Flag } from '@atlassian/people-teams/types';
export type Product = 'confluence' | 'jira' | 'directory';

export type SubProduct = 'core' | 'software' | 'servicedesk';

export type ErrorWithStatus = Error & {
  status?: number;
};

export interface PeopleMenuProps {
  // Product name which renders Navigation 3 with People menu.
  product: Product;
  // sub-product name
  subProduct?: SubProduct;
  // Cloud id (also known as tenant id) which is used to fetch users/collaborators in the same site.
  cloudId: string;
  // Organization ID. PTC team is experiemnting Team Creation inside an org so the `orgId` prop is optional for now.
  orgId?: string;
  // Tenant URL is used to test fetching data from a real staging instance.
  tenantUrl?: string;
  // Current logged-in user id which is used to know context of fetching data.
  userId: string;
  // A callback when users click on "View all people and teams" menu item.
  onClickViewPeopleDirectoryLink?: () => void;
  // A callback when users click on "Start a team" menu item to open Create Team Dialog.
  onClickCreateNewTeam?: () => void;
  // A handler when clicking on People primary menu
  onClick?: (isMenuOpen: boolean) => void;
  // A handler when clicking on People or Team menu item
  onClickedItem?: (id: string, type: 'people' | 'team') => void;
  // A callback to open People Menu so that consumers can pass new isOpen value to PeopleMenu.
  onOpen: () => void;
  // A callback to close People Menu so that consumers can pass new isOpen value to PeopleMenu.
  onClose: () => void;
  // A boolean value to control status of People Menu.
  isOpen: boolean;
  /**
   * Will set the appearance of the button to look highlighted.
   */
  isHighlighted?: boolean;
  /**
   * Used to provide a replacement chevron icon for when the dropdown is inside the More dropdown.
   */
  customChevronIcon?: React.ReactNode;
  /**
   * A function providing a promise to indicate whether browse user permissions are enabled.
   * If nothing is provided it will be assumed that the user has this permission.
   * If the promise returns false then a simplified view will be rendered containing only a link
   * for the user to view their own profile.
   */
  isBrowseUsersEnabled?: () => Promise<boolean>;
  /**
   * A push function of router is used to redirect to people page or team page or search people/teams home page.
   */
  pushRoute?: (path: string) => void;
  /**
   * A callback is used to render flag inside product.
   * For example, we want to show a success flag when creating team successfully.
   */
  addFlag?: (flag: Flag) => void;

  /**
   * To show the "Invitee List" (single field that can accept multiple email addresses)
   * on the invite-people modal.
   */
  enableInviteInviteeList?: boolean;
  // Use customised product selector
  enableCustomizedProductSelect?: boolean;
  // Role of the current logged-in user. This can be 'admin', 'basic' or 'trusted'.
  userRole?: 'basic' | 'admin' | 'trusted';
  /**
   * A `testId` prop is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
  // We use this prop to test robot screen inside People menu and you should not use in production.
  _hasError?: boolean;
  // Enable pre-fetching data when hovering the People primary button.
  enablePreFetchingByHovering?: boolean;
  // Indicate whether the People Menu is being rendered server-side
  isSSR?: boolean;
  // Indicate whether to enable third party invites in invite-people drawer/modal.
  enableThirdPartyInvites?: boolean;
  // cohort value for third party invites feature in invite-people
  thirdPartyInvitesCohort?: 'experiment' | 'control' | 'not-enrolled';
  // Control use of v2 EXUS apis
  thirdPartyApiV2?: boolean;
  // Enable Slack v2 using PI APIs and slack authentication
  thirdPartySlackv2Enabled?: boolean;
  // cohort value for user recommendations
  userRecommendationsCohort?: InvitePeopleProps['userRecommendationsCohort'];
  // cohort value for viral settings feature in invite-people
  viralSettingsCohort?: 'variation' | 'control' | 'not-enrolled';
  // Viral options default to checked feature flag data
  viralOptionsDefaultToCheckedFeatureFlag?: InvitePeopleProps['viralOptionsDefaultToCheckedFeatureFlag'];
  // cohort value for invite people drawer migration for invite-people in people menu
  invitePeopleDrawerMigrationCohort?: 'variation' | 'control' | 'not-enrolled';
  /**
   * Since People Menu will do lazy-load i18n messages,
   * so People Menu should receive translated "People" text from product to prevent UI flick while downloading i18n message file.
   */
  peopleText?: string;
  /**
   * Initial state for PeopleMenuDrawer.
   * Default state is false (closed)
   */
  invitePeopleInitState?: boolean;
}

export type PeopleMenuContextProps = Pick<
  PeopleMenuProps,
  | 'product'
  | 'subProduct'
  | 'cloudId'
  | 'orgId'
  | 'tenantUrl'
  | 'userId'
  | 'onClickViewPeopleDirectoryLink'
  | 'onClickCreateNewTeam'
  | 'onClickedItem'
  | 'isBrowseUsersEnabled'
  | 'isSSR'
  | 'testId'
  | 'pushRoute'
  | 'enableInviteInviteeList'
  | 'enableCustomizedProductSelect'
  | 'enableThirdPartyInvites'
  | 'thirdPartyInvitesCohort'
  | 'thirdPartyApiV2'
  | 'thirdPartySlackv2Enabled'
  | 'userRecommendationsCohort'
  | 'viralSettingsCohort'
  | 'viralOptionsDefaultToCheckedFeatureFlag'
  | 'invitePeopleDrawerMigrationCohort'
  | 'userRole'
  | 'addFlag'
  | '_hasError'
> & {
  userRole?: 'basic' | 'admin' | 'trusted';
  isPeopleMenuOpen: boolean;
  isInvitePeopleModalOpen: boolean;
  toggleInvitePeopleModal?: (isOpen: boolean) => void;
  togglePeopleMenu?: (isOpen: boolean) => void;
  toggleTeamCreateDialog?: (isOpen: boolean) => void;
  /**
   * Initial state for PeopleMenuDrawer.
   * Default state is false (closed)
   */
  invitePeopleInitState?: boolean;
};
