import EventEmitter from 'eventemitter3';
import {
  SpaParentClientOptions,
  PostMessageEvent,
  InitConfig,
  PostMessagePayload,
} from '../lib/types';
import { SpaEvents, HostEvents, Source } from '../lib/messages';
import { createModal, createIframe } from '../lib/elements';
import { IframeEvents, MonitoredEvents } from '../lib/events';

class SpaParentClient {
  private iframeId = '__iframe_plugin_';
  private readonly options: SpaParentClientOptions;
  private modal?: HTMLElement;
  private spinner?: HTMLElement;
  private selectorEl?: HTMLElement;
  private iframeReady = false;
  private pollingInterval = 200;
  private pollingThresholdMilliSeconds: number;
  private interval?: number;
  private iframeEl?: HTMLIFrameElement;
  private iframeEvents: IframeEvents;

  private readonly events: EventEmitter<HostEvents>;

  public constructor(options: SpaParentClientOptions) {
    if (!options) {
      throw new Error('Please pass through valid options');
    }
    this.options = options;
    this.pollingThresholdMilliSeconds =
      this.options.handshakeEventTimeoutDelayMilliSeconds || 1000;
    this.iframeEvents = new IframeEvents(this.options.appName);

    this.events = new EventEmitter<HostEvents>();
  }

  on(type: HostEvents, listener: EventEmitter.ListenerFn): this {
    this.events.addListener(type, listener);
    return this;
  }
  off(type: HostEvents, listener: EventEmitter.ListenerFn): this {
    this.events.removeListener(type, listener);
    return this;
  }

  // This method is to poll for a response from the SPA to determine if it successfully loaded
  private pollIframe = (): void => {
    let pollingCount = 0;
    const interval = window.setInterval((): void => {
      if (this.iframeReady) {
        return clearInterval(interval);
      }
      pollingCount++;
      if (
        pollingCount * this.pollingInterval >
        this.pollingThresholdMilliSeconds
      ) {
        clearInterval(interval);
        this.emitMonitoringEvent(MonitoredEvents.HandshakeTimeout);
        this.events.emit(HostEvents.Error);
      }
    }, this.pollingInterval);
    this.interval = interval;
  };

  public cleanup(): void {
    this.iframeEl &&
      this.iframeEl.contentWindow &&
      this.iframeEl.contentWindow.removeEventListener(
        'message',
        this.messageCallback,
      );

    this.events.removeAllListeners();

    const el = this.selectorEl;
    if (el && this.modal) {
      el.removeChild(this.modal);
    }
    this.interval && clearInterval(this.interval);

    delete this.selectorEl;
    delete this.modal;
    delete this.iframeEl;
  }

  private registerMessageListener(): void {
    this.iframeEl &&
      this.iframeEl.contentWindow &&
      this.iframeEl.contentWindow.addEventListener(
        'message',
        this.messageCallback,
      );
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
    this.iframeEl = createIframe({
      src: this.options.src,
      zIndex: this.options.iframeZIndex || 200, // 200 will sit on top of global nav
      id: this.iframeId,
      withLoader: !!this.options.withLoader,
    });
    this.modal.appendChild(this.iframeEl);
    containerElement.appendChild(this.modal);
  }

  private messageCallback = (event: PostMessageEvent) => {
    if (event.data.source === Source.Parent) {
      return;
    }
    const { data } = event;
    switch (data.type) {
      case SpaEvents.Handshake:
        this.iframeReady = true;
        this.emitMonitoringEvent(MonitoredEvents.Handshake);
        break;
      case SpaEvents.Ready:
        this.hideLoader();
        this.emitMonitoringEvent(MonitoredEvents.Ready);
        break;
      case SpaEvents.Message:
        this.events.emit(HostEvents.Message, data.payload);
        break;
      case SpaEvents.AnalyticEvent:
        this.events.emit(HostEvents.AnalyticEvent, data.payload);
        break;
    }
  };

  private hideLoader() {
    if (this.options.withLoader && this.spinner && this.iframeEl) {
      this.spinner.style.display = 'none';
      this.iframeEl.style.display = 'block';
      this.modal && (this.modal.style.background = 'transparent');
    }
  }

  private emitMonitoringEvent = (event: MonitoredEvents) => {
    this.events.emit(
      HostEvents.AnalyticEvent,
      this.iframeEvents.getAnalyticsEvent(event),
    );
  };

  public postMessage(message: PostMessagePayload): void {
    if (this.iframeEl && this.iframeEl.contentWindow) {
      this.iframeEl.contentWindow.postMessage(
        {
          type: SpaEvents.Message,
          payload: message,
          source: Source.Parent,
        },
        '*',
      );
    }
  }

  public init({ containerElement }: InitConfig): void {
    try {
      this.emitMonitoringEvent(MonitoredEvents.Initialisation);
      this.constructIframe(containerElement);
      this.registerMessageListener();
      this.pollIframe();
    } catch (err) {
      this.emitMonitoringEvent(MonitoredEvents.InitialisationError);
      this.events.emit(HostEvents.Error);
      throw err;
    }
  }
}

export { SpaParentClient, HostEvents };
