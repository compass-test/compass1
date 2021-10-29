import { EP_REACT_PROPS_OBSERVABLE_OBJECT } from '../observable-object';
import type { IframeElement } from './IframeElementType';

/**
 * This function would be used by Confluence FE to detect if the view/edit component is loaded as embedded confluence experience.
 * Note: Please do not use it outside of embeddable page project. This is associated with Embeddable page iframe approach (temporary solution)
 *
 */
export const isEmbeddedConfluenceInIframe_DO_NOT_USE = () =>
  Boolean(
    (window?.frameElement as IframeElement)?.[EP_REACT_PROPS_OBSERVABLE_OBJECT],
  );
