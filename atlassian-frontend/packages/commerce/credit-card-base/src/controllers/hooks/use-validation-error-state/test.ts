import { act, renderHook } from '@testing-library/react-hooks';

import {
  createExceptionResult,
  FailureResult,
} from '@atlassian/commerce-resultful';

import * as FieldNames from '../../../common/constants/field-names';
import {
  createFieldCustomValidationError,
  CreditCardError,
} from '../../../common/utils/errors';
import { useFieldErrorEventDispatch } from '../../../common/utils/events';

import { useFieldErrorState } from './index';

jest.mock('../../../common/utils/events', () => ({
  useFieldErrorEventDispatch: jest.fn(),
}));
const eventDispatch = jest.fn();
(useFieldErrorEventDispatch as any).mockReturnValue(eventDispatch);

const expectedFieldName = 'example-field';

const expectedMonitoringPayload = expectedFieldName;

const errorNoUserFriendlyMessage = createFieldCustomValidationError(
  'first message',
  FieldNames.NUMBER,
);
const errorWithUserFriendlyMessage = createFieldCustomValidationError(
  'second message',
  FieldNames.NUMBER,
  'user friendly message',
);
const exception = createExceptionResult(new Error('third message'));

it(`${useFieldErrorState.name} only updates error message & dispatches monitoring events for no-error->error state transitions`, () => {
  const { result: fieldErrorHookResult } = renderHook(() =>
    useFieldErrorState(expectedFieldName),
  );
  const setErrorInsideAct = (
    value: FailureResult<CreditCardError, any> | undefined,
  ) => {
    act(() => {
      fieldErrorHookResult.current.setFailure(value);
    });
  };

  expect(fieldErrorHookResult.current.failureMessage).toBe(undefined);

  setErrorInsideAct(errorWithUserFriendlyMessage);
  expect(fieldErrorHookResult.current.failureMessage).toBe(
    errorWithUserFriendlyMessage.error.userFriendlyMessage,
  );
  expect(eventDispatch).toBeCalledWith(expectedMonitoringPayload);

  setErrorInsideAct(errorNoUserFriendlyMessage);
  expect(fieldErrorHookResult.current.failureMessage).toBe(
    errorWithUserFriendlyMessage.error.userFriendlyMessage,
  );
  expect(eventDispatch).toBeCalledTimes(1);

  setErrorInsideAct(undefined);
  expect(fieldErrorHookResult.current.failureMessage).toBe(undefined);
  expect(eventDispatch).toBeCalledTimes(1);

  setErrorInsideAct(exception);
  expect(fieldErrorHookResult.current.failureMessage).toBe('Unknown error');
  expect(eventDispatch).toBeCalledTimes(2);

  setErrorInsideAct(undefined);
  expect(fieldErrorHookResult.current.failureMessage).toBe(undefined);
  setErrorInsideAct(errorNoUserFriendlyMessage);
  expect(fieldErrorHookResult.current.failureMessage).toBe('Unknown error');
});
