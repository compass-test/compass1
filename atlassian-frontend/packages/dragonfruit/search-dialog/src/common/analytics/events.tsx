/**
 * Note all events fired include the searchSessionId, experiment-id, queryHash, queryVersion, wordCount, resultCount where applicable
 */

import {
  GasPayload,
  GasScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { ABTest } from '../clients';
import { ProductFilterType } from '../../common/clients/common-types';
import { FilterOptionSource } from '../../common/filters/types';
import { Products } from '../../common/product-context';

export const DEFAULT_GAS_CHANNEL = 'fabric-elements';

export enum Trigger {
  SHORTCUT = 'shortcut',
  RETURN = 'return',
  CLICK = 'click',
  TEXT_ENTERED = 'textEntered',
}

export enum AdvancedSearchLinkSubjectId {
  CONFLUENCE = 'confluenceAdvancedSearchLink',
  CONFLUENCE_PEOPLE = 'confluencePeopleSearchLink',
  JIRA_ISSUES = 'jiraIssuesSearchLink',
  JIRA_BOARDS = 'jiraBoardsSearchLink',
  JIRA_FILTERS = 'jiraFiltersSearchLink',
  JIRA_PROJECTS = 'jiraProjectsSearchLink',
  JIRA_PLANS = 'jiraPlansSearchLink',
  JIRA_PEOPLE = 'jiraPeopleSearchLink',
  NO_RESULTS = 'noResultsAdvancedSearchLink',
}

export interface NonPrivacySafeContext {
  query: string;
}

export interface FiltersInfo {
  applied: {
    id: string;
    index: number;
    source: FilterOptionSource;
  }[];
  recommendedIds: {
    id: string;
    source: FilterOptionSource;
  }[];
}

export interface FiltersAnalyticsContext {
  container?: FiltersInfo;
  contributor?: FiltersInfo;
  projects?: FiltersInfo;
  assignees?: FiltersInfo;
  binaryStatusCategories?: FiltersInfo;
}

export interface AdvancedSearchAnalyticsProps {
  actionSubjectId: string;
  isLoading: boolean;
  newTab: boolean;
  trigger: Trigger;
}

export interface MultiSiteAdvancedSearchAnalyticsProps {
  trigger: Trigger;
  actionSubjectId: string;
  isLoading: boolean;
  newTab: boolean;
  destinationId: string;
  index: number;
}

export interface MoreFiltersAnalyticsProps {
  trigger: Trigger;
  selectedFiltersCount: number;
}

export interface TabSelectedProps {
  tabName: Products;
}

const BASE_ANALYTICS_SOURCE = 'searchDialog';

export type ContextPayload = Partial<{
  abTest: ABTest;
  searchSessionId: string;
  queryHash: string;
  queryLength: number;
  queryVersion: number;
  wordCount: number;
  frontend: string;
}>;

export type GasPayloadWithContext = GasPayload;

/**
 * Custom GasPayload type with restrictions so we don't include common attributes that will be added as part of AnalyticContexts
 */
export type LimitedGasPayload = GasPayload & {
  attributes?: {
    [P in keyof ContextPayload]: never;
  } & {
    [key: string]: any;
  };
};

export type LimitedGasScreenEventPayload = GasScreenEventPayload & {
  attributes?: {
    [P in keyof ContextPayload]: never;
  } & {
    [key: string]: any;
  };
};

export const onAdvancedSearchSelected = ({
  trigger,
  actionSubjectId,
  isLoading,
  newTab,
}: AdvancedSearchAnalyticsProps): LimitedGasPayload => {
  return {
    action: 'selected',
    actionSubject: 'advancedSearchLink',
    actionSubjectId,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {
      trigger,
      isLoading,
      newTab,
    },
  };
};

export const onMultiSiteAdvancedSearchSelected = ({
  trigger,
  actionSubjectId,
  isLoading,
  newTab,
  destinationId,
  index,
}: MultiSiteAdvancedSearchAnalyticsProps): LimitedGasPayload => {
  return {
    action: 'selected',
    actionSubject: 'advancedSearchLink',
    actionSubjectId,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      trigger,
      isLoading,
      newTab,
      destinationId,
      index,
    },
  };
};

export const onMoreFiltersSelected = ({
  trigger,
  selectedFiltersCount,
}: MoreFiltersAnalyticsProps): LimitedGasPayload => {
  return {
    action: 'selected',
    actionSubject: 'moreFilterLink',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      trigger,
      selectedFiltersCount,
    },
  };
};

export type ScreenType =
  | 'preQuerySearchResults'
  | 'postQuerySearchResults'
  | 'cachedResults';
export type SectionId = 'page';

export type SectionID =
  | 'confluence-item'
  | 'confluence-space'
  | 'confluence-people'
  | 'jira-issue'
  | 'jira-board-project-filter'
  | 'compass-user'
  | 'compass-service'
  | 'compass-library'
  | 'compass-application'
  | 'compass-team';

export type SearchResultContextPayload = {
  id?: string;
  sectionIndex: number;
  sectionId: SectionID;
  containerId: string | null;
  globalIndex: number;
  indexWithinSection: number;
  isCached: boolean;
  metadata?: object;
};

export type OnSearchResultSelectedProps = {
  screen: ScreenType;
};

export const onSearchResultSelected = ({
  screen,
}: OnSearchResultSelectedProps): LimitedGasPayload => {
  return {
    action: 'selected',
    actionSubject: 'searchResult',
    actionSubjectId: screen,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {},
  };
};

export type OnSearchResultHighlightedProps = OnSearchResultSelectedProps;

export const onSearchResultHighlighted = ({
  screen,
}: OnSearchResultHighlightedProps): LimitedGasPayload => {
  return {
    action: 'highlighted',
    actionSubject: 'searchResult',
    actionSubjectId: screen,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {},
  };
};

export enum ResultsShownActionSubjectId {
  PREQUERY = 'preQuerySearchResults',
  POSTQUERY = 'postQuerySearchResults',
  CACHED = 'cachedResults',
}

export interface ResultAnalyticData {
  containerId: string;
  isRecentResult: boolean;
  resultContentId: string;
  resultType: string;
}

export interface ResultSectionAnalyticData {
  results: ResultAnalyticData[];
  sectionId: SectionID;
}

export interface ResultsShownAnalyticsProps {
  actionSubjectId:
    | 'preQuerySearchResults'
    | 'postQuerySearchResults'
    | 'cachedResults';
  resultCount: number;
  sectionCount: number;
  results: ResultSectionAnalyticData[];
  timeToQueryMs?: number;
  activeProduct: Products;
  isMultiProduct: boolean;
}

export const onSearchResultsShown = ({
  actionSubjectId,
  resultCount,
  sectionCount,
  results,
  timeToQueryMs,
  activeProduct,
  isMultiProduct,
}: ResultsShownAnalyticsProps): LimitedGasPayload => {
  return {
    action: 'shown',
    actionSubject: 'searchResults',
    actionSubjectId,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      resultCount,
      sectionCount,
      timeToQueryMs,
      results,
      activeProduct,
      isMultiProduct,
    },
  };
};

export const onTextEntered = (): LimitedGasPayload => {
  return {
    action: 'entered',
    actionSubject: 'text',
    actionSubjectId: 'searchDialogTextField',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {},
  };
};

export interface OnShowMoreClickedProps {
  total: number;
  currentSize: number;
  pageSize: number;
}

export const onShowMoreClicked = ({
  total,
  currentSize,
  pageSize,
}: OnShowMoreClickedProps): LimitedGasPayload => {
  return {
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'showMoreButton',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      total,
      currentSize,
      pageSize,
    },
  };
};

export interface OnShowAllClickedProps {
  total: number;
  currentSize: number;
  pageSize: number;
}

export const onShowAllClicked = ({
  total,
  currentSize,
  pageSize,
}: OnShowMoreClickedProps): LimitedGasPayload => {
  return {
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'showAllLink',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      total,
      currentSize,
      pageSize,
    },
  };
};

export interface OnPreQueryScreenViewedProps {
  searchSessionId: string;
  trigger: Trigger;
}

export const onPreQueryScreenViewed = ({
  searchSessionId,
  trigger,
}: OnPreQueryScreenViewedProps): GasScreenEventPayload => {
  return {
    name: 'searchDialogPreQueryScreen',
    eventType: 'screen',
    attributes: {
      searchSessionId,
      trigger,
    },
  };
};

export interface RequestMadeAnalyticsProps {
  actionSubjectId: 'preQuerySearchResults' | 'postQuerySearchResults';
  timings: object;
}

/**
 * We allow onRequestMade to be given an explicit context because it gets fired at the same level as the query contexts so it won't normally pick it up
 */
export const onRequestMade = (
  { actionSubjectId, timings }: RequestMadeAnalyticsProps,
  additionalContext: ContextPayload = {},
  nonPrivacySafeAttributes: NonPrivacySafeContext = { query: '' },
): GasPayloadWithContext => {
  return {
    action: 'completed',
    actionSubject: 'searchRequest',
    actionSubjectId,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {
      ...timings,
      ...additionalContext,
    },
    nonPrivacySafeAttributes,
  };
};

export const onPreQueryEmpty = (): GasPayloadWithContext => ({
  action: 'shown',
  eventType: 'ui',
  actionSubject: 'searchResults',
  actionSubjectId: 'preQuerySearchResults',
  attributes: {
    resultCount: 0,
    results: [],
  },
  source: BASE_ANALYTICS_SOURCE,
});

export const onDismissed = (): LimitedGasPayload => {
  return {
    action: 'dismissed',
    actionSubject: 'searchDialog',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
  };
};

export interface FilterSelectedProps {
  filterId: string;
  filterSource: FilterOptionSource;
  filterType: ProductFilterType;
}

export const onFilterSelect = ({
  filterId,
  filterType,
  filterSource,
}: FilterSelectedProps): LimitedGasPayload => {
  return {
    action: 'selected',
    actionSubject: 'filter',
    actionSubjectId: 'searchDialogFilter',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      filterId,
      filterType,
      filterSource,
    },
  };
};

export const onFilterUnselect = ({
  filterId,
  filterType,
  filterSource,
}: FilterSelectedProps): LimitedGasPayload => {
  return {
    action: 'unselected',
    actionSubject: 'filter',
    actionSubjectId: 'searchDialogFilter',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      filterId,
      filterType,
      filterSource,
    },
  };
};

export const onFiltersCleared = (): LimitedGasPayload => {
  return {
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'searchDialogClearFilters',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {},
  };
};

export const onPaneLoadComplete = (
  product: string,
  duration: number,
): LimitedGasPayload => {
  return {
    action: 'loadComplete',
    actionSubject: 'searchDialogPane',
    actionSubjectId: product,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {
      durationMs: duration,
    },
  };
};

export const onExperimentLoaded = (
  abTest: ABTest,
  experimentRequestDuration: number,
  isMultiProduct: boolean,
): GasPayloadWithContext => {
  return {
    action: 'loaded',
    actionSubject: 'experiment',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'operational',
    attributes: {
      abTest,
      experimentRequestDuration,
      isMultiProduct,
    },
  };
};

export const onTabSelected = (
  { tabName }: TabSelectedProps,
  additionalContext: ContextPayload = {},
  nonPrivacySafeAttributes: NonPrivacySafeContext = { query: '' },
): GasPayloadWithContext => {
  // this event is fired at the same level as the anlytics context hence it needs mandatory additional objects.
  return {
    action: 'clicked',
    actionSubject: 'tab',
    actionSubjectId: 'crossProductSearchTab',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      tabName,
      ...additionalContext,
    },
    nonPrivacySafeAttributes,
  };
};
