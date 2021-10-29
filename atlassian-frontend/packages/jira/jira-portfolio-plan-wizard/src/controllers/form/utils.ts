import { createContext, useContext, useEffect, useState } from 'react';

import { ContextType, Task, TaskID, TaskIDs, TaskState } from './types';

export const context = createContext<ContextType>({
  submit: async () => {},
  submitting: false,
  tasks: {} as Record<TaskID, Task>,
});

/**
 * All tasks must be implemented.
 */
function allTasksMustBeImplemented(tasks: Record<TaskID, Task>) {
  const unimplementedTasks = Object.entries(tasks)
    .filter(([, task]) => !task.implemented)
    .map(([id]) => id);

  if (unimplementedTasks.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `some tasks are not implemented:\n\n${unimplementedTasks.join(
        '\n',
      )}\n\n` +
        `please make sure that all tasks are registered so we don't miss anything.`,
    );
  }
}

/**
 * Mark all tasks as started.
 */
function startAllTasks(tasks: Record<TaskID, Task>) {
  Object.values(tasks).forEach((task) => task.start());
}

/**
 * Mark all tasks as idle
 */
function resetAllTasks(tasks: Record<TaskID, Task>) {
  Object.values(tasks).forEach((task) => task.reset());
}

/**
 * Atlaskit Form cannot solve all state dependencies.
 *
 * Async tasks need to run when submitting:
 * - Reload projects & releases
 *   - Wait for the issue types refinement done
 *   - Wait for the status types refinement done
 *   - The project count should not be over the limit
 *   - Reload issue count
 *     - The issue count should not be over the limit
 */
export function useFormSubmission(tasks: Record<TaskID, Task>) {
  const [submitting, setSubmitting] = useState(false);
  const [{ resolve, reject }, setPromise] = useState<{
    resolve: (arg0?: void | PromiseLike<void>) => void;
    reject: (arg0?: any) => void;
  }>({
    resolve: () => {},
    reject: () => {},
  });

  const isAllTasksFinished = Object.values(tasks).every(
    (task) => task.state === TaskState.finished,
  );

  const error = Object.values(tasks)
    .map((task) => task.error)
    .find((error) => error != null);

  // Rejects the promise if there is error while submitting.
  useEffect(() => {
    if (isAllTasksFinished && submitting && error) {
      reject(error);
    }
  }, [submitting, isAllTasksFinished, error, reject]);

  // Resolve the promise if all tasks are finished while submitting.
  useEffect(() => {
    if (submitting && isAllTasksFinished) {
      resolve();
    }
  }, [submitting, isAllTasksFinished, resolve]);

  const submit = () => {
    allTasksMustBeImplemented(tasks);
    startAllTasks(tasks);

    setSubmitting(true);

    const promise = new Promise<void>((resolve, reject) => {
      setPromise({ resolve, reject });
    });

    promise
      .catch(() => {})
      .finally(() => {
        setSubmitting(false);
        resetAllTasks(tasks);
      });

    return promise;
  };

  return { submitting, submit };
}

export const useForm = () => useContext(context);

/**
 * The form needs to have to run several async tasks when submitting.
 * The side-effects that implemente the task should useFormTask(taskID).finish(Message|Error)
 * @param taskID the task ID
 * @return Task
 */
export const useFormTask = (taskID: TaskID) => {
  const task = useForm().tasks[taskID];
  const { implement } = task;

  // For development only, this is to make sure we implement all tasks.
  // There would be a warning on the console if we are not handling some task.
  useEffect(() => {
    implement();
  }, [implement]);

  return task;
};

export { TaskIDs };
