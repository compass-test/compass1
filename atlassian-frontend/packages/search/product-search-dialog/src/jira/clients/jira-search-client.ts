import {
  AggregatorClient,
  AggregatorConfig,
  responseErrorToError,
  SearchContext,
  ABTest,
  Site,
} from '../../common/clients';
import {
  AllAppliedFilters,
  AppliedProjectFilters,
  AppliedAssigneeFilters,
  AppliedBinaryStatusCategoryFilter,
} from './filter-types';
import {
  SupportedResponseTypes,
  ContentType,
  Scope,
  ServerResponse,
  Result,
  Results,
  AttributeType,
  Attribute,
} from './response-types';
import CancellablePromise from '../../utils/cancellable-promise';
import { SimpleCache } from '../../utils/simple-cache';
import { UnreachableError } from '../../utils/safety';
import { Products } from '../../common/product-context';
import {
  transformJiraIssueScope,
  transformJiraPlanScope,
  transformJiraBoardProjectFilterScope,
  transformJiraProjectScope,
  transformUrsPeople,
} from './jira-search-result-transformers';
import { limitToMaxSiteUsage } from '../../common/clients/multi-site-utils';

const RECENT_PLANS_SOFT_LIMIT = 2;

const NAVIGATION_V3_EXPERIENCE = 'jira.nav-v3';

export type FilterType = 'project' | 'assignee' | 'binary_status_category';

export interface Filter {
  id: string;
  type: FilterType;
}

interface Config extends AggregatorConfig {
  isUserAnonymous: boolean;
  recentIssuesSupplier?: () => Promise<Results<Scope.JiraIssue>>;
  siteUrl?: string;
  siteMasterList: Site[];
}

export class JiraSearchClient {
  public static readonly ITEM_RESULT_LIMIT = 50;

  public static readonly PROJECT_BOARD_FILTER_LIMIT = 6;

  public static readonly PROJECT_BOARD_FILTER_PLAN_LIMIT = 8;

  public static readonly PROJECT_RESULT_LIMIT = 10;

  public static readonly PEOPLE_RESULT_LIMIT = 10;

  private abTestDataCache: ABTest | null = null;

  private permissionsDataCache: Products[] | null = null;

  private aggregatorClient: AggregatorClient<
    SupportedResponseTypes,
    AllAppliedFilters
  >;

  private recentIssuesCache: SimpleCache<
    Promise<Results<Scope.JiraIssue>>,
    [SearchContext, Site[]]
  >;

  private recentPeopleCache: SimpleCache<
    Promise<Results<Scope.People>>,
    [SearchContext, Site[]]
  >;

  private recentBoardsProjectsFiltersCache: SimpleCache<
    Promise<Results<Scope.JiraBoardProjectFilter>>,
    [SearchContext, Site[]]
  >;

  private recentPlansCache: SimpleCache<
    Promise<Results<Scope.JiraPlan>>,
    [SearchContext, Site[]]
  >;

  private recentProjectsCache: SimpleCache<
    Promise<Results<Scope.JiraProject>>,
    [SearchContext, Site[]]
  >;

  private isUserAnonymous: boolean;

  constructor(config: Config) {
    const { recentIssuesSupplier = null } = config;
    this.aggregatorClient = new AggregatorClient(config);

    this.recentPeopleCache = new SimpleCache((context, sites) =>
      this.searchForPeopleScope('', context, true, sites),
    );

    this.recentIssuesCache = recentIssuesSupplier
      ? new SimpleCache((ignored: SearchContext) => recentIssuesSupplier())
      : new SimpleCache(this.recentIssuesSupplier);

    this.recentBoardsProjectsFiltersCache = new SimpleCache(
      async (context, sites) => {
        const results = this.searchForScope(
          '',
          [],
          context,
          [Scope.JiraBoardProjectFilter],
          JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT,
          true,
          sites,
        )[Scope.JiraBoardProjectFilter];

        if (!results) {
          throw new Error(
            `Failed to retrieve recent results for scope ${Scope.JiraBoardProjectFilter}`,
          );
        }

        return results.promise();
      },
    );

    this.recentPlansCache = new SimpleCache(async (context, sites) => {
      const results = this.searchForScope(
        '',
        [],
        context,
        [Scope.JiraPlan],
        JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT,
        true,
        sites,
      )[Scope.JiraPlan];

      if (!results) {
        throw new Error(
          `Failed to retrieve recent results for scope ${Scope.JiraPlan}`,
        );
      }
      return results.promise();
    });

    this.recentProjectsCache = new SimpleCache(async (context, sites) => {
      const results = this.searchForScope(
        '',
        [],
        context,
        [Scope.JiraProject],
        JiraSearchClient.PROJECT_RESULT_LIMIT,
        true,
        sites,
      )[Scope.JiraProject];

      if (!results) {
        throw new Error(
          `Failed to retrieve recent results for scope ${Scope.JiraProject}`,
        );
      }

      return results.promise();
    });

    this.isUserAnonymous = config.isUserAnonymous;
  }

  private recentIssuesSupplier: (
    context: SearchContext,
    sites: Site[],
  ) => Promise<Results<Scope.JiraIssue>> = async (context, sites) => {
    const results = this.searchForScope(
      '',
      [],
      context,
      [Scope.JiraIssue],
      JiraSearchClient.ITEM_RESULT_LIMIT,
      true,
      sites,
    )[Scope.JiraIssue];

    if (!results) {
      throw new Error(
        `Failed to retrieve recent results for scope ${Scope.JiraIssue}`,
      );
    }

    return results.promise();
  };

  protected getRecent<T extends Scope>(
    cache: SimpleCache<Promise<Results<T>>, [SearchContext, Site[]]>,
    context: SearchContext,
    sites: Site[],
  ) {
    const { fromCache, value } = cache.get(context, limitToMaxSiteUsage(sites));
    return CancellablePromise.from(
      value.then((results) => ({ ...results, isCached: fromCache })),
    );
  }

  protected getRecentBoardsProjectsFiltersPlansInterleaved<T extends Scope>(
    context: SearchContext,
    sites: Site[],
  ) {
    const {
      fromCache: boardsProjectsFiltersFromCache,
      value: boardsProjectsFiltersValue,
    } = this.recentBoardsProjectsFiltersCache.get(context, sites);
    const {
      fromCache: plansFromCache,
      value: plansValue,
    } = this.recentPlansCache.get(context, sites);

    return CancellablePromise.from(
      Promise.all([boardsProjectsFiltersValue, plansValue]).then((results) => ({
        ...this.interleaveRecentBoardsProjectsFiltersPlans(
          results[0],
          results[1],
        ),
        isCached: plansFromCache && boardsProjectsFiltersFromCache,
      })),
    );
  }

  // For recent results, we only want to show up to 2 recent plans as the last 2 results
  // as we cannot accurately interleave  recent plans with recent boards, projects, filter results.
  // However, it is valid to show more than 2 plans in the case where other entity types have been exhausted.
  private interleaveRecentBoardsProjectsFiltersPlans = (
    boardProjectFilterResults: Results<
      Scope.JiraBoardProjectFilterPlan | Scope.JiraBoardProjectFilter
    >,
    planResults: Results<Scope.JiraPlan>,
  ) => {
    const timings =
      planResults.timings > boardProjectFilterResults.timings
        ? planResults.timings
        : boardProjectFilterResults.timings;
    const { items } = boardProjectFilterResults;
    if (planResults.items.length >= RECENT_PLANS_SOFT_LIMIT) {
      while (
        items.length >
        JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT -
          RECENT_PLANS_SOFT_LIMIT
      ) {
        items.pop();
      }
    } else {
      while (
        items.length >
        JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT -
          planResults.items.length
      ) {
        items.pop();
      }
    }

    for (
      let planCount = 0;
      items.length < JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT &&
      planResults.items.length > planCount;
      planCount++
    ) {
      items.push(planResults.items[planCount]);
    }
    return { timings: timings, items: items, totalSize: items.length };
  };

  public getRecentIssues(context: SearchContext, sites: Site[]) {
    return this.getRecent(this.recentIssuesCache, context, sites);
  }

  public getRecentPlans(context: SearchContext, sites: Site[]) {
    return this.getRecent(this.recentPlansCache, context, sites);
  }

  public getRecentProjects(context: SearchContext, sites: Site[]) {
    return this.getRecent(this.recentProjectsCache, context, sites);
  }

  public getRecentBoardsProjectsFilters(context: SearchContext, sites: Site[]) {
    return this.getRecent(
      this.recentBoardsProjectsFiltersCache,
      context,
      sites,
    );
  }

  public getRecentBoardsProjectsFiltersPlans(
    context: SearchContext,
    sites: Site[],
  ) {
    return this.getRecentBoardsProjectsFiltersPlansInterleaved(context, sites);
  }

  /**
   * Check the user permissions for the given list of products.
   */
  public async getProductPermissions(
    products: Products[],
  ): Promise<Products[]> {
    if (!this.permissionsDataCache) {
      this.permissionsDataCache = await this.aggregatorClient.getProductPermissions(
        products,
        NAVIGATION_V3_EXPERIENCE,
      );
    }

    return this.permissionsDataCache;
  }

  public async getAbTestData() {
    if (this.abTestDataCache) {
      return this.abTestDataCache;
    }

    const abTest = await this.aggregatorClient.getAbTestData(
      Scope.JiraIssue,
      NAVIGATION_V3_EXPERIENCE,
    );

    this.abTestDataCache = abTest;

    return abTest;
  }

  public search = (
    query: string,
    filters: Filter[],
    context: SearchContext,
    queryVersion: number,
    hasAdvancedRoadmapsAccess?: boolean,
    sites?: Site[],
  ) => {
    const issueSearch = this.searchForScope(
      query,
      filters,
      context,
      [Scope.JiraIssue],
      JiraSearchClient.ITEM_RESULT_LIMIT,
      false,
      sites,
      queryVersion,
    );

    const scopes = hasAdvancedRoadmapsAccess
      ? [Scope.JiraBoardProjectFilterPlan]
      : [Scope.JiraBoardProjectFilter];
    const limit = hasAdvancedRoadmapsAccess
      ? JiraSearchClient.PROJECT_BOARD_FILTER_PLAN_LIMIT
      : JiraSearchClient.PROJECT_BOARD_FILTER_LIMIT;
    const jiraBoardProjectFilterSearch =
      filters.length === 0
        ? this.searchForScope(
            query,
            filters,
            context,
            scopes,
            limit,
            false,
            sites,
            queryVersion,
          )
        : {};

    return {
      ...issueSearch,
      ...jiraBoardProjectFilterSearch,
    };
  };

  public getRecentPeople(
    context: SearchContext,
    sites: Site[],
  ): CancellablePromise<Results<Scope.People>> {
    return this.getRecent(this.recentPeopleCache, context, sites);
  }

  public searchPeople(
    query: string,
    context: SearchContext,
    sites: Site[],
  ): CancellablePromise<Results<Scope.People>> {
    return CancellablePromise.from(
      this.searchForPeopleScope(query, context, false, sites),
    );
  }

  private searchForPeopleScope(
    query: string,
    context: SearchContext,
    isForRecentResults: boolean,
    sites: Site[],
    queryVersion?: number,
  ): Promise<Results<Scope.People>> {
    if (this.isUserAnonymous) {
      return Promise.resolve({
        items: [],
        timings: 0,
        totalSize: 0,
      });
    }

    const results = this.searchForScope(
      query,
      [],
      context,
      [Scope.People],
      JiraSearchClient.PEOPLE_RESULT_LIMIT,
      isForRecentResults,
      sites,
      queryVersion,
    )[Scope.People];

    if (!results) {
      throw new Error(`Failed to retrieve results for scope ${Scope.People}`);
    }

    return results.promise();
  }

  public searchProjects(
    query: string,
    context: SearchContext,
    sites: Site[],
  ): CancellablePromise<Results<Scope.JiraProject>> {
    const results = this.searchForScope(
      query,
      [],
      context,
      [Scope.JiraProject],
      JiraSearchClient.ITEM_RESULT_LIMIT,
      false,
      sites,
    )[Scope.JiraProject];

    if (!results) {
      throw new Error(
        `Failed to retrieve results for scope ${Scope.JiraProject}`,
      );
    }

    return results;
  }

  private searchForScope = (
    query: string,
    filters: Filter[],
    context: SearchContext,
    scopes: Scope[],
    resultLimit: number,
    isForRecentResults: boolean,
    sites: Site[] = [],
    queryVersion?: number,
  ) => {
    const modelParams =
      queryVersion || queryVersion === 0
        ? [
            {
              '@type': 'queryParams',
              queryVersion,
            },
          ]
        : [];

    const allFilters: AllAppliedFilters[] = [];
    let baseProjectFilters: AppliedProjectFilters | null = null;
    let baseAssigneeFilters: AppliedAssigneeFilters | null = null;
    let baseBinaryStatusCategoryFilters: AppliedBinaryStatusCategoryFilter | null = null;

    filters.forEach((filter) => {
      switch (filter.type) {
        case 'project':
          if (!baseProjectFilters) {
            baseProjectFilters = {
              '@type': 'projects',
              projectIds: [],
            };
            allFilters.push(baseProjectFilters);
          }

          baseProjectFilters.projectIds.push(filter.id);
          break;
        case 'assignee':
          if (!baseAssigneeFilters) {
            baseAssigneeFilters = {
              '@type': 'assignees',
              accountIds: [],
            };
            allFilters.push(baseAssigneeFilters);
          }

          baseAssigneeFilters.accountIds.push(filter.id);
          break;
        case 'binary_status_category':
          if (!baseBinaryStatusCategoryFilters) {
            baseBinaryStatusCategoryFilters = {
              '@type': 'binary_status_categories',
              binaryStatusCategories: [],
            };
            allFilters.push(baseBinaryStatusCategoryFilters);
          }

          baseBinaryStatusCategoryFilters.binaryStatusCategories.push(
            filter.id,
          );
          break;
        default: {
          break;
        }
      }
    });

    const responses = this.aggregatorClient.search({
      query,
      context,
      scopes,
      modelParams,
      resultLimit,
      filters: allFilters,
      experience: NAVIGATION_V3_EXPERIENCE,
      sites: sites.length > 0 ? sites.map((s) => s.cloudId) : undefined,
    });

    return scopes.reduce(
      (results, currentScope) => ({
        ...results,
        [currentScope]: CancellablePromise.from(
          responses.then(({ response, requestDurationMs }) => {
            const scopedResponse = response.retrieveScope(currentScope);
            if (!scopedResponse) {
              throw new Error(
                `Expected a response but did not get any for scope: ${currentScope}`,
              );
            }
            if (scopedResponse.error) {
              throw responseErrorToError(scopedResponse.error);
            }

            if (currentScope === Scope.JiraIssue) {
              return transformJiraIssueScope(
                scopedResponse as ServerResponse<Scope.JiraIssue>,
                isForRecentResults,
                requestDurationMs,
              );
            } else if (currentScope === Scope.JiraPlan) {
              return transformJiraPlanScope(
                (scopedResponse as ServerResponse<Scope.JiraPlan>).results,
                isForRecentResults,
                requestDurationMs,
              );
            } else if (currentScope === Scope.JiraBoardProjectFilter) {
              return transformJiraBoardProjectFilterScope(
                (scopedResponse as ServerResponse<Scope.JiraBoardProjectFilter>)
                  .results,
                isForRecentResults,
                requestDurationMs,
              );
            } else if (currentScope === Scope.JiraBoardProjectFilterPlan) {
              return transformJiraBoardProjectFilterScope(
                (scopedResponse as ServerResponse<
                  Scope.JiraBoardProjectFilterPlan
                >).results,
                isForRecentResults,
                requestDurationMs,
              );
            } else if (currentScope === Scope.JiraProject) {
              return transformJiraProjectScope(
                (scopedResponse as ServerResponse<Scope.JiraProject>).results,
                isForRecentResults,
                requestDurationMs,
              );
            } else if (currentScope === Scope.People) {
              return transformUrsPeople(
                (scopedResponse as ServerResponse<Scope.People>).results,
                isForRecentResults,
                requestDurationMs,
                sites.length > 0,
              );
            }
          }),
        ),
      }),
      {} as { [key in Scope]?: CancellablePromise<Results<key>> },
    );
  };
}

export function attributeTypeToContentType<T extends Attribute>(
  attributeType: Attribute['@type'],
): Result<T>['contentType'] {
  switch (attributeType) {
    case AttributeType.issue:
      return ContentType.JiraIssue as Result<T>['contentType'];
    case AttributeType.project:
      return ContentType.JiraProject as Result<T>['contentType'];
    case AttributeType.board:
      return ContentType.JiraBoard as Result<T>['contentType'];
    case AttributeType.filter:
      return ContentType.JiraFilter as Result<T>['contentType'];
    case AttributeType.plan:
      return ContentType.JiraPlan as Result<T>['contentType'];
    case AttributeType.people:
      return ContentType.JiraPeople as Result<T>['contentType'];
    default:
      throw new UnreachableError(attributeType);
  }
}
