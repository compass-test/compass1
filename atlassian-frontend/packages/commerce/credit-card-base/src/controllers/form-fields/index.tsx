import React, { useCallback, useMemo, useState } from 'react';

import { FailureResult } from '@atlassian/commerce-resultful';

import { CreditCardError } from '../../common/utils/errors';
import {
  FieldRef,
  formErrorContext,
  FormRefsContextType,
  formStateContext,
  FormStateContextType,
  formStateRefs,
} from '../context';

/**
 * Controls state of a single Field
 * @internal
 */
export const FormStateController: React.FC = ({ children }) => {
  const errorState = useState<FailureResult<CreditCardError, any> | undefined>(
    undefined,
  );
  const [values, setValues] = useState<Record<string, string>>({});

  const valuesUpdater = useCallback<FormStateContextType['1']>(
    (key, value) =>
      setValues((oldState) => ({
        ...oldState,
        [key]: value,
      })),
    [],
  );

  const valuesContextValue = useMemo<FormStateContextType>(
    () => [values, valuesUpdater],
    [values, valuesUpdater],
  );

  const [refs, setRefs] = useState<Record<string, FieldRef>>({});
  const refsUpdater = useCallback<FormRefsContextType[1]>(
    (key, value) =>
      setRefs((oldState) => {
        if (!value) {
          const { [key]: removeThis, ...newState } = oldState;
          return newState;
        } else {
          return {
            ...oldState,
            [key]: value,
          };
        }
      }),
    [],
  );

  const refContextValue = useMemo<FormRefsContextType>(
    () => [refs, refsUpdater],
    [refs, refsUpdater],
  );

  return (
    <formErrorContext.Provider value={errorState}>
      <formStateContext.Provider value={valuesContextValue}>
        <formStateRefs.Provider value={refContextValue}>
          {children}
        </formStateRefs.Provider>
      </formStateContext.Provider>
    </formErrorContext.Provider>
  );
};
