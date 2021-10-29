import React, { useMemo, useState } from 'react';

import type {
  AvailableProductsResponse,
  JoinableSitesResponse,
} from '@atlassian/switcher/types';

import type {
  Response,
  SwitcherBridgeProps,
  SwitcherEventHandlers,
} from '../../../common/types';
import { IS_DEV } from '../../../common/utils/environment';
import { postMessageToIframe } from '../../../common/utils/message';
import { useIframeDimensions } from '../../../common/utils/useIframeDimensions';
import { useMessageHandler } from '../../../common/utils/useMessageHandler';

type SwitcheriFrameProps = {
  availableProducts: Response<AvailableProductsResponse> | undefined;
  joinableSites: Response<JoinableSitesResponse> | undefined;
  testId?: string;
  src?: string;
  bridgeProps: SwitcherBridgeProps;
} & SwitcherEventHandlers;

const SwitcheriFrame: React.FC<SwitcheriFrameProps> = ({
  testId,
  availableProducts,
  joinableSites,
  src = IS_DEV ? 'http://localhost:3000' : undefined,
  bridgeProps,
  onClose,
  onDiscoverMoreClicked,
  onSlackDiscoveryClickHandler,
  onTriggerXFlow,
}) => {
  const [hasIframeLoaded, setHasIframeLoaded] = useState(false);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const { height: iframeHeight } = useIframeDimensions();

  const bridgePropsAttribute = useMemo(() => JSON.stringify(bridgeProps), [
    bridgeProps,
  ]);

  function onIframeLoad() {
    setHasIframeLoaded(true);
  }

  React.useEffect(() => {
    // Send even if empty list to avoid default provider being used
    if (availableProducts && hasIframeLoaded) {
      postMessageToIframe('apsResponse', availableProducts, iframeRef);
    }
  }, [availableProducts, hasIframeLoaded]);

  React.useEffect(() => {
    // Send even if empty list to avoid default provider being used
    if (joinableSites && hasIframeLoaded) {
      postMessageToIframe('joinableSitesResponse', joinableSites, iframeRef);
    }
  }, [joinableSites, hasIframeLoaded]);

  useMessageHandler('discoverMoreClicked', (e: MessageEvent) => {
    if (onDiscoverMoreClicked) {
      onDiscoverMoreClicked(e.data.payload.event, e.data.payload.key);
    }
  });

  useMessageHandler('xflowTriggered', (e: MessageEvent) => {
    if (onTriggerXFlow) {
      onTriggerXFlow(e.data.payload.productKey);
    }
  });
  useMessageHandler('slackDiscoveryClicked', (e: MessageEvent) => {
    if (onSlackDiscoveryClickHandler) {
      onSlackDiscoveryClickHandler(e.data.payload.event, e.data.payload.key);
    }
  });

  useMessageHandler('onClose', () => {
    if (onClose) {
      onClose();
    }
  });

  return (
    <iframe
      ref={iframeRef}
      src={src ?? '/atlassian-switcher/index.html'}
      onLoad={onIframeLoad}
      style={{ border: 0, width: '100%', height: iframeHeight }}
      data-testid={testId}
      data-props={bridgePropsAttribute}
    />
  );
};

export default SwitcheriFrame;
