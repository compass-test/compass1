import React, { FC } from 'react';

import Pagination from '@atlaskit/pagination';

import {
  AdvancedRoadmapsPlan,
  PlansQuery,
  PlansResult,
} from '../../common/types';
import { ContainerSelectionFooter } from '../../common/ui/container-selection-footer';
import DynamicTableSelectable from '../../common/ui/dynamic-table-selectable';

import { PaginationWrapper } from './styled';
import { usePlanSelectionTableStateController } from './utils';

export type Props = {
  // This provides all of the plan rows to be displayed given a query which includes page number and sort options
  plansProvider: (query: PlansQuery) => Promise<PlansResult>;

  // List of currently selected plans
  selectedPlans: AdvancedRoadmapsPlan[];

  // Use this to add a handler for when currently selected plans are changed.
  // This handler should call the state-updater for selectedPlans.
  onSelectedPlansChanged: (newSelection: AdvancedRoadmapsPlan[]) => void;

  // This tells us the total number of plans when it gets changed
  onTotalCountChanged: (totalCount: number) => void;
};

const head = {
  cells: [
    {
      key: 'NAME',
      content: 'Name',
      isSortable: true,
    },
  ],
};

const PlanSelectionTable: FC<Props> = ({
  plansProvider,
  selectedPlans,
  onSelectedPlansChanged,
  onTotalCountChanged,
}) => {
  const {
    tableState,
    rows,
    selectedItemKeys,
    currentPageItemKeys,
    totalNumberOfItems,
    isLoading,
    maxNumberOfPages,
    selectOrDeselectCurrentPage,
    clearAllSelection,
    selectAllItems,
    handleSort,
    handleRowsPerPageChange,
    handlePaginationChange,
  } = usePlanSelectionTableStateController(
    plansProvider,
    selectedPlans,
    onSelectedPlansChanged,
    onTotalCountChanged,
  );

  return (
    <div>
      <DynamicTableSelectable
        sortKey={tableState.sortKey}
        sortOrder={tableState.sortOrder}
        containerUnit="plan"
        selectedItemKeys={selectedItemKeys}
        currentPageItemKeys={currentPageItemKeys}
        totalCount={totalNumberOfItems}
        totalRows={totalNumberOfItems}
        head={head}
        rows={rows}
        loadingSpinnerSize="large"
        isLoading={isLoading}
        onSort={handleSort}
        onSelectionChangeOnCurrentPage={selectOrDeselectCurrentPage}
        onClearAllSelection={clearAllSelection}
        onSelectAllItems={selectAllItems}
      />
      <ContainerSelectionFooter
        rowsPerPageOptions={[10, 20, 30]}
        defaultRowsPerPage={tableState.rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        pagination={
          <PaginationWrapper>
            <Pagination
              pages={Array.from({ length: maxNumberOfPages }, (_, i) => i + 1)}
              onChange={handlePaginationChange}
              selectedIndex={tableState.currentPageIndex}
            />
          </PaginationWrapper>
        }
      />
    </div>
  );
};

export default PlanSelectionTable;
