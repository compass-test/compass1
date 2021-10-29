export type ExperienceEvent = StartEvent | StopEvent;

export type StartEvent = BaseExperienceEvent & {
  action: 'taskStart';
  timeout?: number;
};

export type StopEvent = SuccessEvent | FailEvent | AbortEvent;

export type SuccessEvent = BaseExperienceEvent & {
  action: 'taskSuccess';
  duration: number;
};

export type FailEvent = BaseExperienceEvent & {
  action: 'taskFail';
  duration: number;
  error: Error;
};

export type AbortEvent = BaseExperienceEvent & {
  action: 'taskAbort';
  duration: number;
  reason: string;
  checkForTimeout: boolean;
};

type BaseExperienceEvent = {
  action: string;
  name: string;
  id: string;
  startTime: number;
  attributes?: object;
};

export const isStop = (event: ExperienceEvent): boolean =>
  event.action === 'taskSuccess' ||
  event.action === 'taskAbort' ||
  event.action === 'taskFail';

export const hasName = (event: ExperienceEvent, ...names: string[]): boolean =>
  names.includes(event.name);
