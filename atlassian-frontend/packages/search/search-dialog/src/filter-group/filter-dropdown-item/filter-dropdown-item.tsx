import React, { useCallback } from 'react';
import Select from '@atlaskit/select';
import { grid } from '../../style-utils';

interface ValueWithLabel<T> {
  label: string;
  value: T;
}

export interface Props<T> {
  value?: ValueWithLabel<T>;
  values: ValueWithLabel<T>[];
  onChange?: (value: T) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const FilterDropdownItem = <T extends Object>({
  value,
  values,
  onChange,
  placeholder,
  isLoading,
}: Props<T>) => {
  const onChangeCallback = useCallback(
    (labelWithValue) => onChange?.(labelWithValue.value),
    [onChange],
  );

  return (
    <Select
      isLoading={isLoading}
      styles={{
        container: (provided) => ({
          ...provided,
          paddingRight: grid.px,
        }),
        option: (provided) => ({
          ...provided,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }),
        placeholder: (provided) => ({
          ...provided,
          width: '100%',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }),
      }}
      value={value}
      options={values}
      placeholder={placeholder}
      onChange={onChangeCallback}
    />
  );
};

// `as typeof FilterDropdownItem` is needed here so that the generic type T used in FilterDropdownItem (e.g. values` and `onChange`) is inferred correctly
export default React.memo(FilterDropdownItem) as typeof FilterDropdownItem;
