import React, { ReactChild } from 'react';

import { FieldValidator } from 'final-form';
import { FieldMetaState, useField } from 'react-final-form';
import { useUID } from 'react-uid';

import type { FieldProps } from '@atlaskit/form/Field';
import { Appearance } from '@atlaskit/textfield';
import { ThemeModes } from '@atlaskit/theme/types';

import { Label } from './styled';

export const FieldId = React.createContext<string | undefined>(undefined);

type SupportedElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

type CommerceFieldProps<FieldValue, Element extends SupportedElements> = {
  name: string;
  label?: ReactChild;
  isRequired?: boolean;
  isDisabled?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  appearance?: Appearance;
  // eslint-disable-next-line react/no-unused-prop-types
  mode?: ThemeModes;
  // eslint-disable-next-line react/no-unused-prop-types
  width?: string | number | undefined;
  children: (args: {
    fieldProps: FieldProps<FieldValue, Element>;
    error?: string;
    valid: boolean;
    meta: FieldMetaState<FieldValue>;
  }) => React.ReactNode;
  validate?: FieldValidator<FieldValue>;
  type?: string;
  initialValue?:
    | FieldValue
    | ((currentDefaultValue?: FieldValue) => FieldValue);
};

export function Field<
  FieldValue = string,
  Element extends SupportedElements = HTMLInputElement
>({
  name,
  label,
  isRequired,
  isDisabled = false,
  children,
  validate,
  type,
}: CommerceFieldProps<FieldValue, Element>) {
  const fieldId = `field-${name}-${useUID()}`;
  const { input, meta } = useField(name, {
    validate,
    type,
  });

  const extendedFieldProps: FieldProps<FieldValue, Element> = {
    ...input,
    value: input.value,
    name: name,
    isDisabled,
    isInvalid: Boolean(!meta.valid && meta.touched),
    isRequired: Boolean(isRequired),
    'aria-invalid': (meta.error ? 'true' : 'false') as 'true' | 'false',
    'aria-labelledby': `${fieldId}-label ${fieldId}-helper ${fieldId}-valid ${fieldId}-error`,
    id: fieldId,
  };
  return (
    <div>
      {label && (
        <Label
          isRequired={isRequired}
          id={`${fieldId}-label`}
          htmlFor={fieldId}
        >
          {label}
        </Label>
      )}
      {children({
        fieldProps: { ...extendedFieldProps },
        valid: meta.valid ?? true,
        meta,
      })}
    </div>
  );
}
