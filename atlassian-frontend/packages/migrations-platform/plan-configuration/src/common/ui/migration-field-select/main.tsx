import React, { PropsWithChildren, ReactNode } from 'react';

import { Field } from '@atlaskit/form';
import Select, { SelectProps, ValueType } from '@atlaskit/select';
import Spinner from '@atlaskit/spinner';

import { SpinnerContainer } from './styled';

type OptionBase<D> = {
  data: D;
  label: string;
  value: string;
};

// AK Field doesn't expose its component props type so we need to
// duplicate the selected props here
type FieldPropsBase<D> = {
  name: string;
  label?: ReactNode;
  defaultOption?: OptionBase<D>;
  isRequired?: boolean;
};

export type Props<D = unknown> = FieldPropsBase<D> & SelectProps<OptionBase<D>>;

export const MigrationFieldSelect = <D extends unknown = unknown>({
  // Meta
  name,
  label,
  placeholder,
  isRequired = false,
  isLoading = false,
  // Option
  options = [],
  defaultOption,
  formatOptionLabel,
  // Callback
  onChange,
  styles,
  // Others
  children,
  ...otherSelectProps
}: PropsWithChildren<Props<D>>) => {
  return (
    <Field<ValueType<OptionBase<D>>>
      name={name}
      label={label}
      defaultValue={defaultOption}
      isRequired={isRequired}
    >
      {({ fieldProps }) => {
        if (isLoading) {
          return (
            <SpinnerContainer>
              <Spinner delay={50} size="large" />
            </SpinnerContainer>
          );
        }

        return (
          <>
            <Select<OptionBase<D>>
              {...fieldProps}
              {...otherSelectProps}
              isDisabled={options.length === 0}
              options={options}
              styles={styles}
              formatOptionLabel={formatOptionLabel}
              placeholder={placeholder}
              onChange={(...args) => {
                // Send analytics
                // TODO:

                // Update Field
                fieldProps.onChange(args[0]);

                // Notify consumer
                if (onChange) {
                  onChange(...args);
                }
              }}
            />
            {children}
          </>
        );
      }}
    </Field>
  );
};

export default MigrationFieldSelect;
