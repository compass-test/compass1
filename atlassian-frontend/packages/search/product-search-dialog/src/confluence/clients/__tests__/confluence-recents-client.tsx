import * as mocks from './confluence-recents-client.mock';
import {
  RecentConfluence,
  ConfluenceObjectResult,
  ConfluencePage,
  ConfluenceBlogpost,
  GenericContainerResult,
  ConfluenceSpace,
  ConfSpaceResult,
} from '../response-types';
import {
  createRecentPage,
  DUMMY_CONFLUENCE_HOST,
  MOCK_SPACE,
  createCollaborationContainer,
} from '../../../__tests__/__fixtures__/mock-server-response';
import { utils } from '@atlaskit/util-service-support';
import {
  ConfluenceRecentsClient,
  RecentPageResponse,
  RecentSpaceResponse,
} from '../confluence-recents-client';
import { CollaborationGraphClient, Site } from '../../../common/clients';
import { Products } from '../../../common/product-context';

const sites: Site[] = [
  {
    product: Products.confluence,
    avatarUrl: 'some/path/to/avatar',
    cloudId: 'cloudId1',
    siteName: 'Some Name',
    siteUrl: 'https://amazing-website',
  },
  {
    product: Products.jira,
    avatarUrl: 'another/path/to/avatar',
    cloudId: 'cloudId2',
    siteName: 'Another Name',
    siteUrl: 'https://even-better-website',
  },
];

const collabGraphClient = new CollaborationGraphClient({
  collaborationGraphUrl: 'someUrl',
  cloudId: 'someCloudId',
  isMultiSite: false,
  sites,
});

describe('ConfluenceRecentsClient', () => {
  let confluenceClient: ConfluenceRecentsClient;

  beforeEach(() => {
    jest.clearAllMocks();
    confluenceClient = new ConfluenceRecentsClient(
      {
        url: DUMMY_CONFLUENCE_HOST,
        isCollaborationGraphEnabled: false,
      },
      collabGraphClient,
    );
  });

  describe('getRecentItems', () => {
    it('should return confluence items', async () => {
      const pages: RecentPageResponse[] = [
        createRecentPage('page'),
        createRecentPage('blogpost'),
      ];

      mocks.mockRecentlyViewedPages(pages);

      const result = await confluenceClient.getRecentItems().promise();

      expect(result.items).toEqual([
        {
          resultId: `${pages[0].id}`,
          name: pages[0].title,
          href: `${DUMMY_CONFLUENCE_HOST}${pages[0].url}`,
          containerName: pages[0].space,
          analyticsType: RecentConfluence,
          resultType: ConfluenceObjectResult,
          contentType: ConfluencePage,
          containerId: pages[0].spaceKey,
          iconClass: pages[0].iconClass,
          isRecentResult: true,
        },
        {
          resultId: `${pages[1].id}`,
          name: pages[1].title,
          href: `${DUMMY_CONFLUENCE_HOST}${pages[1].url}`,
          containerName: pages[1].space,
          analyticsType: RecentConfluence,
          resultType: ConfluenceObjectResult,
          contentType: ConfluenceBlogpost,
          containerId: pages[1].spaceKey,
          iconClass: pages[1].iconClass,
          isRecentResult: true,
        },
      ]);

      expect(result.totalSize).toBe(result.items.length);
    });

    it('should not break if no results are returned', async () => {
      mocks.mockRecentlyViewedPages([]);
      const result = await confluenceClient.getRecentItems().promise();
      expect(result.items).toEqual([]);
    });

    it('should return confluence items excluding pages with empty titles', async () => {
      const pages: RecentPageResponse[] = [
        createRecentPage('page', { title: undefined }),
        createRecentPage('page'),
      ];

      mocks.mockRecentlyViewedPages(pages);

      const result = await confluenceClient.getRecentItems().promise();

      expect(result.items).toEqual([
        {
          resultId: `${pages[1].id}`,
          name: pages[1].title,
          href: `${DUMMY_CONFLUENCE_HOST}${pages[1].url}`,
          containerName: pages[1].space,
          analyticsType: RecentConfluence,
          resultType: ConfluenceObjectResult,
          contentType: ConfluencePage,
          containerId: pages[1].spaceKey,
          iconClass: pages[1].iconClass,
          isRecentResult: true,
        },
      ]);
    });

    it('call should be cached', async () => {
      mocks.mockRecentlyViewedPages([]);

      // Sanity check to ensure that the call count starts at 0
      expect(utils.requestService).toBeCalledTimes(0);

      // First time should make an actual rest request
      await confluenceClient.getRecentItems().promise();
      expect(utils.requestService).toBeCalledTimes(1);

      // Subsequent calls should not make an actual rest request
      await confluenceClient.getRecentItems().promise();
      expect(utils.requestService).toBeCalledTimes(1);
    });

    it('should prioritise external supplier over inetrnal one', async () => {
      mocks.mockRecentlyViewedPages([]);
      const recentItemsSupplier = jest.fn().mockResolvedValue({});

      confluenceClient = new ConfluenceRecentsClient(
        {
          url: DUMMY_CONFLUENCE_HOST,
          isCollaborationGraphEnabled: false,
          recentItemsSupplier,
        },
        collabGraphClient,
      );
      // Sanity check to ensure that the call count starts at 0
      expect(utils.requestService).toBeCalledTimes(0);

      // Should not make an actual rest request
      await confluenceClient.getRecentItems().promise();
      expect(utils.requestService).toBeCalledTimes(0);

      // should invoke only the supplier
      expect(recentItemsSupplier).toBeCalledTimes(1);
    });
  });

  describe('getRecentSpaces', () => {
    it('should return confluence spaces', async () => {
      const spaces: RecentSpaceResponse[] = [MOCK_SPACE, MOCK_SPACE];

      mocks.mockRecentlyViewedSpaces(spaces);

      const result = await confluenceClient.getRecentSpaces().promise();

      const expectedResults: ConfSpaceResult[] = [
        {
          resultId: MOCK_SPACE.id.toString(),
          name: MOCK_SPACE.name,
          href: `${DUMMY_CONFLUENCE_HOST}/spaces/${MOCK_SPACE.key}`,
          avatarUrl: MOCK_SPACE.icon,
          analyticsType: RecentConfluence,
          resultType: GenericContainerResult,
          contentType: ConfluenceSpace,
          key: 'S&S',
          id: MOCK_SPACE.id,
        },
        {
          resultId: MOCK_SPACE.id.toString(),
          name: MOCK_SPACE.name,
          href: `${DUMMY_CONFLUENCE_HOST}/spaces/${MOCK_SPACE.key}`,
          avatarUrl: MOCK_SPACE.icon,
          analyticsType: RecentConfluence,
          resultType: GenericContainerResult,
          contentType: ConfluenceSpace,
          key: 'S&S',
          id: MOCK_SPACE.id,
        },
      ];

      expect(result.items).toEqual(expectedResults);
    });

    it('should not break if no spaces are returned', async () => {
      mocks.mockRecentlyViewedSpaces([]);
      const result = await confluenceClient.getRecentSpaces().promise();
      expect(result.items).toEqual([]);
    });

    it('call should be cached', async () => {
      mocks.mockRecentlyViewedSpaces([]);

      // Sanity check to ensure that the call count starts at 0
      expect(utils.requestService).toBeCalledTimes(0);

      // First time should make an actual rest request
      await confluenceClient.getRecentSpaces().promise();
      expect(utils.requestService).toBeCalledTimes(1);

      // Subsequent calls should not make an actual rest request
      await confluenceClient.getRecentSpaces().promise();
      expect(utils.requestService).toBeCalledTimes(1);
    });
  });

  describe('collaborationGraph', () => {
    const mockContainer = createCollaborationContainer({
      containerDetails: {
        iconUrl: MOCK_SPACE.icon,
        url: `${DUMMY_CONFLUENCE_HOST}/spaces/${MOCK_SPACE.key}`,
        key: MOCK_SPACE.key,
        id: MOCK_SPACE.id,
        name: MOCK_SPACE.name,
        score: 0,
      },
    });

    beforeEach(() => {
      confluenceClient = new ConfluenceRecentsClient(
        {
          url: DUMMY_CONFLUENCE_HOST,
          isCollaborationGraphEnabled: true,
        },
        collabGraphClient,
      );
    });

    it('should get spaces from collaboration graph if enabled', async () => {
      expect.assertions(1);
      mocks.mockCollaborationGraphContainers([mockContainer, mockContainer]);

      const result = await confluenceClient.getRecentSpaces().promise();

      const expectedResults: ConfSpaceResult[] = [
        {
          resultId: MOCK_SPACE.id,
          name: MOCK_SPACE.name,
          href: `${DUMMY_CONFLUENCE_HOST}/spaces/${MOCK_SPACE.key}`,
          avatarUrl: MOCK_SPACE.icon,
          analyticsType: RecentConfluence,
          resultType: GenericContainerResult,
          contentType: ConfluenceSpace,
          key: 'S&S',
          id: MOCK_SPACE.id,
        },
        {
          resultId: MOCK_SPACE.id,
          name: MOCK_SPACE.name,
          href: `${DUMMY_CONFLUENCE_HOST}/spaces/${MOCK_SPACE.key}`,
          avatarUrl: MOCK_SPACE.icon,
          analyticsType: RecentConfluence,
          resultType: GenericContainerResult,
          contentType: ConfluenceSpace,
          key: 'S&S',
          id: MOCK_SPACE.id,
        },
      ];

      expect(result.items).toEqual(expectedResults);
    });

    it('should cache collab graph spaces', async () => {
      expect.assertions(1);
      mocks.mockCollaborationGraphContainers([mockContainer, mockContainer]);

      await confluenceClient.getRecentSpaces().promise();
      await confluenceClient.getRecentSpaces().promise();

      expect(mocks.mockGetCollabgraphContainers).toHaveBeenCalledTimes(1);
    });
  });
});
