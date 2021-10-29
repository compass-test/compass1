import { Flag, Product, Team } from '../../types';
import { InvitedUser } from '../../types/user';

export interface TeamCreateDialogBaseProps {
  // cloudId
  cloudId: string;
  // orgId
  orgId: string;
  // product name
  product: Product;
  /** account identifiers of the proposed members of the team (can be edited by the user). Can be optional because of the way this dialog is instantiated */
  proposedMembers?: InvitedUser[];
  // User Id of current logged-in user
  principalId: string;
  // maximum number of members in member select
  maxSelectedMembers?: number;
  // A callback when the dialog is closed
  onClose?: () => void;
  // Will remove the blanket tinted background color.
  isBlanketHidden?: boolean;
}

export interface TeamCreateDialogInternalProps
  extends TeamCreateDialogBaseProps {
  // A callback to create team data
  createTeamAndAddMembers: (
    teamName: string,
    selectedMembers: InvitedUser[],
  ) => void;
  // A boolean to control state of creating team dialog
  isFetching?: boolean;
}

export interface TeamCreateDialogProps extends TeamCreateDialogBaseProps {
  // A callback when creating team successfully. Consumers can hook on this to show a flag
  onCreateTeamSuccess?: (teamData: Team, invitedMembers: InvitedUser[]) => void;
  // A callback when creating team failed. Consumers can hook on this to show a flag
  onCreateTeamFailed?: (error: Error, invitedMembers: InvitedUser[]) => void;
  // A callback when inviting members succeeds
  onInviteMembersSuccess?: (
    teamData: Team,
    invitedMembers: InvitedUser[],
  ) => void;
  // A callback when inviting members fails
  onInviteMembersFailed?: (
    teamData: Team,
    invitedMembers: InvitedUser[],
    error: Error,
  ) => void;
  /**
   * A callback is used to render flag inside product.
   * For example, we want to show a error flag when creating team failed
   */
  addFlag?: (flag: Flag) => void;
  /**
   * A push function of router is used to redirect to people page or team page or search people/teams home page
   */
  pushRoute?: (path: string) => void;
}
