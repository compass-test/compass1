import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  Action,
  ActionType,
  KeyboardAction,
  KeyboardEventKey,
  ListFocusContext,
  State,
} from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    // Registers an element to be tracked in the state
    case ActionType.Register: {
      const itemToRegister = action.payload;

      if (state.focusItems.some((item) => item.id === itemToRegister.id)) {
        return state;
      }

      const items = state.focusItems.slice();
      items.splice(itemToRegister.index, 0, itemToRegister);

      return {
        ...state,
        focusItems: items,
        selectedItem:
          state.selectedItem === null ? itemToRegister.id : state.selectedItem,
      };
    }

    // Remove element from state if they are no longer rendered in the list.
    case ActionType.Unregister: {
      const id = action.payload;

      const itemIndex = state.focusItems.findIndex(
        (item) => item.id === state.selectedItem,
      );

      const newItems = state.focusItems.filter((item) => item.id !== id);

      if (newItems.length === 0) {
        return {
          selectedItem: null,
          focusItems: [],
          active: false,
        };
      }

      // Unregister should occur when an element is no longer visible
      // If its the current item, selected should move to the next item.
      const isCurrentStop = id === state.selectedItem;
      let { selectedItem } = state;

      // If the item removed was last in the list -> apply focus to new last
      if (newItems.length === itemIndex) {
        selectedItem = newItems[newItems.length - 1]?.id;
      }
      // If the removed element was currently the selected element, new selected is next item
      else if (isCurrentStop) {
        selectedItem = newItems[itemIndex]?.id;
      }

      return {
        ...state,
        focusItems: newItems,
        selectedItem,
      };
    }

    // Position of items should be updated if their tab index changes.
    // For example, if an notification is marked as read and the unread filter is on.
    case ActionType.UpdateIndex: {
      const itemToUpdate = action.payload;
      const oldIndex = state.focusItems.findIndex(
        (item) => item.id === itemToUpdate.id,
      );

      if (
        oldIndex === -1 ||
        state.focusItems[oldIndex].index === itemToUpdate.index
      ) {
        return state;
      }

      const items = state.focusItems.slice();
      // The element will be in the correct position because items
      // are inserted in the correct order. Replace with the latest index.
      items[oldIndex] = itemToUpdate;

      return {
        ...state,
        focusItems: items,
      };
    }

    // Go to the next focusable list element.
    // If the current item is the last in the list, wrap to the start of the list.
    case ActionType.NextRow: {
      const index = state.focusItems.findIndex(
        (item) => item.id === state.selectedItem,
      );

      if (index === -1) {
        return state;
      }

      return {
        ...state,
        selectedItem:
          state.focusItems[(index + 1) % state.focusItems.length]?.id,
      };
    }

    // Go to the previous focusable list element.
    // If the current item is the first in the list, wrap to the end of the list.
    case ActionType.PreviousRow: {
      const index = state.focusItems.findIndex(
        (item) => item.id === state.selectedItem,
      );

      if (index === -1) {
        return state;
      }

      return {
        ...state,
        selectedItem:
          state.focusItems[
            (index - 1 + state.focusItems.length) % state.focusItems.length
          ]?.id,
      };
    }

    // Focus the last available element
    case ActionType.LastRow: {
      if (state.focusItems.length === 0) {
        return {
          ...state,
          selectedItem: null,
          active: false,
        };
      }

      return {
        ...state,
        selectedItem: state.focusItems[state.focusItems.length - 1]?.id,
      };
    }

    // Focus the first available element
    case ActionType.FirstRow: {
      if (state.focusItems.length === 0) {
        return {
          ...state,
          selectedItem: null,
          active: false,
        };
      }

      return {
        ...state,
        selectedItem: state.focusItems[0]?.id,
      };
    }

    // Activate manually focuses the first element available
    case ActionType.Activate: {
      if (state.focusItems.length === 0) {
        return state;
      }

      return {
        ...state,
        selectedItem: state.focusItems[0]?.id,
        active: true,
      };
    }

    // Notifications can be focused throught 'Tab' and should update selectedItem
    // when this happens.
    case ActionType.Focus: {
      const index = state.focusItems.findIndex(
        (item) => item.id === action.payload,
      );

      if (index === -1) {
        return state;
      }

      return {
        ...state,
        selectedItem: action.payload,
        active: true,
      };
    }

    // Blur is triggered when a notification is blurred. These action come after
    // other navigation actions (such as NextRow/PreviousRow). If a notification is blurred
    // through some other way (such as tabbing within a notification, or a click), then the state should be reset.
    case ActionType.Blur: {
      if (action.payload !== state.selectedItem) {
        return state;
      }

      return {
        ...state,
        selectedItem: null,
        active: false,
      };
    }
  }
}

export const keyboardEventToAction = (
  event: React.KeyboardEvent<HTMLElement>,
): KeyboardAction | undefined => {
  switch (event.key) {
    case KeyboardEventKey.ArrowDown: {
      // Stop propagation to stop event propagating to document
      // keydown handler and applying focus to first element.
      event.nativeEvent.stopImmediatePropagation();
      return event.shiftKey ? ActionType.LastRow : ActionType.NextRow;
    }
    case KeyboardEventKey.ArrowUp: {
      return event.shiftKey ? ActionType.FirstRow : ActionType.PreviousRow;
    }
    default:
      return undefined;
  }
};

/**
 * Component that attaches a keydown handler to the document.
 * Watches for ArrowDown keydown events and trigger activates keyboard navigation.
 */
export function FocusActivator({ children }: { children: ReactNode }) {
  const [, dispatch] = useListFocusProvider();

  const keydownListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KeyboardEventKey.ArrowDown) {
        event.preventDefault(); // stop scroll for initial activation
        dispatch({
          type: ActionType.Activate,
          payload: null,
        });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydownListener);
    return () => document.removeEventListener('keydown', keydownListener);
  }, [keydownListener]);

  return <>{children}</>;
}

export function useFocusManager(ref: React.RefObject<Element>, index: number) {
  const [state, dispatch] = useListFocusProvider();
  const idRef = useRef<string | null>(null);

  function getId() {
    if (!idRef.current) {
      idRef.current = uuidv4();
    }
    return idRef.current;
  }

  useEffect(() => {
    dispatch({
      type: ActionType.Register,
      payload: {
        id: getId(),
        ref,
        index,
      },
    });

    return () => {
      dispatch({
        type: ActionType.Unregister,
        payload: getId(),
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({
      type: ActionType.UpdateIndex,
      payload: {
        id: getId(),
        ref,
        index,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const type = keyboardEventToAction(event);
      if (type !== undefined) {
        dispatch({
          type,
          payload: null,
        });
      }
    },
    [dispatch],
  );

  // If an element becomes focused through hitting 'Tab' make sure the selectId is updated.
  const handleOnFocus = useCallback(() => {
    dispatch({
      type: ActionType.Focus,
      payload: getId(),
    });
  }, [dispatch]);

  const handleOnBlur = useCallback(() => {
    dispatch({
      type: ActionType.Blur,
      payload: getId(),
    });
  }, [dispatch]);

  return {
    focused: state.selectedItem === getId() && state.active,
    handleKeydown,
    handleOnFocus,
    handleOnBlur,
  };
}

const INITIAL_STATE: State = {
  selectedItem: null,
  focusItems: [],
  active: false,
};

export const ListFocusStateContext = createContext<ListFocusContext>([
  INITIAL_STATE,
  () => {},
]);

function useListFocusProvider() {
  return useContext(ListFocusStateContext);
}

type ProviderProps = {
  children: ReactNode;
  isEnabled: boolean;
};

export const ListFocusProvider = ({ children, isEnabled }: ProviderProps) => {
  const context = useReducer(reducer, INITIAL_STATE);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <ListFocusStateContext.Provider value={context}>
      <FocusActivator>{children}</FocusActivator>
    </ListFocusStateContext.Provider>
  );
};
