import React from 'react';

import Select from '@atlaskit/select';

import { createOption } from '../../../utils';
import { SelectWrapper } from '../styled';

type Props = {
  defaultRowsPerPage: number;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions: number[];
};

const RowsPerPageSelect = ({
  defaultRowsPerPage,
  onRowsPerPageChange,
  rowsPerPageOptions,
}: Props) => {
  return (
    <SelectWrapper>
      <Select
        spacing="compact"
        className="single-select"
        classNamePrefix="react-select"
        onChange={(selectedOption) => {
          if (selectedOption && !('length' in selectedOption)) {
            onRowsPerPageChange(selectedOption.value);
          }
        }}
        options={rowsPerPageOptions.map(createOption)}
        defaultValue={createOption(defaultRowsPerPage)}
      />
    </SelectWrapper>
  );
};

export default RowsPerPageSelect;
