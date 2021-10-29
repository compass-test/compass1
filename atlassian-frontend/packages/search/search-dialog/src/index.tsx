// Types
export { EmptyState } from './empty-state';
export { SearchInput } from './search-input';
export {
  SearchDialog,
  ResultContainer,
  SearchDialogContent,
  SidebarContainer,
} from './search-dialog';
export { SearchResult } from './search-result';
export { SearchResultSection } from './search-result-section';
export { SearchResultSectionLink } from './search-result-section-link';
export { SearchAnchor } from './search-anchor';
export { SearchFooter } from './search-footer';
export { SearchFooterLinks } from './search-footer-links';

export {
  useKeyboardNavigation,
  KeyboardHighlightProvider,
  TestSearchKeyboardProvider,
} from './search-keyboard';
export { ReturnIcon } from './icons';
export {
  _ThemeContext as ThemeContext,
  _createSearchTheme as createSearchTheme,
  ThemeProvider,
  useTheme,
} from './theme';
export {
  FilterItem,
  RowFilterGroup,
  ColumnFilterGroup,
  FilterColLabelText,
  FilterRowLabelText,
  FilterShowMore,
  FilterShowMoreItem,
  FilterDropdownItem,
  AsyncSelectFilterComponent,
} from './filter-group';
export { createLinkComponentFactory, Link } from './search-link-component';

export type { SearchInputProps } from './search-input';
export type {
  LinkComponent,
  LinkComponentProps,
  LinkProps,
} from './search-link-component';
export type { SearchResultSectionLinkProps } from './search-result-section-link';
export type { SearchCSS, SearchTheme } from './theme';
export type {
  FilterItemProps,
  FilterGroupProps,
  FilterShowMoreProps,
  OptionType,
  FilterComponentProps,
} from './filter-group';
export type { SearchResultProps } from './search-result';
export type { SearchFooterLinksProps } from './search-footer-links';

export {
  getInputSkeletonQuery,
  setInputSkeletonQuery,
  getInputSkeletonFocus,
  setInputSkeletonIsFocus,
  getInputSkeletonSelection,
  setInputSkeletonSelection,
} from './search-input/query-store';

export type { InputSkeletonState } from './search-input/query-store';

export {
  STICKY_SEARCH_KEY,
  SEARCH_QUERY_KEY,
  SEARCH_FILTERS_KEY,
  getSessionItem,
  setSessionItem,
  deleteSessionItem,
} from './search-input/session-storage-utils';
