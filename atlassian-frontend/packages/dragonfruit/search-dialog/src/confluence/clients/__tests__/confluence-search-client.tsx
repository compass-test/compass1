import {
  createUrsPeopleResponse,
  searchError,
  createSpaceResponse,
  createPageBlogAttachmentResponse,
  createCpusPeopleResponse,
  enableDeterministicResponses,
  createCollaborationUser,
} from '../../../__tests__/__fixtures__/mock-server-response';
import { Scope, SupportedScopedResponses } from '../response-types';
import { Products } from '../../../common/product-context';
import { when } from 'jest-when';
import {
  CollaborationGraphUserAPIResponse,
  Site,
} from '../../../common/clients/common-types';
import { AggregatorClient } from '../../../common/clients';
import { ConfluenceSearchClient } from '../confluence-search-client';
import { createSiteFilters } from '../../../__tests__/__fixtures__/mock-filters';

jest.mock('../../../common/clients/base-search-client', () => {
  const search = jest.fn();
  const getAbTestData = jest.fn();
  const getProductPermissions = jest.fn();

  return {
    AggregatorClient: () => ({
      search,
      getAbTestData,
      getProductPermissions,
    }),
  };
});

let searchMock = jest.fn();
let getABTestDataMock = jest.fn();
let getProductPermissionsMock = jest.fn();
const retrieveScopeMock = jest.fn();

const mockDuration = Promise.resolve(123);

const mockSucessResponse = <
  P extends SupportedScopedResponses,
  S extends Scope
>(
  mockResponse: P,
  forScope: S | null = null,
) => {
  // If forScope is provided we will only mock the result when the scope is called
  if (forScope) {
    when(retrieveScopeMock).calledWith(forScope).mockReturnValue(mockResponse);
  } else {
    retrieveScopeMock.mockReturnValue(mockResponse);
  }

  searchMock.mockResolvedValue({
    response: {
      retrieveScope: retrieveScopeMock,
    },
    requestDurationMs: mockDuration,
  });

  return mockResponse;
};

const mockErrorResponse = <S extends Scope>(forScope: S | null = null) => {
  const errorMessage = searchError();
  const errorResponse = {
    error: errorMessage,
  };

  // If forScope is provided we will only mock the result when the scope is called
  if (forScope) {
    when(retrieveScopeMock).calledWith(forScope).mockReturnValue(errorResponse);
  } else {
    retrieveScopeMock.mockReturnValue(errorResponse);
  }

  searchMock.mockResolvedValue({
    response: {
      retrieveScope: retrieveScopeMock,
    },
    requestDurationMs: mockDuration,
  });

  return errorMessage;
};

const mockNullResponse = <S extends Scope>(forScope: S | null = null) => {
  if (forScope) {
    when(retrieveScopeMock).calledWith(forScope).mockReturnValue(null);
  } else {
    retrieveScopeMock.mockReturnValue(null);
  }

  searchMock.mockResolvedValue({
    retrieveScope: retrieveScopeMock,
  });
};

const mockGetCollabGraphUsers = jest.fn();

const mockCollaborationGraphUsers = (
  mockResponse: CollaborationGraphUserAPIResponse[],
) => {
  mockGetCollabGraphUsers.mockResolvedValue({
    collaborationGraphEntities: mockResponse,
  });
};

const sites: Site[] = [
  {
    product: Products.confluence,
    avatarUrl: 'some/path/to/avatar',
    cloudId: 'cloudId1',
    siteName: 'Some Name',
    siteUrl: 'https://amazing-website',
  },
];

describe('ConfluenceSearchClient', () => {
  const collabGraphClient: any = {
    getUsers: mockGetCollabGraphUsers,
  };

  let getClient: () => ConfluenceSearchClient;

  const DUMMY_SEARCH_CONTEXT = {
    sessionId: '123',
    referrerId: '123',
  };

  beforeAll(() => enableDeterministicResponses());

  beforeEach(() => {
    jest.resetAllMocks();

    getClient = () => {
      return new ConfluenceSearchClient(
        {
          url: 'localhost',
          cloudId: '123',
          isUserAnonymous: false,
          isCollaborationGraphEnabled: false,
          siteMasterList: sites,
        },
        collabGraphClient,
      );
    };

    searchMock = new AggregatorClient({} as any).search as any;
    getABTestDataMock = new AggregatorClient({} as any).getAbTestData as any;
    getProductPermissionsMock = new AggregatorClient({} as any)
      .getProductPermissions as any;

    // Setup successful mocks, no tests should these and they're down to make sure all promise resolve
    mockSucessResponse(
      createPageBlogAttachmentResponse(0),
      Scope.ConfluencePageBlogAttachment,
    );
    mockSucessResponse(createSpaceResponse(0), Scope.ConfluenceSpace);
    mockSucessResponse(createCpusPeopleResponse(0), Scope.People);
    mockSucessResponse(createUrsPeopleResponse(0), Scope.UserConfluence);
  });

  describe('search people', () => {
    it('single user response is mapped correctly', async () => {
      const confluenceSearchClient = getClient();
      mockSucessResponse(createUrsPeopleResponse(1), Scope.UserConfluence);

      const results = await confluenceSearchClient
        .getRecentPeople(DUMMY_SEARCH_CONTEXT, [])
        .promise();

      expect(results.items).toHaveLength(1);
      expect(searchMock).toBeCalledTimes(1);
      expect(searchMock.mock.calls[0][0].scopes).toEqual([
        Scope.UserConfluence,
      ]);
      expect(results.items[0]).toMatchSnapshot();
    });

    it('multi user response are all mapped', async () => {
      const confluenceSearchClient = getClient();
      mockSucessResponse(createUrsPeopleResponse(5));

      const results = await confluenceSearchClient
        .getRecentPeople(DUMMY_SEARCH_CONTEXT, [])
        .promise();

      expect(results.items).toHaveLength(5);
    });

    it('rejected response is bubbled up', async () => {
      const confluenceSearchClient = getClient();
      const errorResponse = searchError();
      searchMock.mockRejectedValue(errorResponse);

      const responsePromise = confluenceSearchClient
        .getRecentPeople(DUMMY_SEARCH_CONTEXT, [])
        .promise();
      await expect(responsePromise).rejects.toEqual(errorResponse);
    });

    it('response with error turns is rejected', async () => {
      const confluenceSearchClient = getClient();
      const errorResponse = mockErrorResponse();

      const responsePromise = confluenceSearchClient
        .getRecentPeople(DUMMY_SEARCH_CONTEXT, [])
        .promise();
      await expect(responsePromise).rejects.toEqual(new Error(errorResponse));
    });

    it('response with null is rejected', async () => {
      const confluenceSearchClient = getClient();
      mockNullResponse();

      const responsePromise = confluenceSearchClient
        .getRecentPeople(DUMMY_SEARCH_CONTEXT, [])
        .promise();
      await expect(responsePromise).rejects.toBeTruthy();
    });

    it('response is cached', async () => {
      const confluenceSearchClient = getClient();
      mockSucessResponse(createUrsPeopleResponse(0), Scope.UserConfluence);

      // Sanity check in case we don't clear the mocks
      expect(searchMock).toBeCalledTimes(0);

      confluenceSearchClient.getRecentPeople(DUMMY_SEARCH_CONTEXT, []);
      expect(searchMock).toBeCalledTimes(1);

      confluenceSearchClient.getRecentPeople(DUMMY_SEARCH_CONTEXT, []);
      expect(searchMock).toBeCalledTimes(1);
    });
  });

  describe('search', () => {
    it('contains results for all scopes', async () => {
      const confluenceSearchClient = getClient();

      mockSucessResponse(
        createPageBlogAttachmentResponse(5),
        Scope.ConfluencePageBlogAttachment,
      );
      mockSucessResponse(createSpaceResponse(6), Scope.ConfluenceSpace);
      mockSucessResponse(createCpusPeopleResponse(7), Scope.People);

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );

      const confPageBlogResponse = await responsePromise[
        Scope.ConfluencePageBlogAttachment
      ].promise();
      expect(confPageBlogResponse!.items).toHaveLength(5);

      const confSpaceResponse = await responsePromise[
        Scope.ConfluenceSpace
      ].promise();
      expect(confSpaceResponse!.items).toHaveLength(6);

      const confPeopleResponse = await responsePromise[Scope.People].promise();
      expect(confPeopleResponse!.items).toHaveLength(7);
    });

    it('passes sites to the search', async () => {
      const confluenceSearchClient = getClient();
      const sites = createSiteFilters(2, {
        checkedNumber: 2,
      });

      confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        sites,
      );

      expect(searchMock).toBeCalledTimes(1);
      expect(searchMock).toBeCalledWith({
        context: DUMMY_SEARCH_CONTEXT,
        experience: 'confluence.nav-v3',
        filters: [],
        modelParams: [{ '@type': 'queryParams', queryVersion: 0 }],
        query: 'query',
        resultLimit: 30,
        scopes: [
          'confluence.page,blogpost,attachment',
          'confluence.space',
          'cpus.user',
        ],
        sites: sites.map((site) => site.cloudId),
      });
    });

    it('response rejected should reject all scopes', async () => {
      const confluenceSearchClient = getClient();
      const errorResponse = searchError();

      searchMock.mockResolvedValue(Promise.reject(errorResponse));

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );

      await expect(
        responsePromise[Scope.ConfluencePageBlogAttachment].promise(),
      ).rejects.toEqual(errorResponse);
      await expect(
        responsePromise[Scope.ConfluenceSpace].promise(),
      ).rejects.toEqual(errorResponse);
      await expect(responsePromise[Scope.People].promise()).rejects.toEqual(
        errorResponse,
      );
    });

    it('error for scope should only reject that scope', async () => {
      const confluenceSearchClient = getClient();

      mockSucessResponse(
        createPageBlogAttachmentResponse(),
        Scope.ConfluencePageBlogAttachment,
      );
      const errorResponse = mockErrorResponse(Scope.ConfluenceSpace);
      mockSucessResponse(createCpusPeopleResponse(), Scope.People);

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );

      await expect(
        responsePromise[Scope.ConfluencePageBlogAttachment].promise(),
      ).resolves.toBeTruthy();
      await expect(
        responsePromise[Scope.ConfluenceSpace].promise(),
      ).rejects.toEqual(new Error(errorResponse));
      await expect(
        responsePromise[Scope.People].promise(),
      ).resolves.toBeTruthy();
    });

    it('null for scope should only reject that scope', async () => {
      const confluenceSearchClient = getClient();

      mockSucessResponse(
        createPageBlogAttachmentResponse(5),
        Scope.ConfluencePageBlogAttachment,
      );
      mockNullResponse(Scope.ConfluenceSpace);
      mockSucessResponse(createCpusPeopleResponse(7), Scope.People);

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );

      await expect(
        responsePromise[Scope.ConfluencePageBlogAttachment].promise(),
      ).resolves.toBeTruthy();
      await expect(
        responsePromise[Scope.ConfluenceSpace].promise(),
      ).rejects.toBeTruthy();
      await expect(
        responsePromise[Scope.People].promise(),
      ).resolves.toBeTruthy();
    });

    it('queryVersion is passed through as model param', () => {
      const confluenceSearchClient = getClient();

      confluenceSearchClient.search('query', [], DUMMY_SEARCH_CONTEXT, 777, []);

      expect(searchMock.mock.calls[0][0].modelParams).toEqual([
        {
          '@type': 'queryParams',
          queryVersion: 777,
        },
      ]);
    });

    it('transforms space response correctly', async () => {
      const confluenceSearchClient = getClient();

      mockSucessResponse(createSpaceResponse(1), Scope.ConfluenceSpace);

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );
      const response = await responsePromise[Scope.ConfluenceSpace].promise();

      expect(response!.items).toHaveLength(1);
      expect(response!.items[0]).toMatchSnapshot();
    });

    it('transforms page blog response correctly', async () => {
      const confluenceSearchClient = getClient();

      mockSucessResponse(
        createPageBlogAttachmentResponse(1),
        Scope.ConfluencePageBlogAttachment,
      );

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );
      const response = await responsePromise[
        Scope.ConfluencePageBlogAttachment
      ].promise();

      expect(response!.items).toHaveLength(1);
      expect(response!.items[0]).toMatchSnapshot();
    });

    it('transforms people response correctly', async () => {
      const confluenceSearchClient = getClient();

      mockSucessResponse(createCpusPeopleResponse(1), Scope.People);

      const responsePromise = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );
      const response = await responsePromise[Scope.People].promise();

      expect(response!.items).toHaveLength(1);
      expect(response!.items[0]).toMatchSnapshot();
    });

    it('attaches the right timing information', async () => {
      expect.hasAssertions();

      const confluenceSearchClient = getClient();

      mockSucessResponse(
        createPageBlogAttachmentResponse(5),
        Scope.ConfluencePageBlogAttachment,
      );
      mockSucessResponse(createSpaceResponse(6), Scope.ConfluenceSpace);
      mockSucessResponse(createCpusPeopleResponse(7), Scope.People);

      const resultsWithTimings = confluenceSearchClient.search(
        'query',
        [],
        DUMMY_SEARCH_CONTEXT,
        0,
        [],
      );
      const { timings: itemTimings } = await resultsWithTimings[
        'confluence.page,blogpost,attachment'
      ].promise();
      expect(itemTimings).toBe(mockDuration);

      const { timings: peopleTimings } = await resultsWithTimings[
        'cpus.user'
      ].promise();
      expect(peopleTimings).toBe(mockDuration);

      const { timings: spaceTimings } = await resultsWithTimings[
        'confluence.space'
      ].promise();
      expect(spaceTimings).toBe(mockDuration);
    });
  });

  it('attaches the experience to searches', async () => {
    const confluenceSearchClient = getClient();

    await confluenceSearchClient.search(
      'query',
      [],
      DUMMY_SEARCH_CONTEXT,
      0,
      [],
    );

    expect(searchMock).toHaveBeenCalledWith({
      context: DUMMY_SEARCH_CONTEXT,
      experience: 'confluence.nav-v3',
      filters: [],
      modelParams: [
        {
          '@type': 'queryParams',
          queryVersion: 0,
        },
      ],
      query: 'query',
      resultLimit: 30,
      scopes: [
        Scope.ConfluencePageBlogAttachment,
        Scope.ConfluenceSpace,
        Scope.People,
      ],
    });
  });

  it('attaches the experience to experiment calls', async () => {
    const confluenceSearchClient = getClient();

    await confluenceSearchClient.getAbTestData();

    expect(getABTestDataMock).toHaveBeenCalledWith(
      Scope.ConfluencePageBlogAttachment,
      'confluence.nav-v3',
    );
  });

  it('attaches the experience to product permissions calls', async () => {
    const confluenceSearchClient = getClient();
    const array = [Products.confluence];
    await confluenceSearchClient.getProductPermissions(array);

    expect(getProductPermissionsMock).toHaveBeenCalledWith(
      array,
      'confluence.nav-v3',
    );
  });

  describe('collaborationGraph', () => {
    beforeEach(() => {
      getClient = () =>
        new ConfluenceSearchClient(
          {
            url: 'localhost',
            cloudId: '123',
            isUserAnonymous: false,
            isCollaborationGraphEnabled: true,
            siteMasterList: sites,
          },
          collabGraphClient,
        );
    });

    it('should get spaces from collaboration graph if enabled', async () => {
      expect.assertions(3);
      const mockUser = createCollaborationUser();

      mockCollaborationGraphUsers([mockUser]);

      const results = await getClient()
        .getRecentPeople(DUMMY_SEARCH_CONTEXT, [])
        .promise();

      expect(results.items).toHaveLength(1);
      expect(mockGetCollabGraphUsers).toBeCalledTimes(1);
      expect(results.items[0]).toMatchSnapshot();
    });

    it('should cache the recent users', async () => {
      expect.assertions(2);
      const mockUser = createCollaborationUser();

      mockCollaborationGraphUsers([mockUser]);

      const client = getClient();
      await client.getRecentPeople(DUMMY_SEARCH_CONTEXT, []).promise();

      expect(mockGetCollabGraphUsers).toBeCalledTimes(1);

      await client.getRecentPeople(DUMMY_SEARCH_CONTEXT, []).promise();

      expect(mockGetCollabGraphUsers).toBeCalledTimes(1);
    });
  });
});
