import React from 'react';
import SiteFilter, { SiteFilterItem, SiteFilterProps } from '../site-filter';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import { FilterShowMore } from '@atlassian/search-dialog';
import { FilterOptionSource, SiteFilterOption } from '../../types';
import { useAnalytics, onFilterSelect } from '../../../../common/analytics';
import { createSiteFilters } from '../../../../__tests__/__fixtures__/mock-filters';
import { MAX_SELECTED_SITES } from '../site-filter';
import { Products } from '../../../product-context';

jest.mock('../../../../common/analytics', () => {
  const fireAnalyticsEvent = jest.fn();

  return {
    ...(jest.requireActual('../../../../common/analytics') as Object),
    useAnalytics: () => ({
      fireAnalyticsEvent,
    }),
  };
});

const sites: SiteFilterOption[] = createSiteFilters(2, {
  checkedNumber: 1,
  visibleNumber: 1,
});

const onChange = jest.fn();

const defaultProps: SiteFilterProps = {
  availableFilters: sites,
  onChange,
};

describe('<SiteFilter />', () => {
  beforeEach(jest.clearAllMocks);

  it('renders show more when at least one site is not visible', () => {
    const wrapper = mountWithIntl(<SiteFilter {...defaultProps} />);

    expect(wrapper.find(FilterShowMore)).toHaveLength(1);
  });

  it('does not render show more when all sites are visible', () => {
    const allVisibleSites = defaultProps.availableFilters.map((s) => ({
      ...s,
      isVisible: true,
    }));

    const wrapper = mountWithIntl(
      <SiteFilter {...defaultProps} availableFilters={allVisibleSites} />,
    );

    expect(wrapper.find(FilterShowMore)).toHaveLength(0);
  });

  it('disables show more when the max number of sites are selected (with more available to become visible)', () => {
    const maxVisibleSites = createSiteFilters(MAX_SELECTED_SITES + 1, {
      visibleNumber: MAX_SELECTED_SITES,
      checkedNumber: MAX_SELECTED_SITES,
    });
    const wrapper = mountWithIntl(
      <SiteFilter {...defaultProps} availableFilters={maxVisibleSites} />,
    );

    expect(wrapper.find(FilterShowMore).prop('isDisabled')).toEqual(true);
  });

  it('disables unselected checkboxes once the max selected checkboxes is reached', () => {
    const sites = createSiteFilters(2 * MAX_SELECTED_SITES, {
      visibleNumber: 2 * MAX_SELECTED_SITES,
      checkedNumber: MAX_SELECTED_SITES,
    });
    const wrapper = mountWithIntl(
      <SiteFilter {...defaultProps} availableFilters={sites} />,
    );

    expect(
      wrapper.find(SiteFilterItem).filterWhere((f) => f.prop('isDisabled')),
    ).toHaveLength(MAX_SELECTED_SITES);
  });

  it('Add new option from dropdown adds new option checked and fires analytics', () => {
    const sites = defaultProps.availableFilters;
    const wrapper = mountWithIntl(
      <SiteFilter {...defaultProps} availableFilters={sites} />,
    );

    (wrapper.find(FilterShowMore).prop('addFilter') as any)({
      value: sites[1],
    });

    wrapper.update();

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(sites[1].id, true);

    // Analytics
    expect(useAnalytics().fireAnalyticsEvent).toBeCalledTimes(1);
    expect(useAnalytics().fireAnalyticsEvent).toBeCalledWith(
      onFilterSelect({
        filterId: sites[1].id,
        filterSource: sites[1].filterSource,
        filterType: 'site',
      }),
    );
  });

  it('should pass through the sites which matches the entered query in Show More & excludes already visible option', async () => {
    const sites = [
      {
        avatarUrl: 'http://adrain.name',
        cloudId: '5c3f2368-3393-4e09-8492-fd03e808d9d8',
        filterSource: FilterOptionSource.EXTERNAL,
        id: '5c3f2368-3393-4e09-8492-fd03e808d9d8',
        isChecked: false,
        isVisible: false,
        product: Products.confluence,
        siteName: 'ac/dc', // query doesn't match site name
        siteUrl: 'https://google.com',
      },
    ];
    const wrapper = mountWithIntl(
      <SiteFilter {...defaultProps} availableFilters={sites} />,
    );

    const promise = (wrapper.find(FilterShowMore).prop('loadOptions') as any)(
      'test',
    );
    wrapper.update();
    await new Promise((resolve) => setTimeout(resolve, 350));

    promise.then((results: any) => {
      expect(results).toMatchSnapshot();
    });
  });
});
