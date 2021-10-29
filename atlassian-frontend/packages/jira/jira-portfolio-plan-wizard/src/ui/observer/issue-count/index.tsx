import { useCallback, useEffect } from 'react';

import { TaskID, TaskState, useForm } from '../../../controllers/form';
import { useIssueCount } from '../../../controllers/issue-count';
import { usePlan } from '../../../controllers/plan';

/**
 * Provides issue count related side-effects.
 */
export default function IssueCountObserver() {
  useRefreshingOnPlanChange();
  useRefreshingOnFormSubmit();
  return null;
}

/**
 * The refresh function that are changed when the plan changes.
 */
function useRefreshFn() {
  const { plan } = usePlan();
  const { fetchData } = useIssueCount();

  return useCallback(
    (abortController: AbortController) => {
      return fetchData(
        {
          id: plan.id, // id could be null
          name: '',
          permission: 'open',
          /* actual needed data goes from here */
          issueSources: plan.issueSources,
          excludeDays: plan.excludeDays,
          excludedIssueTypes: plan.excludedIssueTypes,
          excludedStatuses: plan.excludedStatuses,
          excludedStatusCategories: plan.excludedStatusCategories,
          excludedVersions: plan.excludedVersions,
        },
        abortController,
      );
    },
    [
      plan.id,
      plan.issueSources,
      plan.excludeDays,
      plan.excludedIssueTypes,
      plan.excludedStatuses,
      plan.excludedStatusCategories,
      plan.excludedVersions,
      fetchData,
    ],
  );
}

function useRefreshingOnFormSubmit() {
  const refresh = useRefreshFn();
  const tasks = useForm().tasks;

  const requiredTasks: TaskID[] = [
    'refineIssueTypes',
    'refineStatusTypes',
    'refineReleases',
  ];

  const depTasks = requiredTasks.map((taskId) => tasks[taskId]);
  const allFinished = depTasks.every(
    (task) => task.state === TaskState.finished,
  );

  // Refresh the issue count when all dependant tasks are done.
  useEffect(() => {
    if (!allFinished) {
      return;
    }

    const controller = new AbortController();
    refresh(controller);
    return () => controller.abort();
  }, [allFinished, refresh]);
}

/**
 * Reloads the issue counts on plan data changes.
 */
function useRefreshingOnPlanChange() {
  const refresh = useRefreshFn();
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => refresh(controller), 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [refresh]);
}
