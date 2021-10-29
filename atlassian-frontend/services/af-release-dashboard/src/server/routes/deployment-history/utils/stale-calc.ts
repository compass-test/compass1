import { DEPLOYMENT_GRACE_PERIOD_IN_HOURS } from '../../../constants';
import { calcDiffInHours } from './time';

import type { PullRequestsMetadata } from './types';

export function isStale(isAutoRebase: boolean, prMeta: PullRequestsMetadata) {
  if (!isAutoRebase) {
    const msg = `
      Marking as stale because automatic rebasing has been disabled on the confluence-frontend branch.
      It's not longer representative of production as isn't up to date with their master branch.
    `;
    console.warn(msg);
    // When confluence-frontend rebasing is disabled, it begins
    // to diverege from downstream changes in the confluence
    // codebase so we mark it as stale, despite still publishing
    // changes into our branch.
    return true;
  }

  const { deployedPr, latestPr } = prMeta;

  // CHeck whether it's up to date
  if (
    prMeta.numPrsBehind === 0 ||
    deployedPr.timestamp === latestPr.timestamp
  ) {
    return false;
  }

  // Check whether there might be pending commits currently building
  if (prMeta.prAfterDeployed) {
    // Check whether newer commits are within the grace period provided for build/deploy.
    const timestampNow = new Date().toISOString();
    const diffBetweenDeploymentAndNow = calcDiffInHours(
      prMeta.prAfterDeployed.timestamp,
      timestampNow,
    );
    const nextCommitIsWithinGracePeriod =
      diffBetweenDeploymentAndNow < DEPLOYMENT_GRACE_PERIOD_IN_HOURS;
    if (nextCommitIsWithinGracePeriod) {
      const msg = `
        Assumed up to date. Although newer commit(s) exist, they're less than ${DEPLOYMENT_GRACE_PERIOD_IN_HOURS} hour(s) old.
        We use this grace period to allow the newer commits to build & deploy.
      `;
      console.warn(msg);
      return false;
    }
  }
  return true;
}
