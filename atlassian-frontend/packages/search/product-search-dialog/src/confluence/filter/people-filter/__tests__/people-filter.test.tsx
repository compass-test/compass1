import React from 'react';
import PeopleFilter, { PeopleFilterProps, PeopleFilterItem } from '..';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import { FilterShowMore } from '@atlassian/search-dialog';
import { useFilterContext } from '../../../filter-context';
import { createPeopleFilters } from '../../../../__tests__/__fixtures__/mock-filters';
import SmartUserFilter from '../smart-user-filter';
import { AsyncSelectFilterComponent } from '@atlassian/search-dialog';
import { useFeatures } from '../../../confluence-features';
import { useClients } from '../../../clients';

let mockSearchUsers = jest.fn();

jest.mock('../../../clients', () => ({
  useClients: jest.fn(),
}));

jest.mock('../../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'someSeachSession',
}));

jest.mock('../../../confluence-features', () => ({
  useFeatures: jest.fn(),
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

const defaultProps: PeopleFilterProps = {
  isLoading: false,
};

describe('<PeopleFilter />', () => {
  const addFilters = jest.fn();
  const updateFilter = jest.fn();
  let mockUseFeatures = useFeatures as jest.Mock;
  let mockUseClients = useClients as jest.Mock;

  beforeEach(() => {
    mockSearchUsers
      .mockImplementation()
      .mockReturnValue({ promise: () => Promise.resolve() });

    (useFilterContext as jest.Mock).mockReturnValue({
      peopleFilters: {
        availableFilters: options,
        addFilters,
        updateFilter,
      },
      siteFilters: {
        availableFilters: [],
      },
    });

    (mockUseFeatures as jest.Mock).mockImplementation().mockReturnValue({
      isSmartUserPickerFFEnabled: false,
      isMultiSite: false,
    });
    (mockUseClients as jest.Mock).mockImplementation().mockReturnValue({
      searchClient: {
        searchUsers: mockSearchUsers,
      },
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('Displays correct number of items on load', () => {
    const wrapper = mountWithIntl(<PeopleFilter {...defaultProps} />);
    expect(wrapper.find(PeopleFilterItem).length).toBe(3);
  });

  it('Renders a FilterShowMore with a SmartUserFilter if isSmartUserPicker FF is enabled and the number of sites is 1', () => {
    (mockUseFeatures as jest.Mock).mockImplementation().mockReturnValue({
      isSmartUserPickerFFEnabled: true,
      isMultiSite: false,
    });
    const wrapper = mountWithIntl(<PeopleFilter {...defaultProps} />);
    wrapper.update();
    const filterShowMore = wrapper.find(FilterShowMore);
    const akProp = filterShowMore.prop('filterComponent');
    expect(akProp).toEqual(SmartUserFilter);
  });

  it('Renders a FilterShowMore with an AsyncSelect if isSmartUserPicker FF is enabled and the number of sites is >1', () => {
    (mockUseFeatures as jest.Mock).mockImplementation().mockReturnValue({
      isSmartUserPickerFFEnabled: true,
      isMultiSite: true,
    });
    const wrapper = mountWithIntl(<PeopleFilter {...defaultProps} />);
    const filterShowMore = wrapper.find(FilterShowMore);
    const akProp = filterShowMore.prop('filterComponent');
    expect(akProp).toEqual(AsyncSelectFilterComponent);
  });

  it('Renders a FilterShowMore with an AsyncSelect if isSmartUserPicker FF is not enabled and the number of sites is 1', () => {
    (mockUseFeatures as jest.Mock).mockImplementation().mockReturnValue({
      isSmartUserPickerFFEnabled: false,
      isMultiSite: true,
    });
    const wrapper = mountWithIntl(<PeopleFilter {...defaultProps} />);
    const filterShowMore = wrapper.find(FilterShowMore);
    const akProp = filterShowMore.prop('filterComponent');
    expect(akProp).toEqual(AsyncSelectFilterComponent);
  });

  it('Calls add filter when adding new values', () => {
    const wrapper = mountWithIntl(<PeopleFilter {...defaultProps} />);
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
      peopleFilters: {
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
    const wrapper = mountWithIntl(<PeopleFilter {...defaultProps} />);
    (wrapper.find(FilterShowMore).prop('loadOptions') as any)();
    wrapper.update();
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(mockSearchUsers).toBeCalledTimes(1);
    expect(mockSearchUsers).toHaveBeenCalledWith(
      undefined,
      { referrerId: null, sessionId: 'someSeachSession' },
      [{ cloudId: 'cloudId', isChecked: true }],
    );
  });
});
