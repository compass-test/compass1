import { StepFunction } from '../../types';
import { JiraClient } from '../../clients/jira';
import { JiraTransitionMap } from '../../clients/jira/constants';

interface StepTransitionReleaseOpts {
  currRelease: string;
  status: JiraTransitionMap;
  client: JiraClient;
}
export type StepTransitionRelease = StepFunction<StepTransitionReleaseOpts>;
