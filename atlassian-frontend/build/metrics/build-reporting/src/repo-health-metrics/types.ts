// ===== CLI Type =====

export type Options = {
  dev?: boolean;
  dryRun?: boolean;
};

export type RunFn = (opts: {
  argv: Array<string>;
  options: Options;
}) => Promise<void>;

// ===== Analytics Types =====

type BuildType = 'master' | 'default' | 'landkid' | string;

/** The specific event type, this will grow as we add more types of events */
export type RepoEventType = 'pipelines-build' | 'pipelines-step';

/** The repo event that we send via GASv3. This should be an _operational_ event. */
export type RepoEvent = {
  action: 'updated';
  actionSubject: 'af-repo';
  attributes: GenericAttributes;
  tags: ['atlaskit'];
  source: 'atlassian-frontend';
  origin: 'console';
  platform: 'bot';
};

export interface GenericAttributes {
  /** Distinguishes the type of event */
  type: RepoEventType;
  /** Unique ID across events of `type` */
  id: string;
  /** API/schema version - used to differentiate breaking changes */
  version: string;
}

interface PipelinesAttributes extends GenericAttributes {
  type: 'pipelines-build' | 'pipelines-step';
  /** Name of the build */
  buildType: BuildType;
  /** Name of the branch */
  branchName: string;
  /** Commit hash the pipeline is run on */
  commitHash: string;
  /** When the pipeline or step was started */
  startedOn: string;
  /** Length of build or step */
  duration: number;
  /** Status of build or step */
  status: 'success' | 'failure';
  /** List of changed packages */
  changedPackages: string;
  /** Number of changed packages */
  numChangedPackages: number;
  /**
   * The target branch if available (e.g. on a pull-request or landkid pipeline)
   * Attempts to default to the base branch
   */
  targetBranch?: string;
}

export interface PipelinesBuildAttributes extends PipelinesAttributes {
  type: 'pipelines-build';
}

export interface PipelinesStepAttributes extends PipelinesAttributes {
  type: 'pipelines-step';
  /** Name of the step */
  stepName: string;
  /** Which step is being run */
  stepNumber: number;
  /** Length of bolt install */
  boltInstallTime: number | undefined;
  /** Whether the bolt install cache was hit */
  boltCacheHit: boolean;
}
