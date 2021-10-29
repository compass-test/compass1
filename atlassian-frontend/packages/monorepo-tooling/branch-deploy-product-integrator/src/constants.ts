/** Constants */
/** Name of the version file that is added to mirrored product branches containing atlaskit metadata */
export const versionFileName =
  process.env.PF_BRANCH_DEPLOY_VERSION_FILE || '.unknown-version';

/** Prefix name used for branches generated as branch deploys */
export const branchPrefix = 'atlaskit-branch-deploy-';
