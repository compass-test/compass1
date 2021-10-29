import { Scope } from '../../clients/response-types';
import * as SearchResultsLists from './jira-search-results-lists';

export {
  IssueSearchResultsList,
  BoardsProjectFiltersSearchResultsList,
} from './jira-search-results-lists';

export type SearchResultsListProps<
  S extends Scope = Scope
> = SearchResultsLists.SearchResultsListProps<S>;
