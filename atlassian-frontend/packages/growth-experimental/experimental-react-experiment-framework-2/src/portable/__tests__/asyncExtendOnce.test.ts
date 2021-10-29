import React from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useExperiment } from '../../core';
import { usePluginAsyncExtendOnce } from '../asyncExtendOnce';

// These tests would benefit from an async act(),
// which is unavailable in our version of React DOM.
test('extends the pipeline with what the callback asynchronously returned', async () => {
  const pipeline = { quux: 43 };
  const callback = jest.fn().mockReturnValue({ foo: 42 });
  const { result, waitForNextUpdate } = renderHook(() =>
    usePluginAsyncExtendOnce(callback)(pipeline),
  );
  expect(callback).toHaveBeenCalledWith(pipeline);
  expect(result.current).toEqual(expect.objectContaining({ loading: true }));
  await waitForNextUpdate();
  expect(result.current).toEqual(
    expect.objectContaining({ foo: 42, loading: false }),
  );
});

test('calls the extender callback once even on multiple rerenders', async () => {
  const callback = jest.fn().mockReturnValue({ foo: 42 });
  const { rerender, waitForNextUpdate } = renderHook(() =>
    usePluginAsyncExtendOnce(callback)({}),
  );
  expect(callback).toHaveBeenCalledTimes(1);
  await waitForNextUpdate();
  rerender();
  rerender();
  expect(callback).toHaveBeenCalledTimes(1);
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
      ...usePluginAsyncExtendOnce(callback)(props.pipeline),
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
  const { waitForNextUpdate, rerender, result } = renderHook(
    (props) => ({
      ...usePluginAsyncExtendOnce(callback, { runWhenLoading: true })(
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
  expect(callback).toHaveBeenCalled();

  rerender();
  expect(callback).toHaveBeenCalledTimes(1);
});

test('reports an error when the async action fails', async () => {
  const mockError = new Error('test-error');
  const errorHandler = jest.fn();
  const { waitForNextUpdate, result } = renderHook(() => ({
    ...useExperiment(
      () => ({
        errorHandler,
      }),
      usePluginAsyncExtendOnce(
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
