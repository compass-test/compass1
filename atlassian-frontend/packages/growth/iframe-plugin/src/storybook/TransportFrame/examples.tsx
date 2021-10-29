import React, { Component, createRef } from 'react';
import {
  HostEvents,
  SpaChildClientProps,
  SpaEvents,
  SpaParentClient,
  withSpaChildClient,
} from '../..';
import { SpaParentClient as DeprecatedSpaChildClient } from '../../core/deprecated_core';
import { MessageChannelTransportSlave } from '../../transport/MessageTransport';
import { FrameWindowTransportSlave } from '../../transport/FrameWindowTransport';

type WithSrc = {
  src: string;
};

const action = (...head: any) => (...rest: any) =>
  // eslint-disable-next-line no-console
  console.log(...head, ...rest);

const crossOriginSlaveV2_src =
  '//sub.site.local:6006/iframe.html?id=transport-frame--slave'; // cross origin new slave
// const crossOriginSlave_src = '//sub.site.local:6006/iframe.html?id=transport-frame--oldslave'; // cross origin old slave
// const sameOriginSlaveV2_src = '/iframe.html?id=transport-frame--slave'; // same origin new slave
const sameOriginSlave_src = '/iframe.html?id=transport-frame--oldslave'; // same origin old slave

class DeprecatedMaster extends Component<WithSrc> {
  containerRef = createRef<HTMLDivElement>();
  client?: DeprecatedSpaChildClient;

  componentDidMount() {
    this.client = new DeprecatedSpaChildClient({
      appName: 'example',
      src: this.props.src,
    });
    this.client.init({
      containerElement: this.containerRef.current,
    });

    this.client.on(HostEvents.Message, action('Master::onMessage'));
  }

  render() {
    return (
      <div>
        <button onClick={this.getOnClick}>Say something.</button>
        <div ref={this.containerRef} />
      </div>
    );
  }

  private getOnClick = () => {
    this.client!.postMessage({
      type: SpaEvents.Message,
      payload: 'Hello, Slave!',
    });
    // this.client!.send(SpaEvents.Message, "Hello, Slave!");
  };
}

class Master extends Component<WithSrc> {
  containerRef = createRef<HTMLDivElement>();
  client?: SpaParentClient;

  componentDidMount() {
    this.client = new SpaParentClient({
      appName: 'example',
      src: this.props.src,
    });
    this.client.init({
      containerElement: this.containerRef.current,
    });

    this.client.on(HostEvents.Message, action('Master::onMessage'));
  }

  render() {
    return (
      <div>
        <button onClick={this.getOnClick}>Say something.</button>
        <div ref={this.containerRef} />
      </div>
    );
  }

  private getOnClick = () => {
    this.client!.postMessage({
      type: SpaEvents.Message,
      payload: 'Hello, Slave!',
    });
    // this.client!.send(SpaEvents.Message, "Hello, Slave!");
  };
}

interface SlaveState {
  messages: string[];
}

const createSlave = (useLegacy = false) =>
  withSpaChildClient(
    class SlaveComponent extends Component<SpaChildClientProps, SlaveState> {
      state = { messages: [] };

      componentDidMount() {
        this.props.spaIsReady();
        this.props.registerMessageHandler(action('Slave::onMessage'));
      }

      render() {
        return (
          <div>
            Hello, I'm a Frame!
            <div>
              <button
                onClick={() =>
                  this.props.postMessage({
                    type: SpaEvents.Message,
                    payload: 'Hello, Master!',
                  })
                }
              >
                Say Hello
              </button>{' '}
              |<button onClick={() => window.location.reload()}>Reload</button>
            </div>
          </div>
        );
      }
    },
    {
      client: useLegacy
        ? new FrameWindowTransportSlave()
        : new MessageChannelTransportSlave(),
    },
  );

export const DeprecatedMasterExample = () => (
  <DeprecatedMaster src={sameOriginSlave_src} />
);
export const MasterExample = () => <Master src={crossOriginSlaveV2_src} />;
export const SlaveExample = () => {
  const Slave = createSlave();
  return <Slave />;
};
export const OldSlaveExample = () => {
  const Slave = createSlave(true);
  return <Slave />;
};
