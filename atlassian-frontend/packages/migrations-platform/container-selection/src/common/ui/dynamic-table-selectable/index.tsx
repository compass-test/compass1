import React from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import type { RowType } from '@atlaskit/dynamic-table/types';

import { ContainerUnit } from '../../types';

import { DynamicTableColumnSelector } from './dynamic-table-column-selector';

export type selectAllProps = {
  totalCount: number;
  currentPageItemKeys: string[];
  selectedItemKeys: string[];
  onSelectAllItems: () => void;
  onSelectionChangeOnCurrentPage: (toBeSelected: boolean) => void;
  onClearAllSelection: () => void;
};

type Props = React.ComponentProps<typeof DynamicTableStateless> &
  selectAllProps & { containerUnit: ContainerUnit };

const DynamicTableSelectable: React.FC<Props> = ({
  totalCount,
  head,
  rows,
  containerUnit,
  selectedItemKeys,
  currentPageItemKeys,
  onSelectAllItems,
  onSelectionChangeOnCurrentPage,
  onClearAllSelection,
  ...rest
}: Props) => {
  const cellsProps = head?.cells ? head?.cells : [];
  const header = {
    ...head,
    cells: [
      {
        key: 'selector',
        width: 5,
        content: (
          <DynamicTableColumnSelector
            totalCount={totalCount}
            selectedItemKeys={selectedItemKeys}
            currentPageItemKeys={currentPageItemKeys}
            onSelectionChangeOnCurrentPage={onSelectionChangeOnCurrentPage}
            onSelectAllItems={onSelectAllItems}
            onClearAllSelection={onClearAllSelection}
            containerUnit={containerUnit}
          />
        ),
      },
      ...cellsProps,
    ],
  };

  const rowsWithSelector = React.useMemo(
    () =>
      rows!.map((row: RowType) => {
        return {
          ...row,
          cells: [
            {
              key: row.key,
              content: (
                <span
                  data-testid={`select-${row.key}`}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <Checkbox
                    isChecked={selectedItemKeys.includes(row.key as string)}
                    name="space"
                  />
                </span>
              ),
            },
            ...row.cells,
          ],
        };
      }),
    [rows, selectedItemKeys],
  );

  return (
    <DynamicTableStateless {...rest} head={header} rows={rowsWithSelector} />
  );
};

export default DynamicTableSelectable;
