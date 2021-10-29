import { useState, useEffect, useCallback } from 'react';
export function useClickOutside<TargetRef, ContainerRef>(
  targetRef,
  containerRef,
) {
  const [isOpen, setIsOpen] = useState(false);
  const memoizeHandleClickOutside = useCallback(
    function handleClickOutside({ target }) {
      if (targetRef.current && targetRef.current.contains(target)) {
        return;
      }
      if (isOpen && containerRef && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    },
    [isOpen, targetRef, containerRef],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (isOpen) {
      window.addEventListener('click', memoizeHandleClickOutside, true);
    } else {
      window.removeEventListener('click', memoizeHandleClickOutside, true);
    }
    return () =>
      window.removeEventListener('click', memoizeHandleClickOutside, true);
  }, [isOpen, memoizeHandleClickOutside]);

  return { isOpen, setIsOpen };
}
