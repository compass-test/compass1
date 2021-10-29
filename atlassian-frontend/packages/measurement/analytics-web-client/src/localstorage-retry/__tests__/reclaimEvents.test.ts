import addMilliseconds from 'date-fns/addMilliseconds';
import subMilliseconds from 'date-fns/subMilliseconds';
import MockDate from 'mockdate'

import generateChance from '../../../__test__/util/chance';
import reclaimEvents from '../reclaimEvents';
import {
  LocalStorageItem,
  ReclaimCallback,
  StorageKeys,
  Timers,
} from '../types';
import { createLocalStorageKeys } from '../utils';

const chance = generateChance('reclaimEvents');

// In some cases we have to wait for a promise to run before we can advanced the timers.
// If we advanced the timers too early, subsequent calls will have no effect.
// This function provides a way to process the promise so we can wait for the next timer to be set.
const flushPromises = () => new Promise(resolve => process.nextTick(resolve));

const setLocalStorageQueueValues = (
  storageKeys: StorageKeys,
  {
    ack,
    queue,
    inProgress,
    reclaimStart,
    reclaimEnd,
  }: {
    ack: string,
    queue?: LocalStorageItem<any>[],
    inProgress?: { [id: string]: LocalStorageItem<any> },
    reclaimStart?: string,
    reclaimEnd?: string,
  }
) => {
  localStorage.setItem(storageKeys.ack, ack);
  localStorage.setItem(storageKeys.queue, JSON.stringify(queue || []));
  localStorage.setItem(storageKeys.inProgress, JSON.stringify(inProgress || {}));
  // @ts-ignore You can set values to null
  localStorage.setItem(storageKeys.reclaimStart, reclaimStart || null);
  // @ts-ignore You can set values to null
  localStorage.setItem(storageKeys.reclaimEnd, reclaimEnd || null);
};

const expectLocalStorageValuesToHaveBeenCleaned = (storageKeys: StorageKeys) => {
  const localStorageKeys = Object.keys(localStorage);
  expect(localStorageKeys).not.toContain(storageKeys.ack);
  expect(localStorageKeys).not.toContain(storageKeys.queue);
  expect(localStorageKeys).not.toContain(storageKeys.inProgress);
  expect(localStorageKeys).not.toContain(storageKeys.reclaimStart);
  expect(localStorageKeys).not.toContain(storageKeys.reclaimEnd);
};

const createItem = (): LocalStorageItem<any> => ({
  id: chance.string(),
  item: {
    test: chance.string(),
  },
  attemptNumber: chance.integer({ min: 0, max: 100 }),
  time: chance.timestamp(),
});

describe('reclaimEvents', () => {

  let callback: jest.MockedFunction<ReclaimCallback<any>>;

  let queuePrefix: string;
  let queueId: string;
  let storageKeys: StorageKeys;

  let currentTime: Date;

  beforeEach(() => {
    callback = jest.fn().mockResolvedValue({ status: 'successful' });
    queuePrefix = chance.string();
    queueId = chance.string();
    storageKeys = createLocalStorageKeys(queuePrefix, queueId);
    currentTime = chance.date();
    MockDate.set(currentTime);
    jest.useFakeTimers();
  });

  afterEach(() => {
    localStorage.clear();
    jest.useRealTimers();
  });

  describe('should ignore', () => {
    test('queues with a different prefix', async () => {
      const otherPrefix = chance.string();
      const storageKeys = createLocalStorageKeys(otherPrefix, queueId);

      const ackTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime().toString();
      localStorage.setItem(storageKeys.ack, ackTimestamp);

      const results = await reclaimEvents(queuePrefix, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 0,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(ackTimestamp);
    });

    test('queues with an up to date ack', async () => {
      const ackTimestamp = currentTime.getTime().toString();
      localStorage.setItem(storageKeys.ack, ackTimestamp);

      const results = await reclaimEvents(queuePrefix, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 0,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(ackTimestamp);
    });

    test('valid queues when the CPU is underload on reclaimStart', async () => {
      const ackTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime().toString();
      localStorage.setItem(storageKeys.ack, ackTimestamp);

      const promise = reclaimEvents(queuePrefix, callback);

      // By updating the MockDate by the threshold, we shoud not claim this queue
      MockDate.set(addMilliseconds(currentTime, Timers.RECLAIM_WAIT_THRESHOLD + 100));
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 1,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(currentTime.getTime().toString());
    });

    test('valid queues when the CPU is underload on reclaimEnd', async () => {
      const ackTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime().toString();
      localStorage.setItem(storageKeys.ack, ackTimestamp);

      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();

      // By updating the MockDate by the threshold, we shoud not claim this queue
      MockDate.set(addMilliseconds(currentTime, Timers.RECLAIM_WAIT_THRESHOLD + 100));
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 1,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(currentTime.getTime().toString());
    });

    test('queue if reclaimStart is overridden', async () => {
      const otherQueueId = chance.string();
      const ackTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime().toString();
      localStorage.setItem(storageKeys.ack, ackTimestamp);

      const promise = reclaimEvents(queuePrefix, callback);

      // Override reclainStart to prevent reclaim process
      localStorage.setItem(storageKeys.reclaimStart, otherQueueId);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 1,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(currentTime.getTime().toString());
      expect(localStorage.getItem(storageKeys.reclaimStart)).toEqual(otherQueueId);
    });

    test('queue if reclaimEnd is overridden', async () => {
      const otherQueueId = chance.string();
      const ackTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime().toString();
      localStorage.setItem(storageKeys.ack, ackTimestamp);

      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();

      // Override reclainStart to prevent reclaim process
      localStorage.setItem(storageKeys.reclaimEnd, otherQueueId);
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 1,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(currentTime.getTime().toString());
      expect(localStorage.getItem(storageKeys.reclaimEnd)).toEqual(otherQueueId);
    });

    test('queue if callback rejects', async () => {
      const item = createItem();
      const ackTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime().toString();
      setLocalStorageQueueValues(storageKeys, {
        ack: ackTimestamp,
        queue: [item],
      });
      callback.mockRejectedValue('Should not propagate');
      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith([item]);
      expect(results).toEqual({
        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 1,
      });
      const actualLocalStorageItem = localStorage.getItem(storageKeys.ack);
      expect(actualLocalStorageItem).toEqual(currentTime.getTime().toString());
      expect(localStorage.getItem(storageKeys.queue)).toEqual(JSON.stringify([item]));
    });
  });

  describe('should clean up', () => {

    let expiredTimestamp: number;

    beforeEach(() => {
      expiredTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime();
    });

    test('queue with no events', async () => {
      setLocalStorageQueueValues(storageKeys, {
        ack: expiredTimestamp.toString(),
      });

      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();
      expect(setTimeout).toHaveBeenCalledTimes(2);
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(callback).not.toHaveBeenCalled();
      expect(results).toEqual({
        fullReclaims: 1,
        partialReclaims: 0,
        failedReclaims: 0,
      });
      expectLocalStorageValuesToHaveBeenCleaned(storageKeys);
    });

    test('should follow strict process of setting reclaimStart and reclaimEnd', async () => {
      setLocalStorageQueueValues(storageKeys, {
        ack: expiredTimestamp.toString(),
      });

      const promise = reclaimEvents(queuePrefix, callback);

      const reclaimStartValue = localStorage.getItem(storageKeys.reclaimStart);
      expect(reclaimStartValue).not.toBeNull();
      expect(localStorage.getItem(storageKeys.reclaimEnd)).toEqual('null');

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();

      const reclaimEndValue = localStorage.getItem(storageKeys.reclaimEnd);
      expect(reclaimEndValue).toEqual(reclaimStartValue);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await promise;
      expectLocalStorageValuesToHaveBeenCleaned(storageKeys);
    });

    test('queue with events in queue', async () => {
      const item = createItem();
      setLocalStorageQueueValues(storageKeys, {
        ack: expiredTimestamp.toString(),
        queue: [ item ],
      });

      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();
      expect(setTimeout).toHaveBeenCalledTimes(2);
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith([item]);
      expect(results).toEqual({
        fullReclaims: 1,
        partialReclaims: 0,
        failedReclaims: 0,
      });
      expectLocalStorageValuesToHaveBeenCleaned(storageKeys);
    });

    test('queue with events inProgress', async () => {
      const item = createItem();
      const inProgress: { [key: string]: LocalStorageItem<any> } = {};
      inProgress[item.id] = item;
      setLocalStorageQueueValues(storageKeys, {
        ack: expiredTimestamp.toString(),
        inProgress,
      });

      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();
      expect(setTimeout).toHaveBeenCalledTimes(2);
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      item.attemptNumber++;

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith([item]);
      expect(results).toEqual({
        fullReclaims: 1,
        partialReclaims: 0,
        failedReclaims: 0,
      });
      expectLocalStorageValuesToHaveBeenCleaned(storageKeys);
    });

    test('multiple queues with events in queue and inProgress', async () => {
      const queue1QueueItem1 = createItem();
      const queue1QueueItem2 = createItem();
      const queue1InProgressItem1 = createItem();
      const queue1InProgressItem2 = createItem();

      const queue1Queue = [queue1QueueItem1, queue1QueueItem2];
      const queue1InProgress: { [key: string]: LocalStorageItem<any> } = {};
      queue1InProgress[queue1InProgressItem1.id] = queue1InProgressItem1;
      queue1InProgress[queue1InProgressItem2.id] = queue1InProgressItem2;

      const queue2Id = chance.string();
      const queue2StorageKeys = createLocalStorageKeys(queuePrefix, queue2Id);

      const queue2QueueItem1 = createItem();
      const queue2QueueItem2 = createItem();
      const queue2InProgressItem1 = createItem();
      const queue2InProgressItem2 = createItem();

      const queue2Queue = [queue2QueueItem1, queue2QueueItem2];
      const queue2InProgress: { [key: string]: LocalStorageItem<any> } = {};
      queue2InProgress[queue2InProgressItem1.id] = queue2InProgressItem1;
      queue2InProgress[queue2InProgressItem2.id] = queue2InProgressItem2;

      const queue3Id = chance.string();
      const queue3StorageKeys = createLocalStorageKeys(queuePrefix, queue3Id);

      const queue4Id = chance.string();
      const queue4StorageKeys = createLocalStorageKeys(queuePrefix, queue4Id);

      // Reclaim
      setLocalStorageQueueValues(storageKeys, {
        ack: expiredTimestamp.toString(),
        queue: queue1Queue,
        inProgress: queue1InProgress,
      });
      setLocalStorageQueueValues(queue2StorageKeys, {
        ack: expiredTimestamp.toString(),
        queue: queue2Queue,
        inProgress: queue2InProgress,
        reclaimEnd: chance.string(),
      });
      setLocalStorageQueueValues(queue3StorageKeys, {
        ack: expiredTimestamp.toString(),
        reclaimStart: chance.string(),
      });
      // Do not clean
      setLocalStorageQueueValues(queue4StorageKeys, {
        ack: currentTime.getTime().toString(),
      });

      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();
      expect(setTimeout).toHaveBeenCalledTimes(6);
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const results = await promise;

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(
        queue1Queue.concat(Object.values(queue1InProgress).map(item => {
          item.attemptNumber++;
          return item;
        }))
      );
      expect(callback).toHaveBeenCalledWith(
        queue2Queue.concat(Object.values(queue2InProgress).map(item => {
          item.attemptNumber++;
          return item;
        }))
      );
      expect(results).toEqual({
        fullReclaims: 3,
        partialReclaims: 0,
        failedReclaims: 0,
      });
      expectLocalStorageValuesToHaveBeenCleaned(storageKeys);
      expectLocalStorageValuesToHaveBeenCleaned(queue2StorageKeys);
      expectLocalStorageValuesToHaveBeenCleaned(queue3StorageKeys);
      expect(localStorage.getItem(queue4StorageKeys.ack)).toEqual(currentTime.getTime().toString());
      expect(localStorage.getItem(queue4StorageKeys.queue)).toEqual('[]');
      expect(localStorage.getItem(queue4StorageKeys.inProgress)).toEqual('{}');
    });
  });

  describe('partial reclaim', () => {
    let reclaimedEvents: LocalStorageItem<any>[];
    let leftoverEvents: LocalStorageItem<any>[];

    beforeEach(() => {
      reclaimedEvents = [];
      leftoverEvents = [];

      const eventsLeftOver = chance.integer({ min: 1, max: 20 });
      for(let i = 0; i < eventsLeftOver; i++) {
        leftoverEvents.push(
          createItem()
        );
      }
      const eventsToReclaim = chance.integer({ min: 1, max: 20 });
      for(let i = 0; i < eventsToReclaim; i++) {
        reclaimedEvents.push(
          createItem()
        );
      }

      callback.mockResolvedValue({
        status: 'partial',
        acceptedItemIds: reclaimedEvents.map(event => event.id),
      });

      const expiredTimestamp = subMilliseconds(currentTime, Timers.RECLAIM_TIMEOUT + 100).getTime();

      setLocalStorageQueueValues(storageKeys, {
        ack: expiredTimestamp.toString(),
        queue: reclaimedEvents.concat(leftoverEvents),
      });
    });

    test('should put events back in queue if they cannot be reclaimed', async () => {
      const promise = reclaimEvents(queuePrefix, callback);

      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);
      await flushPromises();
      jest.advanceTimersByTime(Timers.RECLAIM_WAIT);

      const result = await promise;

      expect(result).toEqual({
        fullReclaims: 0,
        partialReclaims: 1,
        failedReclaims: 0,
      });
      const localStorageKeys = Object.keys(localStorage);
      expect(localStorageKeys).toContain(storageKeys.ack);
      expect(localStorageKeys).toContain(storageKeys.queue);
      expect(localStorageKeys).toContain(storageKeys.reclaimStart);
      expect(localStorageKeys).toContain(storageKeys.reclaimEnd);

      // @ts-ignore Value is probably not null if the key is still valid
      const actualLeftOverEvents = JSON.parse(localStorage.getItem(storageKeys.queue));
      expect(actualLeftOverEvents).toEqual(expect.arrayContaining(leftoverEvents));
    });
  });
});
