import React from 'react';
import { shallow, mount } from 'enzyme';
import ProductSearchResult from '../product-search-result';
import {
  ScreenType,
  onSearchResultSelected,
  onSearchResultHighlighted,
  SectionID,
} from '../../analytics';
import { SearchResult } from '@atlassian/search-dialog';

jest.mock('../../analytics', () => ({
  useAnalytics: () => ({ fireAnalyticsEvent: jest.fn() }),
  SearchDialogAnalyticsContext: (props: any) => <>{props.children}</>,
  onSearchResultSelected: jest.fn(),
  onSearchResultHighlighted: jest.fn(),
}));

jest.mock('@atlassian/search-dialog', () => ({
  SearchResult: () => <></>,
}));

describe('<ProductSearchResult />', () => {
  const commonProps = {
    analyticContext: {
      sectionIndex: 100,
      sectionId: 'confluence-item' as SectionID,
      containerId: '123',
      globalIndex: 1000,
      indexWithinSection: 1,
      isCached: true,
    },
    href: 'http://www.atlassian.com',
    screen: 'preQuerySearchResults' as ScreenType,
    title: 'im a title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render matches snapshot', () => {
    const wrapper = shallow(<ProductSearchResult {...commonProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('analytic is fired when search result is selected', () => {
    const wrapper = mount(
      <ProductSearchResult {...commonProps} screen="preQuerySearchResults" />,
    );
    const mockEvent = {} as any;
    wrapper.find(SearchResult).prop('onSelect')!(mockEvent);
    expect(onSearchResultSelected).toBeCalledTimes(1);
    expect(onSearchResultSelected).toBeCalledWith({
      screen: 'preQuerySearchResults',
      isSticky: false,
      isStickyUpdated: false,
    });
  });

  it('analytic is fired when search result is highlighted', () => {
    const wrapper = mount(
      <ProductSearchResult {...commonProps} screen="preQuerySearchResults" />,
    );
    wrapper.find(SearchResult).prop('onHighlighted')!();
    expect(onSearchResultHighlighted).toBeCalledTimes(1);
    expect(onSearchResultHighlighted).toBeCalledWith({
      screen: 'preQuerySearchResults',
    });
  });

  it('onSelect is called when search result is selected', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <ProductSearchResult
        {...commonProps}
        screen="preQuerySearchResults"
        onSelect={onSelect}
      />,
    );
    const mockEvent = {} as any;
    wrapper.find(SearchResult).prop('onSelect')!(mockEvent);
    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith(mockEvent);
  });

  it('onHighlighted is called when search result is highlighted', () => {
    const onHighlighted = jest.fn();
    const wrapper = mount(
      <ProductSearchResult
        {...commonProps}
        screen="preQuerySearchResults"
        onHighlighted={onHighlighted}
      />,
    );
    wrapper.find(SearchResult).prop('onHighlighted')!();
    expect(onHighlighted).toBeCalledTimes(1);
    expect(onHighlighted).toBeCalledWith();
  });
});
