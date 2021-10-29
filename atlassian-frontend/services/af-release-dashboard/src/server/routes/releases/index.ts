import express from 'express';
import { STATUS } from '../../constants';
import releaseService from '../../services/releases';
import pullRequestService from '../../services/pull-requests';
import { buildFindAllParams } from './utils';
import { ReleaseRequestPayload } from '../../../ui/interfaces/release-request-payload';

const router = express.Router();

/**
 * GET /releases
 *
 * @params size - Number of releases to retrieve, undefined to get all of them without pull request
 * @params page - What page do you want to get, based on the size specified
 * @params expand - 'pull_requests' to expand releases with the pull requests
 */
router.get('/releases', async (request, response, next) => {
  try {
    const params = buildFindAllParams(request);
    const { releases, found } = await releaseService.findAll(params);
    return response.status(200).json({
      status: STATUS.SUCCESS,
      payload: releases,
      meta: { size: params.size, page: params.page, found },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/releases/averages', async (request, response, next) => {
  try {
    const releases = await releaseService.findAllWithAverages();
    return response.status(200).json({
      status: STATUS.SUCCESS,
      payload: releases,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/release/:name', async (request, response, next) => {
  const { name } = request.params;
  const { expand } = request.query;
  try {
    const release = await releaseService.find(name, {
      withPullRequests: expand === 'pull_requests',
    });
    if (!release) {
      return response.status(404).json({
        status: STATUS.ERROR,
        payload: {
          error: 'Release not found.',
          msg: `Release cannot be found using: name=${name}`,
        },
      });
    }
    return response.status(200).json({
      status: STATUS.SUCCESS,
      payload: release,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/releases', async (request, response, next) => {
  try {
    const releases = request.body?.releases;
    const saveds = await releaseService.save(releases);
    return response
      .status(200)
      .json({ status: STATUS.SUCCESS, payload: saveds });
  } catch (err) {
    next(err);
  }
});

router.post('/release', async (request, response, next) => {
  try {
    const releaseData = request.body?.release as ReleaseRequestPayload;
    const release = await releaseService.createEmpty(releaseData);
    if (releaseData?.pullRequests) {
      await pullRequestService.create(releaseData.pullRequests, release);
    }

    return response.status(200).json({ status: STATUS.SUCCESS });
  } catch (err) {
    next(err);
  }
});

router.put('/release/:name', async (request, response, next) => {
  const { name } = request.params;
  try {
    const release = request.body?.release as Partial<ReleaseRequestPayload>;
    const savedRelease = await releaseService.update(name, release);
    return response
      .status(200)
      .json({ status: STATUS.SUCCESS, payload: savedRelease });
  } catch (err) {
    next(err);
  }
});

export default router;
