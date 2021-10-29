import { FiberRoot, Fiber } from 'react-reconciler';
import { Renderer } from '../types';
import { hook } from './hook';
import { DOMRendererPackageName } from '../constants';
import { create } from '../commit';

let counter = 0;
export const renderers = new Map<number, Renderer>();
const unmountedFibers = new Map<number, Fiber[]>();

export function inject(renderer: Renderer) {
  const id = ++counter;
  if (renderer.rendererPackageName === DOMRendererPackageName) {
    renderers.set(id, renderer);
  }

  return id;
}

export function onCommitFiberRoot(rendererID: number, root: FiberRoot) {
  if (renderers.has(rendererID)) {
    const unmounts = unmountedFibers.get(rendererID) || [];
    unmountedFibers.set(rendererID, []);
    hook.emit(create(root, unmounts));
  }
}

export function onCommitFiberUnmount(rendererID: number, fiber: Fiber) {
  if (renderers.has(rendererID)) {
    let unmounts = unmountedFibers.get(rendererID);
    if (typeof unmounts === 'undefined') {
      unmounts = [];
      unmountedFibers.set(rendererID, unmounts);
    }

    unmounts.push(fiber);
  }
}

export const supportsFiber = true;

export function sub() {
  return () => {};
}
