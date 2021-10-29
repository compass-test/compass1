import React from 'react';
import ProjectFilter, {
  ProjectFilterProps,
  ProjectFilterItem,
} from '../project-filter';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import { FilterShowMore } from '@atlassian/search-dialog';
import { useFilterContext } from '../../../filter-context';
import { createProjectFilters } from '../../../../__tests__/__fixtures__/mock-filters';

let mockSearchProjects = jest.fn();

jest.mock('../../../clients', () =>
  Object.assign({}, jest.requireActual('../../../clients'), {
    useJiraSearchClientContext: () => ({
      searchClient: {
        searchProjects: mockSearchProjects,
      },
    }),
  }),
);

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

const options = createProjectFilters(10);

const defaultProps: ProjectFilterProps = {
  isLoading: false,
};

describe('<ProjectFilter />', () => {
  const addFilters = jest.fn();
  const updateFilter = jest.fn();

  beforeEach(() => {
    mockSearchProjects
      .mockImplementation()
      .mockReturnValue({ promise: () => Promise.resolve() });
    (useFilterContext as jest.Mock).mockReturnValue({
      projectFilters: {
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
    const wrapper = mountWithIntl(<ProjectFilter {...defaultProps} />);
    expect(wrapper.find(ProjectFilterItem).length).toBe(3);
  });

  it('Selecting option from menu adds the option and new option is checked', () => {
    const wrapper = mountWithIntl(<ProjectFilter {...defaultProps} />);
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
      projectFilters: {
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
    const wrapper = mountWithIntl(<ProjectFilter {...defaultProps} />);
    (wrapper.find(FilterShowMore).prop('loadOptions') as any)();
    wrapper.update();
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(mockSearchProjects).toBeCalledTimes(1);
    expect(mockSearchProjects).toHaveBeenCalledWith(
      undefined,
      { referrerId: null, sessionId: 'someSeachSession' },
      [{ cloudId: 'cloudId', isChecked: true }],
    );
  });
});
