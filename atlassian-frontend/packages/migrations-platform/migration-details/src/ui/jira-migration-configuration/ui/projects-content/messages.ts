import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'issuesCountString'
  | 'jiraProjectsCountString'
  | 'jsmProjectsCountString'
  | 'allJiraProjects'
  | 'allJsmProjects';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;
export default defineMessages<Messages>({
  issuesCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.issues-count-string',
    defaultMessage: '{count} {count, plural, one {issue} other {issues}}',
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
  allJiraProjects: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all-jira-projects',
    defaultMessage:
      '{numberOfJiraProjectsString}, {numberOfIssuesJiraString}, and {attachmentsBytesSizeJiraString} of attachments.',
  },
  allJsmProjects: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all-jsm-projects',
    defaultMessage:
      '{numberOfJSMProjectsString}, {numberOfIssuesJSMString} and {attachmentsBytesSizeJSMString} of attachments.',
  },
});
