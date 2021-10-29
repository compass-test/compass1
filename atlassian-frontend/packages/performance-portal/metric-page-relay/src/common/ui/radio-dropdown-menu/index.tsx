import React, { useCallback, useMemo } from 'react';

import memoize from 'lodash/memoize';

import { Field } from '@atlaskit/form';
import {
  ActionMeta,
  OptionType,
  RadioSelect,
  StylesConfig,
  ValueType,
} from '@atlaskit/select';
import { N500 } from '@atlaskit/theme/colors';
import { fontFamily, fontSize } from '@atlaskit/theme/constants';

import { Wrapper } from './styled';

export type MenuItemType = {
  label: string;
  value: string | number;
};

export type onChangeHandlerType = (value: MenuItemType['value']) => void;

type Props = {
  label: string;
  menuItems: MenuItemType[];
  onChange: (value: MenuItemType['value']) => void;
  defaultValue?: MenuItemType['value'];
  placeholder?: string;
};

type AKSelectOnChangeHandlerType = (
  value: ValueType<OptionType>,
  action: ActionMeta,
) => void;

const calculateMenuWidth = memoize(
  (label, options) => {
    const minWidth = 100;
    let calculatedWidth = 140;
    const lengthOfLongestOption = options.reduce(
      (length: number, opt: MenuItemType) => {
        if (opt.label?.length && length < opt.label.length) {
          length = opt.label.length;
        }
        return length;
      },
      0,
    );
    /* lengthOfLongestOption * 7px per char
  + 60 (the size of padding + dropdown indicator + radio dot approximately) */
    calculatedWidth = lengthOfLongestOption * 7 + 60;
    return calculatedWidth > minWidth ? calculatedWidth : minWidth;
  },
  (label, options) => `${label}.${options.join(',')}`,
);

const customSelectStyles: StylesConfig = {
  container(base, state) {
    const calculatedWidth = calculateMenuWidth(
      state.selectProps.label,
      state.options,
    );

    return {
      ...base,
      width: calculatedWidth,
    };
  },
  singleValue: (base: {}) => ({
    ...base,
    fontSize: fontSize(),
    fontWeight: 500,
    fontFamily: fontFamily(),
    color: N500,
  }),
};

const RadioDropdownMenu = ({
  label,
  menuItems,
  onChange,
  defaultValue,
  placeholder,
}: Props) => {
  const onChangeHandler = useCallback<AKSelectOnChangeHandlerType>(
    (value) => {
      if (value && !Array.isArray(value)) {
        onChange((value as MenuItemType).value);
      }
    },
    [onChange],
  );

  const defaultSelectedValue = useMemo<MenuItemType | undefined>(() => {
    let val;
    if (defaultValue) {
      const menuItem = menuItems.find(({ value }) => value === defaultValue);
      if (menuItem) {
        val = menuItem;
      }
    } else {
      if (menuItems.length) {
        val = menuItems[0];
      }
    }
    return val;
  }, [defaultValue, menuItems]);

  return (
    <Wrapper>
      <Field name={label} label={label} defaultValue={defaultValue}>
        {({ fieldProps: { id } }) => (
          <RadioSelect
            inputId={id}
            label={label}
            isSearchable={false}
            options={menuItems}
            styles={customSelectStyles}
            onChange={onChangeHandler}
            defaultValue={defaultSelectedValue}
            spacing="compact"
            placeholder={placeholder}
          />
        )}
      </Field>
    </Wrapper>
  );
};

export default RadioDropdownMenu;
