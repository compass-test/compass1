import { useState, useEffect, useRef } from 'react';

import type { IframePassThroughProps } from './iframe/IframeElementType';
import { getIframeObservable_DO_NOT_USE } from './iframe/getIframeObservable';
import { ObservableObject } from './observable-object/ObservableObject';

/**
 * This hook would be used by Confluence FE (embedded view and edit component) to receive React props through iframe
 * Note: Please do not use it outside of embeddable page project. This is associated with Embeddable page iframe approach (temporary solution)
 *
 */
export function useReactProps_DO_NOT_USE<
  Props extends IframePassThroughProps
>() {
  const unsubscribeRef = useRef<
    ReturnType<ObservableObject<Props>['subscribe']>
  >();

  const [
    embeddedConfluenceReactProps,
    setEmbeddedConfluenceReactProps,
  ] = useState<Props | null>(null);

  if (!unsubscribeRef.current) {
    const observableObject = getIframeObservable_DO_NOT_USE<Props>();

    const updateProps = () => {
      if (observableObject) {
        setEmbeddedConfluenceReactProps(observableObject.object);
      }
    };

    unsubscribeRef.current = observableObject?.subscribe(updateProps);

    updateProps();
  }

  useEffect(() => unsubscribeRef.current, []);

  return embeddedConfluenceReactProps;
}
