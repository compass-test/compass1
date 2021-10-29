import { useEffect, useRef } from 'react';

import isEqual from 'lodash/fp/isEqual';
import uniq from 'lodash/fp/uniq';

import { IssueStatusType } from '../../../common/types';
import usePrevious from '../../../common/utils/use-previous';
import { useFormTask } from '../../../controllers/form';
import { usePlan } from '../../../controllers/plan';
import { useProjectsAndReleases } from '../../../controllers/projects-and-releases';
import { useStatusTypes } from '../../../controllers/status-types';

/**
 * Provides status types related side-effects.
 */
export default function StatusTypesObserver() {
  usePlanRefinement1();
  usePlanRefinement2();
  useRefreshingOnProjectsChange();
  return null;
}

/**
 * Returns list of status types IDs
 */
function useStatusTypeIds(): {
  loading: boolean;
  statusTypeIds: IssueStatusType['id'][];
} {
  const { loading, projects = [] } = useProjectsAndReleases();
  const statusTypeIdsRef = useRef<IssueStatusType['id'][]>([]);

  const statusTypeIds = uniq(
    projects.reduce(
      (result, { issueStatusIds }) => result.concat(issueStatusIds),
      [] as string[],
    ),
  ).sort();

  if (isEqual(statusTypeIds, statusTypeIdsRef.current)) {
    return { loading, statusTypeIds: statusTypeIdsRef.current };
  }

  return {
    loading,
    statusTypeIds: statusTypeIdsRef.current = statusTypeIds,
  };
}

/**
 * Loads status types whenever the ID list change.
 */
function useRefreshingOnProjectsChange() {
  const { statusTypeIds } = useStatusTypeIds();
  const { fetchData } = useStatusTypes();

  useEffect(() => {
    fetchData(statusTypeIds);
  }, [statusTypeIds, fetchData]);
}

/**
 * Removes the irrelevant excluded status types on the plan.
 */
function usePlanRefinement1() {
  const { data: statusTypeMap } = useStatusTypes();
  const { setPlan } = usePlan();
  const { finish: finishTask } = useFormTask('refineStatusTypes');

  useEffect(() => {
    if (statusTypeMap == null) {
      return;
    }

    setPlan((plan) => {
      const excludeStatusTypes = plan.excludedStatuses || [];
      const nextExcludeStatusTypes = excludeStatusTypes
        // Filter out all issue types that are no longer relevant
        .filter((id) => statusTypeMap[id]);

      if (isEqual(nextExcludeStatusTypes, excludeStatusTypes)) {
        return plan;
      }

      return { ...plan, excludedStatuses: nextExcludeStatusTypes };
    });

    finishTask();
  }, [statusTypeMap, setPlan, finishTask]);
}

/**
 * Finishes the form task in the case the status types IDs isn't changed.
 */
function usePlanRefinement2() {
  const { loading, statusTypeIds } = useStatusTypeIds();
  const { finish: finishTask } = useFormTask('refineStatusTypes');
  const prevStatusTypeIds = usePrevious(statusTypeIds);

  useEffect(() => {
    if (!loading && statusTypeIds === prevStatusTypeIds) {
      // After loading, but statusTypeIds isn't changed
      finishTask();
    }

    // prevStatusTypeIds is a reference value (not state), doesn't need to trigger effects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, statusTypeIds]);
}
