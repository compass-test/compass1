import React from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { TabComponent } from '../../tab-component';
import { Products, ProductProvider } from '../../../common/product-context';
import DialogContent from '../dialog-content';
import Tabs from '@atlaskit/tabs';

const commonProps = {
  query: '',
  setSelectedTabIndex: jest.fn(),
  onRetry: jest.fn,
  queryVersion: 1,
  debounceTime: 250,
  isExpanded: true,
  isAnyResultsLoading: false,
  onNavigate: jest.fn(),
  setAdditionalAnalyticsContext: jest.fn(),
  addAnalyticContext: jest.fn(),
  nonPrivacySafeContext: jest.fn(),
  linkComponent: (null as any) as LinkComponent,
  formatDate: (date: any) => date as any,
  theme: null as any,
  isFirstTab: false,
};

const {
  setSelectedTabIndex,
  addAnalyticContext,
  nonPrivacySafeContext,
  ...tabProps
} = commonProps;

jest.mock('styled-components', () => ({
  ...jest.requireActual<any>('styled-components'),
  div: () => ({ children }: { children: any }) => <div>{children}</div>,
}));

jest.mock('@atlassian/search-dialog', () => ({
  LinkComponent: () => <div data-testid="link-component" />,
}));

jest.mock('../dialog-inline-onboarding', () => jest.fn(() => <div />));

jest.mock('../../tab-component', () => ({
  TabComponent: jest.fn(() => <div data-testid="tab-component" />),
}));

describe('<DialogContent />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('standalone jira dialog matches', () => {
    const wrapper = mountWithIntl(
      <ProductProvider products={[Products.jira]} activeIndex={0}>
        <DialogContent {...commonProps} />
      </ProductProvider>,
    );

    expect(TabComponent).toHaveBeenCalledTimes(1);
    expect(wrapper.find(TabComponent).prop('data')).toEqual({
      id: Products.jira,
      extra: tabProps,
    });
  });

  it('standalone jira dialog without activeIndex matches', () => {
    const wrapper = mountWithIntl(
      <ProductProvider products={[Products.jira]}>
        <DialogContent {...commonProps} />
      </ProductProvider>,
    );

    expect(TabComponent).toHaveBeenCalledTimes(1);
    expect(wrapper.find(TabComponent).prop('data')).toEqual({
      id: Products.jira,
      extra: tabProps,
    });
  });

  it('standalone confluence dialog matches', () => {
    const wrapper = mountWithIntl(
      <ProductProvider products={[Products.confluence]} activeIndex={0}>
        <DialogContent {...commonProps} />
      </ProductProvider>,
    );

    expect(TabComponent).toHaveBeenCalledTimes(1);
    expect(wrapper.find(TabComponent).prop('data')).toEqual({
      id: Products.confluence,
      extra: tabProps,
    });
  });

  it('jira cross product with confluence dialog matches', () => {
    const wrapper = mountWithIntl(
      <ProductProvider
        products={[Products.jira, Products.confluence]}
        activeIndex={0}
      >
        <DialogContent {...commonProps} />
      </ProductProvider>,
    );

    expect(wrapper.find(`#dialog-content-tabs-0`).text()).toBe('Jira');
    expect(wrapper.find(`#dialog-content-tabs-1`).text()).toBe('Confluence');
    expect(wrapper.find("[data-testid='tab-component']").exists()).toBeTruthy();

    expect(wrapper.find(Tabs).prop('selected')).toEqual(0);
  });

  it('jira cross product with confluence dialog secondary active matches', () => {
    const wrapper = mountWithIntl(
      <ProductProvider
        products={[Products.jira, Products.confluence]}
        activeIndex={1}
      >
        <DialogContent {...commonProps} />
      </ProductProvider>,
    );

    expect(wrapper.find(`#dialog-content-tabs-0`).text()).toBe('Jira');
    expect(wrapper.find(`#dialog-content-tabs-1`).text()).toBe('Confluence');
    expect(wrapper.find("[data-testid='tab-component']").exists()).toBeTruthy();

    expect(wrapper.find(Tabs).prop('selected')).toEqual(1);
  });

  it('confluence cross product with jira dialog matches', () => {
    const wrapper = mountWithIntl(
      <ProductProvider
        products={[Products.confluence, Products.jira]}
        activeIndex={0}
      >
        <DialogContent {...commonProps} />
      </ProductProvider>,
    );

    expect(wrapper.find(`#dialog-content-tabs-0`).text()).toBe('Confluence');
    expect(wrapper.find(`#dialog-content-tabs-1`).text()).toBe('Jira');
    expect(wrapper.find("[data-testid='tab-component']").exists()).toBeTruthy();

    expect(wrapper.find(Tabs).prop('selected')).toEqual(0);
  });
});
