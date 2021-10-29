import { defineMessages } from 'react-intl';

const PACKAGE_NAME = 'plans-table';
const FEATURE_NAME = 'feature-name';
const EDITION_FREE = 'edition-free';
const EDITION_STANDARD = 'edition-standard';
const EDITION_PREMIUM = 'edition-premium';

export const categoryMessages = defineMessages({
  siteEssentials: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.site-essentials`,
    defaultMessage: 'Site Essentials',
    description: 'Header name for the "Site Essentials" section',
  },
  advanceFeatures: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.advance-features`,
    defaultMessage: 'Advanced Product Features',
    description: 'Header name for the "Advance Features" section',
  },
  adminControls: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.admin-controls`,
    defaultMessage: 'Admin Controls',
    description: 'Header name for the "Admin Controls" section',
  },
  securityCompliance: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.security-compliance`,
    defaultMessage: 'Security & Compliance',
    description: 'Header name for the "Security Compliance" section',
  },
  coreFeatures: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.core-features`,
    defaultMessage: 'Core Features',
    description: 'Header name for the "Core Features" section',
  },
});

export const featureNameMessages = defineMessages({
  userLimit: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.user-limit`,
    defaultMessage: 'User limit',
    description: 'Feature name for the "User limit" feature',
  },
  storage: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.storage`,
    defaultMessage: 'Storage',
    description: 'Feature name for the "Storage" feature',
  },
  support: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.support`,
    defaultMessage: 'Support',
    description: 'Feature name for the "Support" feature',
  },
  pagePermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.page-permissions`,
    defaultMessage: 'Page permissions',
    description: 'Feature name for the "Page permissions" feature',
  },
  spacePermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.space-permissions`,
    defaultMessage: 'Space permissions',
    description: 'Feature name for the "Space permissions" feature',
  },
  advancedPermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.advanced-permissions`,
    defaultMessage: 'Advanced permissions',
    description: 'Feature name for the "Advanced permissions" feature',
  },
  anonymousAccess: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.anonymous-access`,
    defaultMessage: 'Anonymous access',
    description: 'Feature name for the "Anonymous access" feature',
  },
  pageInsights: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.page-insights`,
    defaultMessage: 'Page insights',
    description: 'Feature name for the "Page insights" feature',
  },
  auditLogs: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.audit-logs`,
    defaultMessage: 'Audit logs',
    description: 'Feature name for the "Audit logs" feature',
  },
  pageArchiving: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.page-archiving`,
    defaultMessage: 'Page archiving',
    description: 'Feature name for the "Page archiving" feature',
  },
  unlimitedSpacesAndPages: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.unlimited-spaces-and-pages`,
    defaultMessage: 'Unlimited spaces & pages',
    description: 'Feature name for the "Unlimited spaces & pages" feature',
  },
  macros: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.macros`,
    defaultMessage: 'Macros',
    description: 'Feature name for the "Macros" feature',
  },
  structuredPageTree: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.structured-page-tree`,
    defaultMessage: 'Structured page tree',
    description: 'Feature name for the "Structured page tree" feature',
  },
  pageVersioning: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.page-versioning`,
    defaultMessage: 'Page versioning',
    description: 'Feature name for the "Page versioning" feature',
  },
  bestPracticesTemplates: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.best-practices-templates`,
    defaultMessage: 'Best practices templates',
    description: 'Feature name for the "Best practices templates" feature',
  },
  appsAndIntegrations: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.apps-and-integrations`,
    defaultMessage: 'Apps and integrations',
    description: 'Feature name for the "Apps and integrations" feature',
  },
  externalCollaboration: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.external-collaboration`,
    defaultMessage: 'External collaboration',
    description: 'Feature name for the "External collaboration" feature',
  },
  analytics: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.analytics`,
    defaultMessage: 'Analytics',
    description: 'Feature name for the "Analytics" feature',
  },
  bulkArchivePages: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.bulk-archive-pages`,
    defaultMessage: 'Bulk archive pages',
    description: 'Feature name for the "Bulk archive pages" feature',
  },
  teamCalendars: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.team-calendars`,
    defaultMessage: 'Team calendars',
    description: 'Feature name for the "Team calendars" feature',
  },
  inspectPermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.inspect-permissions`,
    defaultMessage: 'Inspect permissions',
    description: 'Feature name for the "Inspect permissions" feature',
  },
  copySpacePermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.copy-space-permissions`,
    defaultMessage: 'Copy space permissions',
    description: 'Feature name for the "Copy space permissions" feature',
  },
  adminKey: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.admin-key`,
    defaultMessage: 'Admin key',
    description: 'Feature name for the "Admin key" feature',
  },
  adminInsights: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.admin-insights`,
    defaultMessage: 'Admin insights',
    description: 'Feature name for the "Admin insights" feature',
  },
  ipAllowlisting: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.ip-allowlisting`,
    defaultMessage: 'IP allowlisting',
    description: 'Feature name for the "IP allowlisting" feature',
  },
  sandbox: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.sandbox`,
    defaultMessage: 'Sandbox',
    description: 'Feature name for the "Sandbox" feature',
  },
  releaseTracks: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.release-tracks`,
    defaultMessage: 'Release tracks',
    description: 'Feature name for the "Release tracks" feature',
  },
  uptimeSla: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.uptime-sla`,
    defaultMessage: 'Guaranteed Uptime SLA',
    description: 'Feature name for the "Uptime SLA" feature',
  },
  projectPermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.project-permissions`,
    defaultMessage: 'Project permissions',
    description: 'Feature name for the "Project permissions" feature',
  },
  issuePermissions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.issue-permissions`,
    defaultMessage: 'Issue permissions',
    description: 'Feature name for the "Issue permissions" feature',
  },
  customGroupPolicies: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.custom-group-policies`,
    defaultMessage: 'Custom group policies',
    description: 'Feature name for the "Custom group policies" feature',
  },
  scrumAndKanbanBoards: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.scrum-and-kanban-boards`,
    defaultMessage: 'Scrum and Kanban boards',
    description: 'Feature name for the "Scrum and Kanban boards" feature',
  },
  backlog: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.backlog`,
    defaultMessage: 'Backlog',
    description: 'Feature name for the "Backlog" feature',
  },
  roadmaps: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.roadmaps`,
    defaultMessage: 'Roadmaps',
    description: 'Feature name for the "Roadmaps" feature',
  },
  agileReporting: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.agile-reporting`,
    defaultMessage: 'Agile reporting',
    description: 'Feature name for the "Agile reporting" feature',
  },
  customizableWorkflows: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.customizable-workflows`,
    defaultMessage: 'Customizable workflows',
    description: 'Feature name for the "Customizable workflows" feature',
  },
  capacityPlanning: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.capacity-Planning`,
    defaultMessage: 'Capacity planning',
    description: 'Feature name for the "Capacity planning" feature',
  },
  dependencyManagement: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.dependency-management`,
    defaultMessage: 'Dependency management',
    description: 'Feature name for the "Dependency management" feature',
  },
  automation: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.automation`,
    defaultMessage: 'Automation',
    description: 'Feature name for the "Automation" feature',
  },
  automationMultiProject: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.automation-multi-project`,
    defaultMessage: 'Automation (multi-project)',
    description: 'Feature name for the "Automation (multi-project)" feature',
  },
  advancedRoadmaps: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.advanced-roadmaps`,
    defaultMessage: 'Advanced roadmaps',
    description: 'Feature name for the "Advanced roadmaps" feature',
  },
  projectArchiving: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.project-archiving`,
    defaultMessage: 'Project archiving',
    description: 'Feature name for the "Project archiving" feature',
  },
  agentLimit: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.agent-limit`,
    defaultMessage: 'Agent limit',
    description: 'Feature name for the "Agent limit" feature',
  },
  majorIncidentsPerMonth: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.major-incidents-per-month`,
    defaultMessage: 'Major incidents per month',
    description: 'Feature name for the "Major incidents per month" feature',
  },
  postMortems: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.post-mortems`,
    defaultMessage: 'Post-mortems',
    description: 'Feature name for the "Post-mortems" feature',
  },
  incidentCreation: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.incident-creation`,
    defaultMessage: 'Incident creation',
    description: 'Feature name for the "Incident creation" feature',
  },
  monthlyAlertsAndNotifications: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.monthly-alerts-and-notifications`,
    defaultMessage: 'Monthly alerts and notifications',
    description:
      'Feature name for the "Monthly alerts and notifications" feature',
  },
  itServiceManagement: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.it-service-management`,
    defaultMessage: 'IT service management',
    description: 'Feature name for the "IT service management" feature',
  },
  serviceStatusPages: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.service-status-pages`,
    defaultMessage: 'Service status pages',
    description: 'Feature name for the "Service status pages" feature',
  },
  serviceDependency: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.service-dependency`,
    defaultMessage: 'Service dependency',
    description: 'Feature name for the "Service dependency" feature',
  },
  slaManagement: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.sla-management`,
    defaultMessage: 'SLA management',
    description: 'Feature name for the "SLA management" feature',
  },
  automationAndWorkflows: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.automation-and-workflows`,
    defaultMessage: 'Automation and workflows',
    description: 'Feature name for the "Automation and workflows" feature',
  },
  reportingAndAnalytics: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.reporting-and-analytics`,
    defaultMessage: 'Reporting and analytics',
    description: 'Feature name for the "Reporting and analytics" feature',
  },
  monitoringAndChatOpsIntegrations: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.monitoring-and-chatops-integrations`,
    defaultMessage: 'Monitoring & ChatOps Integrations',
    description:
      'Feature name for the "Monitoring & ChatOps Integrations" feature',
  },
  incidentCommandCenter: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.incident-command-center`,
    defaultMessage: 'Incident command center',
    description: 'Feature name for the "Incident command center" feature',
  },
  incidentInvestigation: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.incident-investigation`,
    defaultMessage: 'Incident investigation',
    description: 'Feature name for the "Incident investigation" feature',
  },
  majorIncidentAnalytics: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.major-incident-analytics`,
    defaultMessage: 'Major incident analytics',
    description: 'Feature name for the "Major incident analytics" feature',
  },
  globalAutomation: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.global-automation`,
    defaultMessage: 'Global automation',
    description: 'Feature name for the "Global automation" feature',
  },
  serviceSubscriptions: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.service-subscriptions`,
    defaultMessage: 'Service subscriptions',
    description: 'Feature name for the "Service subscriptions" feature',
  },
  externalServices: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.external-services`,
    defaultMessage: 'External services',
    description: 'Feature name for the "External services" feature',
  },
  serviceHealthAnalysis: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.service-health-analysis`,
    defaultMessage: 'Service health analysis',
    description: 'Feature name for the "Service health analysis" feature',
  },
  projectRoles: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.project-roles`,
    defaultMessage: 'Project roles',
    description: 'Feature name for the "Project roles" feature',
  },
  dataResidency: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.data-residency`,
    defaultMessage: 'Data residency',
    description: 'Feature name for the "Data residency" feature',
  },
  businessContinuityDisasterRecovery: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.business-continuity-disaster-recovery`,
    defaultMessage: 'Business continuity & disaster recovery',
    description:
      'Feature name for the "Business continuity & disaster recovery" feature',
  },
  domainVerificationAccountCapture: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.domain-verification-account-capture`,
    defaultMessage: 'Domain verification & account capture',
    description:
      'Feature name for the "Domain verification & account capture" feature',
  },
  encryption: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.encryption`,
    defaultMessage: 'Encryption in-transit & at-rest',
    description:
      'Feature name for the "Encryption in-transit & at-rest" feature',
  },
  mobileDeviceManagement: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.mobile-device-management`,
    defaultMessage: 'Mobile device management',
    description: 'Feature name for the "Mobile device management" feature',
  },
  passwordPolicies: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.password-policies`,
    defaultMessage: 'Password policies',
    description: 'Feature name for the "Password policies" feature',
  },
  sessionDurationManagement: {
    id: `${PACKAGE_NAME}.${FEATURE_NAME}.session-duration-management`,
    defaultMessage: 'Session duration management',
    description: 'Feature name for the "Session duration management" feature',
  },
});

export const freeEditionMessages = defineMessages({
  userLimit: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.user-limit`,
    defaultMessage: 'Up to 10 users',
    description:
      'Free edition feature description for the "User limit" feature',
  },
  agentLimit: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.agent-limit`,
    defaultMessage: '3 agents',
    description:
      'Free edition feature description for the "Agent limit" feature',
  },
  storage: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.storage`,
    defaultMessage: '2 GB',
    description: 'Free edition feature description for the "Storage" feature',
  },
  support: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.support`,
    defaultMessage: 'Community Support',
    description: 'Free edition feature description for the "Support" feature',
  },
  majorIncidentsPerMonth: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.major-incidents-per-month`,
    defaultMessage: '5',
    description:
      'Free edition feature description for the "Major incidents per month" feature',
  },
  postMortems: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.post-mortems`,
    defaultMessage: '5',
    description:
      'Free edition feature description for the "Post mortems" feature',
  },
  incidentCreation: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.incident-creation`,
    defaultMessage: 'Manual',
    description:
      'Free edition feature description for the "Incident creation" feature',
  },
  monthlyAlertsAndNotifications: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.monthly-alerts-and-notifications`,
    defaultMessage: '200 SMS and unlimited email',
    description:
      'Free edition feature description for the "Monthly alerts and notifications" feature',
  },
  basicFeature: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.basic-feature`,
    defaultMessage: 'Basic',
    description: 'Free edition feature description for the "Basic" feature',
  },
  freeAutomation: {
    id: `${PACKAGE_NAME}.${EDITION_FREE}.free-automation`,
    defaultMessage: 'Single project',
    description:
      'Free edition feature description for the "Automation" feature',
  },
});

export const standardEditionMessages = defineMessages({
  userLimitTitle: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.user-limit.title`,
    defaultMessage: 'Up to 20,000 users',
    description: 'Standard edition feature title for the "User limit" feature',
  },
  userLimitSubtitle: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.user-limit.subtitle`,
    defaultMessage: 'Up to 20,000 users',
    description:
      'Standard edition feature subtitle for the "User limit" feature',
  },
  agentLimitTitle: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.agent-limit.title`,
    defaultMessage: 'Full team',
    description: 'Standard edition feature title for the "Agent limit" feature',
  },
  agentLimitSubtitle: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.agent-limit.subtitle`,
    defaultMessage: 'Up to 5,000 agents',
    description:
      'Standard edition feature subtitle for the "Agent limit" feature',
  },
  storage: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.storage`,
    defaultMessage: '250 GB',
    description:
      'Standard edition feature description for the "Storage" feature',
  },
  support: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.support`,
    defaultMessage: 'Local Business Hours',
    description:
      'Standard edition feature description for the "Support" feature',
  },
  jsmSupport: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.jsm-support`,
    defaultMessage: '9-5 export support',
    description:
      'Standard edition feature description for the "Support" feature specific to JSM',
  },
  majorIncidentsPerMonth: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.major-incidents-per-month`,
    defaultMessage: '100',
    description:
      'Standard edition feature description for the "Major incidents per month" feature',
  },
  postMortems: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.post-mortems`,
    defaultMessage: '5',
    description:
      'Standard edition feature description for the "Post mortems" feature',
  },
  incidentCreation: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.incident-creation`,
    defaultMessage: 'Manual',
    description:
      'Standard edition feature description for the "Incident creation" feature',
  },
  monthlyAlertsAndNotifications: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.monthly-alerts-and-notifications`,
    defaultMessage: 'Unlimited SMS and email',
    description:
      'Standard edition feature description for the "Monthly alerts and notifications" feature',
  },
  basicFeature: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.basic-feature`,
    defaultMessage: 'Basic',
    description: 'Standard edition feature description for the "Basic" feature',
  },
  standardAutomation: {
    id: `${PACKAGE_NAME}.${EDITION_STANDARD}.standard-automation`,
    defaultMessage: 'Single project',
    description:
      'Standard edition feature description for the "Automation" feature',
  },
});

export const premiumEditionMessages = defineMessages({
  userLimitTitle: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.user-limit.title`,
    defaultMessage: 'Up to 20,000 users',
    description: 'Premium edition feature title for the "User limit" feature',
  },
  userLimitSubtitle: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.user-limit.subtitle`,
    defaultMessage: 'Up to 10,000 users',
    description:
      'Premium edition feature subtitle for the "User limit" feature',
  },
  agentLimitTitle: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.agent-limit.title`,
    defaultMessage: 'Full team',
    description: 'Premium edition feature title for the "Agent limit" feature',
  },
  agentLimitSubtitle: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.agent-limit.subtitle`,
    defaultMessage: 'Up to 5,000 agents',
    description:
      'Premium edition feature subtitle for the "Agent limit" feature',
  },
  storage: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.storage`,
    defaultMessage: 'Unlimited',
    description:
      'Premium edition feature description for the "Storage" feature',
  },
  support: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.support`,
    defaultMessage: '24/7 Premium Support',
    description:
      'Premium edition feature description for the "Support" feature',
  },
  majorIncidentsPerMonth: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.major-incidents-per-month`,
    defaultMessage: 'Unlimited',
    description:
      'Premium edition feature description for the "Major incidents per month" feature',
  },
  postMortems: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.post-mortems`,
    defaultMessage: 'Unlimited',
    description:
      'Premium edition feature description for the "Post mortems" feature',
  },
  incidentCreation: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.incident-creation`,
    defaultMessage: 'Automatic, API, Template',
    description:
      'Premium edition feature description for the "Incident creation" feature',
  },
  monthlyAlertsAndNotifications: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.monthly-alerts-and-notifications`,
    defaultMessage: 'Unlimited SMS, email, voice',
    description:
      'Premium edition feature description for the "Monthly alerts and notifications" feature',
  },
  uptimeSla: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.uptime-sla`,
    defaultMessage: '99.9%',
    description:
      'Premium edition feature description for the "Uptime SLA" feature',
  },
  advancedFeature: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.advanced-feature`,
    defaultMessage: 'Advanced',
    description:
      'Premium edition feature description for the "Advaced" feature',
  },
  premiumAutomation: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.premium-automation`,
    defaultMessage: 'Global and multi-project',
    description:
      'Premium edition feature description for the "Automation" feature',
  },
  learnMore: {
    id: `${PACKAGE_NAME}.${EDITION_PREMIUM}.learn-more`,
    defaultMessage: 'Learn more',
    description:
      'Premium edition feature subtitle for the "Automation" feature',
  },
});

export const extraMessages = defineMessages({
  comingSoon: {
    id: `${PACKAGE_NAME}.labels.coming-soon.nonfinal`,
    defaultMessage: 'Coming soon',
    description: 'Tag for features which are marked as coming soon',
  },
  beta: {
    id: `${PACKAGE_NAME}.labels.coming-soon.nonfinal`,
    defaultMessage: 'Beta',
    description: 'Tag for features which are marked as being in beta',
  },
});
