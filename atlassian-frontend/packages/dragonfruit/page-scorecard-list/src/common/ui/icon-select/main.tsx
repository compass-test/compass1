import React, { CSSProperties } from 'react';

import Select, { components } from '@atlaskit/select';
import type { OptionProps, SingleValueProps } from '@atlaskit/select/types';
import { N0, N700 } from '@atlaskit/theme/colors';

import { LabelText, LabelWrapper } from './styled';
import { OptionWithIcon, Props, Styling } from './types';

const { Option, SingleValue } = components;

// Override formatting for the individual options within the dropdown list for a Select
const CustomOption: React.FC<OptionProps<OptionWithIcon>> = ({
  children,
  ...innerProps
}) => {
  const {
    data: { icon },
  } = innerProps;

  return (
    <Option {...innerProps}>
      <LabelWrapper>
        {icon} <LabelText>{children}</LabelText>
      </LabelWrapper>
    </Option>
  );
};

// Override formatting for the actively selected option for a Select
const CustomValueOption: React.FC<SingleValueProps<OptionWithIcon>> = ({
  children,
  ...innerProps
}) => {
  return (
    <SingleValue {...innerProps}>
      <LabelWrapper>
        <LabelText>{children}</LabelText>
      </LabelWrapper>
    </SingleValue>
  );
};

// Emulate the style of Atlaskit's Dropdown component
const dropdownStyles = {
  control: (base: CSSProperties) => ({
    ...base,
    backgroundColor: N0,
    borderColor: N0,
    ':hover': {
      backgroundColor: N700,
      borderColor: N700,
      color: N0,
    },
    height: 44,
  }),
  // These `inherit` permit the hover to activate all aspects of the Select on hover
  // and not just the component specifically being hovered over
  placeholder: (base: CSSProperties) => ({
    ...base,
    color: 'inherit',
  }),
  dropdownIndicator: (base: CSSProperties) => ({
    ...base,
    color: 'inherit',
  }),
  singleValue: (base: CSSProperties) => ({
    ...base,
    color: 'inherit',
  }),
};

const styleOverrides = (styling: Styling) =>
  styling === 'dropdown' ? dropdownStyles : {};

const IconSelect: React.FC<Props> = ({ styling, ...props }) => {
  return (
    <Select
      {...props}
      className="single-select"
      isSearchable={false}
      components={{
        Option: CustomOption,
        SingleValue: CustomValueOption,
      }}
      styles={{
        container: (base) => ({
          ...base,
          width: 156,
          height: 44,
        }),
        control: (base: any) => ({
          ...base,
          height: 44,
        }),

        ...styleOverrides(styling),
      }}
    />
  );
};

export default IconSelect;
