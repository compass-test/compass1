import {
  EP_REACT_PROPS_OBSERVABLE_OBJECT,
  ObservableObject,
} from '../observable-object';

import type {
  IframeElement,
  IframePassThroughProps,
} from './IframeElementType';

export function getIframeObservable_DO_NOT_USE<
  Props extends IframePassThroughProps
>(): ObservableObject<Props> | undefined {
  const iframeElement = window.frameElement as IframeElement;

  return iframeElement?.[EP_REACT_PROPS_OBSERVABLE_OBJECT] as
    | ObservableObject<Props>
    | undefined;
}
