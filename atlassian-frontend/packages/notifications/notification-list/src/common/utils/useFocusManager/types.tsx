import { Dispatch, RefObject } from 'react';

type RefId = string | null;

type FocusItem = {
  id: RefId;
  ref: RefObject<Element>;
  index: number;
};
export type State = {
  /** The focusItem that is currently focused or will get focus when active **/
  selectedItem: RefId;
  /** Stores the list of elements in the list that can be focused **/
  focusItems: FocusItem[];
  /** Indicates whether a focusItem has received focus and the navigation is active. **/
  active: boolean;
};

export type KeyboardAction =
  | ActionType.FirstRow
  | ActionType.LastRow
  | ActionType.NextRow
  | ActionType.PreviousRow
  | ActionType.Activate;

export type Action =
  | {
      type: ActionType.Register | ActionType.UpdateIndex;
      payload: FocusItem;
    }
  | {
      type: ActionType.Unregister | ActionType.Focus | ActionType.Blur;
      payload: RefId;
    }
  | {
      type: KeyboardAction;
      payload: null;
    };

export enum ActionType {
  Register,
  Unregister,
  UpdateIndex,
  NextRow,
  PreviousRow,
  LastRow,
  FirstRow,
  Focus,
  Activate,
  Blur,
}

export type ListFocusContext = [State, Dispatch<Action>];

export enum KeyboardEventKey {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  PageEnd = 'End',
  PageStart = 'Home',
}

export const KeyboardActionToAnalyticSubject = (
  action: KeyboardAction,
): string => {
  switch (action) {
    case ActionType.FirstRow:
      return 'FirstNotification';
    case ActionType.LastRow:
      return 'LastNotification';
    case ActionType.NextRow:
      return 'NextNotification';
    case ActionType.PreviousRow:
      return 'PreviousNotification';
    case ActionType.Activate:
      return 'Activate';
  }
};
