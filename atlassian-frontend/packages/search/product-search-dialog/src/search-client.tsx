// This is a thin wrapper around `base-search-client` to expose it externally.
// At the moment this is considered a pseudo API so be wary if making changes here to method signatures.
import * as ConfTypes from './confluence/clients/response-types';
import * as JiraTypes from './jira/clients/response-types';

import {
  AggregatorClient,
  SearchResponseWithTiming,
} from './common/clients/base-search-client';

export interface Config {
  /**
   * The cloud id of the instance you're searching for
   */
  cloudId: string;
  /**
   * The URL to the search backend (xpsearch-aggregator).
   * This is entirely optional and is used to override the default URL when you need to make a request to a specific xpsearch-aggregator.
   */
  aggregatorUrl?: string;
}

type AllSupportedResponseAndScopes =
  | ConfTypes.SupportedScopedResponses
  | JiraTypes.SupportedResponseTypes;

export type PageBlogAttachmentResponse = ConfTypes.ConfItemResponse;
export type PageBlogResponse = ConfTypes.ConfItemResponse;
export type SpaceResponse = ConfTypes.ConfSpaceResponse;
export type ConfluenceUrsResponse = ConfTypes.ConfUrsPeopleResponse;
export type ConfluencePeopleResponse = ConfTypes.ConfPeopleResponse;

export type IssueResponse = JiraTypes.ServerResponse<JiraTypes.Scope.JiraIssue>;
export type ProjectResponse = JiraTypes.ServerResponse<
  JiraTypes.Scope.JiraProject
>;
export type BoardProjectFilterResponse = JiraTypes.ServerResponse<
  JiraTypes.Scope.JiraBoardProjectFilter
>;
export type JiraPeopleResponse = JiraTypes.ServerResponse<
  JiraTypes.Scope.People
>;

export type Scope = AllSupportedResponseAndScopes['id'];
export const Scope = { ...ConfTypes.Scope, ...JiraTypes.Scope };

export interface SeachAnalyticParams {
  /**
   * Used to tag analytics so it can be differentiated with other consumers of search,
   * Example: 'media-editor' or 'portfolio-search'
   */
  identifier: string;
  /**
   * This is used to group together multiple searches.
   * If used this should be a UUID.
   *
   * Note that the search client does not maintain any logic as to when this is invalidated it only guarantees that this is passed
   * to the backend.
   */
  sessionId?: string;
}

interface SearchParams<SearchScopes extends Scope[]> {
  /**
   * The query to search for.
   */
  query: string;
  /**
   * The types of entities to search for.
   */
  scopes: SearchScopes;
  /**
   * Meta information for analytic purposes.
   */
  analytics: SeachAnalyticParams;
  /**
   * The number of results to find, this applies to every scope that is being searched for.
   */
  resultLimit?: number;
}

export interface SearchClient {
  search<SearchScopes extends Scope[]>(
    params: SearchParams<SearchScopes>,
  ): Promise<
    SearchResponseWithTiming<Scope, AllSupportedResponseAndScopes, SearchScopes>
  >;
}

/**
 * Creates a search client.
 *
 * This operation is considered expensive and it's recommended that the resulting client is reused.
 */
export const createClient: (config: Config) => SearchClient = ({
  cloudId,
  aggregatorUrl,
}) => {
  const aggregatorClient: AggregatorClient<
    AllSupportedResponseAndScopes,
    []
  > = new AggregatorClient({
    cloudId,
    url: aggregatorUrl || '/gateway/api/xpsearch-aggregator',
    siteMasterList: [],
  });

  async function search<SearchScopes extends Scope[]>({
    query,
    scopes,
    resultLimit,
    analytics,
  }: SearchParams<SearchScopes>) {
    return aggregatorClient.search<SearchScopes>({
      query,
      context: {
        sessionId: analytics.sessionId ? analytics.sessionId : 'not-applicable',
        referrerId: null,
      },
      scopes,
      modelParams: [],
      resultLimit,
      filters: [],
      experience: `external-${analytics.identifier}`,
    });
  }

  return {
    search,
  };
};
