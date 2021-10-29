import generateChance from '../../testUtil/chance';
import {
  fullGetValueOptions,
  minimalGetValueOptions,
} from '../../testUtil/mockData';
import Subscriptions, { ALL_FLAGS, FLAG_PREFIX } from '../Subscriptions';

describe('Subscriptions', () => {
  const chance = generateChance('Subscriptions');

  const callback = jest.fn();
  const otherCallback = jest.fn();
  const getFlagValue = jest.fn();
  let subscriptions: Subscriptions;
  let subscribeSpy: jest.SpyInstance;
  let unsubscribeSpy: jest.SpyInstance;
  let emitSpy: jest.SpyInstance;
  let flagKey: string;
  let defaultValue: string;

  beforeEach(() => {
    subscriptions = new Subscriptions();
    subscribeSpy = jest.spyOn((subscriptions as any).emitter, 'on');
    unsubscribeSpy = jest.spyOn((subscriptions as any).emitter, 'off');
    emitSpy = jest.spyOn((subscriptions as any).emitter, 'emit');
    flagKey = chance.string();
    defaultValue = chance.string();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('can listen on a flag key', () => {
    subscriptions.on(
      flagKey,
      defaultValue,
      callback,
      getFlagValue,
      minimalGetValueOptions,
    );
    expect(subscribeSpy).toHaveBeenCalledWith(
      FLAG_PREFIX + flagKey,
      expect.any(Function),
    );
  });

  test('can unlisten on a flag key', () => {
    const off = subscriptions.on(
      flagKey,
      defaultValue,
      callback,
      getFlagValue,
      minimalGetValueOptions,
    );
    off();
    expect(unsubscribeSpy).toHaveBeenCalledWith(
      FLAG_PREFIX + flagKey,
      expect.any(Function),
    );
  });

  test.each`
    variation           | option
    ${'no option'}      | ${undefined}
    ${'minimal option'} | ${minimalGetValueOptions}
    ${'full option'}    | ${fullGetValueOptions}
  `(
    'can trigger callback on a listening flag key with $variation, it gets flag from `getFlagValue` function provided',
    ({ option }) => {
      const newValue = 'some new value';
      getFlagValue.mockReturnValue(newValue);
      subscriptions.on(flagKey, defaultValue, callback, getFlagValue, option);
      subscriptions.flagValueUpdated(flagKey);

      expect(emitSpy).toHaveBeenCalledWith(FLAG_PREFIX + flagKey);
      expect(getFlagValue).toHaveBeenCalledWith(flagKey, defaultValue, option);
      expect(callback).toHaveBeenCalledWith(newValue);
    },
  );

  test('can trigger multiple callbacks on same listening flag key', () => {
    const newValue = 'some new value';
    getFlagValue.mockReturnValue(newValue);
    subscriptions.on(
      flagKey,
      defaultValue,
      callback,
      getFlagValue,
      minimalGetValueOptions,
    );
    subscriptions.on(
      flagKey,
      defaultValue,
      callback,
      getFlagValue,
      minimalGetValueOptions,
    );
    subscriptions.on(
      flagKey,
      defaultValue,
      otherCallback,
      getFlagValue,
      minimalGetValueOptions,
    );
    subscriptions.flagValueUpdated(flagKey);

    expect(emitSpy).toHaveBeenCalledWith(FLAG_PREFIX + flagKey);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(otherCallback).toHaveBeenCalledWith(newValue);
  });

  test('not trigger a callback after a flag key got unlisten', () => {
    const off = subscriptions.on(
      flagKey,
      defaultValue,
      callback,
      getFlagValue,
      minimalGetValueOptions,
    );
    off();
    subscriptions.flagValueUpdated(flagKey);

    expect(emitSpy).toHaveBeenCalledWith(FLAG_PREFIX + flagKey);
    expect(getFlagValue).not.toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });

  test('calling stop clears callbacks', () => {
    getFlagValue.mockReturnValue(chance.string());
    subscriptions.on(flagKey, defaultValue, callback, getFlagValue);

    subscriptions.stop();
    subscriptions.flagValueUpdated(flagKey);

    expect(callback).not.toHaveBeenCalled();
  });

  test('can subscribe to all flags', () => {
    subscriptions.onAnyFlagUpdated(callback);
    expect(subscribeSpy).toHaveBeenCalledTimes(1);
    expect(subscribeSpy).toHaveBeenCalledWith(ALL_FLAGS, callback);
  });

  test('can trigger all flags', () => {
    subscriptions.onAnyFlagUpdated(callback);
    subscriptions.anyFlagUpdated();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(ALL_FLAGS);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('can unsubscribe to all flags', () => {
    const unsubscribe = subscriptions.onAnyFlagUpdated(callback);
    unsubscribe();
    subscriptions.anyFlagUpdated();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(ALL_FLAGS);
    expect(callback).not.toHaveBeenCalled();
  });
});
