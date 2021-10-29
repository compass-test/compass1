import { AxiosBasicCredentials } from 'axios';
import { SimpleGit } from 'simple-git/promise';
import { PullRequestClient } from '@atlaskit/build-utils/bitbucket';
import { User } from '@atlaskit/build-utils/jira';
import { SlackClient } from '@atlaskit/build-utils/slack';

export type { User };

export type EnvironmentVariables = {
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_BRANCH: string;
  BITBUCKET_REPO_FULL_NAME: string;
  BITBUCKET_BUILD_NUMBER: string;
  BOT_APPROVER_USER: string;
  BOT_APPROVER_PASSWORD: string;
  LANDKID_CUSTOM_TOKEN: string;
  AFP_SLACK_TOKEN: string;
  SLACK_RELEASE_MANAGERS_CHANNEL: string;
  ATLASSIAN_USER: string;
  ATLASSIAN_PASSWORD: string;
};

export type ActionConfig = {
  from: string;
  to: string;
  mergeBranch: string;
  pipelinesLink: string;
  releaseManager: User;
};

export type MergeConflict = {
  file: string;
  authorName: string;
  authorEmail: string;
};

export type Clients = {
  git: SimpleGit;
  prClient: PullRequestClient;
  slackClient: SlackClient;
};

export type Credentials = {
  approvalAuth: AxiosBasicCredentials;
  landkidCustomToken: string;
};
