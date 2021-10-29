export interface ALBEvent {
  microsHealthCheck: any;
  httpMethod: string;
  path: string;
  queryStringParameters?: { [parameter: string]: string };
  headers?: { [header: string]: string };
  body: string | null;
  isBase64Encoded: boolean;
}

export interface ContributorAccountIds {
  [contributor: string]: string;
}

export interface Package {
  name: string;
  team?: string;
}

export interface PullRequestInfo {
  title: string;
  sourceBranch: string;
  state: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED';
  reviewers: Array<string>;
  approvals: Array<string>;
  author: string;
}

export interface PullRequest extends PullRequestInfo {
  prId: string;
  commit: string;
}

export interface TeamInfo {
  contributors: Array<string>;
  'directly-responsible-individual': string;
  slack: string;
  project: string;
  packages: Array<string>;
}

export interface Teams {
  [team: string]: TeamInfo;
}

export interface TeamAction {
  (
    teamName: string,
    teamInfo: TeamInfo,
    contributorAccountIds: ContributorAccountIds,
  ): void;
}

export interface Reviewer {
  name: string;
  aaid: string;
}

export interface ReviewerInfo {
  [team: string]: {
    packages: Array<string>;
    reviewers: Array<Reviewer>;
  };
}

export interface PullRequestBBResponse {
  title: string;
  source: {
    branch: {
      name: string;
    };
    commit: {
      hash: string;
    };
  };
  state: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED';
  participants: Array<{
    role: 'PARTICIPANT' | 'REVIEWER';
    user: {
      account_id: string;
    };
    approved: boolean;
  }>;
  author: {
    account_id: string;
  };
}

export interface TeamsBBResponse {
  [team: string]: Omit<TeamInfo, 'packages'>;
}

export interface PullRequestCommentsBBResponse {
  size: number;
  values: Array<any>;
  next?: string;
}
