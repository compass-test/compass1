import React, { FunctionComponent, useCallback } from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import PeopleFilter from './people-filter';
import SpaceFilter from './space-filter';
import { FeedbackCollectorButtonContainer } from '../../common/filters/filter-pane.styled';
import { useLoadFilters } from '../../common/filters/use-load-filters';
import MoreFilters from './more-filters';
import { useClients } from '../clients';
import { useSearchSessionId } from '../../common/search-session-provider';
import { useUserContext } from '../../common/user-context';
import {
  getPeopleFilterOptions,
  getSpaceFilterOptions,
} from './filter-pane-populate-options';
import { useFilterContext } from '../filter-context';
import { FeedbackCollector } from '../../common/feedback-collector';
import { useFeatures } from '../confluence-features';
import { SiteFilter } from '../../common/filters/site-filter';
import { updateFilterState } from '../../common/filters/use-filters';

export interface FilterPaneProps {
  isLoading: boolean;
  linkComponent?: LinkComponent;
  query: string;
}

export const FilterPane: FunctionComponent<FilterPaneProps> = ({
  isLoading,
  linkComponent,
  query,
}) => {
  const { searchClient, recentClient, collabGraphClient } = useClients();
  const {
    spaceFilters: {
      availableFilters: availableSpaceFilters,
      dispatch: spaceFilterDispatch,
    },
    peopleFilters: {
      availableFilters: availablePeopleFilters,
      dispatch: peopleFilterDispatch,
    },
    siteFilters: {
      availableFilters: availableSiteFilters,
      dispatch: siteFilterDispatch,
    },
  } = useFilterContext();
  const searchSessionId = useSearchSessionId();
  const { isMultiSite, currentSpace } = useFeatures();
  const { user } = useUserContext();

  const isAnonymousUser = !user.id || user.id === 'unidentified';

  const getSpaceFilters = useCallback(
    () =>
      getSpaceFilterOptions(
        collabGraphClient,
        recentClient,
        isMultiSite,
        availableSiteFilters,
        currentSpace,
      ),
    [
      collabGraphClient,
      recentClient,
      isMultiSite,
      availableSiteFilters,
      currentSpace,
    ],
  );

  const getPeopleFilters = useCallback(
    () =>
      getPeopleFilterOptions(
        user,
        availableSiteFilters,
        isMultiSite,
        searchClient,
        searchSessionId,
        collabGraphClient,
        isAnonymousUser,
      ),
    [
      isAnonymousUser,
      collabGraphClient,
      searchSessionId,
      searchClient,
      isMultiSite,
      availableSiteFilters,
      user,
    ],
  );

  const hasFilters =
    availableSpaceFilters.length > 0 || availablePeopleFilters.length > 0;

  const spaceFiltersLoading = useLoadFilters(
    getSpaceFilters,
    spaceFilterDispatch,
    hasFilters,
    availableSiteFilters,
  );
  const peopleFiltersLoading = useLoadFilters(
    getPeopleFilters,
    peopleFilterDispatch,
    hasFilters,
    availableSiteFilters,
  );

  const onSiteChangeCallback = useCallback(
    (value, isChecked) => {
      siteFilterDispatch(updateFilterState(value, isChecked, true));
    },
    [siteFilterDispatch],
  );

  return (
    <>
      {isMultiSite && (
        <SiteFilter
          availableFilters={availableSiteFilters}
          onChange={onSiteChangeCallback}
        />
      )}
      <SpaceFilter isLoading={isLoading || spaceFiltersLoading} />
      {!isAnonymousUser && (
        <PeopleFilter isLoading={isLoading || peopleFiltersLoading} />
      )}
      {!isMultiSite && (
        <MoreFilters
          isLoading={isLoading}
          linkComponent={linkComponent}
          query={query}
        />
      )}

      <FeedbackCollectorButtonContainer>
        <FeedbackCollector />
      </FeedbackCollectorButtonContainer>
    </>
  );
};
