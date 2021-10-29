import { ExperienceTracker } from '@atlassian/experience-tracker';
import type {
  StartEvent,
  FailEvent,
  AbortEvent,
  SuccessEvent,
  ExperienceEvent,
} from '@atlassian/experience-tracker';
import type { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { setExperiencesForwarding } from '../setExperiencesForwarding';

const mockBaseExperienceEvent = {
  name: 'task',
  id: '123',
  startTime: 0,
};

const startEvent: StartEvent = {
  action: 'taskStart',
  ...mockBaseExperienceEvent,
};
const failEvent: FailEvent = {
  action: 'taskFail',
  duration: 1,
  error: {
    name: 'dummy',
    message: 'dummy',
  },
  ...mockBaseExperienceEvent,
};
const abortEvent: AbortEvent = {
  action: 'taskAbort',
  duration: 500,
  checkForTimeout: false,
  reason: 'dummy-reason',
  ...mockBaseExperienceEvent,
};
const successEvent: SuccessEvent = {
  action: 'taskSuccess',
  duration: 100,
  ...mockBaseExperienceEvent,
};

let sourceEvents: ExperienceEvent[];
let forwardedEvents: ExperienceEvent[];
let fromTracker: ExperienceTrackerAPI;
let toTracker: ExperienceTrackerAPI;
let unsubscribeFrom: () => void;
let unsubscribeTo: () => void;

beforeEach(() => {
  sourceEvents = [];
  forwardedEvents = [];
  fromTracker = new ExperienceTracker();
  toTracker = new ExperienceTracker();
  unsubscribeFrom = fromTracker.subscribe((event) => sourceEvents.push(event));
  unsubscribeTo = toTracker.subscribe((event) => forwardedEvents.push(event));
});

afterEach(() => {
  unsubscribeFrom();
  unsubscribeTo();
});

it('should forward start and fail experience events', () => {
  setExperiencesForwarding(fromTracker, toTracker);
  fromTracker.start(startEvent);
  fromTracker.fail(failEvent);
  expect(forwardedEvents).toMatchObject([
    { action: 'taskStart' },
    { action: 'taskFail' },
  ]);
});

it('should forward start and abort experience events', () => {
  setExperiencesForwarding(fromTracker, toTracker);
  fromTracker.start(startEvent);
  fromTracker.abort(abortEvent);
  expect(forwardedEvents).toMatchObject([
    { action: 'taskStart' },
    { action: 'taskAbort' },
  ]);
});

it('should forward start and success experience events', () => {
  setExperiencesForwarding(fromTracker, toTracker);
  fromTracker.start(startEvent);
  fromTracker.succeed(successEvent);
  expect(forwardedEvents).toMatchObject([
    { action: 'taskStart' },
    { action: 'taskSuccess' },
  ]);
});
