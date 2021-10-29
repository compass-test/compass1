import { ReleaseEntity } from '../../db/entities/Release';
import { PullRequestEntity } from '../../db/entities/PullRequest';
import { DeploymentHistoryEntity } from '../../db/entities/DeploymentHistory';

export interface PullRequest extends PullRequestEntity {}

export interface Release extends ReleaseEntity {}

export interface Deployment extends DeploymentHistoryEntity {}

export type DeploymentResponse = {
  status: string;
  payload: Deployment;
};
