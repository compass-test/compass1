export type ConsoleMock = {
  mocks: {
    log: jest.SpyInstance;
    info: jest.SpyInstance;
    warn: jest.SpyInstance;
    error: jest.SpyInstance;
  };
  clearMocks: () => void;
  restoreMocks: () => void;
  assertSafeConsole: () => void;
};

export function mockConsole() {
  return {
    // Silence logs within test runner
    mocks: {
      log: jest.spyOn(console, 'log').mockImplementation((_msg: string) => {}),
      info: jest
        .spyOn(console, 'info')
        .mockImplementation((_msg: string) => {}),
      warn: jest
        .spyOn(console, 'warn')
        .mockImplementation((_msg: string) => {}),
      error: jest
        .spyOn(console, 'error')
        .mockImplementation((_msg: string) => {}),
    },
    clearMocks: function () {
      const { log, info, warn, error } = this.mocks;
      log.mockClear();
      info.mockClear();
      warn.mockClear();
      error.mockClear();
    },
    restoreMocks: function () {
      const { log, info, warn, error } = this.mocks;
      log.mockRestore();
      info.mockRestore();
      warn.mockRestore();
      error.mockRestore();
    },
    assertSafeConsole: function () {
      // Here, we validate that `console.warn` and `console.error` aren't used within the transformer,
      // as their output is sent to `stderr` instead of `stdout` within jscodeshift, resulting in an error.
      //
      // `defineInlineTest` sidesteps the differences between `stderr` and `stdout`, so we measure the
      // console mock calls to ensure no "errors" will be thrown by the codemods.
      //
      // Usage: call this within `afterEach` inside your transformer test files.
      // Although it's unorthodox performing assertions outside of a `test`, it is supported and functional.
      const { warn, error } = this.mocks;
      expect(warn).toBeCalledTimes(0);
      expect(error).toBeCalledTimes(0);
    },
  };
}
