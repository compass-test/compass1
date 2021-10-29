import { useContext, useEffect } from 'react';

import { FailureResult } from '@atlassian/commerce-resultful';

import { FieldName } from '../../../common/constants/field-names';
import { CreditCardError } from '../../../common/utils/errors';
import { formStateRefs } from '../../context';

export const useFieldRegisterHook = (
  name: FieldName,
  setFailure: (failure: FailureResult<CreditCardError, any>) => void,
  focus: () => void,
  ready: boolean,
  failed: boolean,
) => {
  if (!name) {
    // TODO: remove me in the bright future
    throw new Error('provided an empty name');
  }
  const [, setField] = useContext(formStateRefs);
  useEffect(() => {
    if (setFailure && focus) {
      setField(name, { setFailure, focus, ready, failed });
    } else {
      setField(name, undefined);
    }
    return () => {
      setField(name, undefined);
    };
  }, [name, setFailure, focus, setField, ready, failed]);
};
