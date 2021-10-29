import wrapCallback from '../src/wrapCallback';

describe('wrapCallback', () => {
  test('should return null if no callback', () => {
    expect(wrapCallback()).toBeNull();
  });

  test('should return null if callback is not a function', () => {
    expect(wrapCallback('not a function')).toBeNull();
  });

  test('should return a function if callback is a function', () => {
    const emptyFunction = () => {
      // do nothing
    };
    expect(typeof wrapCallback(emptyFunction)).toBe('function');
  });

  test('should call callback with event', () => {
    const event = 'some event';
    const dummyCallback = (e: any) => e;
    const callback = jest.fn(dummyCallback);
    const val = wrapCallback(callback, event);
    if (val) {
      val();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(event);
      return;
    }

    throw new Error('Expected to call callback');
  });
});
