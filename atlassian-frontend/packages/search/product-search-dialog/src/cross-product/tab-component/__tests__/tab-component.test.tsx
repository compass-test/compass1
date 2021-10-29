/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { shallow } from 'enzyme';
import TabComponent from '../tab-component';
import { AsyncJira, AsyncConfluence } from '../../async-loading';
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
  AsyncJira: () => <div data-test-id="AsyncJira" />,
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
  };

  it('renders the Jira Search Dialog Content', () => {
    (usePrimaryProduct as jest.Mock).mockReturnValue(Products.confluence);
    const wrapper = shallow(
      <TabComponent
        data={{
          id: Products.jira,
          extra: commonExtras,
        }}
      />,
    );

    expect(wrapper.find(AsyncJira).exists()).toBe(true);
    expect(wrapper.find(AsyncJira).prop('onNavigate')).not.toBe(
      commonExtras.onNavigate,
    );
    expect(wrapper.find(AsyncJira).prop('linkComponent')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Jira Search Dialog Content as the primary content', () => {
    (usePrimaryProduct as jest.Mock).mockReturnValue(Products.jira);
    const wrapper = shallow(
      <TabComponent
        data={{
          id: Products.jira,
          extra: commonExtras,
        }}
      />,
    );

    expect(wrapper.find(AsyncJira).exists()).toBe(true);
    expect(wrapper.find(AsyncJira).prop('onNavigate')).toBe(
      commonExtras.onNavigate,
    );
    expect(wrapper.find(AsyncJira).prop('linkComponent')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Confluence Search Dialog Content', () => {
    (usePrimaryProduct as jest.Mock).mockReturnValue(Products.jira);
    const wrapper = shallow(
      <TabComponent
        data={{
          id: Products.confluence,
          extra: commonExtras,
        }}
      />,
    );

    expect(wrapper.find(AsyncConfluence).exists()).toBe(true);
    expect(wrapper.find(AsyncConfluence).prop('onNavigate')).not.toBe(
      commonExtras.onNavigate,
    );
    expect(wrapper.find(AsyncConfluence).prop('linkComponent')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Confluence Search Dialog Content as the primary content', () => {
    (usePrimaryProduct as jest.Mock).mockReturnValue(Products.confluence);
    const wrapper = shallow(
      <TabComponent
        data={{
          id: Products.confluence,
          extra: commonExtras,
        }}
      />,
    );

    expect(wrapper.find(AsyncConfluence).exists()).toBe(true);
    expect(wrapper.find(AsyncConfluence).prop('linkComponent')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
