import { useCallback, useReducer } from 'react';

import {
  Action,
  HandleConfirm,
  InlineEditReducer,
  State,
  Value,
} from './types';

const initialState: State = {
  editedValue: undefined,
  isLoading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    // We hold the "edited" value temporarily while things load, and also
    // revert to it if there's an error so that content isn't lost.
    case 'confirmRequest':
      return { editedValue: action.value, isLoading: true };

    // Clear the edited value if everything was successful
    case 'confirmSuccess':
      return { editedValue: undefined, isLoading: false };

    // Don't clear the edited value if there was an error
    // This allows the user to click back in to the inline edit and try again
    case 'confirmFailure':
      return { ...state, isLoading: false };

    case 'cancel':
      return { ...state, editedValue: undefined };

    default:
      throw new Error();
  }
}

/**
 * This hook is a convenience function for handling state when working with inline editing.
 *
 * The hook accepts 2 arguments
 *  - value: The current value of the inline field.
 *  - onConfirm: A function we can call with a new value for the field that will perform a mutation.
 *
 *  onConfirm is expected to accept a newValue, and return a promise.
 *  It's important you ensure your callback re-throws any errors is catches
 *  so that useInlineEdit knows that it failed.
 *
 *  Example:
 *
 *  const handleConfirm = useCallback(
 *    (name: string) => return mutate({ name })
 *      .catch((error) => {
 *        showFlag(...);
 *        throw error; // Re-throw the error so that useInlineEdit knows it failed
 *      }),
 *    [mutate, showFlag],
 *  );
 *
 *  const { isLoading, readValue, editValue, cancel, confirm } = useInlineEdit(
 *    componentName,
 *    handleConfirm,
 *  );
 *
 *  // Use readValue in the read-view of the inline edit
 *  // Use editValue in the edit-view
 *  // Use cancel in the onCancel callback
 *  // Use confirm in the onConfirm callback
 *  // Use isLoading however you like :)
 */
export function useInlineEdit(value: Value, onConfirm: HandleConfirm) {
  // Since the editedValue and isLoading frequently change together, it's
  // better to use a reducer here so that we can minimise renders.
  // useReducer also guarantees a stable dispatch function.
  const [{ editedValue, isLoading }, dispatch] = useReducer<InlineEditReducer>(
    reducer,
    initialState,
  );

  const confirm = useCallback(
    (newValue: string) => {
      dispatch({ type: 'confirmRequest', value: newValue });

      Promise.resolve(onConfirm(newValue))
        .then(() => dispatch({ type: 'confirmSuccess' }))
        .catch(() => dispatch({ type: 'confirmFailure' }));
    },
    [onConfirm],
  );

  const cancel = useCallback(() => dispatch({ type: 'cancel' }), []);

  // If we have an editValue, display that in the edit view,
  // otherwise show the real value.
  const editValue = typeof editedValue === 'string' ? editedValue : value;

  // Show the editValue while we're loading so that the UI doesn't flicker.
  // This is redundant with optimistic UI, but there's no harm in keeping it
  // in case some components need it.
  const readValue = isLoading ? editValue : value;

  return {
    isLoading,
    editValue,
    readValue,
    confirm,
    cancel,
  };
}
