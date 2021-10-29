import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { ListenerFn } from 'eventemitter3';
import {
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';

import { RPCMethod, RPCClient } from './rpc';

export interface SpaParentClientOptions {
  iframeIsEmbedded?: boolean;
  appName: string;
  src: string;
  withLoader?: boolean;
  withFullscreen?: boolean;
  withBlanket?: boolean;
  handshakeEventTimeoutDelayMilliSeconds?: number;
  readyEventTimeoutDelayMilliSeconds?: number;
  iframeZIndex?: number;
  modalZIndex?: number;
  modalElement?: HTMLElement;
  loaderElement?: HTMLElement;
}

export enum PostMessageDataEnum {
  string,
  object,
}

export interface PostMessagePayload {
  type: string;
  [key: string]: any;
}

export interface PostEventPayload
  extends Pick<UIAnalyticsEvent, 'context' | 'payload'> {}

export interface PostMessageEvent extends MessageEvent {
  data: PostMessagePayload;
}

export interface ModalOptions extends SpaParentClientOptions {
  modalZIndex: number;
}

export interface IframeOptions {
  src: string;
  id: string;
  withLoader: boolean;
  zIndex: number;
  isEmbedded?: boolean;
}

export interface InitConfig {
  containerElement: HTMLElement | null;
  rpcMethods?: RPCMethod<any, any>[];
}

export interface SpaChildClientProps {
  postMessage: (messagePayload: PostMessagePayload) => void;
  postAnalyticsEvent: (messagePayload: PostEventPayload) => void;
  spaIsReady: () => void;
  registerMessageHandler: (handler: ListenerFn) => void;
  unregisterMessageHandler: (handler: ListenerFn) => void;
  rpcClient: RPCClient;
}

type GasPurePayloadWithUiEvent = GasPurePayload & {
  eventType: typeof UI_EVENT_TYPE;
  action: string;
};
type GasPurePayloadWithTrackEvent = GasPurePayload & {
  eventType: typeof TRACK_EVENT_TYPE;
  action: string;
};
type GasPurePayloadWithOperationalEvent = GasPurePayload & {
  eventType: typeof OPERATIONAL_EVENT_TYPE;
  action: string;
};
type GasPurePayloadWithScreenEvent = GasPureScreenEventPayload & {
  eventType: typeof SCREEN_EVENT_TYPE;
};

export type AnalyticsContext = UIAnalyticsEvent['context'];
export type AnalyticsPayload = UIAnalyticsEvent['payload'];

export type GasV3Payload =
  | GasPurePayloadWithUiEvent
  | GasPurePayloadWithTrackEvent
  | GasPurePayloadWithOperationalEvent
  | GasPurePayloadWithScreenEvent;
