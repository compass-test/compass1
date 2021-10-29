import { ExperienceEvent, hasName, isStop } from '../ExperienceEvent';
import { ExperienceTimeoutError } from '../ExperienceTimeoutError';
import { ExperienceTracker } from '../ExperienceTracker';

let events: ExperienceEvent[];
let tracker: ExperienceTracker;
let unsubscribe: () => void;

let mockPerformanceNow: jest.SpyInstance;

beforeEach(() => {
  mockPerformanceNow = jest.spyOn(performance, 'now');
  events = [];
  tracker = new ExperienceTracker();
  unsubscribe = tracker.subscribe((event) => events.push(event));
});

afterEach(() => {
  unsubscribe();
  mockPerformanceNow.mockReset();
});

describe('succeed()', () => {
  it('should send succeeded event after start() and succeed()', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.succeed({ name: 'example' });

    expect(events).toMatchObject([
      {
        action: 'taskStart',
        name: 'example',
        id: '1',
      },
      {
        action: 'taskSuccess',
        name: 'example',
        id: '1',
        duration: expect.any(Number),
      },
    ]);
  });

  it('should succeed only the named experience if there are concurrent ones', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.start({ name: 'another example', id: '1' });
    tracker.succeed({ name: 'example' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskStart' },
      {
        action: 'taskSuccess',
        name: 'example',
        id: '1',
      },
    ]);
  });

  it('should send only one event if succeed() is called repeatedly', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.succeed({ name: 'example' });
    tracker.succeed({ name: 'example' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskSuccess' },
    ]);
  });

  it('should be able to restart a successful experience', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.succeed({ name: 'example' });

    tracker.start({ name: 'example', id: '1' });
    tracker.succeed({ name: 'example' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskSuccess' },
      { action: 'taskStart' },
      { action: 'taskSuccess' },
    ]);
  });

  it('should be able to restart an aborted experience', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.abort({ name: 'example', reason: 'why not?' });

    tracker.start({ name: 'example', id: '1' });
    tracker.succeed({ name: 'example' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskAbort' },
      { action: 'taskStart' },
      { action: 'taskSuccess' },
    ]);
  });

  it('should be able to restart a failed experience', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.fail({ name: 'example', error: new Error('some error') });

    tracker.start({ name: 'example', id: '1' });
    tracker.succeed({ name: 'example' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskFail' },
      { action: 'taskStart' },
      { action: 'taskSuccess' },
    ]);
  });

  it("should NOT send an event when succeeding an experience that hasn't started", () => {
    tracker.succeed({ name: 'example' });

    expect(events).toEqual([]);
  });

  it('should call onSuccess', () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    tracker.start({ name: 'example', id: '1', onSuccess, onFailure });
    tracker.succeed({ name: 'example' });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(0);
  });
});

describe('fail()', () => {
  it('should send failed event after start() and fail()', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.fail({
      name: 'example',
      error: new Error('Example failed to load'),
    });

    expect(events).toMatchObject([
      {
        action: 'taskStart',
        name: 'example',
        id: '1',
      },
      {
        action: 'taskFail',
        name: 'example',
        id: '1',
        error: new Error('Example failed to load'),
        duration: expect.any(Number),
      },
    ]);
  });

  it('should fail only the named experience if there are concurrent ones', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.start({ name: 'another example', id: '1' });
    tracker.fail({
      name: 'example',
      error: new Error('Example failed to load'),
    });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'example',
        id: '1',
        error: new Error('Example failed to load'),
      },
    ]);
  });

  it('should send only one event if fail() is called repeatedly', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.fail({
      name: 'example',
      error: new Error('Example failed to load'),
    });
    tracker.fail({
      name: 'example',
      error: new Error('Different error'),
    });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'example',
        id: '1',
        error: new Error('Example failed to load'),
      },
    ]);
  });

  it("should NOT send an event when failing an experience that hasn't started", () => {
    tracker.fail({
      name: 'example',
      error: new Error('Example failed to load'),
    });

    expect(events).toEqual([]);
  });

  it('should infer failed experience when name is not provided', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.fail({ error: new Error('Example failed to load') });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'example',
        id: '1',
        error: new Error('Example failed to load'),
      },
    ]);
  });

  it('should fail all current experiences when inferring a failure', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.start({ name: 'another example', id: '1' });
    tracker.fail({ error: new Error('Example failed to load') });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'example',
        id: '1',
        error: new Error('Example failed to load'),
      },
      {
        action: 'taskFail',
        name: 'another example',
        id: '1',
        error: new Error('Example failed to load'),
      },
    ]);
  });

  it('should call onFailure', () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    tracker.start({ name: 'example', id: '1', onSuccess, onFailure });
    tracker.fail({
      name: 'example',
      error: new Error('Example failed to load'),
    });

    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onFailure).toHaveBeenCalledTimes(1);
  });
});

describe('Complex flows', () => {
  it('should send correct events', () => {
    // Experience 'a:1' is started twice
    tracker.start({ name: 'a', id: '1' });
    tracker.start({ name: 'a', id: '1' });
    // Experience 'b:1' is superceded by 'b:2'
    tracker.start({ name: 'b', id: '1' });
    tracker.start({ name: 'b', id: '2' });

    // Succeed experience 'a'
    tracker.succeed({ name: 'a' });
    // Infer failure for experience 'b'
    tracker.fail({ error: new Error('Unknown') });
    // Explicitly fail experience 'b'
    tracker.fail({ name: 'b', error: new Error('b failed') });
    // Start and succeed experience 'b' again
    tracker.start({ name: 'b', id: '3' });
    tracker.succeed({ name: 'b' });

    expect(events).toMatchObject([
      {
        action: 'taskStart',
        name: 'a',
        id: '1',
      },
      {
        action: 'taskStart',
        name: 'b',
        id: '1',
      },
      {
        action: 'taskAbort',
        name: 'b',
        id: '1',
        reason: 'Aborted because the same experience was started with a new id',
      },
      {
        action: 'taskStart',
        name: 'b',
        id: '2',
      },
      {
        action: 'taskSuccess',
        name: 'a',
        id: '1',
      },
      {
        action: 'taskFail',
        name: 'b',
        id: '2',
        error: new Error('Unknown'),
      },
      {
        action: 'taskStart',
        name: 'b',
        id: '3',
      },
      {
        action: 'taskSuccess',
        name: 'b',
        id: '3',
      },
    ]);
  });
});

describe('Timeouts', () => {
  it('should fail an experience on aborting iff timeout has elapsed', () => {
    tracker.start({ name: 'a', id: '1', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(999);
    tracker.abort({ name: 'a', reason: 'abort' });

    tracker.start({ name: 'a', id: '2', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(1999);
    tracker.abort({ name: 'a', reason: 'abort' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskAbort' },
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'a',
        id: '2',
        error: new ExperienceTimeoutError('a failed to complete in 1000ms'),
      },
    ]);
  });

  it("shouldn't fail the experience if it succeeded before the timeout", () => {
    tracker.start({ name: 'a', id: '1', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(999);
    tracker.succeed({ name: 'a' });
    mockPerformanceNow.mockReturnValue(1000);
    tracker.abort({ name: 'a', reason: 'abort' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      {
        action: 'taskSuccess',
        name: 'a',
        id: '1',
      },
    ]);
  });

  it("shouldn't fail the experience on aborting if checkForTimeout is false", () => {
    tracker.start({ name: 'a', id: '1', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(1000);
    tracker.abort({ name: 'a', reason: 'abort', checkForTimeout: false });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskAbort' },
    ]);
  });

  it('should fail an experience that was replaced iff timeout has elapsed', () => {
    tracker.start({ name: 'a', id: '1', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(999);
    tracker.start({ name: 'a', id: '2', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(1999);
    tracker.start({ name: 'a', id: '3', timeout: 1000 });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskAbort' },
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'a',
        id: '2',
        error: new ExperienceTimeoutError('a failed to complete in 1000ms'),
      },
      { action: 'taskStart' },
    ]);
  });

  it('should fail a compound experience on aborting if it has a sub-experience whose timeout has elapsed', () => {
    tracker.start({
      name: 'main',
      id: '1',
      collect(events, experience) {
        experience.stopOn(
          events.find((event) => isStop(event) && hasName(event, 'sub')),
        );
      },
    });
    mockPerformanceNow.mockReturnValue(999);
    tracker.start({ name: 'sub', id: '1', timeout: 1000 });
    mockPerformanceNow.mockReturnValue(1999);
    tracker.abort({ reason: 'user cancelled operation' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskStart' },
      {
        action: 'taskFail',
        name: 'sub',
      },
      {
        action: 'taskFail',
        name: 'main',
      },
    ]);
  });
});

describe('abort()', () => {
  it('should send abort event after start() and abort()', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.abort({
      name: 'example',
      reason: 'user navigated away',
    });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      {
        action: 'taskAbort',
        name: 'example',
        id: '1',
        reason: 'user navigated away',
        duration: expect.any(Number),
      },
    ]);
  });

  it('should abort only the named experience if there are concurrent ones', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.start({ name: 'another example', id: '1' });
    tracker.abort({
      name: 'example',
      reason: 'user navigated away',
    });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskStart' },
      {
        action: 'taskAbort',
        name: 'example',
        id: '1',
        reason: 'user navigated away',
      },
    ]);
  });

  it('should send only one event if abort() is called repeatedly', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.abort({
      name: 'example',
      reason: 'abort 1',
    });
    tracker.abort({
      name: 'example',
      reason: 'abort 2',
    });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      {
        action: 'taskAbort',
        name: 'example',
        id: '1',
        reason: 'abort 1',
      },
    ]);
  });

  it("should NOT send an event when aborting an experience that hasn't started", () => {
    tracker.abort({
      name: 'example',
      reason: 'user aborted an experience that was not started',
    });

    expect(events).toEqual([]);
  });

  it('should infer aborted experience when name is not provided', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.abort({ reason: 'aborted by user' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      {
        action: 'taskAbort',
        name: 'example',
        id: '1',
        reason: 'aborted by user',
      },
    ]);
  });

  it('should abort all current experiences when inferring an abort', () => {
    tracker.start({ name: 'example', id: '1' });
    tracker.start({ name: 'another example', id: '1' });
    tracker.abort({ reason: 'user cancelled operation' });

    expect(events).toMatchObject([
      { action: 'taskStart' },
      { action: 'taskStart' },
      {
        action: 'taskAbort',
        name: 'example',
        id: '1',
        reason: 'user cancelled operation',
      },
      {
        action: 'taskAbort',
        name: 'another example',
        id: '1',
        reason: 'user cancelled operation',
      },
    ]);
  });

  it('should call onAbort', () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const onAbort = jest.fn();
    tracker.start({ name: 'example', id: '1', onSuccess, onFailure, onAbort });
    tracker.abort({
      name: 'example',
      reason: 'user cancelled operation',
    });

    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onFailure).toHaveBeenCalledTimes(0);
    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});

describe('Compound experiences', () => {
  it('should succeed the main experience based on multiple sub-experiences', () => {
    tracker.start({
      name: 'main',
      id: '1',
      collect(events) {
        const successes = events.filter((e) => e.action === 'taskSuccess');
        // One success condition
        if (
          successes.some((e) => e.name === 'sub-1') &&
          successes.some((e) => e.name === 'sub-2')
        ) {
          tracker.succeed({ name: 'main' });
          return;
        }
      },
    });

    tracker.start({
      name: 'sub-1',
      id: '1',
    });
    tracker.start({
      name: 'sub-2',
      id: '1',
    });
    tracker.succeed({ name: 'sub-1' });

    expect(events).toMatchObject([
      { action: 'taskStart', name: 'main' },
      { action: 'taskStart', name: 'sub-1' },
      { action: 'taskStart', name: 'sub-2' },
      { action: 'taskSuccess', name: 'sub-1' },
    ]);

    tracker.succeed({ name: 'sub-2' });

    expect(events).toMatchObject([
      { action: 'taskStart', name: 'main' },
      { action: 'taskStart', name: 'sub-1' },
      { action: 'taskStart', name: 'sub-2' },
      { action: 'taskSuccess', name: 'sub-1' },
      { action: 'taskSuccess', name: 'sub-2' },
      { action: 'taskSuccess', name: 'main' },
    ]);
  });

  it('should not collect events after the experience has stopped', () => {
    const collect = jest.fn();
    tracker.start({
      name: 'main',
      id: '1',
      collect,
    });
    tracker.succeed({ name: 'main' });
    tracker.start({
      name: 'another',
      id: '1',
    });
    tracker.succeed({ name: 'another' });

    expect(collect).toHaveBeenCalledTimes(0);
  });

  it('should not collect stop events from experiences that started before this one', () => {
    const collect = jest.fn();
    tracker.start({
      name: 'previous',
      id: '1',
    });
    tracker.start({
      name: 'main',
      id: '1',
      collect,
    });
    tracker.fail({
      name: 'previous',
      error: new Error(),
    });

    expect(collect).toHaveBeenCalledTimes(0);
  });

  it('should stop main experience directly on a sub-experience stop event', () => {
    tracker.start({
      name: 'main',
      id: '1',
      collect(events, experience) {
        experience.stopOn(
          events.find((event) => isStop(event) && hasName(event, 'sub-1')),
        );
      },
    });
    tracker.start({ name: 'sub-1', id: '1' });
    tracker.start({ name: 'sub-2', id: '1' });
    tracker.fail({ name: 'sub-2', error: new Error('sub-2 error') });
    tracker.fail({ name: 'sub-1', error: new Error('sub-1 error') });

    expect(events).toMatchObject([
      { action: 'taskStart', name: 'main' },
      { action: 'taskStart', name: 'sub-1' },
      { action: 'taskStart', name: 'sub-2' },
      { action: 'taskFail', name: 'sub-2' },
      { action: 'taskFail', name: 'sub-1' },
      { action: 'taskFail', name: 'main', error: new Error('sub-1 error') },
    ]);
  });
});

describe('Customizing start time', () => {
  it('should change the reported duration', () => {
    tracker.start({
      name: 'example',
      id: '1',
      startTime: 1000,
    });
    mockPerformanceNow.mockReturnValue(1500);
    tracker.succeed({
      name: 'example',
    });

    expect(events).toMatchObject([
      {
        action: 'taskStart',
        startTime: 1000,
      },
      {
        action: 'taskSuccess',
        startTime: 1000,
        duration: 500,
      },
    ]);
  });

  it('should change timeout to be based on custom startTime', () => {
    mockPerformanceNow.mockReturnValue(500);
    tracker.start({
      name: 'before',
      id: '1',
      startTime: 0,
      timeout: 2000,
    });
    tracker.start({
      name: 'after',
      id: '1',
      startTime: 2000,
      timeout: 2000,
    });
    mockPerformanceNow.mockReturnValue(3000);
    tracker.abort({ reason: 'tab closed' });

    expect(events).toMatchObject([
      {
        action: 'taskStart',
        name: 'before',
        startTime: 0,
      },
      {
        action: 'taskStart',
        name: 'after',
        startTime: 2000,
      },
      {
        action: 'taskFail',
        name: 'before',
        duration: 3000,
      },
      {
        action: 'taskAbort',
        name: 'after',
        duration: 1000,
      },
    ]);
  });
});

describe('ExperienceAttributes', () => {
  beforeEach(() => {
    tracker.start({
      name: 'example',
      id: '1',
      attributes: {
        key: 'value',
        originalKey: 'originalValue',
      },
    });
  });

  it('should send taskStart event with attributes', () => {
    expect(events).toMatchObject([
      {
        action: 'taskStart',
        name: 'example',
        id: '1',
        attributes: {
          key: 'value',
          originalKey: 'originalValue',
        },
      },
    ]);
  });

  const completions: { [name: string]: () => void } = {
    taskSuccess() {
      tracker.succeed({
        name: 'example',
        attributes: {
          key: 'overrideValue',
          anotherKey: 'anotherValue',
        },
      });
    },

    taskFail() {
      tracker.fail({
        name: 'example',
        error: new Error('example failed'),
        attributes: {
          key: 'overrideValue',
          anotherKey: 'anotherValue',
        },
      });
    },

    taskAbort() {
      tracker.abort({
        name: 'example',
        reason: 'example abort',
        attributes: {
          key: 'overrideValue',
          anotherKey: 'anotherValue',
        },
      });
    },
  };
  for (const action in completions) {
    it(`should send ${action} event with union of its + taskStart attributes, ${action} attributes taking precedence`, () => {
      completions[action]();

      expect(events).toMatchObject([
        {
          action: 'taskStart',
          name: 'example',
          id: '1',
          attributes: {
            key: 'value',
            originalKey: 'originalValue',
          },
        },
        {
          action,
          name: 'example',
          id: '1',
          attributes: {
            key: 'overrideValue',
            originalKey: 'originalValue',
            anotherKey: 'anotherValue',
          },
        },
      ]);
    });
  }
});
