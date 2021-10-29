import { useEffect, useRef } from 'react';

import {
  MESSAGE_PREFIX,
  MessageFromIframeKey,
  MessageToIframeKey,
} from './message';

export const useMessageHandler = (
  messageKey: MessageFromIframeKey | MessageToIframeKey,
  handler: (e: MessageEvent) => void,
  element = window,
) => {
  const savedHandler = useRef<(e: MessageEvent) => void>(handler);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;

      if (!isSupported || !savedHandler.current) {
        return;
      }
      // Create event listener that calls handler function stored in ref
      const onMessageReceived = (event: MessageEvent) => {
        const msg = event.data;
        // TODO: Check origin
        if (msg.type === `${MESSAGE_PREFIX}${messageKey}`) {
          savedHandler.current!(event);
        }
      };
      // Add event listener
      element.addEventListener('message', onMessageReceived);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener('message', onMessageReceived);
      };
    },
    [messageKey, element], // Re-run if eventName or element changes
  );
};
