import {
  Scope,
  Results as ResponseTypeResults,
  Result as ResposneTypeResult,
  AttributeFromScope,
} from './response-types';

export { Scope, ContentType, AttributeType } from './response-types';
export { JiraSearchClient } from './jira-search-client';
export { useJiraCurrentUser } from './jira-current-user-client';
export {
  JiraSearchClientProvider,
  withClients,
  useJiraSearchClientContext,
} from './jira-search-provider';

export type Results<T extends Scope> = ResponseTypeResults<T>;
export type Result<T extends Scope> = ResposneTypeResult<AttributeFromScope<T>>;

export type { FilterType } from './jira-search-client';
export type { SearchClientConfig } from './jira-search-provider';
export type { UserResponse as CurrentUserResponse } from './jira-current-user-client';
