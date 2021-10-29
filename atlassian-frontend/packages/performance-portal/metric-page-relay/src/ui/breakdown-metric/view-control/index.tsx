import React, { useCallback, useMemo } from 'react';

import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';

import { BreakdownViewType } from '../../../common/types';

export enum ViewType {
  COMPARISON,
  WATERFALL,
}

const viewTypeOptions = [
  {
    label: 'Waterfall',
    value: BreakdownViewType.WATERFALL,
  },
  {
    label: 'Comparison',
    value: BreakdownViewType.COMPARISON,
  },
];

interface Props {
  viewType: BreakdownViewType;
  setViewType: (viewType: BreakdownViewType) => void;
}

export const ViewControl = ({ viewType, setViewType }: Props) => {
  const handleChange = useCallback(
    (viewType: BreakdownViewType) => () => {
      setViewType(viewType);
    },
    [setViewType],
  );

  const selectedOption = useMemo(
    () => viewTypeOptions.find((opt) => opt.value === viewType),
    [viewType],
  );

  return (
    <DropdownMenu
      trigger={`View: ${selectedOption?.label}`}
      triggerType="button"
    >
      <DropdownItemGroupRadio id="sort">
        {viewTypeOptions.map((option) => (
          <DropdownItemRadio
            id={String(option.value)}
            key={option.value}
            isSelected={viewType === option.value}
            onClick={handleChange(option.value)}
          >
            {option.label}
          </DropdownItemRadio>
        ))}
      </DropdownItemGroupRadio>
    </DropdownMenu>
  );
};
