import { useEffect, useRef } from 'react';

import isEqual from 'lodash/fp/isEqual';
import uniq from 'lodash/fp/uniq';

import { IssueType } from '../../../common/types';
import usePrevious from '../../../common/utils/use-previous';
import { useFormTask } from '../../../controllers/form';
import { useIssueTypes } from '../../../controllers/issue-types';
import { usePlan } from '../../../controllers/plan';
import { useProjectsAndReleases } from '../../../controllers/projects-and-releases';

/**
 * Provides issue-types related side-effects.
 */
export default function IssueTypesObserver() {
  usePlanRefinement1();
  usePlanRefinement2();
  useRefreshingOnIssueIdsChanges();
  return null;
}

/**
 * Returns list of issue types IDs
 */
function useIssueTypeIds(): {
  pending: boolean;
  issueTypeIds: IssueType['id'][];
} {
  const { loading, projects = [] } = useProjectsAndReleases();
  const issueTypeIdsRef = useRef<IssueType['id'][]>([]);

  const currentIssueTypeIds = uniq(
    projects.reduce(
      (result, { issueTypeIds }) => result.concat(issueTypeIds),
      [] as string[],
    ),
  ).sort();

  if (isEqual(currentIssueTypeIds, issueTypeIdsRef.current)) {
    const issueTypeIds = issueTypeIdsRef.current;

    return { pending: loading, issueTypeIds };
  }

  const issueTypeIds = (issueTypeIdsRef.current = currentIssueTypeIds);

  return { pending: loading, issueTypeIds };
}

/**
 * Loads issues types whenever the ID list changes.
 */
function useRefreshingOnIssueIdsChanges() {
  const { issueTypeIds } = useIssueTypeIds();
  const { fetchData } = useIssueTypes();

  useEffect(() => {
    fetchData(issueTypeIds);
  }, [issueTypeIds, fetchData]);
}

/**
 * Removes orphaned issue types on the plan.excludedIssueTypes.
 */
function usePlanRefinement1() {
  const { data: issueTypeMap } = useIssueTypes();
  const { setPlan } = usePlan();
  const { finish: finishTask } = useFormTask('refineIssueTypes');

  useEffect(() => {
    if (issueTypeMap == null) {
      return;
    }

    setPlan((plan) => {
      const excludeIssueTypes = plan.excludedIssueTypes || [];
      const nextExcludeIssueTypes = excludeIssueTypes
        // Filter out all issue types that are no longer relevant
        .filter((id) => issueTypeMap[id]);

      if (isEqual(nextExcludeIssueTypes, excludeIssueTypes)) {
        return plan;
      }

      return {
        ...plan,
        excludeIssueTypes: nextExcludeIssueTypes,
      };
    });

    finishTask();
  }, [issueTypeMap, setPlan, finishTask]);
}

/**
 * Finishes the form task in the case the issue types IDs isn't changed.
 */
function usePlanRefinement2() {
  const { pending, issueTypeIds } = useIssueTypeIds();
  const { finish: finishTask } = useFormTask('refineIssueTypes');
  const prevIssueTypeIds = usePrevious(issueTypeIds);

  useEffect(() => {
    if (!pending && issueTypeIds === prevIssueTypeIds) {
      // After pending, but issueTypeIds isn't changed
      finishTask();
    }

    // prevIssueTypeIds is a reference value (not state), doesn't need to trigger effects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending, issueTypeIds]);
}
