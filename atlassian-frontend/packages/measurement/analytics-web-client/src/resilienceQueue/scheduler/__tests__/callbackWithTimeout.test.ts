import MockDate from 'mockdate';

import { CallbackEvent, CallbackStatus, CallbackWithTimeout } from '../CallbackWithTimeout';
import type { CallbackFn, OnDoneFn, OnTimeoutFn } from '../types';

const sleep = (milliseconds: number, done: OnDoneFn) => setTimeout(done, milliseconds);

describe('CallbackWithTimeout', () => {
  let callbackWrapper;
  let callback: CallbackFn;
  let onDoneFn: OnDoneFn;
  let onTimeoutFn: OnTimeoutFn;
  beforeEach(() => {
    MockDate.reset();
    jest.useFakeTimers();
    onDoneFn = jest.fn();
    callback = jest.fn((done: any) => done());
    onTimeoutFn = jest.fn();
  });

  afterEach(() => {
    callbackWrapper = null;
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('Transition callback states', () => {

    test('Can transition away from IDLE state', () => {
      callbackWrapper = new CallbackWithTimeout(2000);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.IDLE);

      // Firing COMPLETE event on IDLE state has no effect.
      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.COMPLETE)
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.IDLE);

      // Firing TIMEOUT event on IDLE state has no effect.
      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.TIMEOUT)
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.IDLE);

      // Firing EXECUTE event on IDLE state moves to RUNNING.
      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE)
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);
    })

    test('Can transition away from RUNNING state to TIMEOUT', () => {
      callbackWrapper = new CallbackWithTimeout(2000);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.TIMEOUT);

      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.TIMED_OUT);
    })

    test('Can transition away from RUNNING state to COMPLETED', () => {
      callbackWrapper = new CallbackWithTimeout(2000);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.COMPLETE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);
    })

    test('Can transition away from TIMED_OUT state to COMPLETED', () => {
      callbackWrapper = new CallbackWithTimeout(2000);
      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.TIMEOUT);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.TIMED_OUT);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.COMPLETE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);
    })

    test('Can transition away from COMPLETED state to TIMED_OUT', () => {
      callbackWrapper = new CallbackWithTimeout(2000);
      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.COMPLETE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.EXECUTE);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

      callbackWrapper.transitionCallbackStatus(callbackWrapper.getCallbackStatus(), CallbackEvent.TIMEOUT);
      expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.TIMED_OUT);
    })
  })

  test('CallbackWithTimeout cannot be called with 0', () => {
    expect(
      () => callbackWrapper = new CallbackWithTimeout(0)
    ).toThrow('CallbackWithTimeout requires timeout period higher than 0');
  })

  test('Fires callback when callback completes in timeout period', () => {
    callbackWrapper = new CallbackWithTimeout(2000);
    jest.spyOn(callbackWrapper, 'transitionCallbackStatus');
    callback = jest.fn((done: any) => done());

    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.IDLE);
    callbackWrapper.executeCallbackWithTimeout(callback, onDoneFn, onTimeoutFn);

    jest.advanceTimersByTime(1500);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(onTimeoutFn).toHaveBeenCalledTimes(0);
    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);

    expect(callbackWrapper.transitionCallbackStatus).toHaveBeenNthCalledWith(1, CallbackStatus.IDLE, CallbackEvent.EXECUTE);
    expect(callbackWrapper.transitionCallbackStatus).toHaveBeenNthCalledWith(2, CallbackStatus.RUNNING, CallbackEvent.COMPLETE);
  })

  test('Fires onTimeout function when callback does not complete in timeout period', () => {
    callbackWrapper = new CallbackWithTimeout(2000);
    jest.spyOn(callbackWrapper, 'transitionCallbackStatus');

    let firstRun = true;
    callback = jest.fn((done) => {
        if (firstRun) {
          // Simulate a long pause
          sleep(5000, done)
          firstRun = false;
        } else {
          sleep(500, done);
        }
      });

    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.IDLE);


    callbackWrapper.executeCallbackWithTimeout(callback, onDoneFn, onTimeoutFn);
    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);


    jest.advanceTimersByTime(6000);

    expect(callbackWrapper.transitionCallbackStatus).toHaveBeenNthCalledWith(1, CallbackStatus.IDLE, CallbackEvent.EXECUTE);
    expect(callbackWrapper.transitionCallbackStatus).toHaveBeenNthCalledWith(2, CallbackStatus.RUNNING, CallbackEvent.TIMEOUT);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(onTimeoutFn).toHaveBeenCalledTimes(1);
    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.TIMED_OUT);

    callbackWrapper.executeCallbackWithTimeout(callback, onDoneFn, onTimeoutFn);
    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.RUNNING);

    jest.advanceTimersByTime(1000);

    expect(setTimeout).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(onTimeoutFn).toHaveBeenCalledTimes(1);
    expect(callbackWrapper.getCallbackStatus()).toEqual(CallbackStatus.COMPLETED);
  })
})
