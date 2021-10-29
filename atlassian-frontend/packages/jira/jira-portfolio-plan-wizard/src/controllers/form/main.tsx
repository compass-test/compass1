import React, { useCallback, useEffect, useState } from 'react';

import { Task, TaskHandledError, TaskID, TaskState } from './types';
import { context, useFormSubmission } from './utils';

const FormProvider: React.FC<{}> = ({ children }) => {
  const tasks = {
    refineIssueTypes: useTaskProviding('refineIssueTypes'),
    refineReleases: useTaskProviding('refineReleases'),
    refineStatusTypes: useTaskProviding('refineStatusTypes'),
    countProjects: useTaskProviding('countProjects'),
    countIssues: useTaskProviding('countIssues'),
  };
  const { submit, submitting } = useFormSubmission(tasks);

  return (
    <context.Provider value={{ submit, submitting, tasks }}>
      {children}
    </context.Provider>
  );
};

function useTaskProviding(debugName: TaskID): Task {
  const [implemented, setImplemented] = useState(false);
  const [state, setState] = useState(TaskState.idle);
  const [error, setError] = useState<TaskHandledError | null>(null);

  const implement = useCallback(() => setImplemented(true), []);

  const reset = useCallback(() => setState(TaskState.idle), []);

  const start = useCallback(() => {
    setState(TaskState.started);
    setError(null);
  }, []);

  const finish = useCallback((error: TaskHandledError | null = null) => {
    setState((state) =>
      // Only set the task as finished when it's started
      state === TaskState.started ? TaskState.finished : state,
    );
    setError((curr) => (curr != null ? curr : error));
  }, []);

  useEffect(() => {
    // console.log(debugName, state);
  }, [state, debugName]);

  return {
    implemented,
    state,
    implement,
    reset,
    start,
    finish,
    error,
  };
}

export default FormProvider;
