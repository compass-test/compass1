import React, { useContext, useEffect, useCallback } from 'react';

type OnHighlightChanged = (isHighlighted: boolean) => void;
type OnKeyDown = (e: KeyboardEvent, target: HTMLElement) => void;
export type RegisterKeyboardEnabled<U extends HTMLElement> = (
  currentId: number | null,
  domRef: U,
  onHighlightChanged: OnHighlightChanged,
  onKeyDownWhenHighlighted: OnKeyDown | undefined,
) => number;

interface KeyboardContextProps<U extends HTMLElement = HTMLElement> {
  registerKeyboardEnabled?: RegisterKeyboardEnabled<U>;
  unregisterKeyboardEnabled?: (ref: number) => void;
}

export const KeyboardHighlightContext = React.createContext<
  KeyboardContextProps
>({
  registerKeyboardEnabled: undefined,
  unregisterKeyboardEnabled: undefined,
});

export interface KeyboardNavigationHookOptions {
  onKeydownCallback: OnKeyDown;
}

export const useKeyboardNavigation = <U extends HTMLElement>(
  options?: KeyboardNavigationHookOptions,
): [boolean, (ref: U) => void] => {
  const [ref, setRef] = React.useState<U | null>(null);
  const registrationId = React.useRef<number | null>(null);
  const { registerKeyboardEnabled, unregisterKeyboardEnabled } = useContext(
    KeyboardHighlightContext,
  );
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const onKeydownCallback = options?.onKeydownCallback;

  const unregister = useCallback(() => {
    if (registrationId.current && unregisterKeyboardEnabled) {
      // If the ref got removed or changed we unregister the current ref
      unregisterKeyboardEnabled(registrationId.current);
    }
  }, [unregisterKeyboardEnabled]);

  // Will unmount effect
  useEffect(() => () => unregister(), [unregister]);

  // Ref change to null
  useEffect(() => {
    !ref && unregister();
  }, [ref, unregister]);

  // Everything else
  useEffect(() => {
    if (!registerKeyboardEnabled || !unregisterKeyboardEnabled) {
      return;
    }

    if (!ref) {
      return;
    }

    // Then we register the new ref
    if (ref) {
      // Another check here to ensure that the ref we get is actually a DOM node, there's probably better
      // ways to make this check but it doesn't matter too much.
      // If what we get is NOT a DOM node we will log a warning and default back to use React.findDOMNode
      if (
        !ref.compareDocumentPosition ||
        !ref.addEventListener ||
        !ref.removeEventListener
      ) {
        // eslint-disable-next-line
        console.error(
          'It is expected that any keyboard highlighting enabled component also passes the ref all the way to the DOM node.',
          'It appears that the `ref` is not fowarded all the way to the DOM node, please use `React.forwardRef to ensure this is so`',
          'Falling back to using ReactDOM.findDOMNode, this is not recommended and this fallback may be removed in the future',
        );

        return;
      }

      registrationId.current = registerKeyboardEnabled(
        registrationId.current,
        ref,
        setIsHighlighted,
        onKeydownCallback,
      );
    }
  }, [
    ref,
    setIsHighlighted,
    onKeydownCallback,
    registerKeyboardEnabled,
    unregisterKeyboardEnabled,
  ]);

  return [isHighlighted, setRef];
};

export interface KeyboardHighlightProviderProps {
  listenerNode: HTMLElement | undefined | null;
}

export class KeyboardHighlightProvider extends React.Component<
  KeyboardHighlightProviderProps
> {
  private currentlySelected: number | undefined = undefined;

  private keyboardNavComponents: {
    id: number;
    domRef: HTMLElement;
    onHighlightChanged: OnHighlightChanged;
    onKeyDownWhenHighlighted: OnKeyDown | undefined;
  }[] = [];

  private registerKeyboardEnabled = (
    currentId: number | null,
    domRef: HTMLElement,
    onHighlightChanged: OnHighlightChanged,
    onKeyDownWhenHighlighted: OnKeyDown | undefined,
  ) => {
    const indexAt = this.keyboardNavComponents.findIndex(
      ({ id }) => id === currentId,
    );
    // If the currentId is null or we can't find any records of the id we will create a new entry
    const isNew: boolean =
      currentId === null || currentId === undefined || indexAt === -1;
    const id: number = isNew
      ? Math.max(
          ...this.keyboardNavComponents.map((component) => component.id),
          0,
        ) + 1
      : this.keyboardNavComponents[indexAt].id;

    if (isNew) {
      this.keyboardNavComponents.push({
        id,
        domRef,
        onHighlightChanged,
        onKeyDownWhenHighlighted,
      });
    } else {
      // Otherwise we will update the current entry
      this.keyboardNavComponents[indexAt] = {
        id,
        domRef,
        onHighlightChanged,
        onKeyDownWhenHighlighted,
      };
    }

    this.keyboardNavComponents = this.keyboardNavComponents.sort((c1, c2) => {
      const result = c1.domRef.compareDocumentPosition(c2.domRef);
      if (
        result & Node.DOCUMENT_POSITION_FOLLOWING ||
        result & Node.DOCUMENT_POSITION_CONTAINED_BY
      ) {
        return -1;
      } else if (
        result & Node.DOCUMENT_POSITION_PRECEDING ||
        result & Node.DOCUMENT_POSITION_CONTAINS
      ) {
        return 1;
      }

      return 0;
    });

    return id;
  };

  private unregisterKeyboardEnabled = (unregisterRef: number) => {
    if (this.currentlySelected === unregisterRef) {
      this.currentlySelected = undefined;
    }

    this.keyboardNavComponents = this.keyboardNavComponents.filter(
      ({ id: ref }) => ref !== unregisterRef,
    );
  };

  onKeyDownCallbackAt = (index: number | undefined, e: KeyboardEvent) => {
    if (
      typeof index !== 'undefined' &&
      index >= 0 &&
      index < this.keyboardNavComponents.length
    ) {
      const onKeyDown = this.keyboardNavComponents[index]
        .onKeyDownWhenHighlighted;
      onKeyDown && onKeyDown(e, this.keyboardNavComponents[index].domRef);
    }
  };

  unhighlightComponentAt = (index: number | undefined) => {
    if (
      typeof index !== 'undefined' &&
      index >= 0 &&
      index < this.keyboardNavComponents.length
    ) {
      this.keyboardNavComponents[index].onHighlightChanged(false);
    }
  };

  highlightComponentAt = (index: number) => {
    if (index >= 0 && index < this.keyboardNavComponents.length) {
      this.currentlySelected = this.keyboardNavComponents[index].id;
      this.keyboardNavComponents[index].onHighlightChanged(true);
    }
  };

  getSelectedIndex = () => {
    if (!this.currentlySelected) {
      return undefined;
    }

    return this.keyboardNavComponents.findIndex(
      ({ id }) => id === this.currentlySelected,
    );
  };

  onKeyDown = (e: KeyboardEvent) => {
    if (this.keyboardNavComponents.length === 0) {
      return;
    }

    if (e.isComposing || e.keyCode === 229) {
      return;
    }

    let currentIndex = this.getSelectedIndex();
    const prevIndex = currentIndex;

    if (e.code === 'ArrowDown' || e.keyCode === 40) {
      if (!e.shiftKey) {
        if (typeof currentIndex === 'undefined') {
          currentIndex = 0;
        } else {
          currentIndex = (currentIndex + 1) % this.keyboardNavComponents.length;
        }
        e.preventDefault();
      }
    } else if (e.code === 'ArrowUp' || e.keyCode === 38) {
      if (!e.shiftKey) {
        if (typeof currentIndex === 'undefined') {
          currentIndex = this.keyboardNavComponents.length - 1;
        } else {
          currentIndex -= 1;

          if (currentIndex < 0) {
            currentIndex =
              this.keyboardNavComponents.length - Math.abs(currentIndex);
          }
        }
        e.preventDefault();
      }
    } else {
      if (typeof currentIndex !== 'undefined') {
        this.onKeyDownCallbackAt(currentIndex, e);
      }
      return;
    }

    if (prevIndex !== currentIndex && currentIndex !== undefined) {
      this.unhighlightComponentAt(prevIndex);
      this.highlightComponentAt(currentIndex);
    }
  };

  attach = (listenerNode: HTMLElement | undefined | null) => {
    if (listenerNode) {
      listenerNode.addEventListener('keydown', this.onKeyDown);
    }
  };

  detach = (listenerNode: HTMLElement | undefined | null) => {
    if (listenerNode) {
      listenerNode.removeEventListener('keydown', this.onKeyDown);
    }
  };

  componentDidMount() {
    this.attach(this.props.listenerNode);
  }

  componentDidUpdate(prevProps: KeyboardHighlightProviderProps) {
    if (prevProps.listenerNode !== this.props.listenerNode) {
      this.detach(prevProps.listenerNode);
      this.attach(this.props.listenerNode);
    }
  }

  componentWillUnmount() {
    this.detach(this.props.listenerNode);
  }

  render() {
    return (
      <KeyboardHighlightContext.Provider
        value={{
          registerKeyboardEnabled: this.registerKeyboardEnabled,
          unregisterKeyboardEnabled: this.unregisterKeyboardEnabled,
        }}
      >
        {this.props.children}
      </KeyboardHighlightContext.Provider>
    );
  }
}
