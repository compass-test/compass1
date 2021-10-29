import {
  createCachedLoadReCaptchaScriptFn,
  ONLOAD_CALLBACK_KEY,
} from './index';

const expectScriptCountToBe = (n: number) => {
  expect(document.querySelectorAll('script')).toHaveLength(n);
};

const triggerReCaptchaMounted = () =>
  (globalThis as any)[ONLOAD_CALLBACK_KEY]();

describe(createCachedLoadReCaptchaScriptFn.name, () => {
  afterEach(() => {
    // Reset DOM
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it("if the script isn't mounted, go mount it", async () => {
    expectScriptCountToBe(0);

    (globalThis as any).someGlobalObject = "hasn't loaded";

    const loadScript = createCachedLoadReCaptchaScriptFn({
      reCaptchaScriptUrl: 'https://example.com',
      isScriptAlreadyDeclared: () => false,
      getGlobalReCaptchaObject: () => (globalThis as any).someGlobalObject,
    });

    const loadReCaptchaPromise1 = loadScript();
    expectScriptCountToBe(1);

    const loadedValue = 'has loaded!';
    (globalThis as any).someGlobalObject = loadedValue;
    triggerReCaptchaMounted();
    await expect(loadReCaptchaPromise1).resolves.toBe(loadedValue);
  });

  it("if the script IS mounted, then don't remount, immediately return the global object", async () => {
    const mockGlobalObjectValue = 'previously loaded';

    const loadScript = createCachedLoadReCaptchaScriptFn({
      reCaptchaScriptUrl: 'https://example.com',
      isScriptAlreadyDeclared: () => true,
      getGlobalReCaptchaObject: () => mockGlobalObjectValue as any,
    });

    await expect(loadScript()).resolves.toBe(mockGlobalObjectValue);
    expectScriptCountToBe(0);
  });
});
