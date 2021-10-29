export { SpaParentClient } from './core/index';
export { withSpaChildClient } from './lib/spa';
export { MessageChannelTransportSlave } from './transport/MessageTransport';
export { iframePluginParamKey } from './lib/constants';
export { createSpinner } from './lib/elements';
export { PostMessageDataEnum } from './lib/types';
export type {
  SpaParentClientOptions,
  PostMessagePayload,
  PostEventPayload,
  PostMessageEvent,
  ModalOptions,
  IframeOptions,
  InitConfig,
  SpaChildClientProps,
  AnalyticsContext,
  AnalyticsPayload,
  GasV3Payload,
} from './lib/types';
export { SpaEvents, HostEvents, Source } from './lib/messages';
export { analyticsWrapper, transformEvent } from './helpers';
export type { AnalyticsWebClient } from './helpers';
export { RPCClient } from './lib/rpc';
export type { RPCMethod } from './lib/rpc';
