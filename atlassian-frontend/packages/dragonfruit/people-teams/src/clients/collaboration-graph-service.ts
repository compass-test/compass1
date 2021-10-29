import { postJson } from '../utils/fetch';

export const STARGATE_ENDPOINT_COLLABS =
  '/gateway/api/collaboration/v1/collaborationgraph/user/user';
const LIMIT_RESULTS = 5;

export const fetchCollaborators = (
  cloudId: string,
  userId = 'context',
  tenantUrl: string = '',
) =>
  postJson(`${tenantUrl}${STARGATE_ENDPOINT_COLLABS}`, {
    context: {
      contextType: 'atlassianPeoplePackage',
      principalId: userId,
      siteId: cloudId,
    },
    maxNumberOfResults: LIMIT_RESULTS,
    userId,
    expanded: true,
  });
