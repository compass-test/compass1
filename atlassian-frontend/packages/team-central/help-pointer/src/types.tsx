export type HelpPointer = {
  /**
   * Icon for this help pointer
   */
  icon?: HelpPointerIcon;
  /**
   * Link to navigate to when clicking on this help pointer
   */
  link: string;
  /**
   * The person/team/department that owns this help pointer
   */
  owner?: HelpPointerOwner;
  /**
   * Title of this help pointer
   */
  name: string;
  /**
   * Description of this help pointer
   */
  description?: string;
  /**
   * If the help pointer is editable
   */
  editable?: boolean;
  /**
   * Any attached tags of this help pointer
   */
  tags?: HelpPointerTag[];
  /**
   * Type of help pointer
   */
  type: HelpPointerType;
  /**
   * Internal ID of the help pointer. Required for editing / deleting and as react key.
   */
  pointerId: string;
  /**
   * Cloud ID of the help pointer. Required for retrieving / creating tags in the editor.
   */
  cloudId: string;
};

export type HelpPointerSearchTerms = {
  query?: string;
  tags?: HelpPointerTag[];
};

export type HelpPointerIcon = {
  /**
   * Background color of the icon in HEX format
   */
  color: string;
  /**
   * Emoji id and shortName
   */
  id?: string;
  shortName: string;
};

export enum HelpPointerType {
  Action = 'ACTION',
  Information = 'INFORMATION',
}

export type HelpPointerTag = {
  uuid: string;
  name: string;
  usage?: TagUsage;
};

export type TagUsage = {
  projects: number;
  goals: number;
  helpLinks: number;
};

export type HelpPointerOwner = {
  displayName: string;
  id: string;
  avatarUrl?: string;
};

export type HelpPointerActionModalProps = {
  close: () => void;
  target: HelpPointer;
};

export type HelpPointerOperations = {
  renderRemoveModal?: (prop: HelpPointerActionModalProps) => JSX.Element;

  renderEditModal?: (prop: HelpPointerActionModalProps) => JSX.Element;
};

export type LinkAnalyticsAttributes = {
  titleLength: number;
  descriptionLength: number;
  type?: string;
  numTagsMatchingSearch?: number;
  totalTags?: number;
  teamId?: string;
};
