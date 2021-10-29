import { RefObject, useEffect } from 'react';

/**
 * Hook that takes an element and focuses it when the focused parameter is true.
 * @param ref The element to focus
 * @param focused The boolean that indicates if the element should be focused
 */
export function useFocus(ref: RefObject<HTMLElement>, focused: boolean) {
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);
}
