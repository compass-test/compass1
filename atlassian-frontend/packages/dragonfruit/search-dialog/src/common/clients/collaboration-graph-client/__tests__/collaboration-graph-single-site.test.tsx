import {
  createCollaborationContainer,
  createCollaborationUser,
} from '../../../../__tests__/__fixtures__/mock-server-response';
import {
  CollaborationGraphResponse,
  SpaceContainerType,
  CollaborationGraphContainerAPIResponse,
  CollaborationGraphUserAPIResponse,
} from '../../common-types';
import { CollaborationGraphSingleSite } from '../collaboration-graph-single-site';
import { utils } from '@atlaskit/util-service-support';

const MOCK_COLLAB_GRAPH_URL = 'http://collaboration.graph';

jest.mock('@atlaskit/util-service-support', () => ({
  utils: {
    requestService: jest.fn(),
  },
}));

jest.mock('../../../clients/timing', () => ({
  timed: (fn: Promise<any>) =>
    fn.then((result) => ({ result, durationMs: 100 })),
}));

const mockCollaborationUsers = (
  mockResponse: CollaborationGraphResponse<CollaborationGraphUserAPIResponse>,
) => {
  (utils.requestService as jest.Mock).mockResolvedValue(mockResponse);
};

const mockCollaborationContainers = (
  mockResponse: CollaborationGraphResponse<
    CollaborationGraphContainerAPIResponse
  >,
) => {
  (utils.requestService as jest.Mock).mockResolvedValue(mockResponse);
};

describe('CollaborationGraphSingleSite', () => {
  let collaborationGraphSingleSite: CollaborationGraphSingleSite;

  beforeEach(() => {
    jest.clearAllMocks();
    collaborationGraphSingleSite = new CollaborationGraphSingleSite({
      collaborationGraphUrl: MOCK_COLLAB_GRAPH_URL,
    });
  });

  describe('getContainers', () => {
    it('should return containers', async () => {
      expect.hasAssertions();
      const collaborationGraphEntities = [
        createCollaborationContainer(),
        createCollaborationContainer(),
      ];
      const response = {
        collaborationGraphEntities,
        timings: 100,
      };

      mockCollaborationContainers(response);

      const result = await collaborationGraphSingleSite.getContainers({
        containerTypes: [SpaceContainerType],
        cloudId: 'cloudId',
      });

      expect(utils.requestService).toHaveBeenCalledWith(
        {
          url: MOCK_COLLAB_GRAPH_URL,
        },
        {
          path: 'v1/collaborationgraph/user/container',
          requestInit: {
            body: JSON.stringify({
              containerTypes: [SpaceContainerType],
              context: {
                principalId: 'context',
                siteId: 'cloudId',
                contextType: 'quickSearch',
              },
              maxNumberOfResults: 10,
              userId: 'context',
              expanded: true,
            }),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        },
      );

      expect(result.collaborationGraphEntities.map((user) => user.id)).toEqual(
        collaborationGraphEntities.map((user) => user.id),
      );
      expect(result.timings).toBe(100);
    });
  });

  describe('getUsers', () => {
    it('should return users', async () => {
      expect.hasAssertions();
      const collaborationGraphEntities = [
        createCollaborationUser(),
        createCollaborationUser(),
      ];
      const response = {
        collaborationGraphEntities,
        timings: 100,
      };

      mockCollaborationUsers(response);

      const result = await collaborationGraphSingleSite.getUsers({
        cloudId: 'cloudId',
      });

      expect(utils.requestService).toHaveBeenCalledWith(
        {
          url: MOCK_COLLAB_GRAPH_URL,
        },
        {
          path: 'v1/collaborationgraph/user/user',
          requestInit: {
            body: JSON.stringify({
              context: {
                principalId: 'context',
                siteId: 'cloudId',
                contextType: 'quickSearch',
              },
              maxNumberOfResults: 10,
              userId: 'context',
              expanded: true,
            }),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        },
      );

      expect(result.collaborationGraphEntities.map((user) => user.id)).toEqual(
        collaborationGraphEntities.map((user) => user.id),
      );
      expect(result.timings).toBe(100);
    });
  });
});
