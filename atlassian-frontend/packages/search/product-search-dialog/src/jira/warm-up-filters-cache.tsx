import { useEffect } from 'react';
import { ProjectContainerType } from '../common/clients/common-types';
import { useJiraSearchClientContext } from './clients';
import { useSearchSessionId } from '../common/search-session-provider';
import { useFilterContext } from './filter-context';

const WarmUpFiltersCache = () => {
  const {
    collabGraphClient,
    searchClient,
    currentUserClient,
  } = useJiraSearchClientContext();
  const sessionId = useSearchSessionId();

  const {
    siteFilters: { availableFilters: availableSiteFilters },
  } = useFilterContext();

  useEffect(() => {
    const context = { sessionId, referrerId: null };
    collabGraphClient.getContainers([ProjectContainerType]);
    searchClient.getRecentProjects(context, availableSiteFilters);
    searchClient.getRecentPeople(context, availableSiteFilters);
    currentUserClient?.getCurrentUser();
  }, [
    sessionId,
    collabGraphClient,
    searchClient,
    currentUserClient,
    availableSiteFilters,
  ]);
  return null;
};

export default WarmUpFiltersCache;
