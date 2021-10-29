import { BaseClient } from '../base';
import { ReleaseBranchPrefix } from '../../../../constants';
import { BITBUCKET_API_BASE_URL } from './constants';

export class BitbucketClient extends BaseClient {
  public async createPullRequest(releaseName: string, repoSlug: string) {
    const releaseBranchName = `${ReleaseBranchPrefix}${releaseName}`;
    const options = this.getOptions('POST', {
      title: `TWP ${releaseName} Release`,
      source: {
        branch: {
          name: releaseBranchName,
        },
      },
      destination: {
        branch: {
          name: 'master',
        },
      },
    });
    const endpoint = `${BITBUCKET_API_BASE_URL}/2.0/repositories/${repoSlug}/pullrequests`;
    return await this.request(endpoint, options);
  }
}
