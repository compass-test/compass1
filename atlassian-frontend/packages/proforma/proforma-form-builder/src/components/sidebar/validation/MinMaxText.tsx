import React from 'react';

import Textfield from '@atlaskit/textfield';

import { MinMaxDropdown, MinMaxType } from './MinMaxDropdown';
import { FieldLabel, MinMaxRow } from './styles';

interface MinMaxTextProps {
  label: string;
  placeholder: string;
  value: string;
  type: MinMaxType;
  onChange: (value: string, type: MinMaxType) => void;
}

export const MinMaxText: React.FunctionComponent<MinMaxTextProps> = ({
  label,
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <>
      <FieldLabel>{label}</FieldLabel>
      <MinMaxRow>
        <Textfield
          placeholder={placeholder}
          width="xsmall"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newMinimum = e.target.value.trim();
            if (isPositiveIntegerString(newMinimum)) {
              onChange(newMinimum, type);
            }
          }}
        />
        <MinMaxDropdown
          value={type}
          onChange={newType => {
            onChange(value, newType);
          }}
        />
      </MinMaxRow>
    </>
  );
};

const isPositiveIntegerString = (value: string) => /^(\d*|0)$/.test(value);
