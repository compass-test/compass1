export type ScriptsOpts = {
  dryRun?: boolean;
  project?: string;
  force?: boolean;
  develop?: boolean;
  dev?: boolean;
};
export type ReleaseOpts = {
  currRelease: string;
  nextRelease: string;
};

export type StepFunction<StepOpts> = (
  stepOpts: StepOpts,
  scriptOpts: ScriptsOpts,
) => Promise<any>;
