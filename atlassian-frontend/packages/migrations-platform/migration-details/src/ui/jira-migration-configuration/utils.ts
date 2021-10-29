import { InjectedIntl } from 'react-intl';

import { ProjectsConfig } from '../../common/types';
import { getBytesSize } from '../../common/utils';

import messages from './messages';

export const groupMembershipMessage = (
  intl: InjectedIntl,
  shouldPreserveMemberships: boolean,
) => {
  const message = shouldPreserveMemberships
    ? messages.preserveGroupMembership
    : messages.migrateUsersGroupsSeparately;

  return intl.formatMessage(message);
};

export const projectsConfigurationMessage = (
  intl: InjectedIntl,
  projectsConfig: ProjectsConfig,
) => {
  const isProjectConfigOnlyMode =
    projectsConfig.projectDataMigrationMode === 'ConfigOnly';
  const isProjectAttachmentsOnlyMode =
    projectsConfig.projectDataMigrationMode === 'AttachmentsOnly';

  const attachmentsBytesSizeString = getBytesSize(
    projectsConfig.attachmentsBytesSize,
  );
  const numberOfIssuesString = intl.formatMessage(messages.issuesCountString, {
    count: projectsConfig.numberOfIssues,
  });
  const numberOfProjectsString = intl.formatMessage(
    messages.projectsCountString,
    {
      count: projectsConfig.numberOfProjects,
    },
  );

  return isProjectConfigOnlyMode
    ? intl.formatMessage(messages.configOnly, {
        numberOfProjectsString,
      })
    : isProjectAttachmentsOnlyMode
    ? intl.formatMessage(messages.attachmentsOnly, {
        numberOfProjectsString,
        attachmentsBytesSizeString,
      })
    : intl.formatMessage(messages.all, {
        numberOfProjectsString,
        numberOfIssuesString,
        attachmentsBytesSizeString,
      });
};
