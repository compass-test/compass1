/**
 * Moving forward this is the parent client will default to using MessageTransport (V2 messaging protocol)
 * SpaChildClient should be backwards compatible to adapt to both
 */

import EventEmitter from 'eventemitter3';
import { MessageChannelTransportMaster } from '../transport/MessageTransport';
import { MessageTransport } from '../transport/types';
import {
  SpaParentClientOptions,
  InitConfig,
  PostMessagePayload,
} from '../lib/types';
import { SpaEvents, HostEvents } from '../lib/messages';
import { createModal, createIframe } from '../lib/elements';
import { IframeEvents, MonitoredEvents } from '../lib/events';
import { iframePluginParamKey } from '../lib/constants';
import { RPCServer } from '../lib/rpc';
import { appendSearchParam } from '../lib/appendSearchParam';
import { TimeoutHelper } from '../helpers';

class SpaParentClient {
  private iframeId = '__iframe_plugin_';
  private readonly options: SpaParentClientOptions;
  private modal?: HTMLElement;
  private spinner?: HTMLElement;
  private selectorEl?: HTMLElement;
  private iframeEl?: HTMLIFrameElement;
  private iframeEvents: IframeEvents;
  private events = new EventEmitter();
  private client?: MessageTransport;
  private rpc?: RPCServer;
  private timeoutHandshakeEvent: TimeoutHelper;
  private timeoutReadyEvent: TimeoutHelper;

  public constructor(options: SpaParentClientOptions) {
    if (!options) {
      throw new Error('Please pass through valid options');
    }
    this.options = options;
    // Poll for a response from SpaChildClient if it successfully loaded
    this.timeoutHandshakeEvent = new TimeoutHelper(
      options.handshakeEventTimeoutDelayMilliSeconds,
      this.onHandshakeTimeout,
    );
    // Poll for a response from the SPA if it successfully loaded
    this.timeoutReadyEvent = new TimeoutHelper(
      options.readyEventTimeoutDelayMilliSeconds,
      this.onReadyTimeout,
    );
    this.iframeEvents = new IframeEvents(this.options.appName);
  }

  on(type: HostEvents, listener: EventEmitter.ListenerFn): this {
    this.events.addListener(type, listener);
    return this;
  }
  off(type: HostEvents, listener: EventEmitter.ListenerFn): this {
    this.events.removeListener(type, listener);
    return this;
  }

  private onHandshakeTimeout = () => {
    this.emitMonitoringEvent(MonitoredEvents.HandshakeTimeout);
    this.events.emit(HostEvents.Error);
  };

  private onReadyTimeout = () => {
    this.emitMonitoringEvent(MonitoredEvents.ReadyTimeout);
    this.events.emit(HostEvents.Error);
  };

  public cleanup(): void {
    if (this.client) {
      this.client.close();
    }

    this.events.removeAllListeners();

    const el = this.selectorEl;
    if (el && this.modal) {
      el.removeChild(this.modal);
    }

    this.timeoutHandshakeEvent.clear();
    this.timeoutReadyEvent.clear();

    delete this.selectorEl;
    delete this.modal;
    delete this.iframeEl;
  }

  private registerMessageListener() {
    if (this.client) {
      this.client.on(SpaEvents.Message, this.messageCallback);
      this.client.on(SpaEvents.AnalyticEvent, this.analyticCallback);
      this.client.on(SpaEvents.Handshake, this.handshakeCallback);
      this.client.on(SpaEvents.Ready, this.readyCallback);
    }
  }

  private constructIframe(containerElement: HTMLElement | null): void {
    if (!containerElement) {
      throw new Error('No dom element found');
    }
    this.selectorEl = containerElement;
    const { modal, spinner } = createModal({
      ...this.options,
      modalZIndex: this.options.modalZIndex || 200,
    });
    this.modal = modal;
    this.spinner = spinner;

    /**
     * Instruct SPA to use version 2 of client protocol
     * empty - FrameWindowTransport
     * 2 - MessageChannelTransport
     */
    const src = appendSearchParam(this.options.src, iframePluginParamKey, '2');

    this.iframeEl = createIframe({
      src: String(src),
      isEmbedded: this.options.iframeIsEmbedded,
      zIndex: this.options.iframeZIndex || 200, // 200 will sit on top of global nav
      id: this.iframeId,
      withLoader:
        Boolean(this.options.withLoader) || Boolean(this.options.loaderElement),
    });
    this.modal.appendChild(this.iframeEl);
    containerElement.appendChild(this.modal);
  }

  private analyticCallback = (message: PostMessagePayload) => {
    this.events.emit(HostEvents.AnalyticEvent, message);
  };

  private messageCallback = (message: PostMessagePayload) => {
    this.events.emit(HostEvents.Message, message);
  };

  private readyCallback = () => {
    this.timeoutReadyEvent.clear();
    this.hideLoader();
    this.emitMonitoringEvent(MonitoredEvents.Ready);
  };

  private handshakeCallback = () => {
    this.timeoutHandshakeEvent.clear();
    this.emitMonitoringEvent(MonitoredEvents.Handshake);
    this.events.emit(HostEvents.Handshake);
  };

  private hideLoader() {
    if (this.spinner) {
      this.spinner.style.display = 'none';
    }

    if (this.iframeEl && this.modal) {
      this.iframeEl.style.display = 'block';
      this.modal.style.background = 'transparent';
    }
  }

  private emitMonitoringEvent = (event: MonitoredEvents) => {
    this.events.emit(
      HostEvents.AnalyticEvent,
      this.iframeEvents.getAnalyticsEvent(event),
    );
  };

  public postMessage(message: PostMessagePayload): void {
    if (this.client) {
      this.client.send(SpaEvents.Message, message);
    }
  }

  public init({ containerElement, rpcMethods }: InitConfig): void {
    try {
      this.emitMonitoringEvent(MonitoredEvents.Initialisation);
      this.constructIframe(containerElement);
      this.initialiseTransport();
      this.initialiseRpc(rpcMethods);
      this.registerMessageListener();
      this.timeoutHandshakeEvent.start();
      this.timeoutReadyEvent.start();
    } catch (err) {
      this.emitMonitoringEvent(MonitoredEvents.InitialisationError);
      this.events.emit(HostEvents.Error);
      throw err;
    }
  }

  private initialiseTransport() {
    if (!this.iframeEl) {
      throw new Error(
        'initialiseTransport should be called after iframe is created',
      );
    }

    this.client = new MessageChannelTransportMaster(this.iframeEl);
    this.client.connect();
  }

  private initialiseRpc(rpcMethods: InitConfig['rpcMethods'] = []) {
    if (!this.client) {
      throw new Error(
        'initialiseRpc should be called after client is instantiated',
      );
    }

    this.rpc = new RPCServer(this.client, rpcMethods);
    this.rpc.start();
  }
}

export { SpaParentClient, HostEvents };
