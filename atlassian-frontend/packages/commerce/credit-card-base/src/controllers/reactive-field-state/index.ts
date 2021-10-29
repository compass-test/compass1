import React, { useCallback, useContext, useEffect, useState } from 'react';

import { FieldName } from '../../common/constants/field-names';
import { ELEMENT_TIMEOUT } from '../../common/constants/timeouts';
import { calcTextFieldActionSubjectId } from '../../common/utils/action-subject-id';
import { createFieldCreditCardStripeError } from '../../common/utils/errors';
import { useUIEventDispatch } from '../../common/utils/events';
import { formContext } from '../context';
import { useFieldRegisterHook } from '../hooks/use-credit-card-field';
import { useFieldErrorState } from '../hooks/use-validation-error-state';

export type Focusable = { focus(): void };

export interface FieldState {
  focused: boolean;
  error: string | undefined;
}

export interface FieldCallbacks {
  onFocus(): void;

  onBlur(): void;

  onChange({ error }: { error?: any }): void;

  onReady(element: Focusable | null): void;
}

export type ReactiveFieldStateInput = {
  name: FieldName;
  onReady?: (field: Focusable) => any;
};

export const useReactFieldState = ({
  name,
  onReady: onParentReady,
}: ReactiveFieldStateInput) => {
  const dispatchAnalyticsEvent = useUIEventDispatch();

  const { fieldConfigs } = useContext(formContext);
  const fieldCallbacks =
    fieldConfigs !== undefined ? fieldConfigs[name] : undefined;

  const createAndFireCreditCardEvent = useCallback(
    (action: string, actionSubjectId: string) => {
      dispatchAnalyticsEvent({
        action,
        actionSubject: 'textField',
        actionSubjectId,
      });
    },
    [dispatchAnalyticsEvent],
  );

  const [element, setElement] = useState<Focusable | null>(null);

  const { failureMessage, setFailure } = useFieldErrorState(name);

  const [focused, setFocused] = useState(false);
  const onFocus = useCallback(() => {
    setFocused(true);
    createAndFireCreditCardEvent('focused', calcTextFieldActionSubjectId(name));
    if (fieldCallbacks !== undefined && fieldCallbacks.onFocus !== undefined) {
      fieldCallbacks.onFocus();
    }
  }, [createAndFireCreditCardEvent, setFocused, name, fieldCallbacks]);

  const onBlur = useCallback(() => {
    setFocused(false);
    createAndFireCreditCardEvent('blurred', calcTextFieldActionSubjectId(name));
    if (fieldCallbacks !== undefined && fieldCallbacks.onBlur !== undefined) {
      fieldCallbacks.onBlur();
    }
  }, [setFocused, name, createAndFireCreditCardEvent, fieldCallbacks]);

  const onChange = useCallback(
    (originalPayload) => {
      const payload =
        fieldCallbacks !== undefined && fieldCallbacks.onChange !== undefined
          ? fieldCallbacks.onChange(originalPayload)
          : originalPayload;

      const { error } = payload;
      if (error !== undefined) {
        setFailure(createFieldCreditCardStripeError(error, name));
      } else {
        setFailure(undefined);
      }
    },
    [name, setFailure, fieldCallbacks],
  );

  const focus = useCallback(() => {
    if (element) {
      element.focus();
    }
  }, [element]);

  const [failed, setFailed] = useState(false);
  const onReady = useCallback(
    (element: Focusable) => {
      setElement(element);
      if (onParentReady) {
        onParentReady(element);
      }
    },
    [onParentReady],
  );

  const isReady = Boolean(element);
  useEffect(() => {
    if (!isReady) {
      const tm = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.error(
          `StripeElement ${name} is not ready after ${ELEMENT_TIMEOUT} timeout`,
        );
        setFailed(true);
      }, ELEMENT_TIMEOUT);
      return () => clearTimeout(tm);
    }
  }, [isReady, name]);

  useFieldRegisterHook(name, setFailure, focus, isReady, failed);
  return {
    state: { focused, error: failureMessage },
    callbacks: { onFocus, onBlur, onChange, onReady },
  };
};
export type ReactiveFieldStateRenderProp = (
  state: FieldState,
  callbacks: FieldCallbacks,
) => React.ReactElement;
