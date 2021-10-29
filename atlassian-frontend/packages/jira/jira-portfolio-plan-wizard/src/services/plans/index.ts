import { API } from '../../common/types';
import {
  useFetchService,
  useMutationService,
  useService,
} from '../../common/utils/use-service';

export function usePlanCreateService(api: API) {
  return useMutationService(api.createPlan);
}

export function usePlanUpdateService(api: API) {
  return useMutationService(api.updatePlan);
}

export function usePlanConfiguration(api: API) {
  return useFetchService(api.fetchPlanConfiguration);
}

export const useBasicPlanInfo = (api: API) =>
  useService(api.fetchPlanBasicInfo, {
    loading: true,
    data: undefined,
    error: undefined,
  });

export const usePlanExclusions = (api: API) =>
  useService(api.fetchPlanExclusions, {
    loading: true,
    data: undefined,
    error: undefined,
  });
