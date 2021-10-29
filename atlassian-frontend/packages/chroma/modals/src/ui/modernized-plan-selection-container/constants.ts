import AdminInsights from './assets/admin-insights.svg';
import AdminKey from './assets/admin-key.svg';
import AgileReporting from './assets/agile-reporting.svg';
import Agile from './assets/agile.svg';
import Analytics from './assets/analytics.svg';
import AnonymousAccess from './assets/anonymous-access.svg';
import AppsAndIntegrations from './assets/apps-and-integrations.svg';
import Apps from './assets/apps.svg';
import ArchiveAndUnarchivePages from './assets/archive-and-unarchive-pages.svg';
import AuditLogs from './assets/audit-logs.svg';
import BigNews from './assets/big-news.svg';
import BulkArchivePages from './assets/bulk-archive-pages.svg';
import CalendarChart from './assets/calendar-chart.svg';
import Changes from './assets/changes.svg';
import Chat from './assets/chat.svg';
import CopySpacePermissions from './assets/copy-space-permissions.svg';
import CustomizableWorkflows from './assets/customizable-workflows.svg';
import FancyChanges from './assets/fancy-changes.svg';
import GlobeNetworkCheck from './assets/globe-network-check.svg';
import Illustration from './assets/illustration.svg';
import IncidentCreation from './assets/incident-creation.svg';
import IncidentManagement from './assets/incident-management.svg';
import IncidentsMicroscope from './assets/incidents-microscope.svg';
import InspectPermissions from './assets/inspect-permissions.svg';
import IpAllowlisting from './assets/ip-allowlisting.svg';
import IphoneBlack from './assets/iphone-black.svg';
import JiraServiceDesk from './assets/jira-service-desk.svg';
import Jira from './assets/jira.svg';
import LargeFileStorage from './assets/large-file-storage.svg';
import LockClosed from './assets/lock-closed.svg';
import Macros from './assets/macros.svg';
import ManageIncidents from './assets/manage-incidents.svg';
import ManageUsers from './assets/manage-users.svg';
import PageInsights from './assets/page-insights.svg';
import PagePermissions from './assets/page-permissions.svg';
import PageVersioning from './assets/page-versioning.svg';
import PlanAndPrepare from './assets/plan-and-prepare.svg';
import PostMortems from './assets/post-mortems.svg';
import Private from './assets/private.svg';
import ProjectArchiving from './assets/project-archiving.svg';
import RealTimeFeedback from './assets/real-time-feedback.svg';
import Releases from './assets/releases.svg';
import ReportingAndAnalytics from './assets/reporting-and-analytics.svg';
import Roadmaps from './assets/roadmaps.svg';
import Scheduling from './assets/scheduling.svg';
import ScrumAndKanban from './assets/scrum-and-kanban.svg';
import SecurityShield from './assets/security-shield.svg';
import ServiceSuccess from './assets/service-success.svg';
import SlaManagement from './assets/sla-management.svg';
import SpacesAndPages from './assets/spaces-and-pages.svg';
import StatusPageBalloons from './assets/status-page-balloons.svg';
import StatusPageLight from './assets/status-page-light.svg';
import StructuredPageTree from './assets/structured-page-tree.svg';
import Support from './assets/support.svg';
import TeamOnboarding from './assets/team-onboarding.svg';
import Templates from './assets/templates.svg';
import TimeSensitiveTicket from './assets/time-sensitive-ticket.svg';
import TrelloPlanning from './assets/trello-planning.svg';

export const featureToImageMap: { [key: string]: string } = {
  userLimits: TeamOnboarding,
  userLimitsJsw: TeamOnboarding,
  agentLimit: TeamOnboarding,
  auditLogs: AuditLogs,
  roadmaps: Roadmaps,
  automationSingleProject: Changes,
  storageJsw: LargeFileStorage,
  storageConfluence: LargeFileStorage,
  storageJsm: LargeFileStorage,
  pageArchiving: ArchiveAndUnarchivePages,
  adminInsightsJsw: Jira,
  adminInsightsConfluence: AdminInsights,
  adminInsightsJsm: AdminInsights,
  backlog: Scheduling,
  advancedRoadmaps: Roadmaps,
  supportJsw: Support,
  supportConfluence: Support,
  supportJsm: Support,
  ipAllowlisting: IpAllowlisting,
  advancedUserPermissionsJsw: Private,
  advancedUserPermissionsConfluence: Private,
  projectArchiving: ProjectArchiving,
  appsAndIntegrationsJsw: AppsAndIntegrations,
  appsAndIntegrationsConfluence: AppsAndIntegrations,
  appsAndIntegrationsJsm: AppsAndIntegrations,
  uptimeSla: StatusPageLight,
  uptimeSlaJsw: StatusPageLight,
  agileReporting: AgileReporting,
  sandboxJsw: TrelloPlanning,
  sandboxConfluence: RealTimeFeedback,
  sandboxJsm: JiraServiceDesk,
  anonymousAccessJsw: AnonymousAccess,
  anonymousAccessConfluence: AnonymousAccess,
  anonymousAccessJsm: AnonymousAccess,
  scrumAndKanbanBoards: Agile,
  customizableWorkflows: CustomizableWorkflows,
  automationMultiProject: Changes,
  issuePermissions: Private,
  projectPermissions: Private,
  customGroupPolicies: Private,
  releaseTracksJsw: Releases,
  releaseTracksConfluence: Releases,
  releaseTracksJsm: Releases,
  macros: Macros,
  pageInsights: PageInsights,
  structuredPageTree: StructuredPageTree,
  bestPracticesTemplates: Templates,
  analytics: Analytics,
  bulkArchivePages: BulkArchivePages,
  externalCollaboration: AnonymousAccess,
  pagePermissions: PagePermissions,
  spacePermissions: Private,
  adminKey: AdminKey,
  inspectPermissions: InspectPermissions,
  copySpacePermissions: CopySpacePermissions,
  pageVersioning: PageVersioning,
  majorIncidentsPerMonth: ManageIncidents,
  postMortems: PostMortems,
  incidentCreation: IncidentCreation,
  alertsNotificationsPerMonth: StatusPageBalloons,
  itServiceManagement: JiraServiceDesk,
  serviceStatusPages: StatusPageLight,
  externalServices: Apps,
  serviceDependency: FancyChanges,
  slaManagement: SlaManagement,
  incidentCommandCenter: Illustration,
  automationAndWorkflows: FancyChanges,
  reportingAndAnalytics: ReportingAndAnalytics,
  monitoringAndChatOpsIntegrations: Chat,
  incidentInvestigation: IncidentsMicroscope,
  majorIncidentAnalytics: IncidentManagement,
  serviceHealthAnalysis: StatusPageBalloons,
  serviceSubscriptions: BigNews,
  unlimitedSpacesAndPages: SpacesAndPages,
  teamCalendars: CalendarChart,
  automation: Changes,
  capacityPlanning: PlanAndPrepare,
  dependencyManagement: ManageUsers,
  advancedUserPermissionsJsm: Private,
  projectRoles: ManageUsers,
  dataResidency: ManageUsers,
  businessContinuity: ServiceSuccess,
  domainVerification: GlobeNetworkCheck,
  encryptionInTransit: LockClosed,
  mobileDeviceManagement: IphoneBlack,
  passwordPolicies: SecurityShield,
  sessionDurationManagement: TimeSensitiveTicket,
};

export const ImagesArray = [
  AdminInsights,
  AdminKey,
  Agile,
  AgileReporting,
  Analytics,
  AnonymousAccess,
  AppsAndIntegrations,
  Apps,
  ArchiveAndUnarchivePages,
  AuditLogs,
  BigNews,
  BulkArchivePages,
  CalendarChart,
  Changes,
  Chat,
  CopySpacePermissions,
  CustomizableWorkflows,
  GlobeNetworkCheck,
  FancyChanges,
  Illustration,
  IncidentCreation,
  IncidentManagement,
  IncidentsMicroscope,
  InspectPermissions,
  IpAllowlisting,
  IphoneBlack,
  JiraServiceDesk,
  Jira,
  LargeFileStorage,
  LockClosed,
  Macros,
  ManageIncidents,
  ManageUsers,
  PageInsights,
  PagePermissions,
  PageVersioning,
  PlanAndPrepare,
  PostMortems,
  Private,
  ProjectArchiving,
  RealTimeFeedback,
  Releases,
  ReportingAndAnalytics,
  Roadmaps,
  Scheduling,
  ScrumAndKanban,
  SecurityShield,
  ServiceSuccess,
  SlaManagement,
  SpacesAndPages,
  StatusPageBalloons,
  StatusPageLight,
  StructuredPageTree,
  Support,
  TeamOnboarding,
  Templates,
  TimeSensitiveTicket,
  TrelloPlanning,
];
