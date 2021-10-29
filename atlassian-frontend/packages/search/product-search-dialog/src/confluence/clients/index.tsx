export { ConfluenceSearchClient } from './confluence-search-client';
export {
  Scope,
  ConfluencePage,
  ConfluenceBlogpost,
  ConfluenceAttachment,
  ConfluenceObjectResult,
  RecentConfluence,
} from './response-types';
export {
  withClients,
  useClients,
  ConfluenceClientsProvider,
} from './confluence-search-provider';
export type {
  SearchClientContext,
  ConfluenceClientsProviderProps,
} from './confluence-search-provider';
export { ConfluenceRecentsClient } from './confluence-recents-client';

export type {
  ConfluenceSearchClientConfig,
  FilterType,
} from './confluence-search-client';
export type {
  ConfSpaceResults,
  ConfItemResults,
  ConfPeopleResults,
  ContentType,
} from './response-types';
