import { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';

import type { MenuGroupProps, SectionProps } from '@atlaskit/menu/types';
import type { ContentProps, TriggerProps } from '@atlaskit/popup/types';

export type FocusableElement = HTMLAnchorElement | HTMLButtonElement;
export type Action = 'next' | 'prev' | 'first' | 'last';

export type Placement =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';

export type ItemId = string;
export type GroupId = string;

export type CachedItem = {
  id: ItemId;
  groupId: GroupId;
};

export type FocusItem = {
  itemId: ItemId;
  itemNode: HTMLElement;
};

export type Behaviors =
  | 'checkbox'
  | 'radio'
  | 'menuitemcheckbox'
  | 'menuitemradio';

interface CustomTriggerProps extends TriggerProps {
  /**
   * Makes the trigger appear selected.
   */
  isSelected?: boolean;

  /**
   * Event that is triggered when the element is clicked.
   */
  onClick?: (e: MouseEvent | KeyboardEvent) => void;

  /**
   A `testId` prop is provided for specified elements, which is a unique
   string that appears as a data attribute `data-testid` in the rendered code,
   serving as a hook for automated tests.

   As dropdown-menu is composed of different components, we passed down the testId to the sub component you want to test:
   - `testId--trigger` to get the menu trigger.
   - `testId--content` to get the dropdown content trigger.
    */
  testId?: string;
}

export interface OnOpenChangeArgs {
  isOpen: boolean;
  event?: MouseEvent | KeyboardEvent;
}

export interface MenuWrapperProps extends MenuGroupProps {
  setInitialFocusRef?: ContentProps['setInitialFocusRef'];
  onClose?: ContentProps['onClose'];
}

export interface DropdownMenuGroupProps extends SectionProps {}

export interface DropdownMenuProps {
  /**
   * Controls the appearance of the menu.
   * Default menu has scroll after its height exceeds the pre-defined amount.
   * Tall menu has no scroll until the height exceeds the height of the viewport.
   */
  appearance?: 'default' | 'tall';

  /**
   * Value passed to the Layer component to determine when to reposition the droplist
   */
  boundariesElement?: 'viewport' | 'window' | 'scrollParent';

  /**
   * Content that will be rendered inside the layer element. Should typically be
   * `DropdownItemGroup` or `DropdownItem`, or checkbox / radio variants of those.
   */
  children?: ReactNode;

  /**
   * If true, a Spinner is rendered instead of the items
   */
  isLoading?: boolean;

  /**
   * Text to be used as status for assistive technologies
   */
  statusLabel?: string;

  /**
   * Controls the open state of the dropdown.
   */
  isOpen?: boolean;

  /**
   * Position of the menu.
   */
  placement?: Placement;

  /**
   * Determines if the dropdown menu should be positioned fixed. Useful for breaking out of overflow scroll/hidden containers, however, extra layout
   * management will be required to control scroll behaviour when this property is enabled as the menu will not update position with the target on scroll.
   */
  isMenuFixed?: boolean;

  /**
   * Allows the dropdown menu to be placed on the opposite side of its trigger if it does not
   * fit in the viewport.
   */
  shouldFlip?: boolean;

  /**
   * Content which will trigger the dropdown menu to open and close. Use with `triggerType`
   * to easily get a button trigger.
   */
  trigger?: string | ((triggerButtonProps: CustomTriggerProps) => ReactElement);

  /**
   * Callback to know when the menu is correctly positioned after it is opened
   */
  onPositioned?: Function;

  /**
   A `testId` prop is provided for specified elements, which is a unique
   string that appears as a data attribute `data-testid` in the rendered code,
   serving as a hook for automated tests.

   As dropdown-menu is composed of different components, we passed down the testId to the sub component you want to test:
   - `testId--trigger` to get the menu trigger.
   - `testId--content` to get the dropdown content trigger.
    */
  testId?: string;

  /**
   * Controls the initial open state of the dropdown. If provided the component is controlled
   */
  defaultOpen?: boolean;

  /**
   * Called when the menu should be open/closed. Received an object with `isOpen` state.
   */
  onOpenChange?: (args: OnOpenChangeArgs) => void;
}

export interface DropdownItemProps {
  /**
   * Primary content for the item.
   */
  children: React.ReactNode;

  /**
   * Description of the item.
   * This will render smaller text below the primary text of the item as well as slightly increasing the height of the item.
   */
  description?: string | JSX.Element;

  /**
   * Will focus to the item when it is initially mounted.
   */
  autoFocus?: boolean;

  /**
   * Makes the element appear disabled as well as removing interactivity.
   */
  isDisabled?: boolean;

  /**
   * When `true` the title of the item will wrap multiple lines if it's long enough.
   */
  shouldTitleWrap?: boolean;

  /**
   * When `true` the description of the item will wrap multiple lines if it's long enough.
   */
  shouldDescriptionWrap?: boolean;

  /**
   * Event that is triggered when the element is clicked.
   */
  onClick?: (e: MouseEvent | KeyboardEvent) => void;

  /**
   * Makes the element appear selected.
   */
  isSelected?: boolean;

  /**
   * Link to another page.
   */
  href?: string;

  /**
   * Where to display the linked URL,
   * see [anchor information](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) on mdn for more information.
   */
  target?: string;

  /**
   * Adds a title attribute to the root item element.
   */
  title?: string;

  /**
   * Element to render before the item text.
   * Generally should be an [icon](https://atlaskit.atlassian.com/packages/design-system/icon) component.
   */
  elemBefore?: React.ReactNode;

  /**
   * Element to render after the item text.
   * Generally should be an [icon](https://atlaskit.atlassian.com/packages/design-system/icon) component.
   */
  elemAfter?: React.ReactNode;
}

export interface DropdownItemCheckboxProps {
  /**
   * Primary content for the item.
   */
  children: React.ReactNode;

  /**
   * Description of the item.
   * This will render smaller text below the primary text of the item as well as slightly increasing the height of the item.
   */
  description?: string | JSX.Element;

  /**
   * Will focus to the item when it is initially mounted.
   */
  autoFocus?: boolean;

  /**
   * Makes the checkbox appear disabled as well as removing interactivity.
   */
  isDisabled?: boolean;

  /**
   * Enables the primary content passed in through `children` to wrap over multiple lines.
   */
  shouldAllowMultiline?: boolean;

  /**
   * Event that is triggered when the checkbox is clicked.
   */
  onClick?: (e: MouseEvent | KeyboardEvent) => void;

  /**
   * Sets whether the checkbox is checked or unchecked.
   */
  isSelected?: boolean;

  /**
   * Sets whether the checkbox begins selected.
   */
  defaultSelected?: boolean;

  /**
   * Unique id of a checkbox
   */
  id: string;

  /**
   * Adds a title attribute to the root item element.
   */
  title?: string;
}

export interface DropdownItemRadioProps {
  /**
   * Primary content for the item.
   */
  children: React.ReactNode;

  /**
   * Description of the item.
   * This will render smaller text below the primary text of the item as well as slightly increasing the height of the item.
   */
  description?: string | JSX.Element;

  /**
   * Will focus to the item when it is initially mounted.
   */
  autoFocus?: boolean;

  /**
   * Makes the checkbox appear disabled as well as removing interactivity.
   */
  isDisabled?: boolean;

  /**
   * Enables the primary content passed in through `children` to wrap over multiple lines.
   */
  shouldAllowMultiline?: boolean;

  /**
   * Event that is triggered when the checkbox is clicked.
   */
  onClick?: (e: MouseEvent | KeyboardEvent) => void;

  /**
   * Sets whether the checkbox is checked or unchecked.
   */
  isSelected?: boolean;

  /**
   * Sets whether the checkbox begins selected.
   */
  defaultSelected?: boolean;

  /**
   * Unique id of a checkbox
   */
  id: string;

  /**
   * Adds a title attribute to the root item element.
   */
  title?: string;
}
