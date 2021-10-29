import React from 'react';
import { shallow, configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import { resetEventFlags, withSpaChildClient } from '../lib/spa';
import { SpaEvents, Source, HostEvents } from '../lib/messages';
import { PostMessagePayload } from '../lib/types';
import { RPCClient } from '../lib/rpc';

function delay(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function defer() {
  return delay();
}

configure({ adapter: new Adapter() });

describe('The iframe SPA wrapper', () => {
  let Wrapper: React.ComponentClass;
  let postMessageSpy: jest.SpyInstance;

  beforeEach(() => {
    Wrapper = withSpaChildClient(() => <div />);
    postMessageSpy = jest.spyOn(window, 'postMessage');
    resetEventFlags();
  });
  afterEach(() => {
    postMessageSpy.mockRestore();
  });
  it('should return a react class', () => {
    expect(Wrapper.prototype).toBeInstanceOf(React.Component);
  });
  it('should emit Handshake event', async () => {
    shallow(<Wrapper />);
    await delay(100);

    expect(postMessageSpy).toHaveBeenCalledWith(
      { source: Source.Child, type: SpaEvents.Handshake },
      '*',
    );
  });
  it('should emit Handshake event only once', async () => {
    const ComponentOne = withSpaChildClient(() => <div />);
    const ComponentTwo = withSpaChildClient(() => <div />);

    // mount same component twice, `componentDidMount` should be invoked twice
    shallow(<ComponentOne />);
    shallow(<ComponentOne />);

    // mount another component
    shallow(<ComponentTwo />);

    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    expect(postMessageSpy).toHaveBeenCalledWith(
      { source: Source.Child, type: SpaEvents.Handshake },
      '*',
    );
  });
  it('should have spaIsReady prop that when invoked emits Ready event', async () => {
    const component = shallow(<Wrapper />);
    component.props().spaIsReady();
    await defer();
    expect(postMessageSpy).toHaveBeenCalledWith(
      { source: Source.Child, type: SpaEvents.Ready },
      '*',
    );
  });
  it('should emit Ready event only once', async () => {
    const ComponentOne = withSpaChildClient(() => <div />);
    const ComponentTwo = withSpaChildClient(() => <div />);

    const c1 = shallow(<ComponentOne />);
    const c2 = shallow(<ComponentTwo />);

    /**
     * Resetting window.postMessage spy as it should have been called once at this point
     * because Handshake event is fired when above components were mounted
     */
    postMessageSpy.mockClear();

    // call spaIsReady twice
    c1.props().spaIsReady();
    c1.props().spaIsReady();
    // call spaIsReady on another component
    c2.props().spaIsReady();

    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    expect(postMessageSpy).toHaveBeenCalledWith(
      { source: Source.Child, type: SpaEvents.Ready },
      '*',
    );
  });
  it('should emit message event wrapped in message data structure', async () => {
    const component = shallow(<Wrapper />);
    const message: PostMessagePayload = {
      type: 'SOME_MESSAGE_EVENT',
      value: 'abc123',
    };
    const wrappedMessage = {
      type: SpaEvents.Message,
      payload: message,
      source: Source.Child,
    };
    component.props().postMessage(message);
    await defer();
    expect(postMessageSpy).toHaveBeenCalledWith(wrappedMessage, '*');
  });

  describe('registerMessageHandler', () => {
    it('should be invoked with message payload sent from parent', async () => {
      const onMessageReceivedSpy = jest.fn();
      const component = shallow(<Wrapper />);
      component.props().registerMessageHandler(onMessageReceivedSpy);
      const unpackedMessage = { type: 'POST_MESSAGE', data: 'DATA' };
      const wrappedMessage = {
        type: HostEvents.Message,
        source: Source.Parent,
        payload: unpackedMessage,
      };
      window.postMessage(wrappedMessage, '*');
      await defer();
      expect(onMessageReceivedSpy).toHaveBeenCalledWith(unpackedMessage);
    });

    it('should ignore (own) message payload sent from child', async () => {
      const onMessageReceivedSpy = jest.fn();
      const component = shallow(<Wrapper />);
      component.props().registerMessageHandler(onMessageReceivedSpy);
      const unpackedMessage = { type: 'POST_MESSAGE', data: 'DATA' };
      const wrappedMessage = {
        type: HostEvents.Message,
        source: Source.Child,
        payload: unpackedMessage,
      };
      window.postMessage(wrappedMessage, '*');
      await defer();
      expect(onMessageReceivedSpy).not.toHaveBeenCalledWith(wrappedMessage);
    });

    it('should not invoke a function that has been unregistered', async () => {
      const onMessageReceivedSpy = jest.fn();
      const component = shallow(<Wrapper />);
      component.props().registerMessageHandler(onMessageReceivedSpy);
      const unpackedMessage = { type: 'POST_MESSAGE', data: 'DATA' };
      const wrappedMessage = {
        type: HostEvents.Message,
        source: Source.Parent,
        payload: unpackedMessage,
      };
      window.postMessage(wrappedMessage, '*');
      await defer();
      expect(onMessageReceivedSpy).toHaveBeenCalledWith(unpackedMessage);
      onMessageReceivedSpy.mockReset();
      component.props().unregisterMessageHandler(onMessageReceivedSpy);
      window.postMessage(wrappedMessage, '*');
      await defer();
      expect(onMessageReceivedSpy).not.toHaveBeenCalled();
    });
  });

  describe('rpcClient', () => {
    it('should provide an rpcClient that is available via props', async () => {
      const component = shallow(<Wrapper />);
      expect(component.props().rpcClient).toBeInstanceOf(RPCClient);
    });
  });
});
