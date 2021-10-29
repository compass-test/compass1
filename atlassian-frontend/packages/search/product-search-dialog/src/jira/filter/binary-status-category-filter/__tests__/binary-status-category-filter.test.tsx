import React from 'react';
import BinaryStatusCategoryFilter, { BinaryStatusCategoryFilterItem } from '..';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import { useFilterContext } from '../../../filter-context';
import { createBinaryStatusCategoryFilters } from '../../../../__tests__/__fixtures__/mock-filters';

let mockSearchPeople = jest.fn();

jest.mock('../../../clients', () => ({
  useJiraSearchClientContext: () => ({
    searchClient: {
      searchPeople: mockSearchPeople,
    },
  }),
}));

jest.mock('../../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'someSeachSession',
}));

jest.mock('../../../filter-context', () =>
  Object.assign({}, jest.requireActual('../../../filter-context'), {
    useFilterContext: jest.fn(),
  }),
);

jest.mock('../../../../common/analytics', () => ({
  useAnalytics: () => ({
    fireAnalyticsEvent: jest.fn(),
  }),
  onFilterSelect: jest.fn(),
  onFilterUnselect: jest.fn(),
}));
const binaryStatusCategoryOptions = createBinaryStatusCategoryFilters(0);

describe('<BinaryStatusCategoryFilter />', () => {
  const updateFilter = jest.fn();

  beforeEach(() => {
    (useFilterContext as jest.Mock).mockReturnValue({
      binaryStatusCategoryFilters: {
        availableFilters: binaryStatusCategoryOptions,
        updateFilter,
      },
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('Displays correct number of items on load', () => {
    const wrapper = mountWithIntl(<BinaryStatusCategoryFilter />);
    expect(wrapper.find(BinaryStatusCategoryFilterItem).length).toBe(2);
  });

  it('Calls update filter when clicking between filter options', () => {
    const wrapper = mountWithIntl(<BinaryStatusCategoryFilter />);

    wrapper.find('input').first().simulate('change', { type: 'click' });

    expect(updateFilter).toBeCalledTimes(1);
    expect(updateFilter).toHaveBeenCalledWith(
      binaryStatusCategoryOptions[0].id,
      false,
    );
  });
});
