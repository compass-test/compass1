export type Test = {
  path: string;
  testName: string;
  ancestorLabels: string;
  pipelineStepId?: string;
  pullRequestUrl?: string;
  errors: string[];
  skipped?: boolean;
};

export type AggregatedSkippedTests = {
  vr?: Test[];
  integration?: Test[];
  mobile?: Test[];
  pullRequestUrl?: string;
  total: number;
};

// Multi test types per package. Final step.
export type PackageAggregatedSkippedTests = {
  [packageName: string]: AggregatedSkippedTests;
};

// Single test type (e.g. VR only, or integration only) per package. Intermediary step.
export type PackageSkippedTests = {
  [packageName: string]: Test[];
};

export type TestType = 'vr' | 'integration' | 'mobile';

export type JiraTicket = {
  key: string;
  browseUrl: string;
  assignee: string;
  attachment?: string;
};

export type Verbosity = 'none' | 'low' | 'high';
