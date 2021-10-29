import React, { Component, ComponentType } from 'react';
import EventEmitter from 'eventemitter3';
import { SpaEvents } from './messages';
import { FrameWindowTransportSlave } from '../transport/FrameWindowTransport';
import {
  MessageTransport,
  MTEmptyPayload,
  MTPayload,
} from '../transport/types';
import {
  PostEventPayload,
  PostMessagePayload,
  SpaChildClientProps,
} from './types';
import { RPCClient } from './rpc';

/**
 * These global event flags are to ensure that Ready and Handshake events
 * are emitted only once per any number of components created using `withSpaChildClient`
 */
let spaIsReadyEventEmitted = false;
let handshakeEventEmitted = false;

/**
 * Resets event flags, for testing purposes ONLY
 */
export function resetEventFlags() {
  spaIsReadyEventEmitted = false;
  handshakeEventEmitted = false;
}

type Events = {
  [SpaEvents.Ready]: MTEmptyPayload;
  [SpaEvents.Message]: MTPayload<PostMessagePayload>;
  [SpaEvents.AnalyticEvent]: MTPayload<PostEventPayload>;
};

interface WithSpaChildClientOptions {
  client: MessageTransport<Events>;
}

export function withSpaChildClient<P>(
  ComponentToWrap: ComponentType<P & SpaChildClientProps>,
  options: WithSpaChildClientOptions = {
    client: new FrameWindowTransportSlave<Events>(),
  },
) {
  const { client } = options;

  const rpcClient = new RPCClient(client);

  return class SpaChildClient extends Component<
    Omit<P, keyof SpaChildClientProps>
  > {
    messageHandler?: Function;
    emitter = new EventEmitter();

    componentDidMount() {
      if (handshakeEventEmitted) {
        return;
      }
      client.connect();
      client.on(SpaEvents.Message, this.onMessage);
      handshakeEventEmitted = true;
    }

    componentWillUnmount() {
      client.close();
    }

    onMessage = (message: PostMessagePayload) => {
      this.emitter.emit(SpaEvents.Message, message);
    };

    public spaIsReady = (): void => {
      if (spaIsReadyEventEmitted) {
        return;
      }
      client.send(SpaEvents.Ready);
      spaIsReadyEventEmitted = true;
    };

    public postMessage = (message: PostMessagePayload) => {
      client.send(SpaEvents.Message, message);
    };

    public postAnalyticsEvent = (event: PostEventPayload) => {
      const { context, payload } = event;
      client.send(SpaEvents.AnalyticEvent, { context, payload });
    };

    public registerMessageHandler = (handler: EventEmitter.ListenerFn) => {
      this.emitter.on(SpaEvents.Message, handler);
    };

    public unregisterMessageHandler = (handler: EventEmitter.ListenerFn) => {
      this.emitter.off(SpaEvents.Message, handler);
    };

    public render() {
      return (
        <ComponentToWrap
          {...(this.props as P)}
          spaIsReady={this.spaIsReady}
          postMessage={this.postMessage}
          postAnalyticsEvent={this.postAnalyticsEvent}
          registerMessageHandler={this.registerMessageHandler}
          unregisterMessageHandler={this.unregisterMessageHandler}
          rpcClient={rpcClient}
        />
      );
    }
  };
}
