/** Integrator status functions */
import { Logger } from './Logger';
import { config } from '../config';
import { getBbsBranchUrl } from './utils/comment';
import startCase from 'lodash/startCase';
import partition from 'lodash/partition';
import { PullRequestClient } from './api/PullRequestClient';
import { Status } from '../types';

export function isEnabledBranch(branchName: string) {
  const branchFilters = config.branchFilters;

  if (!branchFilters || branchFilters.length === 0) {
    return true;
  }

  return branchFilters.some(filter => filter.test(branchName));
}

/** Adds a comment to `pr` with the integrator `statuses` associated with it */
export async function addPrStatusComment(
  prId: number,
  commit: string,
  branchName: string,
  statuses: Status[],
) {
  if (!statuses || statuses.length === 0) {
    Logger.error('Cannot find any statuses in DB with packages installed', {
      prId,
      commit,
    });
    throw new Error('Cannot find any statuses in DB');
  }

  const productBranchName = `atlaskit-branch-deploy-${branchName.replace(
    /\//g,
    '-',
  )}`;

  const statusText = statuses.map(s => {
    const links = [];
    const productConfig = config.products.find(p => p.id === s.product);
    if (productConfig) {
      links.push({
        display: 'Branch',
        link: getBbsBranchUrl(productConfig.repoUrl, productBranchName),
      });
      if (s.result.successful) {
        if (productConfig.branchDeployLink) {
          links.push({
            display: 'Branch deploy',
            link: productConfig.branchDeployLink(productBranchName),
          });
        }
      }
    }

    const transformedLinks = links
      .map(l => `[${l.display}](${l.link})`)
      .join(' | ');

    const productName = productConfig
      ? productConfig.name
      : startCase(s.product);

    return {
      successful: s.result.successful,
      text: `* ${productName}: ${transformedLinks}`,
    };
  }) as Array<{ successful: boolean; text: string }>;
  const [successful, failed] = partition(
    statusText,
    status => status.successful,
  ).map(statuses => statuses.map(status => status.text));

  const successfulString =
    successful.length > 0
      ? `
  ✅ Successfully branch deployed [${commit}](https://bitbucket.org/${
          config.repository
        }/commits/${commit}) into the following products:

  ${successful.join('\n')}
  `
      : '';

  const failedString =
    failed.length > 0
      ? `
  ❌ Unsuccessfully branch deployed [${commit}](https://bitbucket.org/${
          config.repository
        }/commits/${commit}) into the following products:

  ${failed.join('\n')}
  `
      : '';

  const comment = `
${successfulString}
${failedString}

_Note: Branch deploy links will not work until the product build finishes.\nA successful message does not mean the branch deployed succeeded, please check the corresponding product build in the PR panel._


See [go/af-product-integration](http://go.atlassian.com/af-product-integration) for more information.
`;

  await PullRequestClient.addIntegratorComment(prId, comment);
}
