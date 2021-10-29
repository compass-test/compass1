import { useLayoutEffect } from 'react';

export function useTTR() {
  useLayoutEffect(() => {
    const rafId = requestAnimationFrame(() => {
      // eslint-disable-next-line compat/compat
      performance.mark(`TTR::end`);
      // eslint-disable-next-line compat/compat
      performance.measure('TTR', 'all-metrics-start', `TTR::end`);
      // eslint-disable-next-line compat/compat
      performance.clearMarks('TTR::end');
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);
}
