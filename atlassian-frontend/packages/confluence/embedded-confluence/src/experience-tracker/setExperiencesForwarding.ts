import type {
  ExperienceTrackerAPI,
  ExperienceEventListenerUnsubscribe,
} from '@atlassian/experience-tracker/ExperienceTracker';
import type {
  StartEvent,
  AbortEvent,
  FailEvent,
  SuccessEvent,
  ExperienceEvent,
} from '@atlassian/experience-tracker';

type FromExperienceTrackerType =
  | Pick<ExperienceTrackerAPI, 'subscribe'>
  | null
  | undefined;

export type SetExperiencesForwardingType = {
  setExperiencesForwarding: (
    fromExperienceTracker: FromExperienceTrackerType,
  ) => void;
};

export function setExperiencesForwarding(
  fromExperienceTracker: FromExperienceTrackerType,
  toExperienceTracker:
    | Pick<ExperienceTrackerAPI, 'start' | 'succeed' | 'fail' | 'abort'>
    | null
    | undefined,
): ExperienceEventListenerUnsubscribe | undefined {
  if (!fromExperienceTracker || !toExperienceTracker) {
    return;
  }

  const cancelExperiencesForwarding = fromExperienceTracker.subscribe(
    ({ action, ...options }: ExperienceEvent) => {
      switch (action) {
        case 'taskAbort':
          toExperienceTracker.abort({
            ...(options as Omit<AbortEvent, 'action'>),
            checkForTimeout: false, // disallow `taskAbort` to be converted into `taskFail`
          });
          break;
        case 'taskFail':
          toExperienceTracker.fail(options as Omit<FailEvent, 'action'>);
          break;
        case 'taskStart':
          toExperienceTracker.start(options as Omit<StartEvent, 'action'>);
          break;
        case 'taskSuccess':
          toExperienceTracker.succeed(options as Omit<SuccessEvent, 'action'>);
          break;
      }
    },
  );

  return cancelExperiencesForwarding;
}
