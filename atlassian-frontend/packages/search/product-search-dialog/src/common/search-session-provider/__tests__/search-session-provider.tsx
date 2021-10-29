import React from 'react';
import { mount } from 'enzyme';
import {
  SearchSessionProvider,
  injectSearchSession,
} from '../search-session-provider';

describe('SearchSessionProvider', () => {
  const DummyComponent = (props: any) => <div />;
  const InjectedDummyComponent = injectSearchSession(DummyComponent);

  it('generates and passes searchSessionId to children', () => {
    const wrapper = mount(
      <SearchSessionProvider sessionKey="">
        <InjectedDummyComponent />
      </SearchSessionProvider>,
    );

    const searchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');
    expect(searchSessionId).toBeTruthy();
  });

  it('passes the same searchSessionId to all its children', () => {
    const wrapper = mount(
      <SearchSessionProvider sessionKey="">
        <InjectedDummyComponent />
        <InjectedDummyComponent />
        <div>
          <InjectedDummyComponent />
        </div>
      </SearchSessionProvider>,
    );

    const children = wrapper.find(DummyComponent);
    const searchSessionId = children.first().prop('searchSessionId');

    expect(children).toHaveLength(3);
    children.forEach((child) => {
      expect(child.prop('searchSessionId')).toEqual(searchSessionId);
    });
  });

  it('remounting the provider changes the searchSessionId', () => {
    const wrapper = mount(
      <SearchSessionProvider sessionKey="">
        <InjectedDummyComponent />
      </SearchSessionProvider>,
    );

    const searchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');

    wrapper.unmount();
    wrapper.mount();

    const newSearchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');

    expect(searchSessionId).not.toEqual(newSearchSessionId);
  });

  it('updating the provider without changing the sessionKey does not change the searchSessionId', () => {
    const wrapper = mount(
      <SearchSessionProvider sessionKey="">
        <InjectedDummyComponent />
      </SearchSessionProvider>,
    );

    const searchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');

    wrapper.setProps({
      newProp: 'someProp',
    });
    wrapper.update();

    const newSearchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');

    expect(searchSessionId).toEqual(newSearchSessionId);
  });

  it('updating the provider by changing the sessionKey does change the searchSessionId', () => {
    const wrapper = mount(
      <SearchSessionProvider sessionKey="oldKey">
        <InjectedDummyComponent />
      </SearchSessionProvider>,
    );

    const searchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');

    wrapper.setProps({
      sessionKey: 'newKey',
    });
    wrapper.update();

    const newSearchSessionId = wrapper
      .find(DummyComponent)
      .prop('searchSessionId');

    expect(searchSessionId).not.toEqual(newSearchSessionId);
  });

  it('different SearchSessionProvider instances provide different session id', () => {
    const wrapper = mount(
      <>
        <SearchSessionProvider sessionKey="">
          <InjectedDummyComponent />
        </SearchSessionProvider>
        <SearchSessionProvider sessionKey="">
          <InjectedDummyComponent />
        </SearchSessionProvider>
      </>,
    );

    const children = wrapper.find(DummyComponent);
    expect(children).toHaveLength(2);

    const searchSessionId = children.first().prop('searchSessionId');
    const otherSearchSessionId = children.last().prop('searchSessionId');

    expect(searchSessionId).not.toEqual(otherSearchSessionId);
  });

  it('injectedSearchSession component throws error without provider', () => {
    // Suppress error boundary error message
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => mount(<InjectedDummyComponent />)).toThrow();

    // Restore implementation of error
    // eslint-disable-next-line
    (console.error as any).mockRestore();
  });
});
