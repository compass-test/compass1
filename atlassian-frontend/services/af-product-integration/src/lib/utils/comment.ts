/**
 * PR comment related util functions
 */

export function getBbsBranchUrl(repoBaseUrl: string, branchName: string) {
  const sourceBranch = encodeURIComponent(`refs/heads/${branchName}`);
  return `${repoBaseUrl}/compare/commits?sourceBranch=${sourceBranch}`;
}
