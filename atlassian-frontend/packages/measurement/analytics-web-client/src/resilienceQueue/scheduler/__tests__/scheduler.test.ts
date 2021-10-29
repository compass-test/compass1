import MockDate from 'mockdate';

import { CallbackStatus } from '../CallbackWithTimeout';
import Scheduler from '../Scheduler';
import type { OnDoneFn } from '../types';

describe('Scheduler', () => {
  let scheduler: Scheduler;
  let callback: jest.Mock<void, [OnDoneFn]>;

  const schedulerOptions = {
    minRetryDelay: 5000,
    maxRetryDelay: 70000,
    backoffFactor: 2,
    backoffJitter: 0,
    waitInterval: 1000,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('without errors', () => {
    beforeEach(() => {
      callback = jest.fn((done: any) => done());
      scheduler = new Scheduler(schedulerOptions, callback);
    });

    test('setTimeout called with correct wait interval', () => {
      scheduler.schedule();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        schedulerOptions.waitInterval,
      );

      jest.runOnlyPendingTimers();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('setTimeout called only once within wait interval', () => {
      scheduler.schedule();
      scheduler.schedule();
      scheduler.schedule();

      expect(setTimeout).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('callback called immediately', () => {
      scheduler.schedule({ immediate: true });

      // The first timeout now refers to the callback timeout
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('clearTimeout called and callback called immediately', () => {
      scheduler.schedule();
      scheduler.schedule({ immediate: true });

      // additional clearTimeout because callback finished early before timeout
      expect(clearTimeout).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('while operation is in flight', () => {
    let doneFn: any;
    beforeEach(() => {
      doneFn = null;
      callback = jest.fn((done: any) => {
        doneFn = done;
      });
      scheduler = new Scheduler(schedulerOptions, callback);
    });

    test('should set timeout after operation has finished', () => {
      scheduler.schedule({ immediate: true });
      scheduler.schedule();

      // The first timeout now refers to the callback timeout
      expect(setTimeout).toHaveBeenCalledTimes(1);
      doneFn();
      expect(setTimeout).toHaveBeenCalledTimes(2);
    });

    test('two immediate calls wait for the operation to finish', () => {
      scheduler.schedule({ immediate: true });
      const doneFn1 = doneFn;
      scheduler.schedule({ immediate: true });

      expect(callback).toHaveBeenCalledTimes(1);
      doneFn1();
      expect(callback).toHaveBeenCalledTimes(2);
    });

    test('next schedule should remain immediate with immediate call', () => {
      scheduler.schedule({ immediate: true });

      scheduler.schedule({ immediate: true });
      scheduler.schedule();

      doneFn();
      // One additional timeout to timeout the callback
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('with errors', () => {
    let doneFn: OnDoneFn;
    beforeEach(() => {
      callback = jest.fn((done: any) => {
        doneFn = done;
      });
      scheduler = new Scheduler(schedulerOptions, callback);
    });


    test('should reschedule automatically on failed operation without calling schedule again', () => {
      jest.spyOn(scheduler, 'schedule');

      scheduler.schedule();
      jest.runOnlyPendingTimers();
      doneFn('Test failure');

      // Rescheduled again due to failure
      expect(scheduler.schedule).toHaveBeenCalledTimes(2);
    })

    test('should reschedule automatically on failed operation if pending queue', () => {
      scheduler.schedule();
      jest.runOnlyPendingTimers();
      expect(doneFn).toBeInstanceOf(Function);

      // One additional timeout to timeout the callback
      expect(setTimeout).toHaveBeenCalledTimes(2);

      scheduler.schedule();
      doneFn('Test failure');

      // One additional timeout to timeout the callback
      expect(setTimeout).toHaveBeenCalledTimes(3);
    });

    test('with increasing wait time for each failed operation', () => {
      scheduler.schedule();
      // First wait time is the same as above tests
      jest.runOnlyPendingTimers();

      scheduler.schedule();
      doneFn('Fail 1');

      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);

      jest.runOnlyPendingTimers();

      scheduler.schedule();
      doneFn('Fail 2');
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 20000);

      jest.runOnlyPendingTimers();

      scheduler.schedule();
      doneFn('Fail 3');
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 40000);

      jest.runOnlyPendingTimers();

      scheduler.schedule();
      doneFn('Fail 4');
      // Max limit
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        schedulerOptions.maxRetryDelay,
      );
    });

    test('that wait time is reset on first successful operation', () => {
      scheduler.schedule();
      jest.runOnlyPendingTimers();

      doneFn('Test failure');

      jest.runOnlyPendingTimers();

      doneFn();

      scheduler.schedule();
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        schedulerOptions.waitInterval,
      );
    });

    test('that first success after a failed removed any active setTimeout', () => {
      scheduler.schedule({ immediate: true });

      doneFn('Test failure');

      scheduler.schedule();
      jest.runOnlyPendingTimers();

      doneFn();

      scheduler.schedule();

      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        schedulerOptions.waitInterval,
      );
    });

    test('that immediate does not fire with recent failed operations', () => {
      scheduler.schedule();
      jest.runOnlyPendingTimers();

      expect(callback).toHaveBeenCalledTimes(1);

      doneFn('Test failure');

      scheduler.schedule({ immediate: true });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('with callbackTimer', () => {
    const sleep = (milliseconds: number, done: OnDoneFn) => setTimeout(done, milliseconds);

    beforeEach(() => {
      MockDate.reset();
    });

    afterEach(() => {
      jest.clearAllMocks();
    })

    test('should not call setTimeout when callback is called within callbackTimeoutPeriod', () => {
      callback = jest.fn((done: any) => done());
      scheduler = new Scheduler({...schedulerOptions, callbackTimeoutPeriod: 4000} , callback);

      scheduler.schedule();
      jest.advanceTimersByTime(2000);

      // 1 additional timeout here for executeTimeoutFn timeout
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(scheduler.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should call setTimeout when callback is not called within callbackTimeoutPeriod', () => {
      let firstRun = true;
      callback = jest.fn((done) => {
          if (firstRun) {
            // Simulate a long pause
            sleep(5000, done)
            firstRun = false;
          } else {
            sleep(50, done);
          }
        });
      scheduler = new Scheduler({...schedulerOptions, callbackTimeoutPeriod: 4000} , callback);

      scheduler.schedule();
      jest.advanceTimersByTime(5000);

      // 1 additional timeout here for executeTimeoutFn timeout
      expect(setTimeout).toHaveBeenCalledTimes(4);
      expect(scheduler.getCallbackStatus()).toEqual(CallbackStatus.TIMED_OUT);
      expect(callback).toHaveBeenCalledTimes(1);

      // Allower scheduler to run the callback again
      jest.advanceTimersByTime(11000);

      // wait interval
      expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 1000);
      // callback timeout
      expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 4000);
      // callback mock
      expect(setTimeout).toHaveBeenNthCalledWith(3, expect.any(Function), 5000);
      // backoff
      expect(setTimeout).toHaveBeenNthCalledWith(4, expect.any(Function), 10000);
      // callback timeout
      expect(setTimeout).toHaveBeenNthCalledWith(5, expect.any(Function), 4000);
      // callback mock
      expect(setTimeout).toHaveBeenNthCalledWith(6, expect.any(Function), 50);
      expect(setTimeout).toHaveBeenCalledTimes(6);
      expect(scheduler.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('with waitInterval set to 0', () => {
    beforeEach(() => {
      callback = jest.fn();
      scheduler = new Scheduler({
          ...schedulerOptions,
          waitInterval: 0,
        },
        callback
      );
    });

    test('should call callback immediately on schedule', () => {
      scheduler.schedule();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should call callback immediately on schedule after another schedule completes', () => {
      scheduler.schedule();
      scheduler.schedule();
      expect(callback).toHaveBeenCalledTimes(1);
      const done = callback.mock.calls[0][0];
      done();
      expect(callback).toHaveBeenCalledTimes(2);
    });

    test('should not call callback many times if schedule is called while blocked', () => {
      scheduler.schedule();
      scheduler.schedule();
      scheduler.schedule();
      scheduler.schedule();
      scheduler.schedule();
      expect(callback).toHaveBeenCalledTimes(1);
      const done = callback.mock.calls[0][0];
      done();
      expect(callback).toHaveBeenCalledTimes(2);
      const done2 = callback.mock.calls[0][0];
      done2();
      expect(callback).toHaveBeenCalledTimes(2);
    });

    test('should not call callback immedately if previous schedule errored', () => {
      scheduler.schedule();
      scheduler.schedule();
      expect(callback).toHaveBeenCalledTimes(1);
      const done = callback.mock.calls[0][0];
      done("I'm in danger.");
      expect(callback).toHaveBeenCalledTimes(1);
      jest.runOnlyPendingTimers();
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });
});
