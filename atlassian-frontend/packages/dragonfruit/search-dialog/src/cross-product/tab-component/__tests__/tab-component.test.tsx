/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { shallow } from 'enzyme';
import TabComponent from '../tab-component';
import { AsyncConfluence } from '../../async-loading';
import { Products, usePrimaryProduct } from '../../../common/product-context';

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => {
    return <div />;
  },
}));

jest.mock('../../../common/product-context', () =>
  Object.assign({}, jest.requireActual('../../../common/product-context'), {
    usePrimaryProduct: jest.fn(),
  }),
);

jest.mock('../../async-loading', () => ({
  AsyncConfluence: () => <div data-test-id="AsyncConfluence" />,
}));

describe('<TabComponent />', () => {
  const commonExtras = {
    confluenceFeatures: {} as any,
    forwardRef: null as any,
    linkComponent: () => <button type="button" />,
    setRef: jest.fn(),
    formatDate: jest.fn(),
    onClose: jest.fn(),
    onOpen: jest.fn(),
    onNavigate: jest.fn(),
    jiraFeatures: {
      hasSoftwareAccess: true,
    },
    isExpanded: true,
    setAdditionalAnalyticsContext: jest.fn,
    setNoResultsForPreQuery: jest.fn,
    query: '',
    onRetry: jest.fn,
    onRequestComplete: jest.fn,
    debounceTime: 0,
    isAnyResultsLoading: false,
    queryVersion: 0,
    servicesQuery: {
      searchServices: () => null,
      loading: false,
      error: null,
      data: undefined,
    },
    libsAppsMoreQuery: {
      searchLibsAppsMore: () => null,
      loading: false,
      error: null,
      data: undefined,
    },
    teamsQueryAndUsers: {
      searchTeamsAndUsers: () => null,
      loading: false,
      error: null,
      data: [],
    },
  };

  it('renders the Confluence Search Dialog Content', () => {
    (usePrimaryProduct as jest.Mock).mockReturnValue(Products.compass);
    const wrapper = shallow(
      <TabComponent
        data={{
          id: Products.compass,
          extra: commonExtras,
        }}
      />,
    );

    expect(wrapper.find(AsyncConfluence).exists()).toBe(true);
    expect(wrapper.find(AsyncConfluence).prop('onNavigate')).not.toBe(
      commonExtras.onNavigate,
    );
    // expect(wrapper.find(AsyncConfluence).prop('linkComponent')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Confluence Search Dialog Content as the primary content', () => {
    (usePrimaryProduct as jest.Mock).mockReturnValue(Products.compass);
    const wrapper = shallow(
      <TabComponent
        data={{
          id: Products.compass,
          extra: commonExtras,
        }}
      />,
    );

    expect(wrapper.find(AsyncConfluence).exists()).toBe(true);
    expect(wrapper.find(AsyncConfluence).prop('linkComponent')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
