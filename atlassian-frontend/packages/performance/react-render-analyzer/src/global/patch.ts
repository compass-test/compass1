import { Fiber } from 'react-reconciler';
import { hook } from './hook';
import { ReactGlobalHook, Renderer } from '../types';
import { DOMRendererPackageName } from '../constants';
import { create } from '../commit';

export function patch(reactHook: ReactGlobalHook) {
  if (hook.patched) {
    return;
  }

  const renderers = new Set<number>();
  const unmountedFibers = new Map<number, Fiber[]>();

  // find the dom renderer from the devtools hook
  for (const [id, renderer] of reactHook.renderers) {
    if (renderer.rendererPackageName === DOMRendererPackageName) {
      renderers.add(id);
    }
  }

  // future dom renderers
  reactHook.sub<{ id: number; renderer: Renderer }>(
    'renderer',
    ({ id, renderer }) => {
      if (renderer.rendererPackageName === DOMRendererPackageName) {
        renderers.add(id);
      }
    },
  );

  // Overwrite the `onCommitFiberRoot` so we can signal when React has
  // committed a root Fiber.
  const originalOnCommitFiberRoot = reactHook.onCommitFiberRoot;
  reactHook.onCommitFiberRoot = function onCommitFiberRoot(
    rendererID,
    root,
    priority,
    error,
  ) {
    if (renderers.has(rendererID)) {
      const unmounts = unmountedFibers.get(rendererID) || [];
      unmountedFibers.set(rendererID, []);

      hook.emit(create(root, unmounts));
    }

    return originalOnCommitFiberRoot(rendererID, root, priority, error);
  };

  // Overwrite the `onCommitFiberUnmount` so we can signal when a specific
  // node has been removed (unmounted).
  const originalOnCommitFiberUnmount = reactHook.onCommitFiberUnmount;
  reactHook.onCommitFiberUnmount = function onCommitFiberUnmount(
    rendererID,
    fiber,
  ) {
    if (renderers.has(rendererID)) {
      let unmounts = unmountedFibers.get(rendererID);
      if (typeof unmounts === 'undefined') {
        unmounts = [];
        unmountedFibers.set(rendererID, unmounts);
      }

      unmounts.push(fiber);
    }

    return originalOnCommitFiberUnmount(rendererID, fiber);
  };

  hook.patched = true;
}
