/**
 * FrameWindowTransport is deprecated
 */

import EventEmitter from 'eventemitter3';

import {
  Source,
  MessageTransport,
  TransportEventTypes,
  MTEventTypes,
  MTEventNames,
  MTEventCallback,
  MTEventPayload,
} from './types';

export class FrameWindowTransportMaster<E extends MTEventTypes = any>
  implements MessageTransport<E> {
  private emitter = new EventEmitter();
  private frame: HTMLIFrameElement;

  constructor(frame: HTMLIFrameElement) {
    this.frame = frame;
  }

  connect() {
    if (this.frame.contentWindow) {
      this.frame.contentWindow.addEventListener('message', this.onMessage);
    }
  }

  close() {
    if (this.frame.contentWindow) {
      this.frame.contentWindow.removeEventListener('message', this.onMessage);
    }
  }

  send<N extends MTEventNames<E>>(type: N, ...payload: MTEventPayload<E, N>) {
    if (this.frame.contentWindow) {
      this.frame.contentWindow.postMessage(
        {
          type,
          payload: payload[0],
          source: Source.Parent,
        },
        '*',
      );
    }
  }

  on<N extends MTEventNames<E>>(
    type: N,
    callback: MTEventCallback<E, N>,
  ): this {
    // @ts-ignore - due to compatibility issues with EventEmitter
    this.emitter.on(type, callback);
    return this;
  }

  off<N extends MTEventNames<E>>(
    type: N,
    callback: MTEventCallback<E, N>,
  ): this {
    // @ts-ignore - due to compatibility issues with EventEmitter
    this.emitter.off(type, callback);
    return this;
  }

  private onMessage = (evt: MessageEvent) => {
    if (evt.data.source === Source.Child) {
      // @ts-ignore
      this.emitter.emit(evt.data.type, evt.data.payload);
    }
  };
}

export class FrameWindowTransportSlave<E extends MTEventTypes = any>
  implements MessageTransport<E> {
  private emitter = new EventEmitter();

  connect() {
    window.postMessage(
      {
        type: TransportEventTypes.Handshake,
        source: Source.Child,
      },
      '*',
    );

    window.addEventListener('message', this.onMessage);
  }

  close() {
    this.emitter.removeAllListeners();
    window.removeEventListener('message', this.onMessage);
  }

  send<N extends MTEventNames<E>>(type: N, ...payload: MTEventPayload<E, N>) {
    window.postMessage(
      {
        type,
        payload: payload[0],
        source: Source.Child,
      },
      '*',
    );
  }

  on<N extends MTEventNames<E>>(
    type: N,
    callback: MTEventCallback<E, N>,
  ): this {
    // @ts-ignore - due to compatibility issues with EventEmitter
    this.emitter.on(type, callback);
    return this;
  }

  off<N extends MTEventNames<E>>(
    type: N,
    callback: MTEventCallback<E, N>,
  ): this {
    // @ts-ignore - due to compatibility issues with EventEmitter
    this.emitter.off(type, callback);
    return this;
  }

  private onMessage = (evt: MessageEvent) => {
    if (evt.data.source === Source.Parent) {
      this.emitter.emit(evt.data.type, evt.data.payload);
    }
  };
}
