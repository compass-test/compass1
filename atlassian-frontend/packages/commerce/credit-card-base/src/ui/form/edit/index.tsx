import React, { FormEvent, useCallback } from 'react';

import {
  CardCvcElement as StripeCardCVCElement,
  CardExpiryElement as StripeCardExpiryElement,
  CardNumberElement as StripeCardNumberElement,
} from '@stripe/react-stripe-js';

import { ErrorMessage } from '@atlaskit/form';
import AKTextField from '@atlaskit/textfield';

import * as FieldNames from '../../../common/constants/field-names';
import { I18nHack } from '../../../common/utils/i18n-hack';
import { useCardFieldUpdate } from '../../../controllers/hooks/use-credit-card-fields';
import {
  FieldCallbacks,
  Focusable,
  useReactFieldState,
} from '../../../controllers/reactive-field-state';

import {
  ErrorWrapper,
  Field,
  FormGrid,
  inputOptions,
  Label,
  LabelSpan,
} from './styled';

const FieldError: React.FC<{ error: boolean | string }> = ({ error }) =>
  error && typeof error === 'string' ? (
    <ErrorWrapper role="alert">
      <ErrorMessage>{error}</ErrorMessage>
    </ErrorWrapper>
  ) : null;

type OnReadyCallback = (field: Focusable) => any;

type FormFieldRenderProp = (callbacks: FieldCallbacks) => React.ReactElement;

type ReactiveFieldProps = {
  children: FormFieldRenderProp;
  name: FieldNames.FieldName;
  onReady?: OnReadyCallback;
};
const ReactiveField: React.FC<ReactiveFieldProps> = ({
  name,
  children,
  onReady,
}) => {
  const { state, callbacks } = useReactFieldState({ name, onReady });
  return (
    <>
      <Field
        focused={state.focused}
        error={!!state.error}
        data-testid={`stripe-cc-${name}`}
      >
        {children(callbacks)}
      </Field>
      <FieldError error={state.error !== undefined ? state.error : false} />
    </>
  );
};

export const NameField = () => {
  const onNameChange = useCardFieldUpdate(
    FieldNames.NAME,
    (e: FormEvent<HTMLInputElement>) => e.currentTarget.value,
  );
  const {
    state,
    callbacks: { onReady, ...callbacks },
  } = useReactFieldState({ name: FieldNames.NAME });
  const onChange = useCallback(
    (e) => {
      onNameChange(e);
      // This ensures the name error is cleared when the name is changed
      callbacks.onChange({ error: undefined });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onNameChange, callbacks.onChange],
  );

  return (
    <Label style={{ gridArea: FieldNames.NAME }}>
      <LabelSpan>
        <I18nHack en="Name on card" ja="カード名義人" />
      </LabelSpan>
      <AKTextField
        name="cardholderName"
        aria-label="Cardholder name"
        {...callbacks}
        onChange={onChange}
        testId={`stripe-cc-${FieldNames.NAME}`}
        ref={onReady}
        isInvalid={!!state.error}
      />
      <FieldError error={state.error !== undefined ? state.error : false} />
    </Label>
  );
};

type NumberFieldProps = {
  autoFocus?: boolean;
};
export const NumberField = ({ autoFocus = false }: NumberFieldProps) => {
  const onFirstFieldReady = useCallback(
    (field) => {
      if (!autoFocus) {
        return;
      }
      field.focus();
    },
    [autoFocus],
  );

  return (
    <Label style={{ gridArea: FieldNames.NUMBER }}>
      <LabelSpan>
        <I18nHack en="Card number" ja="カード番号" />
      </LabelSpan>
      <ReactiveField name={FieldNames.NUMBER} onReady={onFirstFieldReady}>
        {(callbacks) => (
          <StripeCardNumberElement
            options={{ ...inputOptions, showIcon: true }}
            {...callbacks}
          />
        )}
      </ReactiveField>
    </Label>
  );
};

export const ExpiryField = () => (
  <Label style={{ gridArea: FieldNames.EXPIRY }}>
    <LabelSpan>
      <I18nHack en="Expiration date" ja="有効期限" />
    </LabelSpan>
    <ReactiveField name={FieldNames.EXPIRY}>
      {(callbacks) => (
        <StripeCardExpiryElement options={inputOptions} {...callbacks} />
      )}
    </ReactiveField>
  </Label>
);

export const CVCField = () => (
  <Label style={{ gridArea: FieldNames.CVC }}>
    <LabelSpan>
      <I18nHack en="Security code" ja="セキュリティコード" />
    </LabelSpan>
    <ReactiveField name={FieldNames.CVC}>
      {(callbacks) => (
        <StripeCardCVCElement options={inputOptions} {...callbacks} />
      )}
    </ReactiveField>
  </Label>
);

export const Form: React.FC<{ className?: string; autoFocus?: boolean }> = ({
  className,
  autoFocus,
}) => {
  return (
    <FormGrid className={className}>
      <NumberField autoFocus={autoFocus} />
      <NameField />
      <ExpiryField />
      <CVCField />
    </FormGrid>
  );
};
