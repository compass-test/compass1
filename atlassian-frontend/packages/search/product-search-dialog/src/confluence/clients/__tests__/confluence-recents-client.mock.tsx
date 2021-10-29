/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
import { utils } from '@atlaskit/util-service-support';
import type { CollaborationGraphContainerAPIResponse } from '../../../common/clients/common-types';
import type {
  RecentPageResponse,
  RecentSpaceResponse,
} from '../confluence-recents-client';

export const mockGetCollabgraphContainers = jest.fn();

jest.mock('@atlaskit/util-service-support', () => ({
  utils: {
    requestService: jest.fn(),
  },
}));

jest.mock('../../../common/clients', () =>
  Object.assign({}, jest.requireActual('../../../common/clients'), {
    CollaborationGraphClient: () => ({
      getContainers: mockGetCollabgraphContainers,
    }),
  }),
);

export const mockRecentlyViewedPages = (mockResponse: RecentPageResponse[]) => {
  (utils.requestService as jest.Mock).mockResolvedValue(mockResponse);
};

export const mockRecentlyViewedSpaces = (
  mockResponse: RecentSpaceResponse[],
) => {
  (utils.requestService as jest.Mock).mockResolvedValue(mockResponse);
};

export const mockCollaborationGraphContainers = (
  mockResponse: CollaborationGraphContainerAPIResponse[],
) => {
  mockGetCollabgraphContainers.mockResolvedValue({
    collaborationGraphEntities: mockResponse,
  });
};
