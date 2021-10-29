import {
  DeploymentHistory,
  DeploymentHistoryEntity,
} from '../../../db/entities/DeploymentHistory';
import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

export class DeploymentHistoryService {
  async get(): Promise<DeploymentHistoryEntity> {
    const latestDeployment = await getRepository(DeploymentHistory)
      .createQueryBuilder('deployment_history')
      .orderBy('deployment_history.lastDeploymentTimestamp', 'DESC')
      .getOne();

    if (!latestDeployment) {
      return {
        isStale: true,
        latestCommitHash: '',
        latestCommitTimestamp: '',
        numberOfPullRequestsBehind: -1,
        isAutoRebase: false,
        lastDeploymentCommitHash: '',
        lastDeploymentTimestamp: '',
        lastSyncTimestamp: new Date().toISOString(),
        confluenceBuildUrl: '',
      };
    }

    return latestDeployment;
  }

  async save(deployment: DeploymentHistoryEntity) {
    const deploymentHistroyEntity = plainToClass(DeploymentHistory, deployment);
    const deploymentHistoryRepository = getRepository(DeploymentHistory);
    const result = await deploymentHistoryRepository.save(
      deploymentHistroyEntity,
    );

    return result;
  }
}

const deploymentHistoryService = new DeploymentHistoryService();

export default deploymentHistoryService;
