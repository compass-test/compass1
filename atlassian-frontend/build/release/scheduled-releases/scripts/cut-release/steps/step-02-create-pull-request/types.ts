import { StepFunction } from '../../types';
import { BitbucketClient } from '../../clients/bitbucket';

interface StepCreatePullRequestOpts {
  currRelease: string;
  client: BitbucketClient;
}
export type StepCreatePullRequest = StepFunction<StepCreatePullRequestOpts>;
