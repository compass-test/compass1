import { useEffect } from 'react';

import {
  ObservableObject,
  EP_REACT_PROPS_OBSERVABLE_OBJECT,
} from '../observable-object';
import type {
  IframeElement,
  IframePassThroughProps,
} from './IframeElementType';

declare global {
  interface Window {
    [EP_REACT_PROPS_OBSERVABLE_OBJECT]: ObservableObject<any>;
  }
}

export function useIframeCommunicateEPReactProps(
  iframeRef: React.RefObject<IframeElement>,
  iframeSrc: string,
  passThroughProps: IframePassThroughProps,
) {
  useEffect(() => {
    const iframe = iframeRef?.current;

    if (!iframe) {
      return;
    }

    let observableObject = iframe[EP_REACT_PROPS_OBSERVABLE_OBJECT];

    if (!observableObject) {
      observableObject = new ObservableObject();
      iframe[EP_REACT_PROPS_OBSERVABLE_OBJECT] = observableObject;
    }

    observableObject.object = passThroughProps;
    /**
     * Disable react-hooks/exhaustive-deps linting, the dependency has passThroughProps spreading on its keys and values
     * This should be able to handle any changes to the `passThroughProps` would recall the effect function.
     **/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    iframeRef,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.keys(passThroughProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(passThroughProps),
  ]);

  useEffect(() => {
    const iframe = iframeRef?.current;

    if (iframe) {
      iframe.src = iframeSrc;
    }
  }, [iframeRef, iframeSrc]);
}
