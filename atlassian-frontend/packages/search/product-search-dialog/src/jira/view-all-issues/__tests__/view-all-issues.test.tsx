import React from 'react';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { ViewAllIssuesLinkWithIntl as ViewAllIssuesLink } from '../view-all-issues';
import { AdvancedSearchLink } from '../../../common/advanced-search-link';
import { useKeyboardNavigation } from '@atlassian/search-dialog';

jest.mock('../../../common/advanced-search-link', () => ({
  AdvancedSearchContent: () => 'div',
  AdvancedSearchLink: () => 'div',
  CenteredAdvancedSearchGroup: () => 'div',
}));

let mockSiteUrl = {
  siteUrl: '',
};

jest.mock('../../clients', () => ({
  useJiraSearchClientContext: () => mockSiteUrl,
}));

jest.mock('@atlassian/search-dialog', () =>
  Object.assign({}, jest.requireActual('@atlassian/search-dialog'), {
    useKeyboardNavigation: jest.fn(),
    ReturnIcon: () => <div />,
    LinkComponent: () => <div />,
  }),
);

const advancedSearchSelected = jest.fn();
const onClick = jest.fn();
const searchSessionId = 'testSessionId';
const isLoading = false;

const commonProps = {
  searchSessionId,
  advancedSearchSelected,
  isLoading,
  onClick,
};

describe('<ViewAllIssuesLink />', () => {
  const locationAssignSpy = jest.fn().mockImplementation(() => null);
  const originalLocation = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        assign: locationAssignSpy,
      },
    });
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
    mockSiteUrl = {
      siteUrl: '',
    };
  });

  it('snapshot default', () => {
    const wrapper = mountWithIntl(
      <ViewAllIssuesLink {...commonProps} query={''} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot keyboard highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const wrapper = mountWithIntl(
      <ViewAllIssuesLink {...commonProps} query={''} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AdvancedSearchLink with query string attached to href', () => {
    const wrapper = mountWithIntl(
      <ViewAllIssuesLink {...commonProps} query={'A test search'} />,
    );
    const advancedSearchLink = wrapper.find(AdvancedSearchLink).prop('href');
    expect(advancedSearchLink).toEqual(
      '/secure/QuickSearch.jspa?searchString=A%20test%20search',
    );
  });

  it('should render AdvancedSearchLink with site url and query string attached to href', () => {
    mockSiteUrl = {
      siteUrl: 'SOME_SITE',
    };

    const wrapper = mountWithIntl(
      <ViewAllIssuesLink {...commonProps} query={'A test search'} />,
    );

    const advancedSearchLink = wrapper.find(AdvancedSearchLink).prop('href');
    expect(advancedSearchLink).toEqual(
      'SOME_SITE/secure/QuickSearch.jspa?searchString=A%20test%20search',
    );
  });

  it('on enter should call onClick handler with url and event', () => {
    mountWithIntl(
      <ViewAllIssuesLink {...commonProps} query={'A test search'} />,
    );

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    (useKeyboardNavigation as jest.Mock).mock.calls[0][0]['onKeydownCallback'](
      event,
    );

    expect(onClick).toBeCalledWith(
      '/secure/QuickSearch.jspa?searchString=A%20test%20search',
      event,
    );
  });

  describe('analytics', () => {
    it('on click with no modifier should trigger analytics event with newTab false', () => {
      const wrapper = mountWithIntl(
        <ViewAllIssuesLink {...commonProps} query={'A test search'} />,
      );

      wrapper.find(AdvancedSearchLink).prop('onClick')({} as React.MouseEvent);

      expect(advancedSearchSelected).toBeCalledWith({
        trigger: 'click',
        actionSubjectId: 'jiraIssuesSearchLink',
        isLoading,
        newTab: false,
      });
    });

    ['ctrlKey', 'shiftKey', 'metaKey'].forEach((modifier) => {
      it(`on click with ${modifier} should trigger analytics event with newTab true`, () => {
        const wrapper = mountWithIntl(
          <ViewAllIssuesLink {...commonProps} query={'A test search'} />,
        );

        wrapper.find(AdvancedSearchLink).prop('onClick')({
          [modifier]: true,
        } as any);

        expect(advancedSearchSelected).toBeCalledWith({
          trigger: 'click',
          actionSubjectId: 'jiraIssuesSearchLink',
          isLoading,
          newTab: true,
        });
      });
    });

    it('on enter should trigger analytic events', () => {
      mountWithIntl(
        <ViewAllIssuesLink {...commonProps} query={'A test search'} />,
      );

      (useKeyboardNavigation as jest.Mock).mock.calls[0][0][
        'onKeydownCallback'
      ](new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(advancedSearchSelected).toBeCalledWith({
        trigger: 'return',
        actionSubjectId: 'jiraIssuesSearchLink',
        isLoading,
        newTab: false,
      });
    });
  });
});
