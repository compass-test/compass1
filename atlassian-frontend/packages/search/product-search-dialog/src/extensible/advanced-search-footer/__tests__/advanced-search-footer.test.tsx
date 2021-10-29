import React from 'react';
import { useKeyboardNavigation, ReturnIcon } from '@atlassian/search-dialog';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import AdvancedSearchFooter from '../advanced-search-footer';
import { AdvancedSearchLink } from '../../../common/advanced-search-link';
import {
  onAdvancedSearchSelected,
  useAnalytics,
} from '../../../common/analytics';

jest.mock('../../../common/advanced-search-link', () => ({
  AdvancedSearchContent: () => 'div',
  AdvancedSearchLink: ({ children }: any) => <div>{children}</div>,
  CenteredAdvancedSearchGroup: () => 'div',
}));

jest.mock('../../product-router', () => ({
  useProductContext: () => ({
    getActiveProduct: () => ({ title: 'opsgenie' }),
  }),
}));

jest.mock('../../query-context', () => ({
  useQuery: () => ({ query: 'test-query', isLoading: false }),
}));

jest.mock('../../../common/analytics', () => {
  const fireAnalyticsEvent = jest.fn();

  return Object.assign({}, jest.requireActual('../../../common/analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent,
    }),
    onAdvancedSearchSelected: jest.fn(),
  });
});

jest.mock('@atlassian/search-dialog', () =>
  Object.assign({}, jest.requireActual('@atlassian/search-dialog'), {
    useKeyboardNavigation: jest.fn(),
    LinkComponent: () => <div />,
  }),
);

const commonProps = {
  advancedSearchMessage: 'test message',
  linkComponent: () => <div />,
  urlGeneratorForNoResultsScreen: jest
    .fn()
    .mockImplementation((query: string) => `/link_to_product/search/${query}`),
};

describe('<AdvancedSearchFooter />', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
  });

  beforeEach(() => {
    (onAdvancedSearchSelected as jest.Mock).mockClear();
  });

  it('default should have return icon', () => {
    const wrapper = mountWithIntl(<AdvancedSearchFooter {...commonProps} />);
    const props = wrapper.find(ReturnIcon).props();
    expect((props as any).inverted).toEqual(false);
  });

  it('default should have return icon highlighted on keyboard highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const props = mountWithIntl(<AdvancedSearchFooter {...commonProps} />)
      .find(ReturnIcon)
      .props();
    expect((props as any).inverted).toEqual(true);
  });

  it('keyboard highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const props = mountWithIntl(<AdvancedSearchFooter {...commonProps} />)
      .find(AdvancedSearchLink)
      .props();
    expect(props.isKeyboardHighlighted).toEqual(true);
  });

  it('keyboard not highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
    const props = mountWithIntl(<AdvancedSearchFooter {...commonProps} />)
      .find(AdvancedSearchLink)
      .props();
    expect(props.isKeyboardHighlighted).toEqual(false);
  });

  it('should render AdvancedSearchLink with query string attached to href', () => {
    const wrapper = mountWithIntl(<AdvancedSearchFooter {...commonProps} />);
    const advancedSearchLink = wrapper.find(AdvancedSearchLink).prop('href');

    expect(advancedSearchLink).toEqual('/link_to_product/search/test-query');
    expect(commonProps.urlGeneratorForNoResultsScreen).toHaveBeenCalledWith(
      'test-query',
    );
  });

  describe('analytics', () => {
    it('on click with no modifier should trigger analytics event with newTab false', () => {
      const wrapper = mountWithIntl(<AdvancedSearchFooter {...commonProps} />);

      wrapper.find('span').simulate('click');

      expect(onAdvancedSearchSelected).toBeCalledWith({
        trigger: 'click',
        actionSubjectId: 'opsgenieAdvancedSearchLink',
        isLoading: false,
        newTab: false,
      });

      expect(onAdvancedSearchSelected).toBeCalledTimes(1);
      expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
    });

    it('on click with modifier should trigger analytics event with newTab true', () => {
      const wrapper = mountWithIntl(<AdvancedSearchFooter {...commonProps} />);

      wrapper.find('span').simulate('click', { ctrlKey: true });

      expect(onAdvancedSearchSelected).toBeCalledWith({
        trigger: 'click',
        actionSubjectId: 'opsgenieAdvancedSearchLink',
        isLoading: false,
        newTab: true,
      });

      expect(onAdvancedSearchSelected).toBeCalledTimes(1);
      expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
    });

    it('on enter should simulate a click on the wrappers child and trigger analytic events', () => {
      const component = mountWithIntl(
        <AdvancedSearchFooter {...commonProps} />,
      );
      const click = jest.fn().mockImplementation(() => {
        component.childAt(0).props().onClick({ screenX: 0 });
      });
      (useKeyboardNavigation as jest.Mock).mock.calls[0][0][
        'onKeydownCallback'
      ](new KeyboardEvent('keydown', { key: 'Enter' }), {
        firstElementChild: { click },
      });

      expect(click).toBeCalledTimes(1);
      expect(onAdvancedSearchSelected).toBeCalledWith({
        trigger: 'return',
        actionSubjectId: 'opsgenieAdvancedSearchLink',
        isLoading: false,
        newTab: false,
      });
      expect(onAdvancedSearchSelected).toBeCalledTimes(1);
      expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
    });
  });
});
