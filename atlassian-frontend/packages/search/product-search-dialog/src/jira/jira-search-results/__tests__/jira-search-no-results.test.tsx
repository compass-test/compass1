import React from 'react';
import { NoResultsWithHooks } from '../jira-search-no-results';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { useFilterContext } from '../../filter-context';
import {
  createProjectFilters,
  createAssigneeFilters,
  createSiteFilters,
} from '../../../__tests__/__fixtures__/mock-filters';
import { NoResults } from '../../../common/no-results';

jest.mock('../../filter-context', () =>
  Object.assign({}, jest.requireActual('../../filter-context'), {
    useFilterContext: jest.fn(),
  }),
);

jest.mock('../../../common/no-results', () => ({
  NoResults: () => <div data-test-id="NoResults" />,
}));

describe('<JiraSearchNoResults />', () => {
  const advancedSearchSelected = jest.fn();
  const filtersCleared = jest.fn();
  const onClick = jest.fn();

  const commonProps = {
    advancedSearchUrl: 'advanced/search/url',
    linkComponent: () => <div />,
    advancedSearchSelected,
    filtersCleared,
    onClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFilterContext as jest.Mock).mockReturnValue({
      projectFilters: {
        availableFilters: createProjectFilters(1, { checkedNumber: 0 }),
      },
      assigneeFilters: {
        availableFilters: createAssigneeFilters(1, { checkedNumber: 0 }),
      },
      siteFilters: {
        availableFilters: createSiteFilters(1, { checkedNumber: 0 }),
      },
    });
  });

  it('render should match snapshot', () => {
    const wrapper = mountWithIntl(<NoResultsWithHooks {...commonProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('with filters', () => {
    const clearprojectFilters = jest.fn();
    const clearassigneeFilters = jest.fn();
    const clearsiteFilters = jest.fn();

    beforeEach(() => {
      (useFilterContext as jest.Mock).mockReturnValue({
        projectFilters: {
          availableFilters: createProjectFilters(1, { checkedNumber: 1 }),
          clearFilter: clearprojectFilters,
        },
        assigneeFilters: {
          availableFilters: createAssigneeFilters(1, { checkedNumber: 1 }),
          clearFilter: clearassigneeFilters,
        },
        siteFilters: {
          availableFilters: createSiteFilters(1, { checkedNumber: 1 }),
          clearFilter: clearsiteFilters,
        },
      });
    });

    it('render should match snapshot', () => {
      const wrapper = mountWithIntl(<NoResultsWithHooks {...commonProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('clearFilters should clear all filters', () => {
      const wrapper = mountWithIntl(<NoResultsWithHooks {...commonProps} />);
      wrapper.find(NoResults).prop('clearFilters')!();

      expect(clearprojectFilters).toBeCalled();
      expect(clearassigneeFilters).toBeCalled();
      expect(clearsiteFilters).toBeCalled();
    });

    it('on clear filter button press should fire clear filters event', () => {
      const wrapper = mountWithIntl(<NoResultsWithHooks {...commonProps} />);
      wrapper.find(NoResults).prop('clearFilters')!();

      expect(filtersCleared).toBeCalledTimes(1);
    });
  });
});
