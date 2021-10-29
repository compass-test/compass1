import React, { FC, useCallback } from 'react';

import { fireEvent, render, wait } from '@testing-library/react';

import {
  CommerceMockedEnvironment,
  Scenario,
} from '@atlassian/commerce-environment/mocks';
import {
  createErrorResult,
  createExceptionResult,
  createSuccessResult,
} from '@atlassian/commerce-resultful';

import { createHAMSReCaptchaClientScenarios } from './mocks';

import {
  useHAMSCaptchaChallengeCallback,
  useHAMSCaptchaChallengeEventHandler,
} from './index';

const TEST_OPERATION = 'test-operation';
const mockScenarios = createHAMSReCaptchaClientScenarios(TEST_OPERATION);

const BUTTON_TEST_ID = 'button-test-id';

type TestComponentProps = { onReCaptchaToken: jest.MockedFunction<any> };
const useHAMSCaptchaChallengeCallbackSetup = {
  hookName: useHAMSCaptchaChallengeCallback.name,
  TestComponent: ({ onReCaptchaToken }: TestComponentProps) => {
    const onClick = useHAMSCaptchaChallengeCallback(
      TEST_OPERATION,
      useCallback(
        (token, e: React.BaseSyntheticEvent) => {
          e.persist();
          onReCaptchaToken(token, e);
        },
        [onReCaptchaToken],
      ),
    );

    return <button data-testid={BUTTON_TEST_ID} onClick={onClick} />;
  },
};

const useHAMSCaptchaChallengeEventHandlerSetup = {
  hookName: useHAMSCaptchaChallengeEventHandler.name,
  TestComponent: ({ onReCaptchaToken }: TestComponentProps) => {
    const setRef = useHAMSCaptchaChallengeEventHandler(
      TEST_OPERATION,
      useCallback(
        (token, e: Event) => {
          onReCaptchaToken(token, e);
        },
        [onReCaptchaToken],
      ),
    );

    return <button data-testid={BUTTON_TEST_ID} ref={setRef} />;
  },
};

const createTestScenario = (
  scenarios: Scenario[],
  TestComponent: FC<TestComponentProps>,
) => {
  const onReCaptchaToken = jest.fn();

  return {
    render: () => {
      const { getByTestId } = render(
        <CommerceMockedEnvironment scenarios={scenarios}>
          <TestComponent onReCaptchaToken={onReCaptchaToken} />
        </CommerceMockedEnvironment>,
      );

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

for (const { TestComponent, hookName } of [
  useHAMSCaptchaChallengeCallbackSetup,
  useHAMSCaptchaChallengeEventHandlerSetup,
]) {
  describe(hookName, () => {
    it("doesn't mount when HAMS sends a server failure & token returns a failure result", async () => {
      const scenario = createTestScenario(
        [mockScenarios.fetchReCaptchaSiteKeyServerFailure],
        TestComponent,
      );

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
    });

    it("doesn't mount when HAMS tells us not to use reCAPTCHA & token returns a successful null value", async () => {
      const scenario = createTestScenario(
        [mockScenarios.fetchReCaptchaSiteKeyDisabled],
        TestComponent,
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
    });

    it.skip("doesn't mount when fetch throws an exception & token returns a failure result", async () => {
      const scenario = createTestScenario(
        [mockScenarios.fetchReCaptchaSiteKeyWithBrokenContract],
        TestComponent,
      );

      const scenarioUtils = scenario.render();
      expect(scenarioUtils.onReCaptchaToken).not.toBeCalled();

      scenarioUtils.clickReCaptchaInstrumentedButton();

      await wait(() => {
        expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledTimes(1);
      });
      expect(scenarioUtils.onReCaptchaToken).toHaveBeenCalledWith(
        expect.objectContaining(createExceptionResult(expect.any(Error))),
        expect.anything(),
      );
    });
  });
}
