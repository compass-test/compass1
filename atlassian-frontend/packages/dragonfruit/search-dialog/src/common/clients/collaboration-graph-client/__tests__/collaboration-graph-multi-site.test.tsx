import {
  createCollaborationContainer,
  createCollaborationUser,
} from '../../../../__tests__/__fixtures__/mock-server-response';
import {
  CollaborationGraphResponse,
  SpaceContainerType,
  Site,
  CollaborationGraphUserAPIResponse,
  CollaborationGraphContainerAPIResponse,
} from '../../common-types';
import { CollaborationGraphMultiSite } from '../collaboration-graph-multi-site';
import { utils } from '@atlaskit/util-service-support';
import { CollaborationGraphContainer } from '../..';

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

describe('CollaborationGraphMultiSite', () => {
  let collaborationGraphMultiSite: CollaborationGraphMultiSite;

  beforeEach(() => {
    jest.clearAllMocks();
    collaborationGraphMultiSite = new CollaborationGraphMultiSite({
      collaborationGraphUrl: MOCK_COLLAB_GRAPH_URL,
    });
  });

  describe('for single site', () => {
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

        const result = await collaborationGraphMultiSite.getContainers({
          containerTypes: [SpaceContainerType],
          allSites: [{ cloudId: 'cloudId' }] as Site[],
          selectedSites: [],
        });

        expect(utils.requestService).toHaveBeenCalledWith(
          {
            url: MOCK_COLLAB_GRAPH_URL,
          },
          {
            path: 'v1/collaborationgraph/multitenant/user/container',
            requestInit: {
              body: JSON.stringify({
                containerTypes: [SpaceContainerType],
                context: {
                  principalId: 'context',
                  siteIds: ['cloudId'],
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

        expect(
          result.collaborationGraphEntities.map((container) => container.id),
        ).toEqual(collaborationGraphEntities.map((container) => container.id));
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

        const result = await collaborationGraphMultiSite.getUsers({
          allSites: [{ cloudId: 'cloudId' }] as Site[],
          selectedSites: [],
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

        expect(
          result.collaborationGraphEntities.map((user) => user.id),
        ).toEqual(collaborationGraphEntities.map((user) => user.id));
        expect(result.timings).toBe(100);
      });
    });
  });
  describe('for multi site', () => {
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

        const result = await collaborationGraphMultiSite.getContainers({
          containerTypes: [SpaceContainerType],
          allSites: [
            { cloudId: 'cloudId1' },
            { cloudId: 'cloudId2' },
          ] as Site[],
          selectedSites: [],
        });

        expect(utils.requestService).toHaveBeenCalledWith(
          {
            url: MOCK_COLLAB_GRAPH_URL,
          },
          {
            path: 'v1/collaborationgraph/multitenant/user/container',
            requestInit: {
              body: JSON.stringify({
                containerTypes: [SpaceContainerType],
                context: {
                  principalId: 'context',
                  siteIds: ['cloudId1', 'cloudId2'],
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

        expect(
          result.collaborationGraphEntities.map((user) => user.id),
        ).toEqual(collaborationGraphEntities.map((user) => user.id));
        expect(result.timings).toBe(100);
      });

      it('should use selectedSites list if not empty', async () => {
        expect.hasAssertions();

        await collaborationGraphMultiSite.getContainers({
          containerTypes: [SpaceContainerType],
          allSites: [
            { cloudId: 'cloudId1' },
            { cloudId: 'cloudId2' },
          ] as Site[],
          selectedSites: [{ cloudId: 'cloudId3' }] as Site[],
        });

        expect(utils.requestService).toHaveBeenCalledWith(
          {
            url: MOCK_COLLAB_GRAPH_URL,
          },
          {
            path: 'v1/collaborationgraph/multitenant/user/container',
            requestInit: {
              body: JSON.stringify({
                containerTypes: [SpaceContainerType],
                context: {
                  principalId: 'context',
                  siteIds: ['cloudId3'],
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
      });

      it('should assign siteIds to containers', async () => {
        expect.hasAssertions();
        const collaborationGraphEntities = [
          createCollaborationContainer({
            containerDetails: { url: 'https://cool-website/path/to/stuff' },
          } as Partial<CollaborationGraphContainer>),
          createCollaborationContainer({
            containerDetails: { url: 'http://nifty-sites/stuff/over/here' },
          } as Partial<CollaborationGraphContainer>),
        ];
        const response = {
          collaborationGraphEntities,
          timings: 100,
        };

        mockCollaborationContainers(response);

        const result = await collaborationGraphMultiSite.getContainers({
          containerTypes: [SpaceContainerType],
          allSites: [
            { cloudId: 'cloudId1', siteUrl: 'https://cool-website' },
            { cloudId: 'cloudId2', siteUrl: 'http://nifty-sites' },
          ] as Site[],
          selectedSites: [{ cloudId: 'cloudId1' }] as Site[],
        });
        expect(
          result.collaborationGraphEntities.map(
            (container) => container.siteId,
          ),
        ).toEqual(['cloudId1', 'cloudId2']);
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

        const result = await collaborationGraphMultiSite.getUsers({
          allSites: [
            { cloudId: 'cloudId1' },
            { cloudId: 'cloudId2' },
            { cloudId: 'cloudId3' },
            { cloudId: 'cloudId4' },
          ] as Site[],
          selectedSites: [],
        });

        expect(utils.requestService).toHaveBeenCalledTimes(3);

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
                  siteId: 'cloudId1',
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

        expect(
          result.collaborationGraphEntities.map((user) => user.id),
        ).toEqual(collaborationGraphEntities.map((user) => user.id));

        expect(result.timings).toBe(100);
      });

      it('should use selectedSites list if not empty', async () => {
        expect.hasAssertions();
        await collaborationGraphMultiSite.getUsers({
          allSites: [
            { cloudId: 'cloudId1' },
            { cloudId: 'cloudId2' },
            { cloudId: 'cloudId3' },
            { cloudId: 'cloudId4' },
          ] as Site[],
          selectedSites: [{ cloudId: 'cloudId5' }] as Site[],
        });

        expect(utils.requestService).toHaveBeenCalledTimes(1);

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
                  siteId: 'cloudId5',
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
      });

      it('should assign siteIds to users', async () => {
        const collaborationGraphEntities = [
          createCollaborationUser(),
          createCollaborationUser(),
        ];
        const response = {
          collaborationGraphEntities,
          timings: 100,
        };

        mockCollaborationUsers(response);
        const allSites = [
          { cloudId: 'cloudId1' },
          { cloudId: 'cloudId2' },
          { cloudId: 'cloudId3' },
          { cloudId: 'cloudId4' },
        ] as Site[];
        const result = await collaborationGraphMultiSite.getUsers({
          allSites,
          selectedSites: [{ cloudId: 'cloudId1' }] as Site[],
        });

        expect(
          result.collaborationGraphEntities.map((user) => user.siteId),
        ).toEqual(
          new Array(collaborationGraphEntities.length).fill(
            allSites[0].cloudId,
          ),
        );
      });
    });
  });
});
