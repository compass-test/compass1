import express from 'express';

import { Service, Deployment, DeploymentState } from '../../../db/entities';
import { BitbucketClient } from '../../../clients/bitbucket';
import { ServiceClient } from '../../../clients/service';
import { SlackClient } from '../../../clients/slack';
import { wrap } from '../../middleware';
import { requireServicePermission } from '../../middleware/auth';

type Clients = {
  bitbucketClient: BitbucketClient;
  serviceClient: ServiceClient;
  slackClient: SlackClient;
};

export default ({ bitbucketClient, serviceClient, slackClient }: Clients) => {
  const router = express.Router();

  router.post(
    '/create-deployment',
    wrap(async (req, res) => {
      const { body } = req;
      if (!body || !body.service || !body.deployment) {
        return res.status(400).json({
          error: 'Bad request',
        });
      }

      await serviceClient.createDeployment(req.body);

      res.status(200).json({
        deploymentCreated: true,
      });
    }),
  );

  router.post(
    '/update-deployment',
    wrap(async (req, res) => {
      const { body } = req;
      if (!body || !body.pipelineUuid || !body.status) {
        return res.status(400).json({
          error: 'Bad request',
        });
      }

      const deployment = await serviceClient.updateDeployment(req.body);

      if (!deployment) {
        return res.status(500).json({
          error: 'Failed to update deployment',
        });
      }

      slackClient.sendDeploymentNotification(
        body.status,
        deployment,
        req.body.slackChannelId,
      );

      res.status(200).json({
        deploymentUpdated: true,
      });
    }),
  );

  router.post(
    '/update-deployment-tags',
    requireServicePermission(bitbucketClient, async req => {
      const deploymentState = await DeploymentState.getById(req.body.id);
      return deploymentState?.deployment.service;
    }),
    wrap(async (req, res) => {
      const { body } = req;
      if (!body || !body.id || !body.tags) {
        return res.status(400).json({
          error: 'Bad request',
        });
      }

      const tags = await serviceClient.updateDeploymentTags(body);

      if (!tags) {
        return res.status(500).json({
          error: `Failed to update deployment tags.`,
        });
      }

      res.status(200).json({
        tags,
      });
    }),
  );

  router.post(
    '/trigger-rollback',
    requireServicePermission(bitbucketClient, async req => {
      const deployment = await Deployment.getById(req.body.deploymentId);
      return deployment?.service;
    }),
    wrap(async (req, res) => {
      const { body } = req;
      if (!body || !body.deploymentId) {
        return res.status(400).json({
          error: 'Bad request',
        });
      }

      const { deploymentId } = body;

      const pipeline = await serviceClient.triggerRollback(deploymentId);
      if (!pipeline) {
        return res.status(500).json({
          error: 'Failed to trigger rollback pipeline',
        });
      }
      res.status(201).json({
        pipeline,
      });
    }),
  );

  router.post(
    '/service-deployment-lock',
    requireServicePermission(bitbucketClient, async req =>
      Service.getByName(req.body.serviceName),
    ),
    wrap(async (req, res) => {
      const { body } = req;
      if (!body || !body.serviceName || body.isLocked === undefined) {
        return res.status(400).json({
          error: 'Bad request',
        });
      }

      const isLocked = await serviceClient.updateServiceDeploymentLock(body);

      if (isLocked === undefined) {
        return res.status(500).json({
          error: `Failed to lock/unlock service deployments.`,
        });
      }
      res.status(200).json({
        isLocked,
      });
    }),
  );

  return router;
};
