import React from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useExperiment } from '../../core';
import { usePluginAsyncExtendCallback } from '../asyncExtendCallback';

// These tests would benefit from an async act(),
// which is unavailable in our version of React DOM.
const renderDoublingAsyncExtend = <P extends {}>(
  options: Omit<Parameters<typeof renderHook>[1], 'initialProps'> & {
    initialProps: {
      propToDouble: number;
      pipeline?: P;
      pluginOptions?: Parameters<typeof usePluginAsyncExtendCallback>[1];
    };
  },
) => {
  const callbackSpy = jest.fn();
  const renderHookResult = renderHook(
    (props) =>
      usePluginAsyncExtendCallback(
        React.useCallback(
          async (...args) => {
            callbackSpy(...args);
            return {
              doubledProp: props.propToDouble * 2,
            };
          },
          [props.propToDouble],
        ),
      )(props.pipeline || {}),
    options,
  );
  return { callbackSpy, ...renderHookResult };
};

test("should be used with useCallback to extend the pipeline with async data each time the callback's identity changes", async () => {
  const {
    callbackSpy,
    result,
    waitForNextUpdate,
    rerender,
  } = renderDoublingAsyncExtend({ initialProps: { propToDouble: 10 } });
  expect(callbackSpy).toHaveBeenCalledTimes(1);
  expect(callbackSpy).toHaveBeenCalledWith();
  expect(result.current).toEqual(expect.objectContaining({ loading: true }));

  await waitForNextUpdate();
  expect(result.current).toEqual(
    expect.objectContaining({ doubledProp: 20, loading: false }),
  );

  rerender({ propToDouble: 11 });
  await waitForNextUpdate();
  expect(callbackSpy).toHaveBeenCalledTimes(2);
  expect(callbackSpy).toHaveBeenLastCalledWith();
  expect(result.current).toEqual(
    expect.objectContaining({ doubledProp: 22, loading: false }),
  );
});

it("does not call the callback again as long as the callback's identity is maintained", async () => {
  const {
    callbackSpy,
    result,
    waitForNextUpdate,
    rerender,
  } = renderDoublingAsyncExtend({ initialProps: { propToDouble: 10 } });

  await waitForNextUpdate();
  rerender({ propToDouble: 10 });
  rerender({ propToDouble: 10 });
  rerender({ propToDouble: 10 });
  expect(callbackSpy).toHaveBeenCalledTimes(1);
  expect(result.current).toEqual(
    expect.objectContaining({ doubledProp: 20, loading: false }),
  );
});

const useMockAsyncEffect = () => {
  const [effectFired, setEffectFired] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      await null;
      act(() => {
        setEffectFired(true);
      });
    })();
  }, []);
  return effectFired;
};

test('does not call the callback until the upstream stops loading', async () => {
  const callback = jest.fn().mockReturnValue({ foo: 42 });
  const { waitForNextUpdate, rerender, result } = renderHook(
    (props) => ({
      ...usePluginAsyncExtendCallback(React.useCallback(callback, []))(
        props.pipeline,
      ),
      effectFired: useMockAsyncEffect(),
    }),
    {
      initialProps: {
        pipeline: { loading: true },
      },
    },
  );

  await waitForNextUpdate();
  expect(result.current.effectFired).toBe(true);
  expect(callback).not.toHaveBeenCalled();

  rerender({ pipeline: { loading: false } });
  expect(callback).toHaveBeenCalled();
});

test('{ runWhenLoading } calls the callback even if loading', async () => {
  const callback = jest.fn().mockReturnValue({ foo: 42 });
  const { waitForNextUpdate, result } = renderHook(
    (props) => ({
      ...usePluginAsyncExtendCallback(React.useCallback(callback, []), {
        runWhenLoading: true,
      })(props.pipeline),
      effectFired: useMockAsyncEffect(),
    }),
    {
      initialProps: {
        pipeline: { loading: true },
      },
    },
  );

  await waitForNextUpdate();
  expect(result.current.effectFired).toBe(true);
  expect(callback).toHaveBeenCalled();
});

test('reports an error when the async action fails', async () => {
  const mockError = new Error('test-error');
  const errorHandler = jest.fn();
  const { waitForNextUpdate, result } = renderHook(() => ({
    ...useExperiment(
      () => ({
        errorHandler,
      }),
      usePluginAsyncExtendCallback(
        React.useCallback(async (): Promise<{}> => {
          throw mockError;
        }, []),
      ),
    ),
    effectFired: useMockAsyncEffect(),
  }));

  await waitForNextUpdate();
  expect(result.current.effectFired).toBe(true);

  const error = result.current.error;
  expect(error).toBeTruthy();
  expect(error!.rawError).toBe(mockError);
  expect(error!.pluginIndex).toBe(1);
  expect(errorHandler).toHaveBeenCalledWith(
    expect.objectContaining({ rawError: mockError }),
    expect.any(Object),
  );
});

test('reports loading immediately when upstream stops loading, not waiting for useEffect', async () => {
  let loadingLog = '';
  const { waitForNextUpdate, result, rerender } = renderHook(
    (props) => {
      const experiment = useExperiment(
        () => ({
          loading: props.upstreamLoading,
        }),
        usePluginAsyncExtendCallback(
          React.useCallback(async () => {
            return {
              callbackIdentity: props.callbackIdentity,
            };
          }, [props.callbackIdentity]),
        ),
      );
      loadingLog += experiment.loading ? 'T' : 'F';
      return experiment;
    },
    { initialProps: { upstreamLoading: false, callbackIdentity: 1 } },
  );

  await waitForNextUpdate();
  loadingLog = '';
  rerender({ upstreamLoading: true, callbackIdentity: 2 });
  rerender({ upstreamLoading: false, callbackIdentity: 2 });
  await waitForNextUpdate();

  expect(loadingLog).not.toContain('TFT');
  expect(result.current.callbackIdentity).toBe(2);
});

const createDeferred = () => {
  let resolve: (a: any) => void;
  let promise = new Promise((resolveArg) => (resolve = resolveArg));
  return [
    promise,
    // @ts-ignore
    resolve,
  ] as [Promise<{ cameFromPromise: number }>, (resolvedValue: any) => void];
};

test('cancels previous async calls', async () => {
  const [promise1, resolve1] = createDeferred();
  const [promise2, resolve2] = createDeferred();
  const { waitForNextUpdate, rerender, result } = renderHook(
    (props) => ({
      ...usePluginAsyncExtendCallback(props.callback)({}),
      effectFired: useMockAsyncEffect(),
    }),
    {
      initialProps: {
        callback: () => promise1,
      },
    },
  );

  rerender({ callback: () => promise2 });
  resolve2({ cameFromPromise: 2 });
  resolve1({ cameFromPromise: 1 });

  await waitForNextUpdate();
  expect(result.current.cameFromPromise).toEqual(2);
});
