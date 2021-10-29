import React from 'react';

import { useMessageHandler } from './useMessageHandler';

type IframeDimensions = {
  height: number | undefined;
  width: number | undefined;
};

export const useIframeDimensions = (): IframeDimensions => {
  const [iframeDimensions, setIframeDimensions] = React.useState<
    IframeDimensions
  >({
    height: undefined,
    width: undefined,
  });

  function onIframeResize(e: MessageEvent) {
    setIframeDimensions({
      height: e.data.payload.height,
      width: e.data.payload.width,
    });
  }

  useMessageHandler('iframe-resize', onIframeResize);

  return iframeDimensions;
};
