import React from 'react';
import { mount } from 'enzyme';
import {
  ConfluenceClientsProvider,
  withClients,
} from '../confluence-search-provider';

describe('<ConfluenceSearchProvider />', () => {
  const DUMMY_CONFIG = {
    aggregatorUrl: 'some/url',
    baseUrl: '',
    cloudId: 'some/id',
    isUserAnonymous: false,
  };

  const DummyComponent = (_props: any) => <div />;
  const DummyComponentWithClients = withClients(DummyComponent);

  it('all child components recieve the same props', () => {
    const wrapper = mount(
      <ConfluenceClientsProvider config={DUMMY_CONFIG}>
        <DummyComponentWithClients />
        <DummyComponentWithClients />
      </ConfluenceClientsProvider>,
    );

    const dummyComponents = wrapper.find(DummyComponent);

    expect(dummyComponents).toHaveLength(2);

    expect(dummyComponents.at(0).prop('recentClient')).toStrictEqual(
      dummyComponents.at(1).prop('recentClient'),
    );
    expect(dummyComponents.at(0).prop('searchClient')).toStrictEqual(
      dummyComponents.at(1).prop('searchClient'),
    );
  });

  it('provider will provide the same client if re-rendered with the same config', () => {
    const wrapperOne = mount(
      // Ensure that references for dummy config is not the same between render one and two
      <ConfluenceClientsProvider config={{ ...DUMMY_CONFIG }}>
        <DummyComponentWithClients />
      </ConfluenceClientsProvider>,
    );

    const propsOne = wrapperOne.find(DummyComponent).props();

    const wrapperTwo = mount(
      // Ensure that references for dummy config is not the same between render one and two
      <ConfluenceClientsProvider config={{ ...DUMMY_CONFIG }}>
        <DummyComponentWithClients />
      </ConfluenceClientsProvider>,
    );

    const propsTwo = wrapperTwo.find(DummyComponent).props();

    expect(propsOne).toStrictEqual(propsTwo);
  });

  it('provider will provide the different client if re-rendered with the different config', () => {
    const wrapperOne = mount(
      <ConfluenceClientsProvider config={DUMMY_CONFIG}>
        <DummyComponentWithClients />
      </ConfluenceClientsProvider>,
    );

    const propsOne = wrapperOne.find(DummyComponent).props();

    const wrapperTwo = mount(
      <ConfluenceClientsProvider
        config={{ ...DUMMY_CONFIG, aggregatorUrl: 'some/other/url/blah' }}
      >
        <DummyComponentWithClients />
      </ConfluenceClientsProvider>,
    );

    const propsTwo = wrapperTwo.find(DummyComponent).props();

    expect(propsOne).not.toStrictEqual(propsTwo);
  });

  it('throws error when rendering without provider', () => {
    // Suppress error boundary error message
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => mount(<DummyComponentWithClients />)).toThrow();

    // Restore implementation of error
    // eslint-disable-next-line
    (console.error as any).mockRestore();
  });
});
