import { SearchContext } from '../../../common/clients';
import { Products } from '../../../common/product-context';
import { JiraSearchClient } from '../jira-search-client';
import {
  createJiraIssueResponse,
  createJiraPlanResponse,
  createJiraBPFResponse,
  createJiraBPFPResponse,
  createUrsPeopleResponse,
} from '../../../__tests__/__fixtures__/mock-jira-response';
import {
  Scope,
  ContentType,
  AttributeType,
  Avatar,
  AttributeIssue,
  AttributeBoardProjectFilter,
  AttributeBoardProjectFilterPlan,
  AttributeBoard,
  AttributeProject,
  AttributeFilter,
  AttributePlan,
  Attribute,
  Result,
  AttributePeople,
  ServerResponse,
  UrsServerResponse,
} from '../response-types';
import {
  expectNonEmptyString,
  expectUrlString,
} from '../../../__tests__/__fixtures__/test-helper-functions';
import { createSiteFilters } from '../../../__tests__/__fixtures__/mock-filters';

const mockAggClientSearchFn = jest.fn();
const mockGetABTestDataMock = jest.fn();
const mockGetProductPermissionsMock = jest.fn();

jest.mock('../../../common/clients/base-search-client', () => ({
  AggregatorClient: () => ({
    search: mockAggClientSearchFn,
    getAbTestData: mockGetABTestDataMock,
    getProductPermissions: mockGetProductPermissionsMock,
  }),
}));

const mockDuration = 123;

describe('JiraSearchClient', () => {
  const DEFAULT_SEARCH_CONTEXT: SearchContext = {
    sessionId: '',
    referrerId: null,
  };
  let searchClient: JiraSearchClient;

  beforeEach(() => {
    jest.resetAllMocks();
    searchClient = new JiraSearchClient({
      url: 'https://localhost',
      cloudId: '1234545-38458-28484-sjnsd23',
      isUserAnonymous: false,
      siteMasterList: [],
    });

    mockSuccessResponse({
      [Scope.JiraIssue]: createJiraIssueResponse(50),
      [Scope.JiraPlan]: createJiraPlanResponse(50),
      [Scope.JiraBoardProjectFilter]: createJiraBPFResponse(50),
      [Scope.JiraBoardProjectFilterPlan]: createJiraBPFPResponse(50),
      [Scope.People]: createUrsPeopleResponse(50),
    });
  });

  describe('getRecentIssues', () => {
    it('should prioritise external issues supplier over internal', async () => {
      expect.hasAssertions();
      const externalRecentIssuesSupplier = jest.fn().mockResolvedValue({});

      searchClient = new JiraSearchClient({
        url: 'https://localhost',
        cloudId: '1234545-38458-28484-sjnsd23',
        isUserAnonymous: false,
        recentIssuesSupplier: externalRecentIssuesSupplier,
        siteMasterList: [],
      });

      await searchClient
        .getRecentIssues(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(0);

      // should invoke only the external supplier
      expect(externalRecentIssuesSupplier).toHaveBeenCalledTimes(1);
    });
  });

  describe('Supports getting', () => {
    it('recent issues with default limits', async () => {
      expect.hasAssertions();

      const results = await searchClient
        .getRecentIssues(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(1);
      expect(results.items).toHaveLength(JiraSearchClient.ITEM_RESULT_LIMIT);
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributeIssue(result.attributes, true), true),
        );
      });
    });

    it('recent issues with default limits when no there is no AB test', async () => {
      expect.hasAssertions();

      const results = await searchClient
        .getRecentIssues(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(1);
      expect(results.items).toHaveLength(JiraSearchClient.ITEM_RESULT_LIMIT);
    });

    it('recent issues with sites calls search with right parameters', async () => {
      expect.hasAssertions();

      const sites = createSiteFilters(2, {
        checkedNumber: 2,
      });

      await searchClient
        .getRecentIssues(DEFAULT_SEARCH_CONTEXT, sites)
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(1);
      expect(mockAggClientSearchFn).toBeCalledWith({
        context: DEFAULT_SEARCH_CONTEXT,
        experience: 'jira.nav-v3',
        filters: [],
        modelParams: [],
        query: '',
        resultLimit: JiraSearchClient.ITEM_RESULT_LIMIT,
        scopes: ['jira.issue'],
        sites: sites.map((site) => site.cloudId),
      });
    });

    it('recent boards, projects and filters with default limits', async () => {
      expect.hasAssertions();

      const results = await searchClient
        .getRecentBoardsProjectsFilters(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(1);
      expect(results.items).toHaveLength(
        JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT,
      );
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributeBPF(result.attributes), true),
        );
      });
    });

    it('recent boards, projects and filters with sites calls search with right parameters', async () => {
      expect.hasAssertions();

      const sites = createSiteFilters(2, {
        checkedNumber: 2,
      });

      await searchClient
        .getRecentBoardsProjectsFilters(DEFAULT_SEARCH_CONTEXT, sites)
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(1);
      expect(mockAggClientSearchFn).toBeCalledWith({
        context: DEFAULT_SEARCH_CONTEXT,
        experience: 'jira.nav-v3',
        filters: [],
        modelParams: [],
        query: '',
        resultLimit: 8,
        scopes: ['jira.board,project,filter'],
        sites: sites.map((site) => site.cloudId),
      });
    });

    it('recent boards, projects, filters and plans with default limits', async () => {
      expect.hasAssertions();

      const results = await searchClient
        .getRecentBoardsProjectsFiltersPlans(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      // Called twice, once for recent board,project,filter, once for recent plans
      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(2);
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributeBPFP(result.attributes), true),
        );
      });
    });

    it('recent boards, projects, filters and plans with sites calls search with right parameters', async () => {
      expect.hasAssertions();

      const sites = createSiteFilters(2, {
        checkedNumber: 2,
      });

      await searchClient
        .getRecentBoardsProjectsFiltersPlans(DEFAULT_SEARCH_CONTEXT, sites)
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(2);
      expect(mockAggClientSearchFn).toBeCalledWith({
        context: DEFAULT_SEARCH_CONTEXT,
        experience: 'jira.nav-v3',
        filters: [],
        modelParams: [],
        query: '',
        resultLimit: 8,
        scopes: ['jira.board,project,filter'],
        sites: sites.map((site) => site.cloudId),
      });

      expect(mockAggClientSearchFn).toBeCalledWith({
        context: DEFAULT_SEARCH_CONTEXT,
        experience: 'jira.nav-v3',
        filters: [],
        modelParams: [],
        query: '',
        resultLimit: 8,
        scopes: ['jira.plan'],
        sites: sites.map((site) => site.cloudId),
      });
    });

    it('recent boards,projects, filters with plans greater than 2 if there are not enough boards, projects, and filters', async () => {
      expect.hasAssertions();

      mockSuccessResponse({
        [Scope.JiraPlan]: createJiraPlanResponse(50),
        [Scope.JiraBoardProjectFilter]: createJiraBPFResponse(3),
      });

      const results = await searchClient
        .getRecentBoardsProjectsFiltersPlans(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      let planResults = 0;
      results.items.forEach((result) => {
        if (result.contentType === 'jira-plan') {
          planResults++;
        }
      });
      expect(planResults).toEqual(5);
    });

    it('recent boards,projects, filters with plans limited to 2 normally', async () => {
      expect.hasAssertions();

      const results = await searchClient
        .getRecentBoardsProjectsFiltersPlans(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      let planResults = 0;
      results.items.forEach((result) => {
        if (result.contentType === 'jira-plan') {
          planResults++;
        }
      });
      expect(planResults).toEqual(2);
    });

    it('shows the same number of recent results on subsequent calls to get', async () => {
      // Due to a bug where plans were being removed each time a render occurred, this test is to guard against
      // results unexpectedly being removed from the list on subsequent calls to get recent boards,projects,filters,plans
      expect.hasAssertions();

      mockSuccessResponse({
        [Scope.JiraPlan]: createJiraPlanResponse(2),
        [Scope.JiraBoardProjectFilter]: createJiraBPFResponse(6),
      });

      const results = await searchClient
        .getRecentBoardsProjectsFiltersPlans(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      const secondCallResults = await searchClient
        .getRecentBoardsProjectsFiltersPlans(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(results.items).toEqual(secondCallResults.items);
    });

    it('recent people with default limits', async () => {
      expect.hasAssertions();

      const results = await searchClient
        .getRecentPeople(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(1);
      expect(results.items).toHaveLength(JiraSearchClient.PROJECT_RESULT_LIMIT);
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributPeople(result.attributes), true),
        );
      });
    });

    it('recent people with anonymous user', async () => {
      expect.hasAssertions();

      searchClient = new JiraSearchClient({
        url: 'https://localhost',
        cloudId: '1234545-38458-28484-sjnsd23',
        isUserAnonymous: true, // Set anonymous to true
        siteMasterList: [],
      });

      const results = await searchClient
        .getRecentPeople(
          {
            sessionId: 'some_session_id',
            referrerId: null,
          },
          [],
        )
        .promise();

      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(0);
      expect(results.items).toHaveLength(0);
    });

    it('search queries of issues with default limits', async () => {
      expect.hasAssertions();

      const query = 's';
      const results = await searchClient
        .search(query, [], DEFAULT_SEARCH_CONTEXT, 1)
        [Scope.JiraIssue]!.promise();
      expect(results.items).toHaveLength(JiraSearchClient.ITEM_RESULT_LIMIT);
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(
            expectJiraAttributeIssue(result.attributes, false),
            false,
          ),
        );
      });
    });

    it('passes sites to the search', async () => {
      const sites = createSiteFilters(2, {
        checkedNumber: 2,
      });

      const query = 's';
      await searchClient.search(
        query,
        [],
        DEFAULT_SEARCH_CONTEXT,
        0,
        false,
        sites,
      );

      expect(mockAggClientSearchFn).toBeCalledTimes(2);
      expect(mockAggClientSearchFn).toBeCalledWith({
        context: DEFAULT_SEARCH_CONTEXT,
        experience: 'jira.nav-v3',
        filters: [],
        modelParams: [{ '@type': 'queryParams', queryVersion: 0 }],
        query,
        resultLimit: JiraSearchClient.ITEM_RESULT_LIMIT,
        scopes: ['jira.issue'],
        sites: sites.map((site) => site.cloudId),
      });

      expect(mockAggClientSearchFn).toBeCalledWith({
        context: DEFAULT_SEARCH_CONTEXT,
        experience: 'jira.nav-v3',
        filters: [],
        modelParams: [{ '@type': 'queryParams', queryVersion: 0 }],
        query,
        resultLimit: 6,
        scopes: ['jira.board,project,filter'],
        sites: sites.map((site) => site.cloudId),
      });
    });

    it('search queries of boards, projects and filters with default limits', async () => {
      expect.hasAssertions();

      const query = 's';
      const results = await searchClient
        .search(query, [], DEFAULT_SEARCH_CONTEXT, 1)
        [Scope.JiraBoardProjectFilter]!.promise();
      expect(results.items).toHaveLength(
        JiraSearchClient.PROJECT_BOARD_FILTER_LIMIT,
      );
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributeBPF(result.attributes), false),
        );
      });
    });

    it('search queries of boards, projects, filters, and plans with default limits', async () => {
      expect.hasAssertions();

      const query = 's';
      const results = await searchClient
        .search(query, [], DEFAULT_SEARCH_CONTEXT, 1, true)
        [Scope.JiraBoardProjectFilterPlan]!.promise();
      expect(results.items).toHaveLength(
        JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT,
      );
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributeBPFP(result.attributes), false),
        );
      });
    });

    it('does not search for plans when hasAdvancedRoadmapsAccess is not provided', async () => {
      expect.hasAssertions();

      const query = 's';
      const results = await searchClient.search(
        query,
        [],
        DEFAULT_SEARCH_CONTEXT,
        1,
      )[Scope.JiraBoardProjectFilterPlan];
      expect(results).toBeUndefined();
    });

    it('does not search for plans when hasAdvancedRoadmapsAccess is provided as false', async () => {
      expect.hasAssertions();

      const query = 's';
      const results = await searchClient.search(
        query,
        [],
        DEFAULT_SEARCH_CONTEXT,
        1,
      )[Scope.JiraBoardProjectFilterPlan];
      expect(results).toBeUndefined();
    });

    it('search queries of people with default limits', async () => {
      expect.hasAssertions();

      const query = 's';
      const results = await searchClient
        .searchPeople(query, DEFAULT_SEARCH_CONTEXT, [])
        .promise();
      expect(results.items).toHaveLength(JiraSearchClient.PEOPLE_RESULT_LIMIT);
      results.items.forEach((result) => {
        expect(result).toEqual(
          expectResult(expectJiraAttributPeople(result.attributes), false),
        );
      });
    });

    it('search queries of people with anonymous user', async () => {
      expect.hasAssertions();

      searchClient = new JiraSearchClient({
        url: 'https://localhost',
        cloudId: '1234545-38458-28484-sjnsd23',
        isUserAnonymous: true, // Set anonymous to true
        siteMasterList: [],
      });

      const query = 's';
      const results = await searchClient
        .searchPeople(query, DEFAULT_SEARCH_CONTEXT, [])
        .promise();
      expect(mockAggClientSearchFn).toHaveBeenCalledTimes(0);
      expect(results.items).toHaveLength(0);
    });

    it('returns timing information', async () => {
      const query = 's';
      const results = searchClient.search(
        query,
        [],
        DEFAULT_SEARCH_CONTEXT,
        1,
        true,
      );

      const issueResults = await results['jira.issue']!.promise();
      const projectBoardFiltersPlansResults = await results[
        'jira.board,project,filter,plan'
      ]!.promise();

      expect(issueResults.timings).toEqual(mockDuration);
      expect(projectBoardFiltersPlansResults.timings).toEqual(mockDuration);
    });
  });

  it("doesn't handle promise rejection", async () => {
    mockErrorResponse();

    const query = 's';
    const resultsWithTimings = searchClient.search(
      query,
      [],
      DEFAULT_SEARCH_CONTEXT,
      1,
      true,
    );

    try {
      await Promise.all([
        resultsWithTimings['jira.issue']!.promise(),
        resultsWithTimings['jira.board,project,filter,plan']!.promise(),
      ]);
      fail('expected execption');
    } catch (error) {
      expect(error).toEqual('MOCK ERROR MESSAGE');
    }
  });

  it('attaches the experience', async () => {
    const query = 's';
    searchClient.search(query, [], DEFAULT_SEARCH_CONTEXT, 2);

    expect(mockAggClientSearchFn).toBeCalledTimes(2);
    (mockAggClientSearchFn as jest.Mock).mock.calls.forEach((arg) =>
      expect(arg[0].experience).toEqual('jira.nav-v3'),
    );
  });

  it('attaches the experience to experiment calls', async () => {
    await searchClient.getAbTestData();

    expect(mockGetABTestDataMock).toHaveBeenCalledWith(
      Scope.JiraIssue,
      'jira.nav-v3',
    );
  });

  it('attaches the experience to product permissions calls', async () => {
    await searchClient.getProductPermissions([Products.jira]);

    expect(mockGetProductPermissionsMock).toHaveBeenCalledWith(
      [Products.jira],
      'jira.nav-v3',
    );
  });
});

const expectAttributeTypeBPF = expect.stringMatching(
  Object.values(AttributeType)
    .filter(
      (e) =>
        [
          AttributeType.board,
          AttributeType.project,
          AttributeType.filter,
        ].includes(e) !== undefined,
    )
    .join('|'),
);

const expectAttributeTypeBPFP = expect.stringMatching(
  Object.values(AttributeType)
    .filter(
      (e) =>
        [
          AttributeType.board,
          AttributeType.project,
          AttributeType.filter,
          AttributeType.plan,
        ].includes(e) !== undefined,
    )
    .join('|'),
);

const expectContentTypeIssue = expect.stringMatching(ContentType.JiraIssue);
const expectContentTypePeple = expect.stringMatching(ContentType.JiraPeople);

const expectContentTypeBPFP = expect.stringMatching(
  Object.values(ContentType)
    .filter(
      (e) =>
        [
          ContentType.JiraBoard,
          ContentType.JiraProject,
          ContentType.JiraFilter,
          ContentType.JiraPlan,
        ].includes(e) !== undefined,
    )
    .join('|'),
);

function mockSuccessResponse(scopeAndResponse: {
  [key: string]: ServerResponse<any> | UrsServerResponse;
}) {
  mockAggClientSearchFn.mockImplementation(({ resultLimit }) =>
    Promise.resolve({
      response: {
        retrieveScope: (scope: Scope) => ({
          ...scopeAndResponse[scope],
          results: scopeAndResponse[scope].results.slice(0, resultLimit),
        }),
      },
      requestDurationMs: mockDuration,
    }),
  );
}

function mockErrorResponse() {
  mockAggClientSearchFn.mockRejectedValue('MOCK ERROR MESSAGE');
}

export function expectResult<T extends Attribute>(
  attributes: T,
  isCached: boolean,
): Result<T> {
  return {
    resultId: expectNonEmptyString,
    name: expectNonEmptyString,
    href: expectNonEmptyString,
    contentType:
      // eslint-disable-next-line no-nested-ternary
      attributes['@type'] === AttributeType.issue
        ? expectContentTypeIssue
        : attributes['@type'] === AttributeType.people
        ? expectContentTypePeple
        : expectContentTypeBPFP,
    attributes,
    isCached,
  };
}

export function expectJiraAttributeIssue(
  attributes: AttributeIssue,
  isCached: boolean,
): AttributeIssue {
  return {
    '@type': AttributeType.issue,
    key: expect.stringMatching(/.*-\d/),
    issueTypeId: expect.stringMatching(/\d/),
    issueTypeName: expectNonEmptyString,
    containerId: expect.stringMatching(/\d/),
    container: {
      id: expectNonEmptyString,
      title: expectNonEmptyString,
    },
    avatar: expectAvatar(attributes.avatar),
    updated: '2004-12-05T16:50:06.678Z',
    isRecentResult: isCached,
  };
}

export function expectJiraAttributeBPF(
  attributes: AttributeBoardProjectFilter,
): AttributeBoardProjectFilter {
  return {
    '@type': expectAttributeTypeBPF,
    // eslint-disable-next-line no-nested-ternary
    ...(attributes['@type'] === AttributeType.board
      ? expectJiraAttributeBoard(attributes)
      : attributes['@type'] === AttributeType.project
      ? expectJiraAttributeProject(attributes)
      : expectJiraAttributeFilter(attributes)),
  };
}

export function expectJiraAttributeBPFP(
  attributes: AttributeBoardProjectFilterPlan,
): AttributeBoardProjectFilterPlan {
  return {
    '@type': expectAttributeTypeBPFP,
    // eslint-disable-next-line no-nested-ternary
    ...(attributes['@type'] === AttributeType.board
      ? expectJiraAttributeBoard(attributes)
      : attributes['@type'] === AttributeType.project
      ? expectJiraAttributeProject(attributes)
      : attributes['@type'] === AttributeType.filter
      ? expectJiraAttributeFilter(attributes)
      : expectJiraAttributePlan(attributes)),
  };
}

export function expectJiraAttributPeople(
  attributes: AttributePeople,
): AttributePeople {
  return {
    '@type': AttributeType.people,
    avatarUrl: attributes.avatarUrl,
    userId: attributes.userId,
  };
}

export function expectAvatar(avatar: Avatar) {
  if (Object.prototype.hasOwnProperty.call(avatar, 'url')) {
    return { url: expectUrlString };
  } else {
    return {
      urls: {
        '16x16': expectUrlString,
        '24x24': expectUrlString,
        '32x32': expectUrlString,
        '48x48': expectUrlString,
      },
    };
  }
}

export function expectJiraAttributeBoard(attribute: AttributeBoard) {
  return {
    containerId: expect.stringMatching(/\d/),
    container: {
      id: expectNonEmptyString,
      title: expectNonEmptyString,
    },
    containerName: expectNonEmptyString,
    avatar: attribute.avatar ? expectAvatar(attribute.avatar) : undefined,
  };
}

export function expectJiraAttributeProject(attribute: AttributeProject) {
  return {
    projectType: expectNonEmptyString,
    avatar: expectAvatar(attribute.avatar),
  };
}

export function expectJiraAttributeFilter(attribute: AttributeFilter) {
  if (attribute.ownerId && attribute.ownerName) {
    return {
      ownerId: expectNonEmptyString,
      ownerName: expectNonEmptyString,
    };
  }
  return {};
}

export function expectJiraAttributePlan(attribute: AttributePlan) {
  return {};
}
