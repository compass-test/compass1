import React from 'react';
import AssigneeFilter, { AssigneeFilterProps, AssigneeFilterItem } from '..';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import { FilterShowMore } from '@atlassian/search-dialog';
import { useFilterContext } from '../../../filter-context';
import { createPeopleFilters } from '../../../../__tests__/__fixtures__/mock-filters';

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
}));

const options = createPeopleFilters(10);

const defaultProps: AssigneeFilterProps = {
  isLoading: false,
};

describe('<AssigneeFilter />', () => {
  const addFilters = jest.fn();
  const updateFilter = jest.fn();

  beforeEach(() => {
    mockSearchPeople
      .mockImplementation()
      .mockReturnValue({ promise: () => Promise.resolve() });
    (useFilterContext as jest.Mock).mockReturnValue({
      assigneeFilters: {
        availableFilters: options,
        addFilters,
        updateFilter,
      },
      siteFilters: {
        availableFilters: [],
      },
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('Displays correct number of items on load', () => {
    const wrapper = mountWithIntl(<AssigneeFilter {...defaultProps} />);
    expect(wrapper.find(AssigneeFilterItem).length).toBe(3);
  });

  it('Calls add filter when adding new values', () => {
    const wrapper = mountWithIntl(<AssigneeFilter {...defaultProps} />);
    (wrapper.find(FilterShowMore).prop('addFilter') as any)({
      value: options[3],
    });
    expect(addFilters).toBeCalledTimes(1);
    expect(addFilters).toHaveBeenCalledWith([
      { ...options[3], isChecked: true, isVisible: true },
    ]);
  });

  it('should pass through the selected sites', async () => {
    (useFilterContext as jest.Mock).mockReturnValue({
      assigneeFilters: {
        availableFilters: options,
        addFilters,
        updateFilter,
      },
      siteFilters: {
        availableFilters: [
          { cloudId: 'cloudId', isChecked: true },
          { cloudId: 'second', isChecked: false },
        ],
      },
    });
    const wrapper = mountWithIntl(<AssigneeFilter {...defaultProps} />);
    (wrapper.find(FilterShowMore).prop('loadOptions') as any)();
    wrapper.update();
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(mockSearchPeople).toBeCalledTimes(1);
    expect(mockSearchPeople).toHaveBeenCalledWith(
      undefined,
      { referrerId: null, sessionId: 'someSeachSession' },
      [{ cloudId: 'cloudId', isChecked: true }],
    );
  });
});
