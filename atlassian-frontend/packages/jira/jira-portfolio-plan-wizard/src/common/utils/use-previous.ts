import { useEffect, useRef } from 'react';

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
export default function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
