import uniqBy from 'lodash/uniqBy';
import {
  AggregatorClient,
  AggregatorConfig,
  SearchContext,
  ABTest,
  responseErrorToError,
} from '../../common/clients';
import {
  AllFilters,
  SpaceFiltersInterface,
  UserFiltersInterface,
} from './filter-types';
import {
  Scope,
  SupportedScopedResponses,
  PersonResult,
  Person,
  ResultPerson,
  ConfItemResults,
  ConfSpaceResults,
  ConfPeopleResults,
  ConfItemResponse,
  ResultConfluence,
  ContentType,
  ConfluenceObjectResult,
  ConfUrsPeopleResponse,
  ConfPeopleResponse,
  GenericContainerResult,
  ConfluenceSpace,
  ConfSpaceResponse,
  RecentPerson,
} from './response-types';
import { Products } from '../../common/product-context';
import CancellablePromise from '../../utils/cancellable-promise';
import { SimpleCache } from '../../utils/simple-cache';
import { CollaborationGraphClient } from '../../common/clients/collaboration-graph-client';
import {
  CollaborationGraphResponse,
  CollaborationGraphUser,
  ModelParam,
  Site,
} from '../../common/clients/common-types';
import {
  generatePeopleProfileUrl,
  mapTenantIdToSiteUrl,
} from '../../common/clients/multi-site-utils';

export type FilterType = 'space' | 'contributor';

export interface Filter {
  id: string;
  type: FilterType;
}

export type ConfluenceSearchClientConfig = AggregatorConfig & {
  isUserAnonymous: boolean;
  isCollaborationGraphEnabled: boolean;
  siteMasterList: Site[];
};

const NAVIGATION_V3_EXPERIENCE = 'confluence.nav-v3';

interface ConfluenceSearchResponse {
  [Scope.ConfluencePageBlogAttachment]: CancellablePromise<ConfItemResults>;
  [Scope.ConfluenceSpace]: CancellablePromise<ConfSpaceResults>;
  [Scope.People]: CancellablePromise<ConfPeopleResults>;
}

const EMPTY_RESULT_PROMISE = Promise.resolve({
  items: [],
  timings: 0,
});

export class ConfluenceSearchClient {
  private static readonly ITEM_RESULT_LIMIT = 30;

  private static readonly SPACE_RESULT_LIMIT = 10;

  private static readonly PEOPLE_RESULT_LIMIT = 10;

  private aggregatorClient: AggregatorClient<
    SupportedScopedResponses,
    AllFilters
  >;

  private siteMasterList: Site[];

  private collaborationGraphClient: CollaborationGraphClient;

  private isCollabGraphEnabled: boolean;

  private isUserAnonymous: boolean;

  private bootstrapPeopleCache: SimpleCache<
    Promise<ConfPeopleResults>,
    [SearchContext, Site[]]
  >;

  private abTestDataCache: ABTest | null = null;

  private permissionsDataCache: Products[] | null = null;

  constructor(
    config: ConfluenceSearchClientConfig,
    collabGraphClient: CollaborationGraphClient,
  ) {
    const { siteMasterList } = config;
    this.aggregatorClient = new AggregatorClient(config);
    this.isUserAnonymous = config.isUserAnonymous;
    this.bootstrapPeopleCache = new SimpleCache(this.recentPeopleSupplier);
    this.siteMasterList = siteMasterList;
    this.collaborationGraphClient = collabGraphClient;
    this.isCollabGraphEnabled = config.isCollaborationGraphEnabled;
  }

  /**
   * Makes a search across all relevant scopes.
   */
  public search(
    query: string,
    filters: Filter[],
    context: SearchContext,
    queryVersion: number,
    sites: Site[],
  ): ConfluenceSearchResponse {
    const modelParams = [
      {
        '@type': 'queryParams',
        queryVersion,
      },
    ];

    if (filters.length > 0) {
      return this.searchWithFilters(
        query,
        filters,
        context,
        modelParams,
        sites,
      );
    }

    const scopes = [
      Scope.ConfluencePageBlogAttachment,
      Scope.ConfluenceSpace,
      Scope.People,
    ];

    const responseAndTiming = this.aggregatorClient.search({
      query,
      context,
      scopes,
      modelParams,
      resultLimit: ConfluenceSearchClient.ITEM_RESULT_LIMIT,
      filters: [],
      experience: NAVIGATION_V3_EXPERIENCE,
      sites: sites.length > 0 ? sites.map((s) => s.cloudId) : undefined,
    });

    const allResults = {
      [Scope.ConfluencePageBlogAttachment]: CancellablePromise.from(
        responseAndTiming.then(({ response, requestDurationMs }) =>
          this.mapConfItem(
            response.retrieveScope(Scope.ConfluencePageBlogAttachment),
            requestDurationMs,
          ),
        ),
      ),
      [Scope.ConfluenceSpace]: CancellablePromise.from(
        responseAndTiming.then(({ response, requestDurationMs }) =>
          this.mapConfSpace(
            response.retrieveScope(Scope.ConfluenceSpace),
            requestDurationMs,
          ),
        ),
      ),
      [Scope.People]: CancellablePromise.from(
        responseAndTiming.then(({ response, requestDurationMs }) =>
          this.mapCpusPeople(
            response.retrieveScope(Scope.People),
            requestDurationMs,
            sites.length > 0,
          ),
        ),
      ),
    };

    return allResults;
  }

  public searchSpaces(
    query: string,
    context: SearchContext,
    sites: Site[],
  ): CancellablePromise<ConfSpaceResults> {
    const scopes = [Scope.ConfluenceSpace];

    const responseAndTiming = this.aggregatorClient.search({
      query,
      context,
      scopes,
      modelParams: [],
      resultLimit: ConfluenceSearchClient.SPACE_RESULT_LIMIT,
      filters: [],
      experience: NAVIGATION_V3_EXPERIENCE,
      sites: sites.length > 0 ? sites.map((s) => s.cloudId) : undefined,
    });

    return CancellablePromise.from(
      responseAndTiming.then(({ response, requestDurationMs }) =>
        this.mapConfSpace(
          response.retrieveScope(Scope.ConfluenceSpace),
          requestDurationMs,
        ),
      ),
    );
  }

  public searchUsers(
    query: string,
    context: SearchContext,
    sites: Site[],
  ): CancellablePromise<ConfPeopleResults> {
    const scopes = [Scope.People];

    const responseAndTiming = this.aggregatorClient.search({
      query,
      context,
      scopes,
      modelParams: [],
      resultLimit: ConfluenceSearchClient.PEOPLE_RESULT_LIMIT,
      filters: [],
      experience: NAVIGATION_V3_EXPERIENCE,
      sites: sites.length > 0 ? sites.map((s) => s.cloudId) : undefined,
    });

    return CancellablePromise.from(
      responseAndTiming.then(({ response, requestDurationMs }) =>
        this.mapCpusPeople(
          response.retrieveScope(Scope.People),
          requestDurationMs,
          sites.length > 0,
        ),
      ),
    );
  }

  private searchWithFilters: (
    query: string,
    filters: Filter[],
    context: SearchContext,
    modelParams: ModelParam[],
    sites: Site[],
  ) => ConfluenceSearchResponse = (
    query,
    filters,
    context,
    modelParams,
    sites,
  ) => {
    const scopes = [Scope.ConfluencePageBlogAttachment];

    const allFilters: (SpaceFiltersInterface | UserFiltersInterface)[] = [];
    let baseSpaceFilters: SpaceFiltersInterface | null = null;
    let baseUserFilters: UserFiltersInterface | null = null;

    filters.forEach((filter) => {
      switch (filter.type) {
        case 'space':
          if (!baseSpaceFilters) {
            baseSpaceFilters = {
              '@type': 'spaces',
              spaceKeys: [],
            };
            allFilters.push(baseSpaceFilters);
          }

          baseSpaceFilters.spaceKeys.push(filter.id);
          break;
        case 'contributor':
          if (!baseUserFilters) {
            baseUserFilters = {
              '@type': 'contributors',
              accountIds: [],
            };
            allFilters.push(baseUserFilters);
          }

          baseUserFilters.accountIds.push(filter.id);
          break;
        default: {
          break;
        }
      }
    });

    const responseAndTiming = this.aggregatorClient.search({
      query,
      context,
      scopes,
      modelParams,
      resultLimit: ConfluenceSearchClient.ITEM_RESULT_LIMIT,
      filters: allFilters,
      experience: NAVIGATION_V3_EXPERIENCE,
      sites: sites.length > 0 ? sites.map((s) => s.cloudId) : undefined,
    });

    const results = {
      [Scope.ConfluencePageBlogAttachment]: CancellablePromise.from(
        responseAndTiming.then(({ response, requestDurationMs }) =>
          this.mapConfItem(
            response.retrieveScope(Scope.ConfluencePageBlogAttachment),
            requestDurationMs,
          ),
        ),
      ),
      [Scope.ConfluenceSpace]: CancellablePromise.from(EMPTY_RESULT_PROMISE),
      [Scope.People]: CancellablePromise.from(EMPTY_RESULT_PROMISE),
    };

    return results;
  };

  public getRecentPeople(
    context: SearchContext,
    sites: Site[],
  ): CancellablePromise<ConfPeopleResults> {
    const { fromCache, value } = this.bootstrapPeopleCache.get(context, sites);
    return new CancellablePromise(
      value.then((results) => ({ ...results, isCached: fromCache })),
    );
  }

  public recentPeopleSupplier: (
    context: SearchContext,
    sites: Site[],
  ) => Promise<ConfPeopleResults> = (context, sites) => {
    if (this.isUserAnonymous) {
      return Promise.resolve({
        items: [],
        timings: 0,
      });
    }

    if (this.isCollabGraphEnabled) {
      return this.collaborationGraphClient
        .getUsers()
        .then((response) => this.mapCollabGraphPeople(response));
    }

    return this.aggregatorClient
      .search({
        query: '',
        context,
        scopes: [Scope.UserConfluence],
        modelParams: [],
        resultLimit: ConfluenceSearchClient.PEOPLE_RESULT_LIMIT,
        experience: NAVIGATION_V3_EXPERIENCE,
        sites: sites?.map((s) => s.cloudId),
      })
      .then(({ response, requestDurationMs }) =>
        this.mapUrsPeople(
          response.retrieveScope(Scope.UserConfluence),
          requestDurationMs,
          sites.length > 0,
        ),
      );
  };

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
      Scope.ConfluencePageBlogAttachment,
      NAVIGATION_V3_EXPERIENCE,
    );

    this.abTestDataCache = abTest;

    return abTest;
  }

  private mapConfItem(
    response: ConfItemResponse | null,
    timings: number,
  ): ConfItemResults {
    if (!response) {
      throw new Error(
        `Expected a response but did not get any for scope: ${Scope.ConfluencePageBlogAttachment}`,
      );
    }

    if (response.error) {
      throw responseErrorToError(response.error);
    }

    function removeHighlightTags(text: string): string {
      return text.replace(/@@@hl@@@|@@@endhl@@@/g, '');
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const items = response.results.map((item) => ({
      resultId: item.content!.id, // content always available for pages/blogs/attachments // TODO
      name: removeHighlightTags(item.title),
      href: `${item.baseUrl}${item.url}`,
      containerName: item.container.title,
      analyticsType: ResultConfluence,
      contentType: `confluence-${item.content!.type}` as ContentType,
      resultType: ConfluenceObjectResult,
      containerId:
        item.content!.space && item.content!.space!.id
          ? item.content!.space!.id
          : 'UNAVAILABLE',
      iconClass: item.iconCssClass,
      lastModified: item.lastModified,
      isRecentResult: false,
    }));
    /* eslint-enable */

    return {
      items,
      totalSize:
        response.size !== undefined ? response.size : response.results.length,
      timings,
    };
  }

  private mapUrsPeople = (
    response: ConfUrsPeopleResponse | null,
    timings: number,
    isMultiSite: boolean,
  ): ConfPeopleResults => {
    if (!response) {
      throw new Error(
        `Expected a response but did not get any for scope: ${Scope.UserConfluence}`,
      );
    }

    if (response.error) {
      throw responseErrorToError(response.error);
    }

    const items = response.results.map((item) => ({
      resultType: PersonResult,
      resultId: `people-${item.id}`,
      userId: item.id,
      name: item.name,
      href: generatePeopleProfileUrl(isMultiSite, item.absoluteUrl, item.id),
      avatarUrl: item.avatarUrl,
      contentType: Person,
      analyticsType: ResultPerson,
      mentionName: item.nickname || '',
      presenceMessage: '',
    }));

    return {
      items: uniqBy(items, (item) => item.resultId),
      timings,
    };
  };

  private mapCpusPeople(
    response: ConfPeopleResponse | null,
    timings: number,
    isMultiSite: boolean,
  ): ConfPeopleResults {
    if (!response) {
      throw new Error(
        `Expected a response but did not get any for scope: ${Scope.People}`,
      );
    }

    if (response.error) {
      throw responseErrorToError(response.error);
    }

    const items = response.results.map((item) => {
      const mention = item.nickname || item.name;

      return {
        resultType: PersonResult,
        resultId: `people-${item.account_id}`,
        userId: item.account_id,
        name: item.name,
        href: generatePeopleProfileUrl(
          isMultiSite,
          item.absoluteUrl,
          item.account_id,
        ),
        avatarUrl: item.picture,
        contentType: Person,
        analyticsType: ResultPerson,
        mentionName: mention,
        presenceMessage: item.job_title || '',
      };
    });

    return {
      items: uniqBy(items, (item) => item.resultId),
      timings,
    };
  }

  private mapCollabGraphPeople = (
    response: CollaborationGraphResponse<CollaborationGraphUser>,
  ): ConfPeopleResults => {
    const items = response.collaborationGraphEntities.map((item) => ({
      resultId: item.userProfile.account_id,
      userId: item.userProfile.account_id,
      name: item.userProfile.name,
      href: `${mapTenantIdToSiteUrl(item.siteId, this.siteMasterList)}/people/${
        item.userProfile.account_id
      }`,
      analyticsType: RecentPerson,
      mentionName: item.userProfile.name,
      presenceMessage: item.userProfile.name,
      resultType: PersonResult,
      avatarUrl: item.userProfile.picture,
      contentType: Person,
    }));

    return {
      items,
      timings: response.timings,
    };
  };

  private mapConfSpace(
    response: ConfSpaceResponse | null,
    timings: number,
  ): ConfSpaceResults {
    if (!response) {
      throw new Error(
        `Expected a response but did not get any for scope: ${Scope.ConfluenceSpace}`,
      );
    }

    if (response.error) {
      throw responseErrorToError(response.error);
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const items = response.results.map((item) => ({
      resultId: `space-${item.space!.key}`, // space is always defined for space results
      avatarUrl: `${item.baseUrl}${item.space!.icon.path}`,
      name: item.container.title,
      href: `${item.baseUrl || ''}${item.container.displayUrl}`,
      analyticsType: ResultConfluence,
      resultType: GenericContainerResult,
      contentType: ConfluenceSpace,
      key: item.space!.key, // TODO
    }));
    /* eslint-enable */

    return {
      items,
      timings,
    };
  }
}
