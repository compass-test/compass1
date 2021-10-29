export const MESSAGE_PREFIX = 'atlassianSwitcher__';

export type MessageToIframeKey = 'joinableSitesResponse' | 'apsResponse';

export type MessageFromIframeKey =
  | 'discoverMoreClicked'
  | 'xflowTriggered'
  | 'slackDiscoveryClicked'
  | 'onClose'
  | 'iframe-resize';

type MessageKey = MessageFromIframeKey | MessageToIframeKey;

export interface BridgeMessage<T> {
  type: string;
  payload: T;
}

export function postMessageFromIframe<T>(
  type: MessageFromIframeKey,
  message: T,
) {
  postMessage(type, message, window.parent);
}

export function postMessageToIframe(
  type: MessageToIframeKey,
  message: any,
  iframeRef: React.RefObject<HTMLIFrameElement>,
) {
  if (iframeRef.current && iframeRef.current.contentWindow) {
    postMessage(type, message, iframeRef.current.contentWindow);
  }
}

function postMessage(type: MessageKey, messageData: any, fromWindow: Window) {
  fromWindow.postMessage(
    {
      type: `${MESSAGE_PREFIX}${type}`,
      payload: messageData,
    },
    '*',
  );
}
