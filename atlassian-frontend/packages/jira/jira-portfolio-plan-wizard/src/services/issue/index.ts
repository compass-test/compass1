import { API } from '../../common/types';
import { useFetchService, useService } from '../../common/utils/use-service';

export const useHierarchyConfigurationService = (api: API) =>
  useFetchService(api.fetchHierarchyConfiguration);

export const useRemovedIssuesService = (api: API) =>
  useService(api.fetchRemovedIssues, {
    loading: true,
    data: undefined,
    error: undefined,
  });

export const useIssueTypesService = (api: API) =>
  useService(api.fetchIssueTypes, {
    loading: false,
    data: undefined,
    error: undefined,
  });

export const useStatusTypesService = (api: API) =>
  useService(api.fetchStatusTypes, {
    loading: false,
    data: undefined,
    error: undefined,
  });
