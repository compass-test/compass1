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
import { OptionData, Option } from '@atlaskit/user-picker/types';

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
  collabGraphSessionId?: string;
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

export interface XButtonAnalyticsProps {
  actionSubjectId: string;
  searchSessionId: string;
}

export const onXButtonClicked = ({
  actionSubjectId,
  searchSessionId,
}: XButtonAnalyticsProps): GasPayloadWithContext => {
  return {
    action: 'dismissed',
    actionSubject: 'stickySearch',
    actionSubjectId,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'ui',
    attributes: {
      searchSessionId,
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
  | string;

export type SearchResultContextPayload = {
  sectionIndex: number;
  sectionId: string;
  containerId: string | null;
  globalIndex: number;
  indexWithinSection: number;
  isCached: boolean;
  metadata?: object;
};

export type OnSearchResultSelectedProps = {
  screen: ScreenType;
  isSticky: boolean;
  isStickyUpdated: boolean;
};

export const onSearchResultSelected = ({
  screen,
  isSticky,
  isStickyUpdated,
}: OnSearchResultSelectedProps): LimitedGasPayload => {
  return {
    action: 'selected',
    actionSubject: 'searchResult',
    actionSubjectId: screen,
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {
      isSticky,
      isStickyUpdated,
    },
  };
};

export type OnSearchResultHighlightedProps = Omit<
  OnSearchResultSelectedProps,
  'isSticky' | 'isStickyUpdated'
>;

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
  results?: ResultAnalyticData[];
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
  activeProduct: string;
  isMultiProduct: boolean;
  isSticky: boolean;
  isStickyUpdated: boolean;
}

export const onSearchResultsShown = ({
  actionSubjectId,
  resultCount,
  sectionCount,
  results,
  timeToQueryMs,
  activeProduct,
  isMultiProduct,
  isSticky,
  isStickyUpdated,
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
      isSticky,
      isStickyUpdated,
    },
  };
};

export interface TextEnteredAnalyticsProps {
  isSticky: boolean;
}

export const onTextEntered = ({
  isSticky,
}: TextEnteredAnalyticsProps): LimitedGasPayload => {
  return {
    action: 'entered',
    actionSubject: 'text',
    actionSubjectId: 'searchDialogTextField',
    source: BASE_ANALYTICS_SOURCE,
    eventType: 'track',
    attributes: {
      isSticky,
    },
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
  isSticky?: boolean;
  isStickyUpdated?: boolean;
}

export const onFilterSelect = ({
  filterId,
  filterType,
  filterSource,
  isSticky,
  isStickyUpdated,
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
      isSticky,
      isStickyUpdated,
    },
  };
};

export const onFilterUnselect = ({
  filterId,
  filterType,
  filterSource,
  isSticky,
  isStickyUpdated,
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
      isSticky,
      isStickyUpdated,
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

// Smart User Picker analytics
// These analytics will be used to join with the backend collaboration graph analytics to identify
// if our model is performing well.

export type AtlaskitSelectValue = Option | Array<Option> | null | undefined;

const createEvent = (
  eventType: 'ui' | 'operational',
  action: string,
  actionSubject: string,
  attributes = {},
): LimitedGasPayload => ({
  eventType,
  action,
  actionSubject,
  attributes: {
    ...attributes,
  },
});

const position = (options: OptionData[], value?: Option) => {
  return value
    ? options.findIndex((option) => option.id === value.data.id)
    : -1;
};

const result = (option?: Option) => {
  return option ? optionData2Analytics(option.data) : null;
};

const optionData2Analytics = (option: OptionData) => {
  const { id, type } = option;
  return { id: id ? id : null, type: type || null };
};

const createDefaultPickerAttributes = (
  fieldId: string,
  collabGraphSessionId: string,
) => ({
  context: fieldId,
  isCheckbox: true,
  queryLength: 0,
  collabGraphSessionId,
});

export const selectEvent = (
  value: Option,
  options: OptionData[],
  fieldId: string,
  collabGraphSessionId: string,
) => {
  return createEvent('ui', 'clicked', 'userPicker', {
    ...createDefaultPickerAttributes(fieldId, collabGraphSessionId),
    position: position(options, value),
    result: result(value),
  });
};
