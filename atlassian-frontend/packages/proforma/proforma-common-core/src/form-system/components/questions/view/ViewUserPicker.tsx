import React, { FC } from 'react';

import { AsyncSelect, ValueType } from '@atlaskit/select';

import { SelectOption } from '../../../models/SelectOption';
import { FieldDisabledWrapper } from '../common/questionWrappers';

type ViewUserPickerProps<IsMulti extends boolean> = {
  id: string;
  isMulti: IsMulti;
  value?: ValueType<SelectOption, IsMulti>;
};

export const ViewUserPicker: FC<ViewUserPickerProps<any>> = ({
  id,
  isMulti,
  value,
}) => {
  return (
    <FieldDisabledWrapper>
      <AsyncSelect<SelectOption, typeof isMulti>
        id={id}
        loadOptions={() => {}}
        value={value}
        isMulti={isMulti}
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
        isClearable
        defaultOptions
        placeholder=""
        menuPosition="fixed"
      />
    </FieldDisabledWrapper>
  );
};
