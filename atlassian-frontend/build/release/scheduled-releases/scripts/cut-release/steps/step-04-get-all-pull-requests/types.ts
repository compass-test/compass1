import { StepFunction } from '../../types';
import { AuthOpts } from '../../clients/base';

interface StepGetAllPullRequestsOpts {
  currRelease: string;
  bitbucket: AuthOpts;
}
export type StepGetAllPullRequests = StepFunction<StepGetAllPullRequestsOpts>;
