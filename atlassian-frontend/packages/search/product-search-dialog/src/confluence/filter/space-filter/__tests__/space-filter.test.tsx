import React from 'react';
import SpaceFilter, { SpaceFilterProps, SpaceFilterItem } from '..';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import { FilterShowMore } from '@atlassian/search-dialog';
import { useFilterContext } from '../../../filter-context';
import { createSpaceFilters } from '../../../../__tests__/__fixtures__/mock-filters';

let mockSearchSpaces = jest.fn();

jest.mock('../../../clients', () => ({
  useClients: () => ({
    searchClient: {
      searchSpaces: mockSearchSpaces,
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
  onFilterSelect: jest.fn(),
  useAnalytics: () => ({
    fireAnalyticsEvent: jest.fn(),
  }),
}));

const options = createSpaceFilters(10);

const defaultProps: SpaceFilterProps = {
  isLoading: false,
};

describe('<SpaceFilter />', () => {
  const addFilters = jest.fn();
  const updateFilter = jest.fn();

  beforeEach(() => {
    mockSearchSpaces
      .mockImplementation()
      .mockReturnValue({ promise: () => Promise.resolve() });

    (useFilterContext as jest.Mock).mockReturnValue({
      spaceFilters: {
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
    const wrapper = mountWithIntl(<SpaceFilter {...defaultProps} />);
    expect(wrapper.find(SpaceFilterItem).length).toBe(3);
  });

  it('Selecting option from menu adds the option and new option is checked', () => {
    const wrapper = mountWithIntl(<SpaceFilter {...defaultProps} />);
    (wrapper.find(FilterShowMore).prop('addFilter') as any)({
      value: options[3],
    });
    wrapper.update();

    expect(addFilters).toBeCalledTimes(1);
    expect(addFilters).toHaveBeenCalledWith([
      { ...options[3], isChecked: true, isVisible: true },
    ]);
  });

  it('should pass through the selected sites', async () => {
    (useFilterContext as jest.Mock).mockReturnValue({
      spaceFilters: {
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
    const wrapper = mountWithIntl(<SpaceFilter {...defaultProps} />);
    (wrapper.find(FilterShowMore).prop('loadOptions') as any)();
    wrapper.update();
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(mockSearchSpaces).toBeCalledTimes(1);
    expect(mockSearchSpaces).toHaveBeenCalledWith(
      undefined,
      { referrerId: null, sessionId: 'someSeachSession' },
      [{ cloudId: 'cloudId', isChecked: true }],
    );
  });
});
