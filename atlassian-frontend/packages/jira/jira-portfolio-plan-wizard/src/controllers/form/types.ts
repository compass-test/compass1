export const TaskIDs = {
  refineIssueTypes: 'refineIssueTypes',
  refineReleases: 'refineReleases',
  refineStatusTypes: 'refineStatusTypes',
  countProjects: 'countProjects',
  countIssues: 'countIssues',
} as const;

export type TaskID = keyof typeof TaskIDs;

export enum TaskState {
  idle,
  started,
  finished,
}

export type Task = {
  implemented: boolean;
  state: TaskState;
  /**
   * Marks the task as implemented.
   */
  implement: () => void;
  /**
   * Marks the task as idle after submitting.
   */
  reset: () => void;
  /**
   * Marks the task as started.
   */
  start: () => void;
  /**
   * Marks the task as finished only when the task is marked as started.
   * @param error the error if there is any
   */
  finish: (error?: TaskHandledError) => void;
  /**
   * The error if there is any.
   */
  error: TaskHandledError | null;
};

export class TaskHandledError extends Error {
  name: 'TaskHandledError' = 'TaskHandledError';
}

export type ContextType = {
  submit: () => Promise<void>;
  submitting: boolean;
  tasks: Record<TaskID, Task>;
};
