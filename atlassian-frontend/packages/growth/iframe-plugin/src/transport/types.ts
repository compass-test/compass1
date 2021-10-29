export type MTEmptyPayload = [];
export type MTPayload<T> = [T];

export type MTEventTypes = {
  [K in string]: MTEmptyPayload | MTPayload<any>;
};

export type MTEventNames<E extends MTEventTypes> = keyof E;
export type MTEventPayload<
  E extends MTEventTypes,
  K extends MTEventNames<E>
> = E[K];
export type MTEventCallback<
  E extends MTEventTypes,
  K extends MTEventNames<E>
> = (...args: E[K]) => void;

export interface MessageTransport<E extends MTEventTypes = any> {
  connect(): void;
  close(): void;
  send<N extends MTEventNames<E>>(
    name: N,
    ...payload: MTEventPayload<E, N>
  ): void;
  on<N extends MTEventNames<E>>(name: N, callback: MTEventCallback<E, N>): this;
  off<N extends MTEventNames<E>>(
    name: N,
    callback: MTEventCallback<E, N>,
  ): this;
}

export enum Source {
  Child = 'child',
  Parent = 'parent',
}

export enum TransportEventTypes {
  Handshake = 'handshake',
  Message = 'message',
}
