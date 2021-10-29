import { useCallback, useEffect, useRef } from 'react';

import { fetchJson, useService } from '@atlassian/dragonfruit-utils';

import { SearchJiraIssuesInput, SearchJiraIssuesResult } from './types';

export const useSearchJiraIssues = (input: SearchJiraIssuesInput) => {
  const {
    cloudId,
    jql,
    lazy,
    onCompleted,
    maxResults = 50,
    startAt = 0,
    validateQuery = 'strict',
  } = input;
  const issuesCache = useRef<Record<string, SearchJiraIssuesResult>>({});

  const cacheKey = JSON.stringify({ ...input, lazy: false, onCompleted: null });
  const cachedRes = issuesCache.current[cacheKey];
  const url = `/gateway/api/ex/jira/${cloudId}/rest/api/3/search?jql=${encodeURIComponent(
    jql,
  )}&startAt=${startAt}&maxResults=${maxResults}&validateQuery=${validateQuery}`;
  const request = useCallback(() => fetchJson<SearchJiraIssuesResult>(url), [
    url,
  ]);

  const completed = useCallback(
    (data: SearchJiraIssuesResult) => {
      issuesCache.current[cacheKey] = data;
      onCompleted && onCompleted(data);
    },
    [cacheKey, onCompleted],
  );

  const results = useService(request, { loading: lazy }, completed);

  const { fetchData } = results;

  useEffect(() => {
    if (!lazy) {
      if (!cachedRes) {
        fetchData();
      } else {
        completed(cachedRes);
      }
    }
  }, [fetchData, lazy, cachedRes, completed]);

  if (cachedRes) {
    return { data: cachedRes, loading: false, error: undefined };
  }

  return results;
};
