import React from 'react';
import { shallow, mount } from 'enzyme';
import ProductSearchResult, {
  ProductSearchResultForPreQuery,
} from '../product-search-result';
import {
  ScreenType,
  onSearchResultSelected,
  onSearchResultHighlighted,
  SectionID,
} from '../../analytics';
import { SearchResult } from '../../search-result';

const mockCreatedEvent = { event: 'event' };
const mockCreateAnalyticsEvent = jest.fn().mockReturnValue(mockCreatedEvent);
jest.mock('@atlaskit/analytics-next', () =>
  Object.assign({}, jest.requireActual('@atlaskit/analytics-next'), {
    useAnalyticsEvents: () => ({
      createAnalyticsEvent: mockCreateAnalyticsEvent,
    }),
  }),
);
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

jest.mock('@atlassian/analytics-bridge', () =>
  Object.assign({}, jest.requireActual('@atlassian/analytics-bridge'), {
    fireUIAnalytics: jest.fn(),
  }),
);
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

jest.mock('../../analytics', () => ({
  useAnalytics: () => ({ fireAnalyticsEvent: jest.fn() }),
  SearchDialogAnalyticsContext: (props: any) => <>{props.children}</>,
  onSearchResultSelected: jest.fn(),
  onSearchResultHighlighted: jest.fn(),
}));

jest.mock('../../search-result', () => ({
  SearchResult: () => <></>,
}));

describe('<ProductSearchResult />', () => {
  const commonProps = {
    analyticContext: {
      id: '3cvrad60-ec9c-4fc6-96ea-19jsehvr357',
      sectionIndex: 100,
      sectionId: 'compass-service' as SectionID,
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

    expect(useAnalyticsEvents().createAnalyticsEvent).toBeCalledWith({
      action: 'selected',
      actionSubject: 'searchResult',
    });

    expect(fireUIAnalytics).toBeCalledWith(
      mockCreatedEvent,
      commonProps.analyticContext.sectionId,
      { id: commonProps.analyticContext.id },
    );
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

  it('analytic is fired when search result is selected for pre query', () => {
    const wrapper = mount(
      <ProductSearchResultForPreQuery
        {...commonProps}
        screen="preQuerySearchResults"
      />,
    );
    const mockEvent = {} as any;
    wrapper.find(SearchResult).prop('onSelect')!(mockEvent);
    expect(onSearchResultSelected).toBeCalledTimes(1);
    expect(onSearchResultSelected).toBeCalledWith({
      screen: 'preQuerySearchResults',
    });

    expect(useAnalyticsEvents().createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'selected',
      actionSubject: 'searchResultPreQuery',
    });
  });
});
