import { useCallback } from 'react';
import { useClients } from '../../confluence/clients';
import {
  PeopleFilterOption,
  SpaceFilterOption,
  useFilterContext,
} from '../filter-context';

const CONFLUENCE_ADVANCED_SEARCH_URL = '/wiki/search';

// Only-for-testing
export const confluenceAdvancedSearchUrl = (
  query: string,
  spaceFilterIds: string[],
  contributorFilterIds: string[],
  siteUrl: string = '',
) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return `${siteUrl}${CONFLUENCE_ADVANCED_SEARCH_URL}`;
  }

  const spaceFilter =
    spaceFilterIds.length > 0
      ? `&spaces=${encodeURIComponent(spaceFilterIds.join(','))}`
      : '';
  const contributorFilter =
    contributorFilterIds.length > 0
      ? `&contributors=${encodeURIComponent(contributorFilterIds.join(','))}`
      : '';

  return `${siteUrl}${CONFLUENCE_ADVANCED_SEARCH_URL}?text=${encodeURIComponent(
    trimmedQuery,
  )}${spaceFilter}${contributorFilter}`;
};

export const useConfluenceAdvancedSearchUrlFactory = () => {
  return useCallback(
    (
      query: string,
      siteUrl: string,
      spaceFilters: SpaceFilterOption[],
      peopleFilters: PeopleFilterOption[],
    ) =>
      confluenceAdvancedSearchUrl(
        query,
        spaceFilters.filter((f) => f.isChecked).map((f) => f.id),
        peopleFilters.filter((f) => f.isChecked).map((f) => f.id),
        siteUrl,
      ),
    [],
  );
};

/**
 * An advanced search link URL factory which uses the most relevant site to generate an advanced search link
 * If the dialog is searching multiple sites, this factory picks the first site to generate an advanced search link to
 * (as is the implementation of the client context)
 */
export const usePrimarySiteConfluenceAdvancedSearchUrlFactory = () => {
  const { siteUrl } = useClients();
  const {
    spaceFilters: { availableFilters: availableSpaceFilters },
    peopleFilters: { availableFilters: availablePeopleFilters },
  } = useFilterContext();

  const factory = useConfluenceAdvancedSearchUrlFactory();

  return useCallback(
    (query: string) =>
      factory(query, siteUrl, availableSpaceFilters, availablePeopleFilters),
    [availablePeopleFilters, availableSpaceFilters, factory, siteUrl],
  );
};
