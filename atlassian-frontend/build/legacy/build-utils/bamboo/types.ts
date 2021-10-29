type LifeCycleState =
  | 'Pending'
  | 'Queued'
  | 'InProgress'
  | 'Finished'
  | 'NotBuilt';

type BuildState = 'Failed' | 'Passed' | 'Running' | 'Unknown';

export type CustomBuildInformation = {
  buildState: BuildState;
  buildResultKey: string;
  lifeCycleState: LifeCycleState;
  latestBuildIndex: number;
  latestBuildUrl?: string;
};

export type JobSearchResult = {
  id: string;
  type: string;
  searchEntity: {
    id: string;
    key: string;
    projectName: string;
    planName: string;
    branchName: string;
    stageName: string;
    jobName: string;
    description: string;
    type: string;
  };
};

export type BambooBuild = {
  link: {
    href: string;
    rel: string;
  };
  plan: { [key: string]: string };
  master: { [key: string]: string };
  buildResultKey?: string;
  lifeCycleState?: LifeCycleState;
  id: number;
  specsResult: boolean;
  key: string;
  planResultKey: {
    key: string;
    entityKey: { key: string };
    resultNumber: number;
  };
  state: string;
  buildState?: BuildState;
  number: number;
  buildNumber: number;
};

export type BambooBranchBuilds = {
  results: {
    size: number;
    expand: string;
    'start-index': number;
    'max-result': number;
    result: BambooBuild[];
  };
  expand: string;
  link: {
    href: string;
    rel: string;
  };
};
