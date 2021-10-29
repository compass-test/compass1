/* eslint-env jest */
/* eslint-disable no-console */
export {
  MockProviderFactory,
  MockMentionProvider,
  mockMentionsProviderPromise,
} from './mentionProviders';
export {
  provideMockMetalClient,
  provideMockSentryClient,
} from './provideMocks';
export {
  dispatch,
  handler,
  createDefaultExport,
  createMockDispatch,
  createMockHandler,
  createExampleComponent,
} from './storybook-utils';

/**
 * Remove this silencing once our dependencies have been bumped to include at least react-dom@16.9.x
 * See: https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256
 * @atlaskit warnings come from the implementation of various @atlaskit components. This can be removed
 * when the implementation's stop using deprecated packages.
 *
 * Should be used above imports of deprecated packages, or packages that import those deprecated
 * packages (e.g. @forge/ui), since the warning is logged when the code is loaded.
 */
export const temporarilySilenceActAndAtlaskitDeprecationWarnings = () => {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
  console.warn = (...args: any[]) => {
    if (/@atlaskit.*has been deprecated/.test(args[0])) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
  });
};

type HookResult<T> = T extends object ? { result: { current: T } } : never;

export const getRenderedProperty = <T, K extends keyof T>(
  rendered: HookResult<T>,
  property: K,
): T[K] => rendered.result.current[property];

export const waitForNextTick = () =>
  new Promise((resolve) => setTimeout(resolve));

export const getHasBeenCalledPromise = (fn: jest.Mock) => {
  let resolve: () => void;
  const fnHasBeenCalled = new Promise((r) => {
    resolve = r;
  });
  fn.mockImplementation(() => resolve());

  return fnHasBeenCalled;
};
