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

import {
  fullShipToDetails,
  fullShipToDetailsWithId,
  invoiceGroupId,
  minimalShipToDetails,
  minimalShipToDetailsId,
  minimalShipToDetailsWithId,
  scenarios,
} from './mocks';

import {
  useCreateShipToDetailsService,
  useShipToDetailsListService,
  useShipToDetailsService,
  useUpdateDefaultShipToDetailsService,
  useUpdateShipToDetailsService,
} from './index';

test('ship-to details list service returns data for transaction account', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useShipToDetailsListService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.fetchListSuccess),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual([
    minimalShipToDetailsWithId,
    fullShipToDetailsWithId,
  ]);
});

test('ship-to details create service returns created object', async () => {
  const { result } = renderHook(() => useCreateShipToDetailsService(TXA_ID), {
    wrapper: createMockedEnvironmentWrapper(scenarios.createSuccess),
  });
  await result.current.create(minimalShipToDetails).catch(() => null);

  expect(result.current.data).toEqual(minimalShipToDetailsWithId);
});

// Skipped as for some reason affects following test
test('ship-to details create service returns validation error', async () => {
  const { result } = renderHook(() => useCreateShipToDetailsService(TXA_ID), {
    wrapper: createMockedEnvironmentWrapper(scenarios.createValidationError),
  });

  await result.current.create(minimalShipToDetails).catch(() => null);

  expect(result.current.error).toBeInstanceOf(ValidationError);
  expect(result.current.error).toHaveProperty(
    'errors',
    inlineErrorsValidationResponse.errorDetails.validationErrors,
  );
});

test('ship-to details service returns specified ship-to address', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useShipToDetailsService(TXA_ID, minimalShipToDetailsId),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.fetchSuccess),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual(minimalShipToDetailsWithId);
});

test('ship-to details update service success returns updated version', async () => {
  const { result } = renderHook(
    () => useUpdateShipToDetailsService(TXA_ID, minimalShipToDetailsId),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.updateSuccess),
    },
  );
  await result.current.update(fullShipToDetails).catch(() => null);

  expect(result.current.data).toEqual(fullShipToDetailsWithId);
});

test('ship-to details update service returns validation error', async () => {
  const { result } = renderHook(
    () => useUpdateShipToDetailsService(TXA_ID, minimalShipToDetailsId),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.updateValidationError),
    },
  );

  await result.current.update(minimalShipToDetails).catch(() => null);

  expect(result.current.error).toBeInstanceOf(ValidationError);
  expect(result.current.error).toHaveProperty(
    'errors',
    inlineErrorsValidationResponse.errorDetails.validationErrors,
  );
});

test('ship-to details update default service returns success', async () => {
  const { result } = renderHook(
    () => useUpdateDefaultShipToDetailsService(TXA_ID, invoiceGroupId),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.updateDefaultSuccess),
    },
  );
  await result.current.update(invoiceGroupId).catch(() => null);

  expect(result.current.data).toEqual(fullShipToDetailsWithId);
});

test('ship-to details update default service returns failure', async () => {
  const { result } = renderHook(
    () => useUpdateDefaultShipToDetailsService(TXA_ID, invoiceGroupId),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.updateDefaultFailure),
    },
  );
  await result.current.update(invoiceGroupId).catch(() => null);

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});

test('ship-to details update default service returns not found', async () => {
  const { result } = renderHook(
    () => useUpdateDefaultShipToDetailsService(TXA_ID, invoiceGroupId),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.updateDefaultNotFound),
    },
  );
  await result.current.update(invoiceGroupId).catch(() => null);

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 404);
});
