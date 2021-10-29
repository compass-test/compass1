import React, { ReactNode, useMemo } from 'react';

import { ErrorMessage, Field } from '@atlaskit/form';
import { Meta } from '@atlaskit/form/Field';
import Select from '@atlaskit/select';

export type OptionType<T> = {
  label: string;
  value: T;
};

type ValidateFn<FieldValue> = (
  value: FieldValue | undefined,
  formState: Object,
  fieldState: Meta,
) => string | void | Promise<string | void>;

export interface Props<FieldValue> {
  width?: number;
  options: OptionType<FieldValue>[];
  /* The default value of the field. If a function is provided it is called with the current default value of the field. */
  defaultValue:
    | FieldValue
    | ((currentDefaultValue?: FieldValue) => FieldValue)
    | undefined;
  /* Passed to the ID attribute of the field. Randomly generated if not specified */
  id?: string;
  /* Whether the field is required for submission */
  isRequired?: boolean;
  /* Whether the field is disabled. If the parent Form component is disabled, then the field will always be disabled */
  isDisabled?: boolean;
  /* Label displayed above the field */
  label?: ReactNode;
  /* The name of the field */
  name: string;
  /* validates the current value of field */
  validate?: ValidateFn<FieldValue>;
  isSearchable?: boolean;
}

export const SelectField = <FieldValue,>({
  width,
  options,
  isSearchable = false,
  isRequired,
  validate,
  ...propsForFieldComponent
}: Props<FieldValue>) => {
  const validateFn: ValidateFn<FieldValue> | undefined = useMemo(() => {
    if (validate) {
      return validate;
    }

    if (isRequired) {
      return (value) => {
        if (!value) {
          return 'required';
        }
      };
    }

    return undefined;
  }, [isRequired, validate]);

  return (
    <Field<FieldValue | undefined>
      {...propsForFieldComponent}
      isRequired={isRequired}
      validate={validateFn}
    >
      {({
        fieldProps: { id, value: fieldValue, onChange: fieldOnChange, ...rest },
        error,
      }) => (
        <>
          <Select
            validationState={error ? 'error' : 'default'}
            inputId={id}
            {...rest}
            value={options.find((o) => o.value === fieldValue)}
            options={options}
            menuPortalTarget={document.body}
            onChange={(option) => {
              fieldOnChange(option?.value);
            }}
            isSearchable={isSearchable}
            styles={{
              container: (base) => ({
                ...base,
                width,
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      )}
    </Field>
  );
};
