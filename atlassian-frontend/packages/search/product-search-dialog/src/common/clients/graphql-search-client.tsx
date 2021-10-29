import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import {
  SearchContext,
  ScopedAggregatorResponse,
  ModelParam,
  Site,
} from './common-types';
import { Products } from '../product-context';
import { timed } from './timing';
import { limitToMaxSiteUsage } from './multi-site-utils';
import {
  sitesToLocations,
  SEARCH_QUERY,
  ConfluenceGraphQLFilters,
} from './graphql-tools';

export { CONFLUENCE_ITEM_ENTITIES } from './graphql-tools';

export interface SearchParams {
  query: string;
  context: SearchContext;
  entities: string[];
  modelParams: ModelParam[];
  resultLimit?: number;
  filters?: ConfluenceGraphQLFilters[];
  experience: string;
  /**
   * A list of cloud ids to search. If this is empty we will use the default `cloudId` that is used to construct this client to perform the search.
   */
  sites?: string[];
}

export interface SearchGraphQLResponse {
  // TODO : type the GraphQL response
}

export interface SearchResponseWithTiming {
  response: SearchGraphQLResponse;
  requestDurationMs: number;
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

export class GraphQLClient<
  Resp extends ScopedAggregatorResponse<Scope>,
  Scope = Resp['id']
> {
  private serviceConfig: ServiceConfig;

  private cloudId: string;

  private siteMasterList: Site[];

  // Static URLs

  private static readonly GRAPHQL_API_URL = 'graphql';

  constructor({ url, cloudId, siteMasterList }: AggregatorConfig) {
    this.serviceConfig = { url: url };
    this.cloudId = cloudId;
    this.siteMasterList = siteMasterList;
  }

  public async search({
    query,
    // todo
    context,
    entities,
    // todo
    modelParams,
    // todo
    resultLimit,
    filters,
    experience,
    sites = [],
  }: SearchParams): Promise<SearchGraphQLResponse> {
    const cloudId = this.cloudId;
    const cloudIdsToFilterOn =
      sites.length > 0
        ? sites
        : limitToMaxSiteUsage(this.siteMasterList).map((site) => site.cloudId);

    const locations = sitesToLocations(cloudIdsToFilterOn, cloudId);

    const body = {
      query: SEARCH_QUERY,
      variables: {
        locations,
        entities,
        query,
        confluenceFilters: filters,
        experience,
      },
    };

    const { result: response, durationMs: requestDurationMs } = await timed(
      this.makePostRequest<SearchGraphQLResponse>(
        GraphQLClient.GRAPHQL_API_URL,
        body,
      ),
    );

    return {
      response: {
        rawData: response,
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
}
