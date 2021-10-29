type SelfLink = {
  self: {
    href: string;
  };
};

type HtmlLink = {
  html: {
    href: string;
  };
};

type ApproveLink = {
  approve: {
    href: string;
  };
};

type Links = SelfLink & HtmlLink & ApproveLink;

export type SourceOrDest = {
  // Has other properties as well
  branch: {
    name: string;
  };
  commit: {
    type: 'commit';
    hash: string;
  };
  repository: {
    type: 'repository';
    name: string;
    full_name: string;
    uuid: string;
  };
};

export type PullRequest = {
  id: number;
  title: string;
  rendered: any;
  summary: any;
  state: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED';
  source: SourceOrDest;
  destination: SourceOrDest;
  merge_commit?: { hash: string };
  comment_count: number;
  task_count: number;
  close_source_branch: boolean;
  // ISO8601
  created_on: string;
  // ISO8601
  updated_on: string;
  reviewers: any[];
  author: {
    display_name: string;
  };
  /*
  The list of users that are collaborating on this pull request.
    Collaborators are user that:

    * are added to the pull request as a reviewer (part of the reviewers
      list)
    * are not explicit reviewers, but have commented on the pull request
    * are not explicit reviewers, but have approved the pull request

    Each user is wrapped in an object that indicates the user's role and
    whether they have approved the pull request. For performance reasons,
    the API only returns this list when an API requests a pull request by
    id.
   */
  participants: any[];
  links: Links;
};

type User = {
  type: 'user';
  display_name: string;
  uuid: string;
  links: HtmlLink;
  nickname: string;
  account_id: string;
};

export type PrComment = {
  id: number;
  type: 'pullrequest_comment';
  // ISO-8601
  created_on: string;
  // ISO-8601
  updated_on: string;
  deleted: boolean;
  content: {
    raw: string;
    markup: 'markdown' | 'creole' | 'plaintext';
    html: string;
  };
  links: SelfLink &
    HtmlLink & {
      code?: {
        href: string;
      };
    };
  parent?: {
    id: number;
    links: SelfLink & HtmlLink;
  };
  pullrequest: {
    type: 'pullrequest';
    id: number;
    title: string;
    links: HtmlLink;
  };
  user: User;
  inline?: {
    from: number | null;
    to: number | null;
    path: string;
  };
};

export type PrApproval = {
  participated_on: string;
  state: string;
  role: string;
  user: User;
  type: 'participant';
  approved: boolean;
};

export type BuildStatus = {
  key: string;
  description: string;
  url: string;
  name: string;
  state: 'INPROGRESS' | 'SUCCESSFUL' | 'FAILED' | 'STOPPED';
};

export type BuildStatusOpts = {
  state?: 'INPROGRESS' | 'SUCCESSFUL' | 'FAILED' | 'STOPPED';
  key?: string;
  name?: string;
  description?: string;
  url?: string;
};

export type PaginatedResponse<T> = {
  size: number;
  page: number;
  pagelen: number;
  // URI
  next?: string;
  // URI
  previous?: string;
  values: T[];
};

export type PaginatedPrComments = PaginatedResponse<PrComment>;

export type PaginatedPullRequests = PaginatedResponse<PullRequest>;

export type PaginatedBuildStatuses = PaginatedResponse<BuildStatus>;

// ===== PIPELINES =====

export interface PipelineTarget {
  type:
    | 'pipeline_commit_target'
    | 'pipeline_ref_target'
    | 'pipeline_pullrequest_target';
  selector:
    | { type: 'default' }
    | {
        type: 'custom';
        pattern: string;
      }
    | {
        type: 'branches';
        pattern: string;
      }
    | {
        type: 'pull-requests';
        pattern: string;
      };
  commit: {
    type: 'commit';
    hash: string;
  };
  ref_type?: string;
  ref_name?: string;
}

type PendingState = {
  name: 'PENDING';
};

type InprogressState = {
  name: 'INPROGRESS';
};

type CompletedState = {
  name: 'COMPLETED';
  result: {
    name: 'SUCCESSFUL' | 'FAILED' | 'STOPPED';
  };
};

type State = PendingState | InprogressState | CompletedState;

export interface Pipeline {
  uuid: string;
  build_number: string;
  target: PipelineTarget;
  state: State;
  created_on: string;
  duration_in_seconds: number;
}

export interface InprogressPipeline {
  state: InprogressState;
}

export interface CompletedPipeline {
  state: CompletedState;
  completed_on: string;
}

export interface PipelineStep {
  name: string;
  state: State;
}

export interface PendingPipelineStep extends PipelineStep {
  state: PendingState;
}

export interface InprogressPipelineStep extends PipelineStep {
  state: InprogressState;
  started_on: string;
}

export interface CompletedPipelineStep extends PipelineStep {
  state: CompletedState;
  started_on: string;
  completed_on: string;
  duration_in_seconds: number;
}

export type PaginatedPipelineSteps = PaginatedResponse<PipelineStep>;

export type PipelineOpts = {
  pipeline: string;
  branch?: string;
  commit?: string;
  variables?: Array<{
    key: string;
    value: string;
    secured?: boolean;
  }>;
};
