import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { RowType } from '@atlaskit/dynamic-table/types';

import {
  AdvancedRoadmapsPlan,
  PlanQuerySortKey,
  PlanQuerySortOrder,
  PlansQuery,
  PlansResult,
} from '../../common/types';

type SortData = {
  key: PlanQuerySortKey;
  sortOrder: PlanQuerySortOrder;
};

type TableState = {
  currentPageIndex: number;
  sortKey: PlanQuerySortKey;
  sortOrder: PlanQuerySortOrder;
  rowsPerPage: number;
};

type ItemsResultState = {
  currentlyDisplayedItems: AdvancedRoadmapsPlan[];
  totalNumberOfItems: number;
  isLoading: boolean;
};

export type PlanSelectionTableState = {
  tableState: TableState;
  rows: RowType[];
  selectedItemKeys: string[];
  currentPageItemKeys: string[];
  totalNumberOfItems: number;
  isLoading: boolean;
  maxNumberOfPages: number;
  selectOrDeselectCurrentPage: (toBeSelected: boolean) => void;
  clearAllSelection: () => void;
  selectAllItems: () => void;
  handleSort: (sortData: SortData) => void;
  handleRowsPerPageChange: (rowsPerPage: number) => void;
  handlePaginationChange: (_: SyntheticEvent, pageNum: any) => void;
};

export const usePlanSelectionTableStateController = (
  itemsProvider: (query: PlansQuery) => Promise<PlansResult>,
  selectedPlans: AdvancedRoadmapsPlan[],
  onSelectedItemsChanged: (newSelection: AdvancedRoadmapsPlan[]) => void,
  onTotalCountChanged: (totalCount: number) => void,
): PlanSelectionTableState => {
  const [itemsResultState, setItemsResultState] = useState<ItemsResultState>({
    currentlyDisplayedItems: [],
    totalNumberOfItems: 0,
    isLoading: false,
  });

  const [tableState, setTableState] = useState<TableState>({
    currentPageIndex: 0,
    sortKey: 'NAME',
    sortOrder: 'ASC',
    rowsPerPage: 10,
  });

  useEffect(() => {
    setItemsResultState((state: ItemsResultState) => ({
      ...state,
      isLoading: true,
    }));
    itemsProvider({
      sortKey: tableState.sortKey,
      sortOrder: tableState.sortOrder,
      offset: tableState.currentPageIndex * tableState.rowsPerPage,
      limit: tableState.rowsPerPage,
    })
      .then((result) => {
        setItemsResultState({
          currentlyDisplayedItems: result.plans,
          totalNumberOfItems: result.totalNumberOfPlans,
          isLoading: false,
        });
        onTotalCountChanged(result.totalNumberOfPlans);
      })
      .catch(() => {
        setItemsResultState((state: ItemsResultState) => ({
          ...state,
          isLoading: false,
        }));
      });
  }, [itemsProvider, tableState, onTotalCountChanged]);

  const maxNumberOfPages = Math.ceil(
    itemsResultState.totalNumberOfItems / tableState.rowsPerPage,
  );

  const selectedItemKeys = selectedPlans.map((plan) => plan.id.toString());

  const currentPageItemKeys = useMemo(
    () =>
      itemsResultState.currentlyDisplayedItems.map((item) =>
        item.id.toString(),
      ),
    [itemsResultState.currentlyDisplayedItems],
  );

  const rows = useMemo(
    () =>
      itemsResultState.currentlyDisplayedItems.map(
        (plan: AdvancedRoadmapsPlan) => ({
          key: plan.id.toString(),
          cells: [
            {
              key: plan.name,
              content: (
                <span
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <a href={plan.link} target="_blank">
                    {plan.name}
                  </a>
                </span>
              ),
            },
          ],
          onClick: () => {
            let newSelection = selectedPlans;
            const existingSelectedPlan = selectedPlans.find(
              (selectedPlan) => selectedPlan.id === plan.id,
            );

            if (existingSelectedPlan) {
              newSelection = selectedPlans.filter(
                (selectedPlan) => selectedPlan.id !== plan.id,
              );
            } else {
              newSelection = [...selectedPlans, plan];
            }

            onSelectedItemsChanged(newSelection);
          },
        }),
      ),
    [
      itemsResultState.currentlyDisplayedItems,
      selectedPlans,
      onSelectedItemsChanged,
    ],
  );

  const handleSort = useCallback((sortData: SortData) => {
    setTableState((state: TableState) => ({
      ...state,
      currentPageIndex: 0,
      sortKey: sortData.key,
      sortOrder: sortData.sortOrder,
    }));
  }, []);

  const handlePaginationChange = useCallback(
    (_: SyntheticEvent, pageNum: any) => {
      setTableState((state: TableState) => ({
        ...state,
        currentPageIndex: pageNum - 1,
      }));
    },
    [],
  );

  const handleRowsPerPageChange = useCallback((rowsPerPage: number) => {
    setTableState((state: TableState) => ({
      ...state,
      rowsPerPage,
      currentPageIndex: 0,
    }));
  }, []);

  const selectAllItems = useCallback(() => {
    itemsProvider({}).then((result) => {
      onSelectedItemsChanged(result.plans);
    });
  }, [itemsProvider, onSelectedItemsChanged]);

  const clearAllSelection = useCallback(() => {
    onSelectedItemsChanged([]);
  }, [onSelectedItemsChanged]);

  const selectOrDeselectCurrentPage = useCallback(
    (toBeSelected: boolean) => {
      let newSelection: AdvancedRoadmapsPlan[] = [];

      if (toBeSelected) {
        const plansToSelect = itemsResultState.currentlyDisplayedItems.filter(
          (item) => !selectedItemKeys.includes(item.id.toString()),
        );
        newSelection = [...selectedPlans, ...plansToSelect];
      } else {
        newSelection = selectedPlans.filter(
          (selectedPlan) =>
            !currentPageItemKeys.includes(selectedPlan.id.toString()),
        );
      }
      onSelectedItemsChanged(newSelection);
    },
    [
      currentPageItemKeys,
      itemsResultState.currentlyDisplayedItems,
      onSelectedItemsChanged,
      selectedPlans,
      selectedItemKeys,
    ],
  );

  return {
    tableState,
    rows,
    selectedItemKeys,
    currentPageItemKeys,
    totalNumberOfItems: itemsResultState.totalNumberOfItems,
    isLoading: itemsResultState.isLoading,
    maxNumberOfPages,
    selectOrDeselectCurrentPage,
    clearAllSelection,
    selectAllItems,
    handleSort,
    handleRowsPerPageChange,
    handlePaginationChange,
  };
};
