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
import { timed } from './timing';
import { limitToMaxSiteUsage } from './multi-site-utils';
import { batchMethod } from './api-batch';
import { getFetchProductPermissions } from './enabled-scopes';

export interface SearchParams<SearchScopes, SupportedFilters> {
  query: string;
  context: SearchContext;
  scopes: SearchScopes;
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
  useGetForScopesAPI?: boolean;
}

export type ServerProduct = 'jira' | 'confluence';

interface ProductPermissions {
  productIds: string[];
  experience: string;
}

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

    const response = await this.makePostRequest<
      MultiscopeAbTestResponse<Scope>
    >(AggregatorClient.EXPERIMENT_URL_PATH, body);

    const scopeWithAbTest:
      | ScopedAbTestResponse<Scope>
      | undefined = response.scopes.find((s) => s.id === scope);

    const abTestPromise = scopeWithAbTest
      ? Promise.resolve(scopeWithAbTest.abTest)
      : Promise.resolve(null);

    return abTestPromise;
  }

  /**
   * Get a list of permitted scopes for the supplied product.
   *
   * Consumers should favour {@link batchedGetExtensibleProductPermission}, to batch
   * multiple scopes calls into one. {@link getProductScopes} may be used when a caller
   * explicitly wants a separate REST call to fetch scopes. One example may be if a product
   * has different scopes caching rules to other products.
   *
   * @param productId the product id to lookup scopes for
   * @param experience the experience this UI represents
   * @returns a promise of a list of scopes for the supplied product
   */
  public async getProductScopes(
    productId: string,
    experience: string,
  ): Promise<string[]> {
    const productScopeMap = await this.getGenericProductPermissions({
      productIds: [productId],
      experience,
    });

    return productScopeMap.get(productId) || [];
  }

  /**
   * Returns a list of {@link Products} which the user should see in the dialog
   *
   * @deprecated consumers should use {@link batchedGetExtensibleProductPermission} to fetch product scopes, or
   * {@link getProductScopes} to force a separate call to fetch a single product's scopes.
   *
   */
  public async getProductPermissions(
    products: Products[],
    experience: string,
  ): Promise<Products[]> {
    const lowercaseProductIds = products.map((p) => p.toLowerCase());

    const productScopeMap = await this.getGenericProductPermissions({
      productIds: lowercaseProductIds,
      experience,
    });

    return lowercaseProductIds
      .filter((product) => productScopeMap.get(product)?.length)
      .map((product) => product.toUpperCase() as Products);
  }

  private getGenericProductPermissions = async (
    args: ProductPermissions,
  ): Promise<Map<string, string[]>> => {
    return getFetchProductPermissions(this.makeGetRequest)(
      args.productIds,
      this.cloudId,
      args.experience,
    );
  };

  public batchedGetExtensibleProductPermission = batchMethod<
    ProductPermissions,
    Map<string, string[]>,
    string[]
  >(
    (args) => {
      const emptyProductPermissions = {
        productIds: [],
        experience: '',
      };

      if (args.length === 0) {
        return emptyProductPermissions;
      }

      return args.reduce<ProductPermissions>((acc, arg) => {
        return {
          productIds: [...acc.productIds, ...arg.productIds],
          experience: arg.experience,
        };
      }, emptyProductPermissions);
    },
    this.getGenericProductPermissions,
    (response, id) => response.get(id) || [],
  );

  public async search<SearchScopes extends Scope[]>({
    query,
    context,
    scopes,
    modelParams,
    resultLimit,
    filters = [],
    experience,
    sites = [],
  }: SearchParams<SearchScopes, SupportedFilters>): Promise<
    SearchResponseWithTiming<Scope, Resp, SearchScopes>
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
      this.makePostRequest<
        MultiscopeSearchResponse<ResponseFromScope<Resp, Unpack<SearchScopes>>>
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

  private makePostRequest = <T,>(path: string, body: object): Promise<T> => {
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
    return utils.requestService<T>(this.serviceConfig, options);
  };

  private makeGetRequest = <T,>(path: string): Promise<T> => {
    const options: RequestServiceOptions = {
      path,
      requestInit: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    };
    return utils.requestService<T>(this.serviceConfig, options);
  };
}
