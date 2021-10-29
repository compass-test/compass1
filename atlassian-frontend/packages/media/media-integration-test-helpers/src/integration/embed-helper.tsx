import { FC, useEffect, useMemo } from 'react';

/**
 * This is the the helper for test example that listens for 'height' events from iframes and stores them
 * into a global variable that current method then reads.
 */
export const EmbedHelper: FC = () => {
  const messageEventHandler = useMemo(
    () => (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.method === 'resize' && event.source) {
            const sourceUuid = (event.source as any).uuid;
            if (!(window as any).resizeHasBeenSentCount[sourceUuid]) {
              (window as any).resizeHasBeenSentCount[sourceUuid] = 0;
            }
            (window as any).resizeHasBeenSentCount[sourceUuid] += 1;
          }
        } catch (_) {
          // There are cases when rogue iframes throw messages. We ignore those that don't have json as a string
        }
      }
    },
    [],
  );

  useEffect(() => {
    /**
     * This global variable will have iframe unique iframe identifier as a key
     * and number of times this iframe sent `height` event.
     */
    (window as any).resizeHasBeenSentCount = {};
    window.addEventListener('message', messageEventHandler, false);
    return () => {
      window.removeEventListener('message', messageEventHandler);
    };
  });

  return null;
};
