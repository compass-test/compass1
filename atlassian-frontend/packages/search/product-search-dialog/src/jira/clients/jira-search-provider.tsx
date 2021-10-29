import React, {
  createContext,
  useContext,
  useMemo,
  FunctionComponent,
} from 'react';
import deepEqual from 'deep-equal';
import memo from 'memoize-one';

import {
  JiraCurrentUserClient,
  UserResponse,
} from './jira-current-user-client';
import { JiraSearchClient } from './jira-search-client';

import {
  CollaborationGraphConfig,
  CollaborationGraphClient,
  Site,
  extractSiteUrl,
} from '../../common/clients';
import { Results, Scope } from './response-types';

const ERROR_MESSAGE =
  'Jira search client has not been instantiated. This is most likely because you are missing a JiraSearchClientProvider.';

interface SearchClientContext {
  cloudId: string;
  collabGraphClient: CollaborationGraphClient;
  currentUserClient?: JiraCurrentUserClient;
  sites: Array<Site>;
  searchClient: JiraSearchClient;
  siteUrl: string;
}

const defaultCollaborationGraphConfig = {
  collaborationGraphUrl: 'gateway/api/collaboration',
  useCollaborationGraphForRecents: false,
};

const getCollabGraphClientWithConfig = memo(
  (config: CollaborationGraphConfig) =>
    new CollaborationGraphClient({
      collaborationGraphUrl: config.collaborationGraphUrl,
      cloudId: config.cloudId,
      isMultiSite: config.isMultiSite,
      sites: config.sites,
    }),
  deepEqual,
);

export const JiraSearchClientContext = createContext<
  Partial<SearchClientContext>
>({});

export interface SearchClientConfig {
  /**
   * The account id of the current user.
   */
  accountId?: string;

  /**
   * The url of the aggregator to call. This should be /gateway/api/xpsearch-aggregator unless there's a good reason to override this (e.g. in tests)
   */
  aggregatorUrl: string;

  /**
   * The base url of the instance.
   */
  baseUrl: string;

  /**
   * This represents the instance to search against when `sites` is not provided. When `sites` is provided this will be used to provide contextual information for the search.
   */
  cloudId: string;

  /**
   * Overrides the default url to the collaboration graph. Typically this should only be used for tests.
   */
  collaborationGraphUrl?: string;

  /**
   * Whether the user is anonymous. Search results may differ for anonymous user.
   */
  isUserAnonymous: boolean;

  /**
   * An override to provide a custom getter for retrieving recent issues.
   */
  recentIssuesSupplier?: () => Promise<Results<Scope.JiraIssue>>;

  /**
   * An override to provide a custom getter for retrieving details for the current user.
   */
  currentUserSupplier?: () => Promise<UserResponse>;

  /**
   * The site url of the instance without a trailing '/'
   */
  siteUrl?: string;

  /**
   * A list of sites to search against. If this is not provided the `cloudId` will be used to determine what instance to search against.
   */
  sites?: Site[];
}

const DEFAULT_SITES: Site[] = [];

export const JiraSearchClientProvider: FunctionComponent<SearchClientConfig> = ({
  aggregatorUrl,
  cloudId,
  isUserAnonymous,
  collaborationGraphUrl,
  children,
  baseUrl,
  accountId,
  siteUrl = '',
  recentIssuesSupplier,
  currentUserSupplier,
  sites = DEFAULT_SITES,
}) => {
  siteUrl = useMemo(() => extractSiteUrl({ siteUrl, sites }), [siteUrl, sites]);

  const searchClient = useMemo(
    () =>
      new JiraSearchClient({
        siteMasterList: sites,
        url: aggregatorUrl,
        cloudId,
        isUserAnonymous,
        recentIssuesSupplier,
        siteUrl,
      }),
    [
      aggregatorUrl,
      cloudId,
      isUserAnonymous,
      recentIssuesSupplier,
      siteUrl,
      sites,
    ],
  );

  const collabGraphClient = getCollabGraphClientWithConfig({
    // If no collaborationGraphUrl is passed as a prop, use the fallback (default) URL
    collaborationGraphUrl:
      collaborationGraphUrl ||
      defaultCollaborationGraphConfig.collaborationGraphUrl,
    cloudId: cloudId,
    isMultiSite: sites.length > 1,
    sites,
  });

  const currentUserClient = useMemo(
    () =>
      accountId
        ? new JiraCurrentUserClient({ accountId, baseUrl, currentUserSupplier })
        : undefined,
    [accountId, baseUrl, currentUserSupplier],
  );

  return (
    <JiraSearchClientContext.Provider
      value={{
        searchClient,
        collabGraphClient,
        currentUserClient,
        siteUrl,
        cloudId,
        sites,
      }}
    >
      {children}
    </JiraSearchClientContext.Provider>
  );
};

export const withClients = <T extends SearchClientContext>(
  Component: React.ComponentType<T>,
) => {
  type PropsExcludedClients = Omit<T, 'searchClient' | 'collabGraphClient'>;

  return (props: PropsExcludedClients) => (
    <JiraSearchClientContext.Consumer>
      {({
        searchClient,
        collabGraphClient,
        currentUserClient,
        cloudId,
        sites,
      }) => {
        if (!searchClient) {
          throw new Error(ERROR_MESSAGE);
        }

        const { ...rest } = props;
        return (
          <Component
            {...(rest as any)}
            searchClient={searchClient}
            collabGraphClient={collabGraphClient}
            currentUserClient={currentUserClient}
            cloudId={cloudId}
            sites={sites}
          />
        );
      }}
    </JiraSearchClientContext.Consumer>
  );
};

export function useJiraSearchClientContext() {
  const {
    searchClient,
    collabGraphClient,
    currentUserClient,
    siteUrl,
    sites,
    cloudId,
  } = useContext(JiraSearchClientContext);
  if (!searchClient) {
    throw new Error(ERROR_MESSAGE);
  }
  return {
    searchClient,
    collabGraphClient,
    currentUserClient,
    siteUrl,
    cloudId,
    sites,
  } as SearchClientContext;
}
