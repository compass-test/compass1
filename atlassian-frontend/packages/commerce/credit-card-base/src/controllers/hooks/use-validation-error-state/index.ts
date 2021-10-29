import { useCallback, useState } from 'react';

import { FailureResult } from '@atlassian/commerce-resultful';

import {
  CreditCardError,
  getUserFriendlyFailureMessage,
} from '../../../common/utils/errors';
import { useFieldErrorEventDispatch } from '../../../common/utils/events';

export const useFieldErrorState = (fieldName: string) => {
  const fieldErrorEventDispatch = useFieldErrorEventDispatch();
  const namedFieldErrorEventDispatch = useCallback(
    () => fieldErrorEventDispatch(fieldName),
    [fieldName, fieldErrorEventDispatch],
  );

  const [failureMessage, setFailureMessage] = useState<string | undefined>();

  const setFailure = useCallback(
    (failure: FailureResult<CreditCardError, any> | undefined) => {
      setFailureMessage((oldFailureMessage) => {
        if (oldFailureMessage !== undefined && failure !== undefined) {
          // Prefer old errors
          // but dont keep them if there is no error right now
          return oldFailureMessage;
        } else if (failure === undefined) {
          return undefined;
        }

        if (oldFailureMessage === undefined) {
          namedFieldErrorEventDispatch();
        }

        const userFriendlyMessage = getUserFriendlyFailureMessage(failure);
        return userFriendlyMessage !== undefined
          ? userFriendlyMessage
          : 'Unknown error';
      });
    },
    [namedFieldErrorEventDispatch],
  );

  return { failureMessage, setFailure };
};
