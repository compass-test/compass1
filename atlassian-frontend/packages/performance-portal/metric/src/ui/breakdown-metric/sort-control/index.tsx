import React, { useCallback } from 'react';

import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';

import { Sort } from '../../../common/types';

const sortOptions = [
  {
    label: 'Change DESC',
    value: Sort.CHANGE_DESC,
  },
  {
    label: 'Change ASC',
    value: Sort.CHANGE_ASC,
  },
  {
    label: 'Value DESC',
    value: Sort.VALUE_DESC,
  },
  {
    label: 'Value ASC',
    value: Sort.VALUE_ASC,
  },
];

interface Props {
  sort: Sort;
  setSort: (sort: Sort) => void;
}

export const SortControl = ({ sort, setSort }: Props) => {
  const handleSortChange = useCallback(
    (sort: Sort) => () => {
      setSort(sort);
    },
    [setSort],
  );

  return (
    <DropdownMenu trigger="Sort" triggerType="button">
      <DropdownItemGroupRadio id="sort">
        {sortOptions.map((option) => (
          <DropdownItemRadio
            id={option.value}
            key={option.value}
            isSelected={sort === option.value}
            onClick={handleSortChange(option.value)}
          >
            {option.label}
          </DropdownItemRadio>
        ))}
      </DropdownItemGroupRadio>
    </DropdownMenu>
  );
};
