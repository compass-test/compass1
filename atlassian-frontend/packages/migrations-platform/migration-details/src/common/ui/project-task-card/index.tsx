import React, { FC } from 'react';

import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';

import { ProjectDataMigrationMode, ProjectsConfig } from '../../types';
import { getBytesSize } from '../../utils';
import { Selection, TaskCard } from '../task-card';

import messages from './messages';

export type Props = {
  // When this is null or undefined, it means the customer has not made their selection yet
  selection?: ProjectsConfig;
  // Method to execute when customer hits Select button (when no selection yet) and Edit button (after selection has been made)
  onSelect: () => void;
  // Method to execute when customer indicates that they are not migrating projects
  onSkip: () => void;
  isDisabled?: boolean;
  disabledDescription?: string;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isSkipLoading?: boolean;
  isAdvancedRoadmapsSelected?: boolean;
};

const getModeMessage = (
  intl: InjectedIntl,
  selection: ProjectsConfig,
  mode?: ProjectDataMigrationMode,
  isAdvancedRoadmapsSelected?: boolean,
): string | JSX.Element => {
  if (mode === 'ConfigOnly') {
    return intl.formatMessage(messages.configOnly);
  }

  if (mode === 'AttachmentsOnly') {
    return intl.formatMessage(messages.attachmentsOnly);
  }

  if (mode === 'All') {
    return (
      <>
        <>
          {isAdvancedRoadmapsSelected &&
            intl.formatMessage(
              messages.projectsLinkedToAdvancedRoadmapsCountString,
              {
                count: selection.numberOfProjects,
              },
            )}
          {isAdvancedRoadmapsSelected && <br />}
        </>
        {intl.formatMessage(messages.allProjectData, {
          numberOfIssues: selection.numberOfIssues,
          attachmentSize:
            selection.attachmentsBytesSize != null
              ? getBytesSize(selection.attachmentsBytesSize)
              : '',
        })}
      </>
    );
  }

  return intl.formatMessage(messages.notMigratingText);
};

const ProjectTaskCard: FC<Props & InjectedIntlProps> = ({
  intl,
  selection,
  onSelect,
  onSkip,
  isDisabled,
  isLoading,
  isSelectLoading,
  isSkipLoading,
  isAdvancedRoadmapsSelected,
}) => {
  let selections: Selection[] = [];

  if (selection != null) {
    if (
      selection.projectStatsOfJSM &&
      selection.projectStatsOfJira &&
      selection.projectDataMigrationMode === 'All'
    ) {
      const projectStatsOfJira = selection.projectStatsOfJira;
      const projectStatsOfJSM = selection.projectStatsOfJSM;

      const attachmentsBytesSizeJiraString = getBytesSize(
        projectStatsOfJira.attachments.totalSizeBytes,
      );

      const attachmentsBytesSizeJSMString = getBytesSize(
        projectStatsOfJSM.attachments.totalSizeBytes,
      );

      selections = [
        {
          title: intl.formatMessage(messages.jiraProjectsCountString, {
            count: projectStatsOfJira.totalProjects,
          }),
          description: intl.formatMessage(
            messages.allJiraProjectsIssuesAttachment,
            {
              numberOfIssues: projectStatsOfJira.totalIssues,
              attachmentsBytesSizeJiraString,
            },
          ),
        },
        {
          title: intl.formatMessage(messages.jsmProjectsCountString, {
            count: projectStatsOfJSM.totalProjects,
          }),
          description: intl.formatMessage(
            messages.allJsmProjectsIssuesAttachment,
            {
              numberOfIssues: projectStatsOfJSM.totalIssues,
              attachmentsBytesSizeJSMString,
            },
          ),
          isBeta: true,
        },
      ];
    } else {
      selections = [
        {
          title: intl.formatMessage(messages.projectsCountString, {
            count: selection.numberOfProjects,
          }),
          description: getModeMessage(
            intl,
            selection,
            selection.projectDataMigrationMode,
            isAdvancedRoadmapsSelected,
          ),
        },
      ];
    }
  }

  return (
    <TaskCard
      taskName={intl.formatMessage(messages.taskName)}
      selections={selections}
      noSelectionDescription={intl.formatMessage(messages.noSelectionText)}
      shouldAllowSkip={true}
      onSelect={onSelect}
      onSkip={onSkip}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSelectLoading={isSelectLoading}
      isSkipLoading={isSkipLoading}
    />
  );
};

export default injectIntl(ProjectTaskCard);
