export type Command = 'push' | 'clone-product-repo';
export type ErrorType = 'cli' | Command;
export interface ValidationError extends Error {
  type: ErrorType;
}

export type BranchMetadata = {
  /** The atlassian-frontend commit hash that was installed into the product branch */
  afCommitHash: string;
  /** The atlassian-frontend branch name */
  afBranchName: string;
  /** Whether the branch has been manually modified (committed to) or not */
  branchIsModified?: boolean;
};
