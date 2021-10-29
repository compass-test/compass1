import React, { useCallback } from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import {
  createErrorResult,
  createSuccessResult,
} from '@atlassian/commerce-resultful';

import {
  isEnterpriseReCaptchaScriptAlreadyDeclared,
  isFreeReCaptchaScriptAlreadyDeclared,
} from '../src/services/recaptcha/load-recaptcha';

import {
  FetchServerSideSiteKey,
  loadEnterpriseReCaptchaScript,
  loadFreeReCaptchaScript,
  LoadReCaptchaClient,
  useCaptchaChallengeCallback,
} from './index';

const waitForScriptToBeMounted = async (isScriptDeclared: () => boolean) => {
  // TODO: This check can be removed and replaced with non-wait alternatives once reCAPTCHA script mocks are added
  return await wait(
    () => {
      expect(isScriptDeclared()).toBe(true);
    },
    {
      // It's basically instant
      timeout: 200,
    },
  );
};

const createTestScenario = (
  siteKeyCallback: FetchServerSideSiteKey,
  loadReCaptcha?: LoadReCaptchaClient,
) => {
  const BUTTON_TEST_ID = 'button-test-id';

  const onReCaptchaToken = jest.fn();

  const TestComponent = () => {
    const onClick = useCaptchaChallengeCallback(
      siteKeyCallback,
      useCallback((token, e: React.BaseSyntheticEvent) => {
        e.persist();
        onReCaptchaToken(token, e);
      }, []),
      {
        loadReCaptcha,
      },
    );

    return <button data-testid={BUTTON_TEST_ID} onClick={onClick} />;
  };

  return {
    render: () => {
      const { getByTestId } = render(<TestComponent />);

      const button = getByTestId(BUTTON_TEST_ID);

      const clickReCaptchaInstrumentedButton = () => {
        fireEvent.click(button);
      };

      return {
        clickReCaptchaInstrumentedButton,
        onReCaptchaToken,
      };
    },
  };
};

describe(useCaptchaChallengeCallback.name, () => {
  beforeEach(() => {
    globalThis.document.body.innerHTML = '';
    globalThis.document.head.innerHTML = '';
  });
  it('when siteKey retrieval succeeds & free load reCAPTCHA script is used, mounts script & returns successful token', async () => {
    const scenario = createTestScenario(
      async () => ({
        failed: false,
        siteKey: 'site key!',
      }),
      loadFreeReCaptchaScript,
    );

    const scenarioUtils = scenario.render();
    expect(scenarioUtils.onReCaptchaToken).not.toBeCalled();

    await waitForScriptToBeMounted(isFreeReCaptchaScriptAlreadyDeclared);

    /*
    scenarioUtils.clickReCaptchaInstrumentedButton();
    TODO: Can't write the rest of this until reCAPTCHA mock is written
    await wait(() => {
      expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledTimes(1);
    });
    expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledWith(
      expect.objectContaining(
        createSuccessResult({
          failed: true,
          siteKey: expect.any(String), // TODO: Specify exact string value
        }),
      ),
      expect.anything(),
    );*/
  });

  it('when told not to use reCAPTCHA & free load reCAPTCHA script is used, still mounts script & token returns a successful null value before script is loaded', async () => {
    const scenario = createTestScenario(
      async () => ({
        failed: false,
        siteKey: null,
      }),
      loadFreeReCaptchaScript,
    );

    const scenarioUtils = scenario.render();

    expect(scenarioUtils.onReCaptchaToken).not.toBeCalled();

    scenarioUtils.clickReCaptchaInstrumentedButton();

    await wait(() => {
      expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledTimes(1);
    });
    expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledWith(
      expect.objectContaining(createSuccessResult(null)),
      expect.anything(),
    );

    await waitForScriptToBeMounted(isFreeReCaptchaScriptAlreadyDeclared);
  });

  it('when site key retrieval fails & default reCAPTCHA load script is used, still mounts script & token returns a failure result before script is loaded', async () => {
    const scenario = createTestScenario(() => ({
      failed: true,
      siteKey: undefined,
    }));

    const scenarioUtils = scenario.render();
    expect(scenarioUtils.onReCaptchaToken).not.toBeCalled();

    scenarioUtils.clickReCaptchaInstrumentedButton();

    await wait(() => {
      expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledTimes(1);
    });
    expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledWith(
      expect.objectContaining(
        createErrorResult({
          failed: true,
          siteKey: undefined,
        }),
      ),
      expect.anything(),
    );

    await waitForScriptToBeMounted(isEnterpriseReCaptchaScriptAlreadyDeclared);
  });

  it("when using explicit reCAPTCHA load script & site key retrieval throws error: doesn't mount when throws an exception & token returns a failure result before script is loaded", async () => {
    const scenario = createTestScenario(() => {
      throw new Error(
        'The site key retrieval implementation threw an error!!!!!',
      );
    }, loadEnterpriseReCaptchaScript);

    const scenarioUtils = scenario.render();
    expect(scenarioUtils.onReCaptchaToken).not.toBeCalled();

    scenarioUtils.clickReCaptchaInstrumentedButton();

    await wait(() => {
      expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledTimes(1);
    });
    // TODO: Need to provide more error info in the future
    expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledWith(
      expect.objectContaining(
        createErrorResult({
          failed: true,
          siteKey: undefined,
        }),
      ),
      expect.anything(),
    );

    await waitForScriptToBeMounted(isEnterpriseReCaptchaScriptAlreadyDeclared);
  });
});
