// eslint-disable compat/compat

type Callback = (arg: any) => void;

export function runItLater(cb: Callback) {
  if ((window as any).requestIdleCallback === 'function') {
    return (window as any).requestIdleCallback(cb);
  }

  if (typeof window.requestAnimationFrame === 'function') {
    return window.requestAnimationFrame(cb);
  }

  return () => setTimeout(cb);
}
