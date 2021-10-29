import React from 'react';
import { useKeyboardNavigation, ReturnIcon } from '@atlassian/search-dialog';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { AdvancedSearch } from '../advanced-search';
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
    getActiveProduct: () => ({ title: 'bitbucket' }),
  }),
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

const isLoading = false;

const commonProps = {
  advancedSearchMessage: 'test message',
  advancedSearchUrl: '/link_to_product/search',
  linkComponent: () => <div />,
};

describe('<AdvancedSearch />', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
  });

  it('default should not have return icon', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
    const icon = mountWithIntl(<AdvancedSearch {...commonProps} />).find(
      ReturnIcon,
    );
    expect(icon).toEqual({});
  });

  it('should have return icon when highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const iconProps: React.ComponentProps<typeof ReturnIcon> = mountWithIntl(
      <AdvancedSearch {...commonProps} />,
    )
      .find(ReturnIcon)
      .props();

    expect(iconProps.inverted).toBeTruthy();
  });

  it('keyboard highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const props = mountWithIntl(<AdvancedSearch {...commonProps} />)
      .find(AdvancedSearchLink)
      .props();
    expect(props.isKeyboardHighlighted).toEqual(true);
  });

  it('should render AdvancedSearchLink with query string attached to href', () => {
    const wrapper = mountWithIntl(<AdvancedSearch {...commonProps} />);
    const advancedSearchLink = wrapper.find(AdvancedSearchLink).prop('href');
    expect(advancedSearchLink).toEqual('/link_to_product/search');
  });

  it('should not render AdvancedSearchLink if advancedSearchUrl is undefined', () => {
    const wrapper = mountWithIntl(
      <AdvancedSearch {...commonProps} advancedSearchUrl={undefined} />,
    );
    expect(wrapper.find(AdvancedSearchLink).exists()).toBeFalsy();
  });

  it('should not render AdvancedSearchLink if advancedSearchMessage is undefined', () => {
    const wrapper = mountWithIntl(
      <AdvancedSearch {...commonProps} advancedSearchMessage={undefined} />,
    );
    expect(wrapper.find(AdvancedSearchLink).exists()).toBeFalsy();
  });

  describe('analytics', () => {
    it('on click with no modifier should trigger analytics event with newTab false', () => {
      const wrapper = mountWithIntl(<AdvancedSearch {...commonProps} />);

      wrapper.find('span').simulate('click');

      expect(onAdvancedSearchSelected).toBeCalledWith({
        trigger: 'click',
        actionSubjectId: 'bitbucketAdvancedSearchLink',
        isLoading,
        newTab: false,
      });
      expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
    });

    it('on enter should simulate a click on the wrappers child and trigger analytic events', () => {
      mountWithIntl(<AdvancedSearch {...commonProps} />);
      const click = jest.fn();

      (useKeyboardNavigation as jest.Mock).mock.calls[0][0][
        'onKeydownCallback'
      ](new KeyboardEvent('keydown', { key: 'Enter' }), {
        firstElementChild: {
          click,
        },
      });

      expect(click).toBeCalledTimes(1);
      expect(onAdvancedSearchSelected).toBeCalledWith({
        trigger: 'click',
        actionSubjectId: 'bitbucketAdvancedSearchLink',
        isLoading,
        newTab: false,
      });
      expect(useAnalytics().fireAnalyticsEvent).toBeCalled();
    });
  });
});
