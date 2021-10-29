import purgeOrphanedQueues from '../purgeOrphanedQueues';

const testedPrefix = 'awc-test';

const keysThatShouldBeUnpurgeable = [
  `${testedPrefix}.valid-id-1.ack`,
  `${testedPrefix}.valid-id-2.non-standard-suffix`,
  `${testedPrefix}.valid-id-3`,
  `key-before.${testedPrefix}.valid-id-4`,
  'valid-id-5.reclaimStart',
  `${testedPrefix}-valid-id-6.queue`,
];

describe('purgeOrphanedQueues', () => {
  const setUnpurgeables = () => {
    keysThatShouldBeUnpurgeable.forEach((key) => {
      localStorage.setItem(key, 'im alive');
    });
  };

  const checkUnpurgables = () => {
    keysThatShouldBeUnpurgeable.forEach((key) => {
      expect(localStorage.getItem(key)).not.toBeNull();
    });
  };

  beforeEach(() => {
    localStorage.clear();
    setUnpurgeables();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should not remove unpurgables', () => {
    purgeOrphanedQueues(testedPrefix);
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    checkUnpurgables();
  });

  test('should not remove queue with all keys', () => {
    localStorage.setItem(`${testedPrefix}.valid-test.ack`, 'value');
    localStorage.setItem(
      `${testedPrefix}.valid-test.reclaimStart`,
      'value',
    );
    localStorage.setItem(
      `${testedPrefix}.valid-test.reclaimEnd`,
      'value',
    );
    localStorage.setItem(`${testedPrefix}.valid-test.queue`, 'value');
    localStorage.setItem(
      `${testedPrefix}.valid-test.inProgress`,
      'value',
    );
    purgeOrphanedQueues(testedPrefix);
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    checkUnpurgables();
  });

  test('should remove queue with no ack and all other keys', () => {
    localStorage.setItem(
      `${testedPrefix}.valid-test.reclaimStart`,
      'value',
    );
    localStorage.setItem(
      `${testedPrefix}.valid-test.reclaimEnd`,
      'value',
    );
    localStorage.setItem(`${testedPrefix}.valid-test.queue`, 'value');
    localStorage.setItem(
      `${testedPrefix}.valid-test.inProgress`,
      'value',
    );
    purgeOrphanedQueues(testedPrefix);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(4);
    checkUnpurgables();
  });

  const runStorageTest = ({
    withAck,
    withReclaimStart,
    withReclaimEnd,
    withInProgress,
    withQueue,
  }: any) => {
    if (withAck) {
      localStorage.setItem(`${testedPrefix}.valid-test.ack`, 'value');
    }
    if (withReclaimStart) {
      localStorage.setItem(
        `${testedPrefix}.valid-test.reclaimStart`,
        'value',
      );
    }
    if (withReclaimEnd) {
      localStorage.setItem(
        `${testedPrefix}.valid-test.reclaimEnd`,
        'value',
      );
    }
    if (withInProgress) {
      localStorage.setItem(
        `${testedPrefix}.valid-test.inProgress`,
        'value',
      );
    }
    if (withQueue) {
      localStorage.setItem(`${testedPrefix}.valid-test.queue`, 'value');
    }

    purgeOrphanedQueues(testedPrefix);

    if (withAck) {
      expect(localStorage.removeItem).not.toHaveBeenCalled();
    } else {
      expect(localStorage.removeItem).toHaveBeenCalledTimes(4);
    }
    checkUnpurgables();
  };

  test('should not remove queues: with ack, with reclaimStart, with reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: true,
  }));

  test('should not remove queues: with ack, with reclaimStart, with reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: false,
  }));

  test('should not remove queues: with ack, with reclaimStart, with reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: true,
  }));

  test('should not remove queues: with ack, with reclaimStart, with reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: false,
  }));

  test('should not remove queues: with ack, with reclaimStart, without reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: true,
  }));

  test('should not remove queues: with ack, with reclaimStart, without reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: false,
  }));

  test('should not remove queues: with ack, with reclaimStart, without reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: true,
  }));

  test('should not remove queues: with ack, with reclaimStart, without reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: false,
  }));

  test('should not remove queues: with ack, without reclaimStart, with reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: true,
  }));

  test('should not remove queues: with ack, without reclaimStart, with reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: false,
  }));

  test('should not remove queues: with ack, without reclaimStart, with reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: true,
  }));

  test('should not remove queues: with ack, without reclaimStart, with reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: false,
  }));

  test('should not remove queues: with ack, without reclaimStart, without reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: true,
  }));

  test('should not remove queues: with ack, without reclaimStart, without reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: false,
  }));

  test('should not remove queues: with ack, without reclaimStart, without reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: true,
  }));

  test('should not remove queues: with ack, without reclaimStart, without reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: false,
  }));

  test('should not remove queues: with ack, with reclaimStart, with reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: true,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: true,
  }));

  test('should remove without ack, with reclaimStart, with reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: false,
  }));

  test('should remove queues: without ack, with reclaimStart, with reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: true,
  }));

  test('should remove queues: without ack, with reclaimStart, with reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: false,
  }));

  test('should remove queues: without ack, with reclaimStart, without reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: true,
  }));

  test('should remove queues: without ack, with reclaimStart, without reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: false,
  }));

  test('should remove queues: without ack, with reclaimStart, without reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: true,
  }));

  test('should remove queues: without ack, with reclaimStart, without reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: true,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: false,
  }));

  test('should remove queues: without ack, without reclaimStart, with reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: true,
  }));

  test('should remove queues: without ack, without reclaimStart, with reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: true,
    withQueue: false,
  }));

  test('should remove queues: without ack, without reclaimStart, with reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: true,
  }));

  test('should remove queues: without ack, without reclaimStart, with reclaimEnd, without inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: true,
    withInProgress: false,
    withQueue: false,
  }));

  test('should remove queues: without ack, without reclaimStart, without reclaimEnd, with inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: true,
  }));

  test('should remove queues: without ack, without reclaimStart, without reclaimEnd, with inProgress, without queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: true,
    withQueue: false,
  }));

  test('should remove queues: without ack, without reclaimStart, without reclaimEnd, without inProgress, with queue', () => runStorageTest({
    withAck: false,
    withReclaimStart: false,
    withReclaimEnd: false,
    withInProgress: false,
    withQueue: true,
  }));

  test('should not run on undefined prefix', () => {
    localStorage.setItem('.valid-test.inProgress', 'value');
    // @ts-ignore test with empty input
    purgeOrphanedQueues();
    expect(localStorage.key).not.toHaveBeenCalled();
  });

  test('should not run on null prefix', () => {
    localStorage.setItem('.valid-test.inProgress', 'value');
    // @ts-ignore Testing bad values
    purgeOrphanedQueues(null);
    expect(localStorage.key).not.toHaveBeenCalled();
  });

  test('should not run on empty prefix', () => {
    localStorage.setItem('.valid-test.inProgress', 'value');
    purgeOrphanedQueues('');
    expect(localStorage.key).not.toHaveBeenCalled();
  });

  describe('access denied to localStorage', () => {
    const previousWindow = window;

    beforeEach(() => {
      // @ts-ignore
      delete global.window;
      // @ts-ignore
      global.window = new Proxy(previousWindow, {
        get: (obj: any, prop: string) => {
          if (['localStorage', 'sessionStorage'].includes(prop)) {
            throw new Error(
              "Uncaught DOMException: Failed to read the 'localStorage'"
                + "property from 'Window': Access is denied for this document.",
            );
          }
          if (prop in obj) {
            return obj[prop];
          }
          return undefined;
        },
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
      // @ts-ignore
      global.window = previousWindow;
    });

    describe('Ensure our test setup is correct', () => {
      test('localStorage throws', () => {
        expect(() => window.localStorage).toThrow();
      });
      test('sessionStorage throws', () => {
        expect(() => window.sessionStorage).toThrow();
      });
    });

    test('purge script does not throw exceptions on accessing localStorage', () => {
      expect(purgeOrphanedQueues).not.toThrow();
    });
  });
});
