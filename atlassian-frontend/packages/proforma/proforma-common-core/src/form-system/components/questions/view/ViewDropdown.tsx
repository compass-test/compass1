import React, { FC } from 'react';

import Select, { ValueType } from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';
import { FieldDisabledWrapper } from '../common/questionWrappers';

import { ViewOtherOption } from './ViewOtherOption';

type ViewDropdownProps = {
  id: string;
  value?: ValueType<SelectOption>;
  options?: SelectOption[];
  hasOtherOption: boolean;
  otherOptionText?: string;
};

export const ViewDropdown: FC<ViewDropdownProps> = ({
  id,
  value,
  options,
  hasOtherOption,
  otherOptionText,
}) => {
  return (
    <FieldDisabledWrapper>
      <Select
        id={id}
        options={options}
        value={value}
        placeholder=""
        isDisabled
        styles={{
          control: base => ({
            ...base,
            backgroundColor: 'white',
            borderColor: 'white',
            color: '#172B4D !important',
          }),
          menu: base => ({ ...base, color: '#172B4D' }),
        }}
        menuPosition="fixed"
      />
      <ViewOtherOption
        dropdown
        display={hasOtherOption}
        value={otherOptionText}
      />
    </FieldDisabledWrapper>
  );
};
