import { API } from '../../common/types';
import { useService } from '../../common/utils/use-service';

export function useBoardsService(api: API) {
  return useService(api.fetchBoards, {
    loading: false,
    data: undefined,
    error: undefined,
  });
}

export function useProjectsService(api: API) {
  return useService(api.fetchProjects, {
    loading: false,
    data: undefined,
    error: undefined,
  });
}

export function useProjectsAndReleasesByIssueSourcesService(api: API) {
  return useService(api.fetchProjectsAndReleasesByIssueSources, {
    loading: false,
    data: undefined,
    error: undefined,
  });
}

export function useFiltersService(api: API) {
  return useService(api.fetchFilters, {
    loading: false,
    data: undefined,
    error: undefined,
  });
}

export function useIssueCountService(api: API) {
  return useService(api.fetchIssueCount, {
    loading: false,
    data: undefined,
    error: undefined,
  });
}
