import React, { FunctionComponent } from 'react';
import {
  ConfluenceSearchClient,
  ConfluenceSearchClientConfig,
} from './confluence-search-client';
import memo from 'memoize-one';
import deepEqual from 'deep-equal';
import {
  CollaborationGraphConfig,
  CollaborationGraphClient,
  Site,
  extractSiteUrl,
} from '../../common/clients';
import { ConfItemResults } from './response-types';

export interface SearchClientContext {
  searchClient: ConfluenceSearchClient;
  collabGraphClient: CollaborationGraphClient;
  siteUrl: string;
  cloudId: string;
  sites: Array<Site>;
}

export interface SearchClientConfig {
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
   * An override to provide a custom getter for retrieving recent confluence pages, blogs and attachments.
   */
  recentItemsSupplier?: () => Promise<ConfItemResults>;

  /**
   * Whether to use collaboration graph results instead of Confluence's recents endpoint to determine recent items.
   *
   * This should be set to true when used outside of a Jira or Confluence context.
   */
  useCollaborationGraphForRecents?: boolean;

  /**
   * The site url of the instance without a trailing '/'
   */
  siteUrl?: string;

  /**
   * A list of sites to search against. If this is not provided the `cloudId` will be used to determine what instance to search against.
   */
  sites?: Site[];
}

const defaultCollaborationGraphConfig = {
  collaborationGraphUrl: 'gateway/api/collaboration',
  useCollaborationGraphForRecents: false,
};

const getSearchClientWithConfig = memo(
  (
    config: ConfluenceSearchClientConfig,
    collabGraphClient: CollaborationGraphClient,
  ) => new ConfluenceSearchClient(config, collabGraphClient),
  deepEqual,
);

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

export const ConfluenceSearchClientsContext = React.createContext<
  Partial<SearchClientContext>
>({});

const MISSING_PROVIDER_ERROR = new Error(
  `Could not find all required Clients, make sure ConfluenceClientsProvider is created further up the tree`,
);

export interface ConfluenceClientsSupplierProps {
  children: (clients: SearchClientContext) => JSX.Element;
}

export const withClients = <T extends Partial<SearchClientContext>>(
  Component: React.ComponentType<T>,
) => {
  type PropsExcludedClients = Omit<T, 'searchClient' | 'collabGraphClient'>;

  return (props: PropsExcludedClients) => (
    <ConfluenceSearchClientsContext.Consumer>
      {({ searchClient, cloudId, siteUrl = '', sites }) => {
        if (!searchClient) {
          throw MISSING_PROVIDER_ERROR;
        }

        const { ...rest } = props;

        return (
          <Component
            {...(rest as any)}
            searchClient={searchClient}
            cloudId={cloudId}
            siteUrl={siteUrl}
            sites={sites}
          />
        );
      }}
    </ConfluenceSearchClientsContext.Consumer>
  );
};

export interface ConfluenceClientsProviderProps {
  config: SearchClientConfig;
}

export const ConfluenceClientsProvider: FunctionComponent<ConfluenceClientsProviderProps> = ({
  children,
  config,
}) => {
  const {
    cloudId,
    collaborationGraphUrl,
    aggregatorUrl,
    isUserAnonymous,
    useCollaborationGraphForRecents,
    sites = [],
  } = {
    ...defaultCollaborationGraphConfig,
    ...config,
  };

  const siteUrl = extractSiteUrl(config);

  const collabGraphClient = getCollabGraphClientWithConfig({
    collaborationGraphUrl: collaborationGraphUrl,
    cloudId: cloudId,
    isMultiSite: sites.length > 1,
    sites,
  });

  return (
    <ConfluenceSearchClientsContext.Provider
      value={{
        searchClient: getSearchClientWithConfig(
          {
            isUserAnonymous: isUserAnonymous,
            url: aggregatorUrl,
            cloudId: cloudId,
            isCollaborationGraphEnabled: useCollaborationGraphForRecents,
            siteMasterList: sites,
          },
          collabGraphClient,
        ),
        collabGraphClient: collabGraphClient,
        siteUrl,
        cloudId,
        sites,
      }}
    >
      {children}
    </ConfluenceSearchClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = React.useContext(ConfluenceSearchClientsContext);

  if (!context.searchClient) {
    throw MISSING_PROVIDER_ERROR;
  }

  return context as SearchClientContext;
};
