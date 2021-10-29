import React from 'react';

import { act, render, RenderResult } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

// Per dev discussion, we are disabling the below rule as it is cleaner than moving the controller
// inside this directory or moving this component outside of common
import {
  SelectedFiltersProvider,
  TeamFilter,
  useSelectedFilters,
  // eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
} from '../../../controllers/components-use-selected-filters';

import { ListFilter } from './main';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('ComponentListFilters', () => {
  let result: RenderResult;
  const listFilterButtonTestId = 'component-list-filter-test';
  const toggleFilter = jest.fn();

  const useSelectedFiltersMock: () => [
    {
      filters: Array<TeamFilter>;
    },
    {
      toggleUnownedFilter: () => void;
    },
  ] = () => [
    { filters: [] },
    {
      toggleUnownedFilter: toggleFilter,
    },
  ];

  const useSelectedFiltersDI = injectable(
    useSelectedFilters,
    useSelectedFiltersMock,
  );

  beforeEach(() => {
    jest.resetAllMocks();

    result = render(
      <DiProvider use={[useSelectedFiltersDI]}>
        <SelectedFiltersProvider>
          <CompassTestProvider locale={'en'}>
            <ListFilter
              componentType={CompassComponentType.SERVICE}
              testId={listFilterButtonTestId}
            />
          </CompassTestProvider>
        </SelectedFiltersProvider>
        ,
      </DiProvider>,
    );
  });

  it('should render the component list filter button', async () => {
    const listFilterButton = await result.findByTestId(
      `${listFilterButtonTestId}-button`,
    );
    expect(listFilterButton).toBeInTheDocument();
  });

  it('should invoke the toggleUnownedFilter mutator when clicking the button', async () => {
    const listFilterButton = await result.findByTestId(
      `${listFilterButtonTestId}-button`,
    );

    expect(toggleFilter).toHaveBeenCalledTimes(0);

    act(() => {
      listFilterButton.click();
    });

    expect(toggleFilter).toHaveBeenCalledTimes(1);
  });

  it('fires analytics event when unowned component filter button is clicked', async () => {
    const listFilterButton = await result.findByTestId(
      `${listFilterButtonTestId}-button`,
    );

    listFilterButton.click();
    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'button',
        }),
      }),
      'listFilter',
      expect.objectContaining({
        componentType: CompassComponentType.SERVICE.toString(),
        filterState: 'unowned',
      }),
    );
  });
});
