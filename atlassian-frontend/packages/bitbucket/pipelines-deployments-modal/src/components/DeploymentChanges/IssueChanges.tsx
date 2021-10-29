import React from 'react';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';
import { Issue } from '@atlassian/pipelines-models';

import { DOCS_CONNECT_JIRA } from '../../const';
import cleanMarkup from '../../utils/cleanMarkup';
import {
  IssueCard,
  IssueFlexContainer,
  IssueKey,
  IssuePaddedFlexContainer,
  IssuesEmptyWrapper,
  IssueSummary,
  IssueWrapper,
} from '../styled';

import BinocularsIcon from './assets/Binoculars';
import AsyncIcon from './AsyncIcon';

type Props = {
  issues: Issue[];
};

export const IssuesEmptyState: React.FC = () => (
  <IssuesEmptyWrapper>
    <BinocularsIcon />
    <h5>No issues here</h5>
    <p>
      To see the issues that are related to this deployment, link your account
      to Jira Software and include the issue keys in your commit messages.
    </p>
    <Button href={DOCS_CONNECT_JIRA} appearance="link" target="_blank">
      Learn more
    </Button>
  </IssuesEmptyWrapper>
);

const IssueChanges: React.FC<Props> = ({ issues }) => {
  return (
    <IssueWrapper>
      {issues.map((issue: any, key: number) => (
        <IssueCard key={`issue-changes-${key}`}>
          <IssueFlexContainer>
            <AsyncIcon url={issue.typeIconUrl} width={16} height={16} />
          </IssueFlexContainer>
          <IssueKey
            dangerouslySetInnerHTML={{
              __html: cleanMarkup(issue.renderedLink),
            }}
          />
          <IssueSummary>{issue.summary}</IssueSummary>
          {issue.statusCategory || !issue.statusName ? (
            <IssuePaddedFlexContainer>
              <Lozenge appearance={issue.statusApperance}>
                {issue.statusName}
              </Lozenge>
            </IssuePaddedFlexContainer>
          ) : null}
          <IssuePaddedFlexContainer>
            {issue.assignee.display_name ? (
              <Tooltip content={issue.assignee.display_name}>
                <Avatar
                  src={issue.assignee.avatarUrl}
                  href={issue.assignee.accountUrl}
                  size="small"
                  target="_blank"
                />
              </Tooltip>
            ) : (
              <Avatar src={issue.assignee.avatarUrl} size="small" />
            )}
          </IssuePaddedFlexContainer>
        </IssueCard>
      ))}
    </IssueWrapper>
  );
};

export default React.memo(IssueChanges);
