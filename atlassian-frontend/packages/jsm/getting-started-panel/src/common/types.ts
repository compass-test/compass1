import { VisibilityState } from './services/visibility';

export enum ActiveState {
  On = 'on',
  Off = 'off',
}

export enum VisualState {
  Lozenge = 'lozenge',
  FullPanel = 'full-panel',
}

export enum Product {
  ServiceDesk = 'serviceDesk',
  Opsgenie = 'opsgenie',
}

// This matches the envType in @atlassian-sox/analytics-web-client
export enum Environment {
  Local = 'local',
  Dev = 'dev',
  Staging = 'staging',
  Prod = 'prod',
}

export enum GspSectionKey {
  Checklist = 'checklist',
  ProductTours = 'productTours',
  Home = 'home',
}

export enum ChecklistTabKey {
  Basics = 'basics',
  Incidents = 'incidents',
  Changes = 'changes',
}

export enum ProductTourKey {
  Welcome = 'welcome',
  IncidentManagement = 'incident-management',
  ChangeManagement = 'change-management',
}

export enum HeaderState {
  Minimized = 'minimized',
  Expanded = 'expanded',
}

export enum TaskId {
  CreateItsmProject = 'servicedesk-itsm-project-created',
  CustomizePortal = 'servicedesk-portal-name-customized',
  AddPortalLogo = 'servicedesk-logo-added-to-portal',
  SetupEmailRequests = 'servicedesk-email-requests-setup',
  SetupServices = 'servicedesk-services-setup',
  AddTeamMember = 'servicedesk-team-member-added',
  GoBeyondBasics = 'servicedesk-basics-documentation-accessed',
  ConnectCiCdPipeline = 'servicedesk-change-management-pipeline-connected',
  AddChangeApprovers = 'servicedesk-change-management-change-approvers-added',
  TurnOnAutomationRules = 'servicedesk-change-management-automation-rules-on',
  MakeTheMostOfChangeManagement = 'servicedesk-change-management-documentation-accessed',
  SetupProfileForNotifications = 'opsgenie-user-profile-notifications-setup',
  SetupTeam = 'opsgenie-response-team-setup',
  AssignOwnerTeamToServices = 'opsgenie-owner-team-assigned-to-service',
  LevelUpIncidentManagement = 'opsgenie-incident-management-documentation-accessed',
}

export const BasicsTaskIds = [
  TaskId.CreateItsmProject,
  TaskId.CustomizePortal,
  TaskId.AddPortalLogo,
  TaskId.SetupEmailRequests,
  TaskId.SetupServices,
  TaskId.AddTeamMember,
  TaskId.GoBeyondBasics,
];

export const ChangesTaskIds = [
  TaskId.ConnectCiCdPipeline,
  TaskId.AddChangeApprovers,
  // Not needed for GA release
  // TaskId.TurnOnAutomationRules,
  TaskId.MakeTheMostOfChangeManagement,
];

export const IncidentsTaskIds = [
  TaskId.SetupProfileForNotifications,
  TaskId.SetupTeam,
  TaskId.AssignOwnerTeamToServices,
  TaskId.LevelUpIncidentManagement,
];

export interface ChecklistTab {
  activeTask: TaskId | undefined;
}

export interface Checklist {
  headerState: HeaderState;
  activeTab: ChecklistTabKey;
  tabs: {
    basics: ChecklistTab;
    incidents: ChecklistTab;
    changes: ChecklistTab;
  };
}

export interface ProductTours {
  headerState?: HeaderState;
  activeTour: ProductTourKey | string;
}

export interface SectionState {
  version: number;
  activeSection: GspSectionKey | undefined;
  sections: {
    checklist: Checklist;
    productTours: ProductTours;
    documentation?: { activeItem: string };
  };
}

export enum HasSeenReopenSpotlight {
  Yes = 'yes',
  No = 'no',
}

export enum ContainerType {
  Project = 'project',
}

export enum ExplicitStringBoolean {
  Yes = 'yes',
  No = 'no',
}

export interface ContainerProperties {
  containerType: ContainerType;
  containerId: string;
  properties: {
    projectDeleted?: ExplicitStringBoolean;
  };
}

export interface GspState {
  completedItems: TaskId[];
  properties: {
    containers: ContainerProperties[];
    user: {
      sectionState: string;
      activeState: ActiveState;
      visualState: VisualState;
      projectId?: string;
      hasSeenReopenSpotlight: HasSeenReopenSpotlight;
    } & VisibilityState;
    workspace?: VisibilityState;
  };
}

export enum PropertyKey {
  VisualState = 'visualState',
  ActiveState = 'activeState',
  SectionState = 'sectionState',
  HasSeenReopenSpotlight = 'hasSeenReopenSpotlight',
}

export interface Property {
  key: PropertyKey;
  value: string;
}

// Temporary solution as we don't have types in @atlassian-sox/analytics-web-client
export interface Tenant {
  type: string;
  id: string;
}

export interface User {
  type: string;
  id: string;
}

export interface UrlData {
  serviceDeskBaseUrl: string;
  opsgenieBaseUrl: string;
  projectId: string;
  projectKey?: string;
  onTaskComplete: (id: TaskId) => void;
  onSpaRedirect?: (url: string) => void;
  onOpenInProductHelpArticle?: (articleId: string) => void;
  product: Product;
}
