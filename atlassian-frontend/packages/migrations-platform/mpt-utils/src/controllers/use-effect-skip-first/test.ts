import { renderHook } from '@testing-library/react-hooks';

import useEffectSkipFirst from './index';

describe('useEffectSkipFirst()', () => {
  it('should skips the first useEffect', () => {
    const cb = jest.fn();
    const { rerender } = renderHook<{ dummy: number }, void>(
      ({ dummy }) => {
        useEffectSkipFirst(() => {
          cb(dummy);
        }, [dummy]);
      },
      { initialProps: { dummy: 123 } },
    );

    expect(cb).not.toBeCalled();
    rerender({ dummy: 456 });
    expect(cb).toHaveBeenNthCalledWith(1, 456);
  });
});
