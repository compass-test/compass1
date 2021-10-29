import DuplicateEventDetector, {
  MAX_EVENTID_LENGTH,
} from '../DuplicateEventDetector';

describe('analytics.js-integration-segmentio/DuplicateEventDetector', () => {
  let sut: any;
  const testItem = {
    msg: {
      messageId: 'test-event-id-12345',
    },
  };

  beforeEach(() => {
    sut = new DuplicateEventDetector();
  });

  test('should return false after startup', () => {
    expect(sut.hasEventBeenSeen(testItem)).toBe(false);
  });

  test('should return true if event is inProgress', () => {
    sut.addItem(testItem);
    expect(sut.hasEventBeenSeen(testItem)).toBe(true);
  });

  test('should return true if event is has been processed recently', () => {
    sut.addItem(testItem);
    sut.done(null, [testItem]);
    expect(sut.hasEventBeenSeen(testItem)).toBe(true);
  });

  test('should return false if event is has been processed recently and failed', () => {
    sut.addItem(testItem);
    sut.done(new Error('test'), [testItem]);
    expect(sut.hasEventBeenSeen(testItem)).toBe(false);
  });

  test('should not hold onto event ids indefinitely', () => {
    const items = [];
    for (let i = 0; i <= MAX_EVENTID_LENGTH; i++) {
      items.push({
        msg: {
          messageId: `test-message-id-${i}`,
        },
      });
    }
    sut.addItem(testItem);
    sut.done(null, [testItem]);
    items.forEach((item) => sut.addItem(item));
    sut.done(null, items);
    expect(sut.hasEventBeenSeen(testItem)).toBe(false);
  });

  test('should not error if event is put straight into done', () => {
    expect(() => sut.done(null, [testItem])).not.toThrowError();
  });
});
