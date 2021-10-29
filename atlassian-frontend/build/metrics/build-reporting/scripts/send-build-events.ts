/*
 * Sends an analytics event representing the completion of a pipeline build.
 *
 * Precondition:
 * - Run in the after-script of the final step of a pipeline build
 */

import { FabricBuildStats, sendBuildEventsPayload } from '../src';

async function main({ stepFailure }: { stepFailure: boolean }) {
  const buildId = process.env.BITBUCKET_BUILD_NUMBER || '';
  const fabricBuildStats = new FabricBuildStats();
  let res;
  if (stepFailure) {
    const stepEvents = await fabricBuildStats.getStepEvents(buildId);
    // Data are only sent to the service on failures.
    if (stepEvents && stepEvents.build_status === 'FAILED') {
      res = await sendBuildEventsPayload(stepEvents);
    } else {
      return;
    }
  } else {
    const buildEvents =
      (await fabricBuildStats.getPipelinesBuildEvents(buildId)) || {};
    res = await sendBuildEventsPayload(buildEvents);
  }
  if (!res || !res.data) {
    throw new Error('Something may have gone wrong...');
  }
}

if (require.main === module) {
  const stepFailure = process.argv.includes('--step-failure');
  main({ stepFailure }).catch(e => {
    console.error(e);
    // Don't fail on error to allow subsequent metrics commands to trigger
    process.exit(0);
  });
}
