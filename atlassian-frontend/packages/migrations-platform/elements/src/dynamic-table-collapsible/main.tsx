import React, { FC, useCallback, useState } from 'react';

import DynamicTable from '@atlaskit/dynamic-table';
import type { RowType, StatefulProps } from '@atlaskit/dynamic-table/types';
import { DropdownButton } from '@atlassian/mpt-collapsible';

import { CollapsibleContentWrapper } from './styled';
import type { CollapsibleRow } from './types';
import {
  createCollapsibleRow,
  insertCollapsibleRow,
  removeAllCollapsibleRows,
  removeCollapsibleRow,
} from './utils';

type Props = Omit<StatefulProps, 'head' | 'rows'> & {
  head: NonNullable<StatefulProps['head']>;
  rows: CollapsibleRow[];
};

const COLLAPSIBLE_DROPDOWN_KEY = 'col-collapsible-dropdown';

const DynamicTableCollapsible: FC<Props> = ({ head, rows, ...rest }) => {
  const [openedRows, setOpenedRows] = useState<Set<string>>(new Set());

  // Prepare head
  const resolvedHead = {
    ...head,
    cells: [
      ...head.cells,
      { key: COLLAPSIBLE_DROPDOWN_KEY, content: null, width: 1 },
    ],
  };

  // Prepare rows
  const resolvedRows = rows.map<RowType>(
    // The row doesn't has collapsible content
    ({ collapsibleContent, key, ...row }) => {
      if (!collapsibleContent) {
        return {
          ...row,
          key,
          cells: [
            ...row.cells,
            { key: COLLAPSIBLE_DROPDOWN_KEY, content: null },
          ],
        };
      }

      // The row has collapsible content, render dropdown
      const isOpened = openedRows.has(key);

      return {
        ...row,
        key,
        cells: [
          ...row.cells,
          {
            key: COLLAPSIBLE_DROPDOWN_KEY,
            content: (
              <DropdownButton
                isOpen={isOpened}
                onClick={(e) => {
                  if (isOpened) {
                    // Toggle the open status to false
                    openedRows.delete(key);
                    setOpenedRows(new Set(openedRows));

                    // Remove the collapsible row
                    removeCollapsibleRow(key);
                  } else {
                    // Toggle the open status to true
                    setOpenedRows(new Set(openedRows.add(key)));

                    // Create and insert the collapsible row
                    const collapsibleRow = createCollapsibleRow(
                      key,
                      <td colSpan={row.cells.length + 1}>
                        <CollapsibleContentWrapper>
                          {collapsibleContent}
                        </CollapsibleContentWrapper>
                      </td>,
                    );
                    insertCollapsibleRow(collapsibleRow, e.currentTarget);
                  }
                }}
              />
            ),
          },
        ],
      };
    },
  );

  // Whenever sort happens, remove all the collapsible rows
  const onSort = useCallback(() => {
    // Toggle all the open status to false
    /*
      Why do we need to use the good-old-timeout-zero trick here?

      If you check the `onSort` implementation in the AK Stateful component, the `onSort` callback happens
      before setting the `sortOrder` and `sortKey` in the Stateful component.

      If you don't defer the `setOpenedRows` to the next tick, it'll prevent setting the `sortOrder` and `sortKey`
      all together.

      I think AK should fix that by swapping the order. But `setTimeout` does the trick here.
    */
    window.setTimeout(() => {
      setOpenedRows(new Set());
    }, 0);

    // Remove all the collapsible row
    removeAllCollapsibleRows();
  }, []);

  return (
    <DynamicTable
      {...rest}
      head={resolvedHead}
      rows={resolvedRows}
      onSort={onSort}
    />
  );
};

export default DynamicTableCollapsible;
