import crypto from 'crypto';

// prefixes used to identify issues for automated update/deletion
export const REPO_RULE_HASH_PREFIX = 'ceir-rr-';
export const ISSUE_HASH_PREFIX = 'ceir-ash-';

const toMD5 = (input: string) =>
  crypto.createHash('md5').update(input).digest('hex');

export const getHashLabelForRepoAndRule = (repo: string, ruleName: string) =>
  `${REPO_RULE_HASH_PREFIX}${toMD5(repo)}-${toMD5(ruleName)}`;

export const getHashLabelForAssigneeAndScope = (
  assignee: string,
  scope: string,
) => `${ISSUE_HASH_PREFIX}${toMD5(assignee)}-${toMD5(scope)}`;
