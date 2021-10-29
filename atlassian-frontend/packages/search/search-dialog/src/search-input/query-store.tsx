export interface InputSkeletonState {
  query: string;
  placeholder: string;
  isFocused: boolean;
  selectionStart: number;
  selectionEnd: number;
  selectionDirection: 'forward' | 'backward' | 'none';
  listeners: SSREventListener[];
}

export type SSREventListener<
  TNode = Node,
  TEventName = EventName,
  TEventListener = EventListener
> = [TNode, TEventName, TEventListener];

export type EventName = keyof HTMLElementEventMap;

export type EventListener = <T extends EventName>(
  this: HTMLElement,
  ev: HTMLElementEventMap[T],
) => any;
declare global {
  interface Window {
    inputSkeletonState?: InputSkeletonState;
  }
}

interface getInputSkeletonSelection {
  selectionStart: number;
  selectionEnd: number;
  selectionDirection: 'forward' | 'backward' | 'none';
}

const getInputSkeletonQuery = (): string => {
  return window?.inputSkeletonState?.query || '';
};

const setInputSkeletonQuery = (newQuery: string): void => {
  if (window?.inputSkeletonState) {
    window.inputSkeletonState.query = newQuery;
  }
};

const getInputSkeletonFocus = (): boolean => {
  return window?.inputSkeletonState?.isFocused || false;
};

const setInputSkeletonIsFocus = (newIsFocused: boolean): void => {
  if (window?.inputSkeletonState) {
    window.inputSkeletonState.isFocused = newIsFocused;
  }
};

const getInputSkeletonSelection = (): getInputSkeletonSelection => {
  const selectionStart = window?.inputSkeletonState?.selectionStart || 0;
  const selectionEnd = window?.inputSkeletonState?.selectionEnd || 0;
  const selectionDirection =
    window?.inputSkeletonState?.selectionDirection || 'none';

  return { selectionStart, selectionEnd, selectionDirection };
};

const setInputSkeletonSelection = (
  newSelectionStart: number,
  newSelectionEnd: number,
  newSelectionDirection: 'forward' | 'backward' | 'none',
): void => {
  if (window?.inputSkeletonState) {
    window.inputSkeletonState.selectionStart = newSelectionStart;
    window.inputSkeletonState.selectionEnd = newSelectionEnd;
    window.inputSkeletonState.selectionDirection = newSelectionDirection;
  }
};

export {
  getInputSkeletonQuery,
  setInputSkeletonQuery,
  getInputSkeletonFocus,
  setInputSkeletonIsFocus,
  getInputSkeletonSelection,
  setInputSkeletonSelection,
};
