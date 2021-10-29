import React from 'react';
import DownChevronIcon from '@atlaskit/icon/glyph/chevron-down';
import Select, { PopupSelect, ValueType } from '@atlaskit/select';
import Button from '@atlaskit/button';
import { Theme } from '../types';
import { availableThemes } from '../constants';

type ThemeOption = {
  label: string;
  value: Theme;
};

interface SelectProps {
  value: ThemeOption;
  onChange: (theme: Theme) => void;
}

const themeOptions = Object.keys(availableThemes).map(key => ({
  label: availableThemes[key],
  value: key,
})) as { label: string; value: Theme }[];

export const PopupSelectThemePicker = ({ onChange, value }: SelectProps) => (
  <PopupSelect
    options={themeOptions}
    target={({ isOpen, ...triggerProps }) => (
      <Button iconAfter={<DownChevronIcon label="" />} {...triggerProps}>
        {value.label}
      </Button>
    )}
    onChange={(option: ValueType<{ label: string; value: Theme }>) => {
      if (option) {
        onChange(option.value);
      }
    }}
    value={value}
    searchThreshold={10}
  />
);

export const SelectThemePicker = ({ value, onChange }: SelectProps) => (
  <Select<ThemeOption>
    styles={{
      container: (styles: object) => ({
        ...styles,
        width: '120px',
      }),
      control: (styles: object) => ({
        ...styles,
        backgroundColor: '#fff',
      }),
    }}
    options={themeOptions}
    placeholder={availableThemes['none']}
    value={value}
    onChange={(option: ValueType<{ label: string; value: Theme }>) => {
      if (option) {
        onChange(option.value);
      }
    }}
  />
);
