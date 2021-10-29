import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import {
  SearchContext,
  ABTest,
  ScopedAggregatorResponse,
  ModelParam,
  Site,
} from './common-types';
import { Products } from '../product-context';
import { timed } from '../../common/clients/timing';
import { limitToMaxSiteUsage } from './multi-site-utils';

export interface SearchParams<SearchScope, SupportedFilters> {
  query: string;
  context: SearchContext;
  scopes: SearchScope[];
  modelParams: ModelParam[];
  resultLimit?: number;
  filters?: SupportedFilters[];
  experience: string;
  /**
   * A list of cloud ids to search. If this is empty we will use the default `cloudId` that is used to construct this client to perform the search.
   */
  sites?: string[];
}

// Type used to help unpack the types that make up an array
type Unpack<A> = A extends Array<infer E> ? E : A;
// Type used to lookup the response based on the scope
type ResponseFromScope<S, T> = S extends ScopedAggregatorResponse<infer E>
  ? T extends E
    ? S
    : never
  : never;

interface MultiscopeSearchResponse<T> {
  scopes: T[];
}

export interface SearchResponse<
  Scope,
  Response extends ScopedAggregatorResponse<Scope>,
  SearchScope
> {
  rawData: MultiscopeSearchResponse<
    ResponseFromScope<Response, Unpack<SearchScope>>
  >;
  retrieveScope<SingleScope extends Unpack<SearchScope>>(
    scope: SingleScope,
  ): ResponseFromScope<Response, SingleScope> | null;
}

export interface SearchResponseWithTiming<
  S,
  R extends ScopedAggregatorResponse<S>,
  SR
> {
  response: SearchResponse<S, R, SR>;
  requestDurationMs: number;
}

interface ScopedAbTestResponse<SupportedScopes> {
  id: SupportedScopes;
  error?: string;
  abTest: ABTest;
}

interface MultiscopeAbTestResponse<SupportedScopes> {
  scopes: ScopedAbTestResponse<SupportedScopes>[];
}

export interface ProductsPermissionsResponse<SupportedScopes> {
  products: { [key in keyof typeof Products]: SupportedScopes[] };
}

export interface AggregatorConfig {
  cloudId: string;
  siteMasterList: Site[];
  url: string;
}

export type ServerProduct = 'jira' | 'confluence';

export class AggregatorClient<
  Resp extends ScopedAggregatorResponse<Scope>,
  SupportedFilters,
  Scope = Resp['id']
> {
  private serviceConfig: ServiceConfig;

  private cloudId: string;

  private siteMasterList: Site[];

  // Static URLs
  private static readonly EXPERIMENT_URL_PATH = 'experiment/v1';

  private static readonly QUICKSEARCH_API_URL = 'quicksearch/v1';

  private static readonly SCOPES_API_URL = 'scopes/v1';

  constructor({ url, cloudId, siteMasterList }: AggregatorConfig) {
    this.serviceConfig = { url: url };
    this.cloudId = cloudId;
    this.siteMasterList = siteMasterList;
  }

  public async getAbTestData(
    scope: Scope,
    experience: string,
  ): Promise<ABTest | null> {
    const body = {
      cloudId: this.cloudId,
      scopes: [scope],
      experience,
    };

    const response = await this.makeRequest<MultiscopeAbTestResponse<Scope>>(
      AggregatorClient.EXPERIMENT_URL_PATH,
      body,
    );

    const scopeWithAbTest:
      | ScopedAbTestResponse<Scope>
      | undefined = response.scopes.find((s) => s.id === scope);

    const abTestPromise = scopeWithAbTest
      ? Promise.resolve(scopeWithAbTest.abTest)
      : Promise.resolve(null);

    return abTestPromise;
  }

  public async getProductPermissions(
    products: Products[],
    experience: string,
  ): Promise<Products[]> {
    if (products.length === 0) {
      return Promise.resolve(products);
    }

    try {
      const response = await this.makeRequest<
        ProductsPermissionsResponse<Scope>
      >(AggregatorClient.SCOPES_API_URL, {
        cloudId: this.cloudId,
        productIds: products.map((product) => product.toLowerCase()),
        experience,
      });

      const allowedProductKeys = Object.keys(response.products) as Array<
        keyof typeof Products
      >;

      return Promise.resolve(
        allowedProductKeys
          .filter((product) => response.products[product].length > 0)
          .map((product) => product.toUpperCase() as Products),
      );
    } catch (e) {
      return Promise.resolve([]);
    }
  }

  public async search<SearchScope extends Scope>({
    query,
    context,
    scopes,
    modelParams,
    resultLimit,
    filters = [],
    experience,
    sites = [],
  }: SearchParams<SearchScope, SupportedFilters>): Promise<
    SearchResponseWithTiming<Scope, Resp, SearchScope>
  > {
    const cloudId = this.cloudId;
    const cloudIdsToFilterOn =
      sites.length > 0
        ? sites
        : limitToMaxSiteUsage(this.siteMasterList).map((site) => site.cloudId);
    const body = {
      query: query,
      cloudId,
      limit: resultLimit,
      scopes,
      filters: filters,
      searchSession: context,
      ...(modelParams.length > 0 ? { modelParams } : {}),
      experience,
      cloudIds: cloudIdsToFilterOn,
    };

    const { result: response, durationMs: requestDurationMs } = await timed(
      this.makeRequest<
        MultiscopeSearchResponse<ResponseFromScope<Resp, Unpack<SearchScope>>>
      >(AggregatorClient.QUICKSEARCH_API_URL, body),
    );

    return {
      response: {
        rawData: response,
        retrieveScope: (scope) =>
          response.scopes.find((s) => s.id === scope) || null,
      },
      requestDurationMs,
    };
  }

  private async makeRequest<T>(path: string, body: object): Promise<T> {
    const options: RequestServiceOptions = {
      path,
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    };

    const results = await utils.requestService<T>(this.serviceConfig, options);

    return results;
  }
}
