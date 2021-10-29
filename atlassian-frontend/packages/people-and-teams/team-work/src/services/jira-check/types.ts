import { ServiceResult } from '../generic-hook';

export type JiraCheckData = {
  permitted: boolean;
};

export type JiraCheck = {
  isJiraAvailable: boolean;
};

export type JiraCheckServiceReturnType = ServiceResult<JiraCheckData> &
  JiraCheck;

export type JiraCheckServiceFn = (
  cloudId?: string,
  options?: {
    baseUrl?: string;
    initialState?: Partial<ServiceResult<JiraCheckData>>;
  },
) => [() => Promise<void>, JiraCheckServiceReturnType];
