import type { ViewPageProps } from '../view-page';
import type { EditPageProps } from '../edit-page';
import {
  EP_REACT_PROPS_OBSERVABLE_OBJECT,
  ObservableObject,
} from '../observable-object';

import type { SetExperiencesForwardingType } from '../experience-tracker';

type OmitProps = 'contentId' | 'spaceKey' | 'hostname' | 'className';

export type ViewPageIframePassThroughProps = SetExperiencesForwardingType &
  Omit<ViewPageProps, OmitProps>;
export type EditPageIframePassThroughProps = SetExperiencesForwardingType &
  Omit<EditPageProps, OmitProps>;

export type IframePassThroughProps =
  | ViewPageIframePassThroughProps
  | EditPageIframePassThroughProps;

export type IframeElement = HTMLIFrameElement & {
  [EP_REACT_PROPS_OBSERVABLE_OBJECT]?: ObservableObject<IframePassThroughProps>;
};
