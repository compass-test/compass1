import React from 'react';
import { NoResultsWithHooks as ConfluenceNoResults } from '../confluence-search-no-results';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { useFilterContext } from '../../filter-context';
import {
  createSpaceFilters,
  createPeopleFilters,
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

describe('<ConfluenceSearchNoResults />', () => {
  const advancedSearchSelected = jest.fn();
  const filtersCleared = jest.fn();

  const commonProps = {
    advancedSearchUrl: 'advanced/search/url',
    linkComponent: () => <div />,
    advancedSearchSelected,
    filtersCleared,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFilterContext as jest.Mock).mockReturnValue({
      spaceFilters: {
        availableFilters: createSpaceFilters(1, { checkedNumber: 0 }),
      },
      peopleFilters: {
        availableFilters: createPeopleFilters(1, { checkedNumber: 0 }),
      },
      siteFilters: {
        availableFilters: createSiteFilters(1, { checkedNumber: 0 }),
      },
    });
  });

  it('render should match snapshot', () => {
    const wrapper = mountWithIntl(<ConfluenceNoResults {...commonProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('with filters', () => {
    const clearSpaceFilters = jest.fn();
    const clearPeopleFilters = jest.fn();
    const clearSiteFilters = jest.fn();

    beforeEach(() => {
      (useFilterContext as jest.Mock).mockReturnValue({
        spaceFilters: {
          availableFilters: createSpaceFilters(1, { checkedNumber: 1 }),
          clearFilter: clearSpaceFilters,
        },
        peopleFilters: {
          availableFilters: createPeopleFilters(1, { checkedNumber: 1 }),
          clearFilter: clearPeopleFilters,
        },
        siteFilters: {
          availableFilters: createSiteFilters(1, { checkedNumber: 0 }),
          clearFilter: clearSiteFilters,
        },
      });
    });

    it('render should match snapshot', () => {
      const wrapper = mountWithIntl(<ConfluenceNoResults {...commonProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('clearFilters should clear all filters', () => {
      const wrapper = mountWithIntl(<ConfluenceNoResults {...commonProps} />);
      wrapper.find(NoResults).prop('clearFilters')!();

      expect(clearSpaceFilters).toBeCalled();
      expect(clearPeopleFilters).toBeCalled();
    });

    it('on clear filter button press should fire clear filters event', () => {
      const wrapper = mountWithIntl(<ConfluenceNoResults {...commonProps} />);
      wrapper.find(NoResults).prop('clearFilters')!();

      expect(filtersCleared).toBeCalledTimes(1);
    });
  });
});
