import { act, renderHook } from '@testing-library/react-hooks';

import { Resolver, ResolverOutput, useCallbackPromiseQueue } from './index';

type TestResolver = Resolver<[ResolverOutput<any> | undefined], any>;
const resolveWithForcedValue = 'forced-resolve';
const createResolverState = () => {
  const resolverMock = jest.fn();
  let resolver: TestResolver;
  const changeResolverTo = (newResolverImplementation: TestResolver) => {
    resolverMock.mockImplementation(newResolverImplementation);
    resolver = (...args) => resolverMock(...args);
  };

  const setToPassThroughValues = () => changeResolverTo((value) => value);
  const setToNeverResolveAnything = () => changeResolverTo(() => undefined);
  const setToResolveEverything = () =>
    changeResolverTo(() => ({ resolveWith: resolveWithForcedValue }));

  setToNeverResolveAnything();

  return {
    get resolver() {
      return resolver;
    },
    resolverMock,
    setToPassThroughValues,
    setToNeverResolveAnything,
    setToResolveEverything,
  };
};

it(useCallbackPromiseQueue.name, async () => {
  // Note: This is written as a single test and a single queue to increase the chance bugs in state transition dependent bugs

  const resolverState = createResolverState();

  const { result, rerender } = renderHook(() =>
    useCallbackPromiseQueue(resolverState.resolver),
  );
  expect(resolverState.resolverMock).toHaveBeenCalledTimes(0);

  // Queue and try resolve
  let promise1;
  act(() => {
    promise1 = result.current(undefined);
  });
  expect(resolverState.resolverMock).toHaveBeenCalledTimes(1);

  // Should try resolve the 2nd and 3rd enqueued promises but not the first
  const resolveWithFirstValue = '2nd-queued-value';
  const resolveWithSecondValue = '3rd-queued-value';
  let promise2;
  let promise3;
  act(() => {
    promise2 = result.current({ resolveWith: resolveWithFirstValue });
    promise3 = result.current({ resolveWith: resolveWithSecondValue });
  });
  expect(resolverState.resolverMock).toHaveBeenCalledTimes(3);

  // Doing nothing should avoid calling the resolver
  rerender();
  rerender();
  rerender();
  rerender();
  expect(resolverState.resolverMock).toHaveBeenCalledTimes(3);

  // Changing the resolver triggers the resolver for each item in the queue
  resolverState.setToNeverResolveAnything();
  rerender();
  expect(resolverState.resolverMock).toHaveBeenCalledTimes(6);

  // And making it changing it to pass through the real enqueued values makes it resolve all values the evaluate with { resolveWith }
  resolverState.setToPassThroughValues();
  rerender();
  expect(resolverState.resolverMock).toHaveBeenCalledTimes(9);

  // TODO: Should probably check the order of resolution too
  await expect(promise2).resolves.toBe(resolveWithFirstValue);
  await expect(promise3).resolves.toBe(resolveWithSecondValue);

  // Enqueueing something that's could resolve immediately... does just that :)
  const resolveWithThirdValue = undefined;
  let promise4;
  act(() => {
    promise4 = result.current({ resolveWith: resolveWithThirdValue });
  });
  await expect(promise4).resolves.toBe(resolveWithThirdValue);

  // And if we set the resolver to resolve anything, regardless of its input, we'll see that first promise resolve
  resolverState.setToResolveEverything();
  rerender();
  await expect(promise1).resolves.toBe(resolveWithForcedValue);
});
