import { SpaceContainerType } from '../../common-types';
import { CollaborationGraphClient } from '../collaboration-graph-client';

const MOCK_COLLAB_GRAPH_URL = 'http://collaboration.graph';

let mockGetContatiners = jest.fn().mockResolvedValue({});
let mockGetUsers = jest.fn().mockResolvedValue({});

jest.mock('../collaboration-graph-single-site', () => ({
  CollaborationGraphSingleSite: () => ({
    getContainers: mockGetContatiners,
    getUsers: mockGetUsers,
  }),
}));

jest.mock('../collaboration-graph-multi-site', () => ({
  CollaborationGraphMultiSite: () => ({
    getContainers: mockGetContatiners,
    getUsers: mockGetUsers,
  }),
}));

describe('CollaborationGraphClient', () => {
  let collaborationGraphClient: CollaborationGraphClient;

  describe('in single site mode', () => {
    beforeEach(() => {
      mockGetUsers.mockReset();
      mockGetContatiners.mockReset();
      collaborationGraphClient = new CollaborationGraphClient({
        collaborationGraphUrl: MOCK_COLLAB_GRAPH_URL,
        cloudId: 'cloudId',
        isMultiSite: false,
        sites: [],
      });
    });

    describe('getContainers', () => {
      it('should invoke single site', async () => {
        expect.hasAssertions();

        await collaborationGraphClient.getContainers([SpaceContainerType]);

        expect(mockGetContatiners).toHaveBeenCalledWith({
          cloudId: 'cloudId',
          containerTypes: ['confluenceSpace'],
        });
      });
    });

    describe('getUsers', () => {
      it('should invoke single site', async () => {
        expect.hasAssertions();

        collaborationGraphClient.getUsers();

        expect(mockGetUsers).toHaveBeenCalledWith({ cloudId: 'cloudId' });
      });
    });
  });

  describe('in multi site mode', () => {
    beforeEach(() => {
      mockGetUsers.mockReset();
      mockGetContatiners.mockReset();
      collaborationGraphClient = new CollaborationGraphClient({
        collaborationGraphUrl: MOCK_COLLAB_GRAPH_URL,
        cloudId: 'cloudId',
        isMultiSite: true,
        sites: [],
      });
    });

    describe('getContainers', () => {
      it('should invoke multi site', async () => {
        expect.hasAssertions();

        await collaborationGraphClient.getContainers([SpaceContainerType]);

        expect(mockGetContatiners).toHaveBeenCalledWith({
          allSites: [{ cloudId: 'cloudId' }],
          selectedSites: [],
          containerTypes: ['confluenceSpace'],
        });
      });
    });

    describe('getUsers', () => {
      it('should invoke multi site', async () => {
        expect.hasAssertions();

        collaborationGraphClient.getUsers();

        expect(mockGetUsers).toHaveBeenCalledWith({
          allSites: [{ cloudId: 'cloudId' }],
          selectedSites: [],
        });
      });
    });
  });
});
