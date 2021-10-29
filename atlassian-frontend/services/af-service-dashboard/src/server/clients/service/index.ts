import {
  Service,
  ServiceState,
  Deployment,
  DeploymentState,
} from '../../db/entities';
import { BitbucketClient } from '../bitbucket';
import { logger as baseLogger } from '../../utils/logger';
import { DeploymentUploadPayload, DeploymentUpdatePayload } from './payloads';
import { stats } from '../../utils/stats';

import formatISO9075 from 'date-fns/formatISO9075';

// This minus one will actually be returned so it's easier for us to fetch the cursor
const DEPLOYMENTS_PAGE_LENGTH = 51;

const ENV_TYPE_ORDER = ['prod', 'stg', 'dev'];
const getEnvTypePriority = (env: string) =>
  ENV_TYPE_ORDER.findIndex(envType => env.includes(envType));

export class ServiceClient {
  logger: typeof baseLogger;

  constructor(private bitbucketClient: BitbucketClient) {
    this.logger = baseLogger.child({ namespace: 'service-client' });
  }

  getServices() {
    return Service.getAll();
  }

  async getServiceState(name: string) {
    const serviceState = await ServiceState.getByServiceName(name);

    if (!serviceState) {
      this.logger.info(
        {
          service: name,
        },
        'Service could not be found',
      );
      return undefined;
    }

    return {
      ...serviceState,
      envs: await Deployment.getAllEnvsByService(serviceState.service.id),
    };
  }

  async getDeploymentStates(serviceName: string, env: string, cursor?: Date) {
    const service = await Service.getByName(serviceName);

    if (!service) {
      this.logger.info(
        {
          service: serviceName,
        },
        'Service could not be found',
      );
      return undefined;
    }

    const deploymentStates = await DeploymentState.getByServiceIdAndEnvPagination(
      service.id,
      env,
      DEPLOYMENTS_PAGE_LENGTH,
      cursor,
    );

    let nextCursor: Date | undefined;
    if (deploymentStates.length === DEPLOYMENTS_PAGE_LENGTH) {
      deploymentStates.pop();
      nextCursor = deploymentStates[DEPLOYMENTS_PAGE_LENGTH - 2].updatedDate;
    }

    const deployments = deploymentStates
      .map(({ deployment: { id: deploymentId, ...deployment }, ...state }) => ({
        deploymentId,
        ...deployment,
        ...state,
      }))
      .sort((a, b) => getEnvTypePriority(a.env) - getEnvTypePriority(b.env));

    return {
      values: deployments,
      nextCursor: nextCursor
        ? Buffer.from(formatISO9075(nextCursor)).toString('base64')
        : undefined,
    };
  }

  async getDeploymentTags(serviceName: string) {
    const service = await Service.getByName(serviceName);

    if (!service) {
      this.logger.info(
        {
          service: serviceName,
        },
        'Service could not be found',
      );
      return undefined;
    }

    return await DeploymentState.getTagsByServiceId(service.id);
  }

  async updateDeploymentTags({ id, tags }: { id: string; tags: string[] }) {
    if (!id || !tags) {
      return undefined;
    }

    await DeploymentState.update(id, { tags });

    stats.increment('deployment.tags.updated');

    return tags;
  }

  async createDeployment(deploymentPayload: DeploymentUploadPayload) {
    const {
      service: { name: serviceName, packageName, description, team },
      deployment: {
        env,
        commit,
        branch,
        packageVersion,
        pipelineUuid,
        isRollback,
      },
    } = deploymentPayload;

    this.logger.info(
      {
        metadata: deploymentPayload,
      },
      'Creating new deployment',
    );

    let serviceState = await ServiceState.getByServiceName(serviceName);
    let service = serviceState?.service;

    if (!service) {
      this.logger.info(
        {
          name: serviceName,
          package: packageName,
          team,
        },
        'Creating new service',
      );
      service = Service.create({
        name: serviceName,
        package: packageName,
        description,
        team,
      });
      await Service.save(service);
    } else {
      await Service.update(service.id, {
        package: packageName,
        description,
        team,
      });
    }

    const deployment = Deployment.create({
      service,
      pipelineUuid,
      env,
      commit,
      branch,
      packageVersion,
      isRollback,
    });
    await Deployment.save(deployment);

    serviceState = ServiceState.create({
      service,
      deployment,
      isLocked: serviceState?.isLocked ?? false,
    });
    await ServiceState.save(serviceState);

    const deploymentState = DeploymentState.create({
      deployment,
      status: 'INPROGRESS',
      tags: [],
    });
    await DeploymentState.save(deploymentState);

    this.logger.info(
      {
        deploymentState,
        serviceState,
      },
      'Successfully created new deployment',
    );

    stats.increment('deployment.created', [`rollback:${isRollback}`]);

    return deploymentState;
  }

  async updateDeployment(deploymentPayload: DeploymentUpdatePayload) {
    const { pipelineUuid, status, artefactUrl } = deploymentPayload;

    const deploymentState = await DeploymentState.getByDeploymentPipelineUuid(
      pipelineUuid,
    );

    if (!deploymentState) {
      return undefined;
    }

    await DeploymentState.update(deploymentState.id, {
      status,
      artefactUrl,
    });

    const deployment = await Deployment.findOne(deploymentState.deployment.id, {
      relations: ['service'],
    });

    stats.increment('deployment.updated', [
      `rollback:${deployment?.isRollback}`,
      `status:${status}`,
    ]);

    return deployment;
  }

  async triggerRollback(deploymentId: string) {
    this.logger.info({ deploymentId }, 'param');
    const deployment = await Deployment.getById(deploymentId);

    if (!deployment) {
      return undefined;
    }

    this.logger.info({ deployment: deployment.id }, 'deployment');

    const deployment2 = await Deployment.findOne({ where: { id: undefined } });
    this.logger.info({ deployment2: deployment2?.id }, 'deployment2');

    return this.bitbucketClient.triggerRollback(
      deployment.service.package,
      deployment.packageVersion,
    );
  }

  async getServiceLockState(serviceName: string) {
    const serviceState = await ServiceState.getByServiceName(serviceName);

    if (!serviceState) {
      return undefined;
    }

    return serviceState.isLocked;
  }

  async updateServiceDeploymentLock({
    serviceName,
    isLocked,
  }: {
    serviceName: string;
    isLocked: boolean;
  }) {
    const serviceState = await ServiceState.getByServiceName(serviceName);

    if (!serviceState) {
      return undefined;
    }

    await ServiceState.update(serviceState.id, { isLocked });

    if (isLocked) {
      stats.increment('service.locked');
    } else {
      stats.increment('service.unlocked');
    }

    return isLocked;
  }
}
