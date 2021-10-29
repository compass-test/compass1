import React, { FC } from 'react';

import Select, { ValueType } from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';
import { FieldDisabledWrapper } from '../common/questionWrappers';

import { ViewOtherOption } from './ViewOtherOption';

type ViewDropdownMultiselectProps = {
  id: string;
  value?: ValueType<SelectOption, true>;
  options?: SelectOption[];
  hasOtherOption: boolean;
  otherOptionText?: string;
};

export const ViewDropdownMultiselect: FC<ViewDropdownMultiselectProps> = ({
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
        isMulti
        placeholder=""
        isDisabled
        styles={{
          control: (base: any) => ({
            ...base,
            backgroundColor: 'white',
            borderColor: 'white',
            color: '#172B4D !important',
          }),
          menu: (base: any) => ({ ...base, color: '#172B4D' }),
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
