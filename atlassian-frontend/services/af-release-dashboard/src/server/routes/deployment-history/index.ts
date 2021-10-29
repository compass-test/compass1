import express from 'express';
import {
  BitbucketPullRequest,
  getCommit,
  getMergedPullRequests,
  proxyBitbucketRequests,
} from '../../bitbucket';
import deploymentHistoryService from '../../services/deployment-history';
import { DeploymentHistoryEntity } from '../../../db/entities/DeploymentHistory';
import { STATUS } from '../../../server/constants';

import { isStale } from './utils/stale-calc';
import { parsePullRequests } from './utils/pull-requests';
import type { BitbucketCommit } from '../../bitbucket/commit';

const router = express.Router();

// Configure Bitbucket request proxy to ensure communication works as intended.
proxyBitbucketRequests();

router.get('/deployment', async (_request, response, next) => {
  try {
    deploymentHistoryService.get().then((deployment) => {
      return response
        .status(200)
        .json({ status: STATUS.SUCCESS, payload: deployment });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/deployment', async (request, response, next) => {
  try {
    const deployment = request.body as DeploymentHistoryEntity;
    if (!deployment?.lastDeploymentCommitHash) {
      return response.status(400).json({
        message: 'lastDeploymentCommitHash is required',
        status: STATUS.ERROR,
      });
    }
    // Fetch the timestamp for the provided commit
    let commitMeta: BitbucketCommit;
    try {
      commitMeta = await getCommit(deployment.lastDeploymentCommitHash);
      if (commitMeta?.type !== 'commit') {
        return response
          .status(400)
          .json({ status: STATUS.ERROR, message: commitMeta.error });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ status: STATUS.ERROR, message: error.message || error });
    }

    // Lookup additional metadata to gauge whether it's up to date at this point in time.
    let pullRequests: BitbucketPullRequest[];
    try {
      pullRequests = await getMergedPullRequests();
    } catch (error) {
      return response
        .status(500)
        .json({ status: STATUS.ERROR, message: error.message || error });
    }
    const prMeta = await parsePullRequests(
      pullRequests,
      deployment.lastDeploymentCommitHash,
      deployment.lastDeploymentTimestamp,
    );
    const { latestPr, numPrsBehind } = prMeta;

    // Augment the submitted payload ahead of saving to the database
    deployment.lastDeploymentTimestamp = commitMeta.date;
    deployment.isStale = isStale(deployment.isAutoRebase, prMeta);
    deployment.latestCommitHash = latestPr.commit;
    deployment.latestCommitTimestamp = latestPr.timestamp;
    deployment.numberOfPullRequestsBehind = numPrsBehind;
    deployment.lastSyncTimestamp = new Date().toISOString();

    // Save to database & return updated values
    try {
      const result = await deploymentHistoryService.save(deployment);
      return response.status(200).json({
        status: STATUS.SUCCESS,
        payload: result,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ status: STATUS.ERROR, message: error.message || error });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
