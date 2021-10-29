import type {
  AvailableProductsResponse,
  JoinableSitesResponse,
  SwitcherSimpleProps,
} from '@atlassian/switcher/types';
export interface Response<T> {
  status: 'COMPLETE' | 'ERROR';
  data: T | null;
  error: any | null;
}

export type GenericIframeContainerProps = IframeProps &
  DataProviderProps & {
    bridgeProps: SwitcherBridgeProps;
  } & SwitcherEventHandlers;

export type DataProviderProps = {
  availableProductsPromise?: () => Promise<AvailableProductsResponse>;
  joinableSitesPromise?: () => Promise<JoinableSitesResponse>;
};

export type IframeProps = {
  testId?: string;
  src?: string;
};

export type SwitcherEventHandlers = {
  onTriggerXFlow?: (productKey: string) => void;
  onDiscoverMoreClicked?: (event: any, key?: string) => void;
  onSlackDiscoveryClickHandler?: (event: any, key?: string) => void;
  onClose?: () => void;
};

export type SwitcherBridgeProps = {
  enableDiscoverClickHandler?: boolean;
  enableXflowClickHandler?: boolean;
  enableSlackDiscoveryClickHandler?: boolean;
  enableOnCloseHandler?: boolean;
} & SwitcherSimpleProps;
