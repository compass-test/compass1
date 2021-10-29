import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Avatar from '@atlaskit/avatar';
import Lozenge, { ThemeAppearance } from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { JiraIssue } from '@atlassian/dragonfruit-rest';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { openInNewTab } from '@atlassian/dragonfruit-utils';

import {
  AssigneeWrapper,
  Card,
  IssueIcon,
  IssueKeyWrapper,
  IssueSummaryWrapper,
  IssueWrapper,
  LeftIssueWrapper,
  RightFloatIssueWrapper,
  StatusLozengeWrapper,
} from './styled';

type JiraIssueCardProps = {
  issue: JiraIssue;
  roundedTop?: boolean;
  roundedBottom?: boolean;
};

// Jira color list from: https://docs.atlassian.com/software/jira/docs/api/6.2.1/com/atlassian/jira/issue/status/category/StatusCategory.html
function colorToLozengeAppearance(color: string): ThemeAppearance {
  switch (color) {
    case 'green':
      return 'success';
    case 'yellow':
      return 'moved';
    case 'brown':
    case 'warm-red':
      return 'removed';
    case 'medium-gray':
    case 'blue-gray':
    default:
      return 'default';
  }
}

export function JiraIssueCard(props: JiraIssueCardProps) {
  const { issue, roundedTop = false, roundedBottom = false } = props;
  const { cloudId } = useTenantInfo();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const clickIssueEvent = createAnalyticsEvent({
    action: 'click',
    actionSubject: 'issue',
  });

  return (
    <Card roundedTop={roundedTop} roundedBottom={roundedBottom}>
      <IssueWrapper>
        <LeftIssueWrapper>
          <IssueIcon
            src={issue.fields.issuetype.iconUrl.replace(
              `/ex/jira/${cloudId}`,
              ``,
            )}
          />
          <IssueKeyWrapper
            onClick={() => {
              fireUIAnalytics(clickIssueEvent);
              openInNewTab(`${window.location.origin}/browse/${issue.key}`);
            }}
          >
            {issue.key}
          </IssueKeyWrapper>
          <IssueSummaryWrapper>{issue.fields.summary}</IssueSummaryWrapper>
        </LeftIssueWrapper>
        <RightFloatIssueWrapper>
          <Tooltip content={issue.fields.priority.name}>
            <img
              width={24}
              height={24}
              src={issue.fields.priority.iconUrl.replace(
                `/ex/jira/${cloudId}`,
                ``,
              )}
            />
          </Tooltip>
          <AssigneeWrapper>
            <Tooltip
              content={issue.fields.assignee?.displayName || 'Unassigned'}
            >
              <Avatar
                appearance="circle"
                src={issue.fields.assignee?.avatarUrls['48x48'] || undefined}
                size="small"
                name={issue.fields.assignee?.displayName}
              />
            </Tooltip>
          </AssigneeWrapper>
          <StatusLozengeWrapper>
            <Lozenge
              appearance={colorToLozengeAppearance(
                issue.fields.status.statusCategory.colorName,
              )}
            >
              {issue.fields.status.statusCategory.name}
            </Lozenge>
          </StatusLozengeWrapper>
        </RightFloatIssueWrapper>
      </IssueWrapper>
    </Card>
  );
}
