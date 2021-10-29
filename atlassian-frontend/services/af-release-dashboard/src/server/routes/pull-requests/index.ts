import express from 'express';
import { STATUS } from '../../constants';
import pullRequestService from '../../services/pull-requests';

const router = express.Router();

router.post('/pull_requests', async (request, response, next) => {
  try {
    const pullRequest = request.body?.pullRequest;
    const releaseName = request.body?.release?.name;
    const saved = await pullRequestService.save(pullRequest, releaseName);
    return response
      .status(200)
      .json({ status: STATUS.SUCCESS, payload: saved });
  } catch (err) {
    next(err);
  }
});

export default router;
