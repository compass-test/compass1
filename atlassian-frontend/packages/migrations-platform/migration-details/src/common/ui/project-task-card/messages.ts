import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'taskName'
  | 'noSelectionText'
  | 'projectsCountString'
  | 'configOnly'
  | 'attachmentsOnly'
  | 'allProjectData'
  | 'projectsLinkedToAdvancedRoadmapsCountString'
  | 'notMigratingText'
  | 'jiraProjectsCountString'
  | 'jsmProjectsCountString'
  | 'allJiraProjects'
  | 'allJsmProjects'
  | 'allJiraProjectsIssuesAttachment'
  | 'allJsmProjectsIssuesAttachment';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  notMigratingText: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.not-migrating-text',
    defaultMessage: 'You haven’t selected any projects.',
  },
  taskName: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.task-name',
    defaultMessage: 'Projects',
  },
  noSelectionText: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.no-selection-text',
    defaultMessage: 'No projects selected',
  },
  projectsCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.projects-count-string',
    defaultMessage: `{count, plural, one {{count} project} other {{count} projects}}`,
  },
  configOnly: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.config-only',
    defaultMessage: 'Only configuration for the selected projects.',
  },
  attachmentsOnly: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.attachments-only',
    defaultMessage: 'Only attachments for the selected projects.',
  },
  allProjectData: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.all-project-data',
    defaultMessage:
      '{numberOfIssues} issues and {attachmentSize} of attachments.',
  },
  projectsLinkedToAdvancedRoadmapsCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.project-task-card.projects-linked-to-advanced-roadmaps-count-string',
    defaultMessage:
      '{count, plural, one {{count} project} other {{count} projects}} linked to selected Advanced Roadmaps plans',
  },
  jiraProjectsCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.jira-projects-count-string',
    defaultMessage:
      '{count} {count, plural, one {Jira project} other {Jira projects}}',
  },
  jsmProjectsCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.jsm-projects-count-string',
    defaultMessage:
      '{count} {count, plural, one {Jira Service Management project} other {Jira Service Management projects}}',
  },
  allJiraProjectsIssuesAttachment: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all-jira-projects',
    defaultMessage:
      '{numberOfIssues} issues and {attachmentsBytesSizeJiraString} of attachments.',
  },
  allJsmProjectsIssuesAttachment: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all-jsm-projects',
    defaultMessage:
      '{numberOfIssues} issues and {attachmentsBytesSizeJSMString} of attachments.',
  },
  allJiraProjects: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all-jira-projects',
    defaultMessage:
      '{numberOfJiraProjectsString}, {numberOfIssuesJiraString} and {attachmentsBytesSizeJiraString} of attachments.',
  },
  allJsmProjects: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all-jsm-projects',
    defaultMessage:
      '{numberOfJSMProjectsString}, {numberOfIssuesJSMString} and {attachmentsBytesSizeJSMString} of attachments.',
  },
});
