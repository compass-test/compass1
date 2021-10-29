import { InjectedIntl } from 'react-intl';

import { ProjectStatsOf } from '../../../../common/types';
import { getBytesSize } from '../../../../common/utils';

import messages from './messages';

export const projectsConfigurationMessages = (
  intl: InjectedIntl,
  projectStatsOfJira: ProjectStatsOf,
  projectStatsOfJSM: ProjectStatsOf,
) => {
  const attachmentsBytesSizeJiraString = getBytesSize(
    projectStatsOfJira.attachments.totalSizeBytes,
  );
  const numberOfIssuesJiraString = intl.formatMessage(
    messages.issuesCountString,
    {
      count: projectStatsOfJira.totalIssues,
    },
  );
  const numberOfJiraProjectsString = intl.formatMessage(
    messages.jiraProjectsCountString,
    {
      count: projectStatsOfJira.totalProjects,
    },
  );

  const attachmentsBytesSizeJSMString = getBytesSize(
    projectStatsOfJSM.attachments.totalSizeBytes,
  );
  const numberOfIssuesJSMString = intl.formatMessage(
    messages.issuesCountString,
    {
      count: projectStatsOfJSM.totalIssues,
    },
  );
  const numberOfJSMProjectsString = intl.formatMessage(
    messages.jsmProjectsCountString,
    {
      count: projectStatsOfJSM.totalProjects,
    },
  );

  return [
    intl.formatMessage(messages.allJiraProjects, {
      numberOfJiraProjectsString,
      numberOfIssuesJiraString,
      attachmentsBytesSizeJiraString,
    }),
    intl.formatMessage(messages.allJsmProjects, {
      numberOfJSMProjectsString,
      numberOfIssuesJSMString,
      attachmentsBytesSizeJSMString,
    }),
  ];
};
