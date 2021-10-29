import { useRef } from 'react';

/**
 * Just like <code>useRef</code> except that <code>current</code> is updated with <code>value</code> on every render.
 *
 * Use this to create a ref that syncs with state so it can be used in <code>useEffect</code> without triggering
 * side effects unnecessarily.
 *
 * @param value
 */
export default function useSyncRef<V>(value: V) {
  const ref = useRef<V>(undefined!);

  ref.current = value;

  return ref;
}
