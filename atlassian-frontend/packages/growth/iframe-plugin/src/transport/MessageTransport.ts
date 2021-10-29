import EventEmitter from 'eventemitter3';
import {
  MessageTransport,
  MTEventNames,
  MTEventTypes,
  MTEventPayload,
  MTEventCallback,
  TransportEventTypes,
} from './types';

type TransportHandshakeEvent = { type: TransportEventTypes.Handshake };
type TransportMessageEvent<T> = {
  type: TransportEventTypes.Message;
  payload: T;
};

type TransportEvent = {
  data: TransportHandshakeEvent | TransportMessageEvent<any>;
};

type EventItem<K, V> = {
  name: K;
  payload: V;
};
type EventTypesQueue<E> = {
  [K in keyof E]: EventItem<K, E[K]>;
}[keyof E][];

function packInternalMessage(type: any, payload?: any) {
  return {
    type,
    payload,
  };
}

function packMessage(type: any, payload?: any) {
  return packInternalMessage(TransportEventTypes.Message, {
    type,
    payload,
  });
}

abstract class BaseMessageTransport<E extends MTEventTypes>
  implements MessageTransport<E> {
  protected emitter = new EventEmitter();
  protected queue: EventTypesQueue<E> = [];
  protected port?: MessagePort;

  on<N extends MTEventNames<E>>(
    name: N,
    callback: MTEventCallback<E, N>,
  ): this {
    // @ts-ignore - due to compatibility issues with EventEmitter
    this.emitter.on(name, callback);
    return this;
  }

  off<N extends MTEventNames<E>>(
    name: N,
    callback: MTEventCallback<E, N>,
  ): this {
    // @ts-ignore - due to compatibility issues with EventEmitter
    this.emitter.off(name, callback);
    return this;
  }

  send<N extends MTEventNames<E>>(name: N, ...payload: MTEventPayload<E, N>) {
    if (this.port && this.isReady()) {
      this.port.postMessage(packMessage(name, payload[0]));
    } else {
      this.queue.push({ name, payload });
    }
  }

  protected dispatchQueuedMessages() {
    while (this.queue.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { name, payload } = this.queue.shift()!; // queue is not empty we just checked
      this.send(name, ...payload);
    }
  }

  abstract isReady(): boolean;
  abstract connect(): void;
  abstract close(): void;
}

export class MessageChannelTransportMaster<
  E extends MTEventTypes = any
> extends BaseMessageTransport<E> {
  private handshakeReceived = false;
  private frame: HTMLIFrameElement;

  constructor(frame: HTMLIFrameElement) {
    super();
    this.frame = frame;
  }

  connect() {
    this.setupFrameEventListeners();
  }

  isReady() {
    return this.handshakeReceived && Boolean(this.port);
  }

  close() {
    if (this.port) {
      this.port.close();
    }
  }

  private onFrameLoadedEvent = () => {
    this.handshakeReceived = false;
    const channel = new MessageChannel();
    this.port = channel.port1;

    this.port.addEventListener('message', this.onMessage);
    this.port.start();

    if (this.frame.contentWindow) {
      this.frame.contentWindow.postMessage(
        packInternalMessage(TransportEventTypes.Handshake),
        '*',
        [channel.port2],
      );
    }
  };

  private setupFrameEventListeners() {
    this.frame.addEventListener('load', this.onFrameLoadedEvent);
  }

  private onMessage = (evt: TransportEvent) => {
    const evtData = evt.data;

    if (evtData.type === TransportEventTypes.Handshake) {
      this.handshakeReceived = true;
      this.dispatchQueuedMessages();
      // let consumer know initial communication was successful
      this.emitter.emit(TransportEventTypes.Handshake);
      return;
    }

    if (evtData.type === TransportEventTypes.Message) {
      // unpack consumer message
      const { type, payload } = evtData.payload;
      this.emitter.emit(type, payload);
      return;
    }
  };
}

export class MessageChannelTransportSlave<
  E extends MTEventTypes = any
> extends BaseMessageTransport<E> {
  connect() {
    window.addEventListener('message', this.onPortMessage);
  }

  isReady() {
    return Boolean(this.port);
  }

  close() {
    if (this.port) {
      this.port.close();
    }
  }

  private onPortMessage = (e: MessageEvent) => {
    if (e.ports && e.ports.length) {
      this.subscribeToPortMessages(e.ports[0]);
    }
  };

  private subscribeToPortMessages = (port: MessagePort) => {
    if (this.port !== port) {
      // unsubscribe from old port
      if (this.port) {
        this.port.removeEventListener(
          TransportEventTypes.Message,
          this.onMessage,
        );
      }

      // subscribe to new port and store the reference
      this.port = port;
      this.port.addEventListener('message', this.onMessage);
      this.port.start();
      this.dispatchQueuedMessages();
      this.port.postMessage(packInternalMessage(TransportEventTypes.Handshake));
    }
  };

  private onMessage = (evt: TransportEvent) => {
    if (evt.data.type === TransportEventTypes.Message) {
      // unpack consumer message
      const { type, payload } = evt.data.payload;
      this.emitter.emit(type, payload);
      return;
    }
  };
}
