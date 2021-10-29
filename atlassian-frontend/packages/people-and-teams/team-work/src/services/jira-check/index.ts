import { useCallback, useEffect } from 'react';

import { useLazyService } from '../generic-hook';

import type {
  JiraCheckData,
  JiraCheckServiceFn,
  JiraCheckServiceReturnType,
} from './types';
import { defaultRequest } from './utils';

export const useLazyJiraCheckService: JiraCheckServiceFn = (
  cloudId,
  options,
) => {
  const request = useCallback(
    async () => await defaultRequest(options?.baseUrl)(cloudId),
    [cloudId, options?.baseUrl],
  );

  const [getJiraCheck, result] = useLazyService<JiraCheckData>(request, {
    ...(options?.initialState || {}),
  });

  return [
    getJiraCheck,
    {
      ...result,
      isJiraAvailable: Boolean(result.data?.permitted),
    },
  ];
};

export const useJiraCheckService = (
  ...[cloudId, options]: Parameters<JiraCheckServiceFn>
): JiraCheckServiceReturnType => {
  const [getJiraCheck, result] = useLazyJiraCheckService(cloudId, options);

  useEffect(() => {
    if (cloudId) {
      getJiraCheck();
    }
  }, [cloudId, getJiraCheck]);

  return result;
};
