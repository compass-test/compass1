import { act, renderHook } from '@testing-library/react-hooks';

import { calculateForceRemountCounter, useKeys } from './utils';

describe('calculateForceRemountCounter', () => {
  it('should return 0 on initial render', () => {
    expect(calculateForceRemountCounter(undefined, 1, 2, 3)).toEqual(0);
  });

  it('should return the existing value if the anchor is the same', () => {
    expect(
      calculateForceRemountCounter(
        {
          id: 'popup-id',
          anchorTop: 1,
          anchorLeft: 2,
          anchorWidth: 3,
          forceRemountCounter: 0,
        },
        1,
        2,
        3,
      ),
    ).toEqual(0);
  });

  it('should return the existing value if the anchor has changed', () => {
    expect(
      calculateForceRemountCounter(
        {
          id: 'popup-id',
          anchorTop: 1,
          anchorLeft: 2,
          anchorWidth: 3,
          forceRemountCounter: 0,
        },
        4,
        5,
        6,
      ),
    ).toEqual(1);
  });
});

describe('useKeys', () => {
  it('should return stable result', async () => {
    const eventIds = {};
    const { result, rerender } = renderHook(() => useKeys(eventIds));
    const initialResult = result.current;
    expect(initialResult.size).toBe(0);

    act(() => {
      rerender();
    });

    const resultAfterRerender = result.current;
    expect(resultAfterRerender).toBe(initialResult);
    expect(resultAfterRerender.size).toBe(0);
  });

  it('should update with newly added keys', () => {
    let eventIds: { [id: string]: any } = {
      'test-event-2': 'blah x2',
    };
    const { result, rerender } = renderHook(() => useKeys(eventIds));
    expect(result.current.size).toBe(1);
    expect(result.current.has('test-event-1')).toBe(false);
    expect(result.current.has('test-event-2')).toBe(true);

    act(() => {
      eventIds = {
        'test-event-1': 'blah',
        'test-event-2': 'blah x2',
      };
      rerender();
    });

    expect(result.current.size).toBe(2);
    expect(result.current.has('test-event-1')).toBe(true);
    expect(result.current.has('test-event-2')).toBe(true);
  });

  it('should update without newly removed keys', () => {
    let eventIds: { [id: string]: any } = {
      'test-event-1': 'blah',
      'test-event-2': 'blah x2',
    };
    const { result, rerender } = renderHook(() => useKeys(eventIds));
    expect(result.current.size).toBe(2);
    expect(result.current.has('test-event-1')).toBe(true);
    expect(result.current.has('test-event-2')).toBe(true);

    act(() => {
      eventIds = {
        'test-event-1': 'blah',
      };
      rerender();
    });

    expect(result.current.size).toBe(1);
    expect(result.current.has('test-event-1')).toBe(true);
    expect(result.current.has('test-event-2')).toBe(false);
  });
});
