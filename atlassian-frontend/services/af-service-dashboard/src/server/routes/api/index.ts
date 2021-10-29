import express from 'express';

import { BitbucketClient } from '../../clients/bitbucket';
import { ServiceClient } from '../../clients/service';
import { SlackClient } from '../../clients/slack';
import { wrap, decodeCursor, logRequests } from '../middleware';
import { default as createActionRouter } from './action';
import { stats } from '../../utils/stats';
import { PRODUCTION, initMeta } from '../../utils/env';

type Clients = {
  bitbucketClient: BitbucketClient;
  serviceClient: ServiceClient;
  slackClient: SlackClient;
};

const GLOBAL_TAGS = ['BROKEN', 'TEST'];

export default ({ bitbucketClient, serviceClient, slackClient }: Clients) => {
  const router = express.Router();

  // We don't really care about requests that aren't to our API
  if (PRODUCTION) {
    router.use(logRequests());
  }

  router.get(
    '/services',
    wrap(async (_, res) => {
      const services = await serviceClient.getServices();
      res.status(200).json({
        services: services.map(({ name }) => name),
      });
    }),
  );

  router.get(
    '/service-information',
    wrap(async (req, res) => {
      const { name } = req.query;
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          error: 'Required query parameter: name',
        });
      }

      let serviceState;
      try {
        serviceState = await serviceClient.getServiceState(name);
      } catch (err) {
        stats.increment('service.fetch.fail');
        throw err;
      }

      if (!serviceState) {
        stats.increment('service.fetch.not_found');
        return res.status(404).json({
          error: `Service does not exist: ${name}`,
        });
      }

      stats.increment('service.fetch.success');

      const {
        service: { id: serviceId, ...service },
        ...state
      } = serviceState;
      res.status(200).json({
        serviceId,
        ...state,
        ...service,
      });
    }),
  );

  router.get(
    '/deployments',
    decodeCursor,
    wrap(async (req, res) => {
      const { name, env, cursor } = req.query;
      if (
        !name ||
        !env ||
        typeof name !== 'string' ||
        typeof env !== 'string'
      ) {
        return res.status(400).json({
          error: 'Required query parameters: name, env',
        });
      }

      if (cursor && typeof cursor !== 'string') {
        return res.status(400).json({
          error: 'Invalid query parameter: cursor',
        });
      }

      const result = await serviceClient.getDeploymentStates(
        name,
        env,
        cursor ? new Date(cursor) : undefined,
      );

      if (!result) {
        return res.status(404).json({
          error: `Service does not exist: ${name}`,
        });
      }

      res.status(200).json(result);
    }),
  );

  router.get(
    '/service-lock-state',
    wrap(async (req, res) => {
      const { name } = req.query;
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          error: 'Required query parameter: name',
        });
      }
      const isLocked = await serviceClient.getServiceLockState(name);

      if (isLocked === undefined) {
        return res.status(404).json({
          error: `Service does not exist: ${name}`,
        });
      }

      res.status(200).json({
        isLocked,
      });
    }),
  );

  router.get(
    '/deployment-tags',
    wrap(async (req, res) => {
      const { name } = req.query;
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          error: 'Required query parameter: name',
        });
      }

      const tagsData = await serviceClient.getDeploymentTags(name);

      if (tagsData === undefined) {
        return res.status(404).json({
          error: `Service does not exist: ${name}`,
        });
      }

      // @ts-ignore .flatMap exists in our version of node but not in our TS libs
      const usedTags = tagsData.flatMap(({ tags }) => tags);
      const allTags = usedTags.concat(GLOBAL_TAGS);
      const distinctTags = [...new Set(allTags)].sort();

      res.status(200).json({
        tagOptions: distinctTags,
      });
    }),
  );

  router.get(
    '/meta',
    wrap(async (_, res) => {
      res.status(200).json({
        meta: initMeta(),
      });
    }),
  );

  router.use(
    '/action',
    createActionRouter({ bitbucketClient, serviceClient, slackClient }),
  );

  return router;
};
