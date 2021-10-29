/* eslint-disable no-console */
import { getDeploymentInfo, sendDeploymentInfo } from './local-database';
import { getConfluenceDeploymentInfo } from './confluence-deployment';
import { announceChange, getStatus } from './notifications/announce';

export const main = async () => {
  // Store the current data from our local DB ahead of requesting updates
  const currentData = await getDeploymentInfo();

  // Get latest deployment info from Confluence
  const deploymentInfo = await getConfluenceDeploymentInfo();
  if (deploymentInfo) {
    // Update the database with the latest deployment info
    await sendDeploymentInfo({
      lastDeploymentCommitHash: deploymentInfo.commitHash,
      isAutoRebase: !deploymentInfo.branchIsModified,
      confluenceBuildUrl: deploymentInfo.buildBrowseUrl,
    });

    // Re-read now that we've updated the database and compare whether the state changed
    const updatedData = await getDeploymentInfo();
    const status = getStatus(updatedData.isStale);

    console.log('Latest develop information:');
    console.log(
      `\tLatest commit timestamp: ${updatedData.lastDeploymentTimestamp}`,
    );
    console.log(
      `\t${updatedData.numberOfPullRequestsBehind} merged pull requests ahead of deployment.`,
    );

    const stateChanged = currentData.isStale !== updatedData.isStale;

    // Optional override for testing announcements within a CI pipeline.
    // Use this sparingly!
    const forceAnnouncement =
      process.env.PF_BRANCH_DEPLOY_FORCE_ANNOUNCEMENT === 'true';

    if (stateChanged || forceAnnouncement) {
      console.log(
        `Status changed. Branch deploy is now ${status}${
          forceAnnouncement ? ' (forced announcement mode).' : '.'
        }`,
      );
      await announceChange(status);
    } else {
      console.log(`Status did not change. Branch deploy is still ${status}.`);
    }
  } else {
    console.log('Response payload:\n', JSON.stringify(deploymentInfo));
    throw new Error('Unable to update deployed commit.');
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
