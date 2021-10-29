import React from 'react';

import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';

import { JiraSearchInput } from '../jira-search-input';

jest.mock('../../../common/analytics', () => {
  const fireAnalyticsEvent = jest.fn();

  return Object.assign({}, jest.requireActual('../../../common/analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent,
    }),
  });
});

jest.mock('../../../common/product-search-input', () => {
  return { ProductSearchInput: (props: any) => <div {...props} /> };
});

const commonProps = {
  onOpen: () => {},
  debounceTime: 0,
  forwardRef: null,
  onNavigate: jest.fn(),
  isLoading: true,
  value: '',
};

describe('<SearchInput />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot when expanded', () => {
    const wrapper = mountWithIntl(
      <JiraSearchInput {...commonProps} isExpanded />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when collapsed', () => {
    const wrapper = mountWithIntl(
      <JiraSearchInput {...commonProps} isExpanded={false} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
