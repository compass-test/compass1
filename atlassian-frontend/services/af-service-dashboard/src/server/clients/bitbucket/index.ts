import axios, { AxiosInstance } from 'axios';

import { logger as baseLogger } from '../../utils/logger';
import { initBB } from '../../utils/env';
import { stats } from '../../utils/stats';
import { PipelineResponsePayload, TeamsResponsePayload } from './payloads';

const REPO_FULL_NAME = 'atlassian/atlassian-frontend';
const BB_API_BASE_URL = `https://api.bitbucket.org/2.0/repositories/${REPO_FULL_NAME}`;

const ADMIN_TEAM = 'AFP: Monorepo';

export class BitbucketClient {
  axiosInstance: AxiosInstance;
  logger: typeof baseLogger;

  constructor() {
    const BB = initBB();
    this.axiosInstance = axios.create({
      baseURL: BB_API_BASE_URL,
      auth: {
        username: BB.USERNAME,
        password: BB.PASSWORD,
      },
    });
    this.logger = baseLogger.child({ namespace: 'bitbucket-client' });
  }

  async triggerRollback(servicePackage: string, version: string) {
    this.logger.info(
      { servicePackage, version },
      'Triggering rollback pipeline',
    );
    const response = await this.axiosInstance.post<PipelineResponsePayload>(
      '/pipelines/',
      {
        target: {
          ref_type: 'branch',
          type: 'pipeline_ref_target',
          ref_name: 'master',
          selector: {
            type: 'custom',
            pattern: 'rollback-static-service',
          },
        },
        variables: [
          {
            key: 'SERVICE_PACKAGE',
            value: servicePackage,
          },
          {
            key: 'VERSION',
            value: version,
          },
        ],
      },
    );
    stats.increment('rollback.triggered');
    return `https://bitbucket.org/${REPO_FULL_NAME}/addon/pipelines/home#!/results/${response.data.build_number}`;
  }

  async checkTeamMembership(teamName: string, staffId: string) {
    const { data: teams } = await this.axiosInstance.get<TeamsResponsePayload>(
      '/src/master/teams.json',
    );
    const adminTeam = teams[ADMIN_TEAM];
    const team = teams[teamName];
    const members = [
      adminTeam['directly-responsible-individual'],
      ...(team ? [team['directly-responsible-individual']] : []),
      ...(team ? team.contributors : []),
      ...adminTeam.contributors,
    ];
    if (members.includes(staffId)) {
      return true;
    }
    stats.increment('permission_check.failed');
    return false;
  }
}
