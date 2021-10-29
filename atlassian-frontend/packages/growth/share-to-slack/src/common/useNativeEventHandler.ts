import { useEffect } from 'react';

export default function useNativeEventHandler<
  TYPE extends keyof HTMLElementEventMap,
  ELEMENT extends HTMLElement
>(
  ref: React.RefObject<ELEMENT>,
  type: TYPE,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[TYPE]) => unknown,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    const element = ref.current;

    element?.addEventListener(type, listener, options);

    return () => element?.removeEventListener(type, listener, options);
  }, [listener, type, ref, options]);
}
