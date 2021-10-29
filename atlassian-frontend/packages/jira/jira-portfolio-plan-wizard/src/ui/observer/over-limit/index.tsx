import { useEffect } from 'react';

import { useFeatureFlags } from '../../../controllers/feature-flags';
import {
  TaskHandledError,
  useForm,
  useFormTask,
} from '../../../controllers/form';
import {
  useIssueLimit,
  useOverLimitFlags,
  useProjectLimit,
} from '../../../controllers/over-limit';

export default function OverLimitObserver() {
  useProjectCountingOnFormSubmit();
  useIssueCountingOnFormSubmit();
  useDimissingAllFlagsOnFormSubmit();
  return null;
}

/**
 * Finishes the countProjects form task.
 */
function useProjectCountingOnFormSubmit() {
  const { pending, over } = useProjectLimit();
  const { finish: finishTask } = useFormTask('countProjects');
  useEffect(() => {
    if (!pending) {
      finishTask(
        over ? new TaskHandledError() /* empty error for now */ : undefined,
      );
    }
  }, [pending, over, finishTask]);
}

/**
 * Finishes the countIssues form task.
 */
function useIssueCountingOnFormSubmit() {
  const { pending, over } = useIssueLimit();
  const { finish: finishTask } = useFormTask('countIssues');
  useEffect(() => {
    if (!pending) {
      finishTask(
        over ? new TaskHandledError() /* empty error for now */ : undefined,
      );
    }
  }, [pending, over, finishTask]);
}

/**
 * new-plan-wizard-issue-overlimit_8tze9
 * - Feature flag clean up after issue limit improvement is done
 * Dismiss all flags when submitting
 */
function useDimissingAllFlagsOnFormSubmit() {
  const { submitting } = useForm();
  const { dismissAll } = useOverLimitFlags();
  const { getNewPlanWizardIssueOverLimit } = useFeatureFlags();

  useEffect(() => {
    // new-plan-wizard-issue-overlimit_8tze9
    // flag group dismissible needs to be removed after we enable feature
    if (getNewPlanWizardIssueOverLimit()) {
      return;
    }

    if (submitting) {
      dismissAll();
    }
  }, [submitting, dismissAll, getNewPlanWizardIssueOverLimit]);
}
