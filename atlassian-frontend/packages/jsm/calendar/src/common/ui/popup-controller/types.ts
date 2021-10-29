import type { ReactNode } from 'react';

import type { PopupProps } from '@atlaskit/popup/types';

export interface PopupCloseKey {
  id: string;
  forceRemountCounter: number;
}

export interface PopupSpecBase<T, U> {
  /** A unique identifier of the popup. */
  id: string;
  /** Data needed to render to popup contents. */
  data: T;
  /** The value to pass to the `offset` prop in @atlaskit/popup. */
  offset?: PopupProps['offset'];
  /** The value to pass to the `placement` prop in @atlaskit/popup. */
  placement?: PopupProps['placement'];
  /**
   * An array of popup IDs to keep open when this popup opens or closes.
   */
  keepOpenIds?: string[];
  /** A render function defining the contents of the popup. */
  renderContents: (props: {
    id: string;
    data: T;
    context: U;
    onClose: () => Promise<void>;
  }) => ReactNode;
}

/** Definition of a popup used to open a new popup. */
export interface PopupSpec<T, U> extends PopupSpecBase<T, U> {
  /** The bounding client rectangle of the target element to show the popup next to. */
  targetRect: DOMRect;
  /** The offset width of the target element to show the popup next to. */
  targetOffsetWidth: number;
  /**
   * The optional offsetY property of the mouse click event that triggered the popup to open, used
   * to better position the popup.
   */
  mouseOffsetY?: number;
}

export interface PopupSpecInternal<T, U> extends PopupSpecBase<T, U> {
  anchorTop: number;
  anchorLeft: number;
  anchorWidth: number;
  forceRemountCounter: number;
}

export interface PopupControllerData {
  /** True if there is at least one popup open, false otherwise. */
  arePopupsOpen: boolean;
  /** A list of IDs of the popups that are currently open. */
  openPopupIds: Set<string>;
  /** A React node containing all of the popups to render. */
  popupContainer: ReactNode;
}

export interface PopupControllerActions<U> {
  /**
   * Opens a new popup. Can also be used to update an existing popup with the
   * same ID.
   */
  openPopup: (popup: PopupSpec<any, U>) => Promise<void>;
}
