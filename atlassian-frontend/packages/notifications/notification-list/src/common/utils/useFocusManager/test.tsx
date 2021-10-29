import { RefObject } from 'react';

import { Action, ActionType, State } from './types';

import { reducer } from './index';

function mockRef() {
  return {} as RefObject<Element>;
}

describe('useFocusManager() reducer', () => {
  describe('ActionType.Register', () => {
    test('should correctly register a focus item when the state is empty', () => {
      const state: State = {
        focusItems: [],
        selectedItem: null,
        active: false,
      };

      const action: Action = {
        type: ActionType.Register,
        payload: {
          id: '1',
          ref: mockRef(),
          index: 0,
        },
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(1);
      expect(result.focusItems[0].id).toBe('1');
      expect(result.selectedItem).toBe('1');
      expect(result.active).toBe(false);
    });

    test('should correctly register a focus item at the end based on its index', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.Register,
        payload: {
          id: '2',
          ref: mockRef(),
          index: 1,
        },
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.focusItems[0].id).toBe('1');
      expect(result.focusItems[1].id).toBe('2');
      expect(result.selectedItem).toBe('1');
      expect(result.active).toBe(false);
    });

    test('should correctly register a focus item at the start based on its index', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0, // There would be an update action for this index to be updated later
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.Register,
        payload: {
          id: '2',
          ref: mockRef(),
          index: 0,
        },
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.focusItems[0].id).toBe('2');
      expect(result.focusItems[1].id).toBe('1');
      expect(result.selectedItem).toBe('1');
      expect(result.active).toBe(false);
    });

    test('should do nothing if the item is already registered', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0, // There would be an update action for this index to be updated later
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.Register,
        payload: state.focusItems[0],
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(1);
      expect(result.focusItems[0].id).toBe('1');
      expect(result.selectedItem).toBe('1');
      expect(result.active).toBe(false);
    });
  });

  describe('ActionType.Unregister', () => {
    test('should remove the element from the state', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.Unregister,
        payload: '2',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(1);
      expect(result.selectedItem).toBe('1');
      expect(result.active).toBe(false);
    });

    test('should reset the state if there is no items left', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.Unregister,
        payload: '1',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(0);
      expect(result.selectedItem).toBe(null);
      expect(result.active).toBe(false);
    });

    test('should do nothing if the item doesnt exist', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.Unregister,
        payload: '3',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('1');
    });

    test('should set selectItem to the next element if the removed element was selected', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '2',
        active: false,
      };

      const action: Action = {
        type: ActionType.Unregister,
        payload: '2',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('3');
    });

    test('should set selectItem to the last element if the removed element was last', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '2',
        active: false,
      };

      const action: Action = {
        type: ActionType.Unregister,
        payload: '3',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('2');
    });
  });

  describe('ActionType.UpdateIndex', () => {
    test('should do nothing if the item does not exist in state', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.UpdateIndex,
        payload: {
          id: '2',
          ref: mockRef(),
          index: 1,
        },
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(1);
      expect(result.focusItems[0].index).toBe(0);
      expect(result.selectedItem).toBe('1');
    });

    test('should do nothing if the item index is the same as whats currently in state', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.UpdateIndex,
        payload: {
          id: '1',
          ref: mockRef(),
          index: 0,
        },
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(1);
      expect(result.focusItems[0].index).toBe(0);
      expect(result.selectedItem).toBe('1');
    });

    test('should correctly update the index when item exists in state', () => {
      const state: State = {
        focusItems: [
          {
            id: '2',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
        ],
        selectedItem: '1',
        active: false,
      };

      const action: Action = {
        type: ActionType.UpdateIndex,
        payload: {
          id: '1',
          ref: mockRef(),
          index: 1,
        },
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.focusItems[0].index).toBe(0);
      expect(result.focusItems[0].id).toBe('2');
      expect(result.focusItems[1].index).toBe(1);
      expect(result.focusItems[1].id).toBe('1');
      expect(result.selectedItem).toBe('1');
    });
  });

  describe('ActionType.NextRow', () => {
    test('should do nothing if the current select element doesnt exist', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: '0', // doesnt exist
        active: true,
      };

      const action: Action = {
        type: ActionType.NextRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('0');
    });

    test('should select the next element', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: '1',
        active: true,
      };

      const action: Action = {
        type: ActionType.NextRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('2');
    });

    test('should wrap selected to the top of the list', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '3',
        active: true,
      };

      const action: Action = {
        type: ActionType.NextRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('1');
    });
  });

  describe('ActionType.PreviousRow', () => {
    test('should do nothing if the element doesnt exist', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: '0', // doesnt exist
        active: true,
      };

      const action: Action = {
        type: ActionType.PreviousRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('0');
    });

    test('should select the previous element', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: '2',
        active: true,
      };

      const action: Action = {
        type: ActionType.PreviousRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe('1');
    });

    test('should wrap selected to the bottom of the list', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '1',
        active: true,
      };

      const action: Action = {
        type: ActionType.PreviousRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('3');
    });
  });

  describe('ActionType.LastRow', () => {
    test('should reset state if there are no elements', () => {
      const state: State = {
        focusItems: [],
        selectedItem: '1',
        active: true,
      };

      const action: Action = {
        type: ActionType.LastRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(0);
      expect(result.selectedItem).toBe(null);
      expect(result.active).toBe(false);
    });

    test('should select the last element', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '1',
        active: true,
      };

      const action: Action = {
        type: ActionType.LastRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('3');
    });
  });

  describe('ActionType.FirstRow', () => {
    test('should do nothing if the element doesnt exist', () => {
      const state: State = {
        focusItems: [],
        selectedItem: '1',
        active: true,
      };

      const action: Action = {
        type: ActionType.FirstRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(0);
      expect(result.selectedItem).toBe(null);
      expect(result.active).toBe(false);
    });

    test('should select the first element', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '3',
        active: true,
      };

      const action: Action = {
        type: ActionType.FirstRow,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('1');
    });
  });

  describe('ActionType.Focus', () => {
    test('should set selectedItem to the focused element', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: null,
        active: false,
      };

      const action: Action = {
        type: ActionType.Focus,
        payload: '3',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('3');
      expect(result.active).toBe(true);
    });

    test('should do nothing if the element doesnt exist', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
        ],
        selectedItem: null,
        active: false,
      };

      const action: Action = {
        type: ActionType.Focus,
        payload: '3',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(2);
      expect(result.selectedItem).toBe(null);
      expect(result.active).toBe(false);
    });
  });

  describe('ActionType.Blur', () => {
    test('should do nothing if the blurred item is not the selected item', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '2',
        active: true,
      };

      const action: Action = {
        type: ActionType.Blur,
        payload: '1',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('2');
      expect(result.active).toBe(true);
    });

    test('should reset the state if the blurred item is the active item', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: '1',
        active: true,
      };

      const action: Action = {
        type: ActionType.Blur,
        payload: '1',
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe(null);
      expect(result.active).toBe(false);
    });
  });

  describe('ActionType.Activate', () => {
    test('should set selectedItem to the first element', () => {
      const state: State = {
        focusItems: [
          {
            id: '1',
            ref: mockRef(),
            index: 0,
          },
          {
            id: '2',
            ref: mockRef(),
            index: 1,
          },
          {
            id: '3',
            ref: mockRef(),
            index: 2,
          },
        ],
        selectedItem: null,
        active: false,
      };

      const action: Action = {
        type: ActionType.Activate,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(3);
      expect(result.selectedItem).toBe('1');
      expect(result.active).toBe(true);
    });

    test('should do nothing if there are no items', () => {
      const state: State = {
        focusItems: [],
        selectedItem: null,
        active: false,
      };

      const action: Action = {
        type: ActionType.Activate,
        payload: null,
      };

      const result = reducer(state, action);

      expect(result.focusItems.length).toBe(0);
      expect(result.selectedItem).toBe(null);
      expect(result.active).toBe(false);
    });
  });
});
