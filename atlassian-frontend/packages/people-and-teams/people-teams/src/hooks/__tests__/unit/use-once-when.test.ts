import { act, renderHook } from '@testing-library/react-hooks';

import { useOnceFn, useOnceWhen } from '../../../hooks/use-once-when';

const fn = jest.fn();
const dep = 'origianl dep';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('useOnceFn', () => {
  test('does not call fn initially', () => {
    renderHook(() => {
      return useOnceFn(fn, [dep]);
    });
    expect(fn).not.toHaveBeenCalled();
  });

  test('calls fn when onceFn is called', () => {
    const { result } = renderHook(() => {
      return useOnceFn(fn, [dep]);
    });
    act(() => {
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('calls latest version of fn when deps change', () => {
    const { result, rerender } = renderHook(
      (dep) => {
        return useOnceFn(() => fn(dep), [dep]);
      },
      { initialProps: dep },
    );

    rerender('updated dep');
    act(() => {
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('updated dep');
  });

  test("memoizes callback correctly when deps don't change", () => {
    const { result, rerender } = renderHook(
      (dep) => {
        return useOnceFn(fn, [dep]);
      },
      { initialProps: dep },
    );

    act(() => {
      result.current();
    });
    rerender(dep);
    act(() => {
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('onceFn throws if fn throws', () => {
    const error = new Error('some error');
    fn.mockImplementation(() => {
      throw error;
    });

    const { result } = renderHook(() => {
      return useOnceFn(() => fn(dep), [dep]);
    });

    expect(() => {
      result.current();
    }).toThrowError(error);
  });

  describe('only calls fn once', () => {
    let resultRenderHook: any;

    beforeEach(() => {
      resultRenderHook = renderHook(
        (dep) => {
          return useOnceFn(() => fn(dep), [dep]);
        },
        {
          initialProps: dep,
        },
      );

      act(() => {
        resultRenderHook.result.current();
      });

      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('when onceFn is called multiple times', () => {
      resultRenderHook.result.current();
      resultRenderHook.result.current();
      resultRenderHook.result.current();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('when onceFn is called again after deps change', () => {
      // Update dep and rerender Component
      resultRenderHook.rerender('updated dep');

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});

describe('useOnceWhen', () => {
  let resultRenderHook: any;

  describe('when component is rendered initially with condition true', () => {
    beforeEach(() => {
      resultRenderHook = renderHook(
        (condition: boolean) => {
          return useOnceWhen(condition, () => fn(dep), [dep]);
        },
        { initialProps: true },
      );
    });

    test('then fn is called', () => {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(dep);
    });

    describe('and then condition turns false then true again', () => {
      beforeEach(() => {
        resultRenderHook.rerender(false);
        resultRenderHook.rerender(true);
      });

      test('then fn is not called again', () => {
        expect(fn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when component is rendered initially with condition false', () => {
    beforeEach(() => {
      resultRenderHook = renderHook(
        (condition: boolean) => {
          return useOnceWhen(condition, () => fn(dep), [dep]);
        },
        { initialProps: false },
      );
    });

    test('then fn is not called', () => {
      expect(fn).not.toHaveBeenCalled();
    });

    describe('and then condition turns true', () => {
      beforeEach(() => {
        resultRenderHook.rerender(true);
      });

      test('then fn is called', () => {
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(dep);
      });

      describe('and then condition turns false then true again', () => {
        beforeEach(() => {
          resultRenderHook.rerender(false);
          resultRenderHook.rerender(true);
        });

        test('then fn is not called again', () => {
          expect(fn).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
