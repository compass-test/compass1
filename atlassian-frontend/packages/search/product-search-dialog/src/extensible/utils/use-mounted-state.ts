import { useCallback, useEffect, useRef } from 'react';

export default (): (() => boolean) => {
  const mountedRef = useRef<boolean>(false);

  // Track if a component is mounted or not.
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Changes in ref values don't cause re renders. So evaluate this inside a CB so that hooks that use this can reliably update themselves.
  return useCallback(() => mountedRef.current, []);
};
