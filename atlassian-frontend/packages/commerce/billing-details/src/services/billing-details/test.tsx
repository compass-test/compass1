// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import {
  createMockedEnvironmentWrapper,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import { HttpResponseError } from '@atlassian/commerce-service-hook';

// noinspection ES6PreferShortImport
import { ValidationError } from '../../common/utils/validation-errors';
import { inlineErrorsValidationResponse } from '../../common/utils/validation-errors/mocks';

import { fullBillingDetails, minimalBillingDetails, scenarios } from './mocks';

import {
  useBillingDetailsService,
  useBillingDetailsUpdateService,
} from './index';

test('billing details service returns data for transaction account', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingDetailsService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(
        scenarios.successMinimalBillingDetails,
      ),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual(minimalBillingDetails);
});

test('billing details update service update data for transaction account', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingDetailsUpdateService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.successUpdate),
    },
  );
  result.current.update(fullBillingDetails);

  await waitForNextUpdate();

  expect(result.current.data).toEqual(fullBillingDetails);
});

test('billing details update service returns validation error', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingDetailsUpdateService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(
        scenarios.updateValidationFailure,
      ),
    },
  );
  result.current.update(fullBillingDetails);

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(ValidationError);
  expect(result.current.error).toHaveProperty(
    'errors',
    inlineErrorsValidationResponse.errorDetails.validationErrors,
  );
});

// todo fix the issue with tests being affect by previous' test exception
test.skip('billing details service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingDetailsService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.failureFetch),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});

test.skip('billing details service update returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingDetailsUpdateService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.failureUpdate),
    },
  );
  result.current.update(fullBillingDetails);

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});
