import React from 'react';

import Spinner from '@atlaskit/spinner';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import { Commit, Issue, PullRequest } from '@atlassian/pipelines-models';

import { COMMIT_DIFF_LIST_SIZE } from '../../const';
import { Diff } from '../../types';
import { ChangesTabs, DeploymentChangesWrapper, Loading } from '../styled';

import CommitChanges from './CommitChanges';
import FileChanges from './FileChanges';
import IssueChanges, { IssuesEmptyState } from './IssueChanges';
import PullRequestChanges from './PullRequestChanges';

type Props = {
  commits: Commit[];
  diffs: Diff[];
  issues: Issue[];
  pullRequests: PullRequest[];
  isJiraConnected: boolean;
  isFetching: boolean;
  isRollback: boolean;
  onShowMoreCommits: (page: number) => Promise<void>;
};

const DeploymentChanges: React.FC<Props> = ({
  commits,
  diffs,
  issues,
  pullRequests,
  isJiraConnected,
  isFetching,
  isRollback,
  onShowMoreCommits,
}) => {
  if (isFetching) {
    return (
      <Loading>
        <Spinner size="large" />
      </Loading>
    );
  }
  return (
    <DeploymentChangesWrapper>
      <header>
        <h4>Deployment changes</h4>
      </header>
      <ChangesTabs>
        <Tabs id="deployment-changes-tabs">
          <TabList>
            <Tab>
              Commits ({isRollback ? '-' : ''}
              {commits.length >= COMMIT_DIFF_LIST_SIZE
                ? `${COMMIT_DIFF_LIST_SIZE}+`
                : commits.length}
              )
            </Tab>
            {diffs.length ? <Tab>Diff ({diffs.length})</Tab> : null}
            {pullRequests.length ? (
              <Tab>Pull requests ({pullRequests.length})</Tab>
            ) : null}
            <Tab>
              {isJiraConnected ? `Issues (${issues.length})` : `Jira issues`}{' '}
            </Tab>
          </TabList>
          <TabPanel>
            <CommitChanges
              commitList={commits}
              onShowMoreCommits={onShowMoreCommits}
            />
          </TabPanel>
          {diffs.length ? (
            <TabPanel>
              <FileChanges diffs={diffs} />
            </TabPanel>
          ) : null}
          {pullRequests.length ? (
            <TabPanel>
              <PullRequestChanges pullRequests={pullRequests} />
            </TabPanel>
          ) : null}
          <TabPanel>
            {isJiraConnected ? (
              <IssueChanges issues={issues} />
            ) : (
              <IssuesEmptyState />
            )}
          </TabPanel>
        </Tabs>
      </ChangesTabs>
    </DeploymentChangesWrapper>
  );
};

export default React.memo(DeploymentChanges);
