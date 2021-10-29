import React, { FunctionComponent, useCallback } from 'react';

import { LinkComponent } from '@atlassian/search-dialog';

// Common
import { FeedbackCollectorButtonContainer } from '../../../common/filters/filter-pane.styled';
import { FeedbackCollector } from '../../../common/feedback-collector';
import { useUserContext } from '../../../common/user-context';
import { useSearchSessionId } from '../../../common/search-session-provider';
import { useLoadFilters } from '../../../common/filters/use-load-filters';

// Jira
import { useJiraSearchClientContext } from '../../clients';
import { useFilterContext } from '../../filter-context';

import {
  getInterleavedProjectOptions,
  getAssigneeOptions,
  fetchCollabGraphProjectOptions,
} from './filter-pane-populate-options';
import { MoreFilters } from './more-filters';

import AssigneeFilter from '../../filter/assignee-filter';
import ProjectFilter from '../../filter/project-filter';
import { useFeatures } from '../../features';
import { SiteFilter } from '../../../common/filters/site-filter';
import { updateFilterState } from '../../../common/filters/use-filters';
import { attemptPrependCurrentUserToFilters } from '../../../common/filters/filter-utils';
import BinaryStatusCategoryFilter from '../../filter/binary-status-category-filter';

interface Props {
  isLoading: boolean;
  query: string;
  linkComponent?: LinkComponent;
}

export const JiraFilterPane: FunctionComponent<Props> = (props) => {
  const {
    projectFilters: {
      availableFilters: availableProjectFilters,
      dispatch: projectFilterDispatch,
    },
    assigneeFilters: {
      availableFilters: availableAssigneeFilters,
      dispatch: assigneeFilterDispatch,
    },
    siteFilters: {
      availableFilters: availableSiteFilters,
      dispatch: siteFilterDispatch,
    },
  } = useFilterContext();

  const {
    searchClient,
    collabGraphClient,
    currentUserClient,
  } = useJiraSearchClientContext();
  const { user } = useUserContext();
  const sessionId = useSearchSessionId();

  const { isMultiSite } = useFeatures();

  const getProjectFilters = useCallback(() => {
    const checkedSites = availableSiteFilters.filter(
      (filter) => filter.isChecked,
    );

    // If there are no checked sites then we will search all the sites.
    const selectedSites =
      checkedSites.length > 0 ? checkedSites : availableSiteFilters;

    if (isMultiSite) {
      return fetchCollabGraphProjectOptions(
        collabGraphClient,
        // For collab graph we only take the first 5 instead, this can be removed once we can call collab graph through aggregator
        selectedSites.slice(0, 5),
      );
    }

    return getInterleavedProjectOptions(
      collabGraphClient,
      searchClient,
      sessionId,
      selectedSites,
    );
  }, [
    collabGraphClient,
    searchClient,
    sessionId,
    isMultiSite,
    availableSiteFilters,
  ]);

  const isUserAnonymous = !currentUserClient;

  const getAssigneeFilters = useCallback(() => {
    return getAssigneeOptions(
      searchClient,
      sessionId,
      availableSiteFilters,
      availableSiteFilters.filter((filter) => filter.isChecked),
    ).then((values) => {
      if (isUserAnonymous) {
        return [];
      }
      return attemptPrependCurrentUserToFilters(user, values);
    });
  }, [searchClient, sessionId, user, isUserAnonymous, availableSiteFilters]);

  const hasFilters =
    availableProjectFilters.length > 0 || availableAssigneeFilters.length > 0;

  const projectFiltersLoading = useLoadFilters(
    getProjectFilters,
    projectFilterDispatch,
    hasFilters,
    availableSiteFilters,
  );
  const assigneeFiltersLoading = useLoadFilters(
    getAssigneeFilters,
    assigneeFilterDispatch,
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
      <ProjectFilter isLoading={projectFiltersLoading} />
      {!isUserAnonymous && (
        <AssigneeFilter isLoading={props.isLoading || assigneeFiltersLoading} />
      )}
      <BinaryStatusCategoryFilter />
      {!isMultiSite && <MoreFilters {...props} />}
      <FeedbackCollectorButtonContainer>
        <FeedbackCollector />
      </FeedbackCollectorButtonContainer>
    </>
  );
};
