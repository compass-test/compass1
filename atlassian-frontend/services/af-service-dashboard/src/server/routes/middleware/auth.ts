import { Request, RequestHandler } from 'express';
import { Service } from '../../db/entities';
import { BitbucketClient } from '../../clients/bitbucket';

import { wrap } from './index';

type ServiceGetter = (req: Request) => Promise<Service | undefined>;

export const requireServicePermission = (
  bitbucketClient: BitbucketClient,
  getService: ServiceGetter,
): RequestHandler => {
  return wrap(async (req, res, next) => {
    const staffId = req.get('x-slauth-subject');
    if (!staffId) {
      return res.status(401).json({
        error: 'Not authenticated',
      });
    }
    const service = await getService(req);
    // The route itself should handle a bad request
    if (service) {
      const isInTeamOrAdmin = await bitbucketClient.checkTeamMembership(
        service.team,
        staffId,
      );
      if (!isInTeamOrAdmin) {
        return res.status(403).json({
          error: `You are not authorised to use this endpoint, you must be a member of the team: ${service.team}`,
        });
      }
    }
    next();
  });
};
