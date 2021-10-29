import { FiberRoot, Fiber } from 'react-reconciler';
import { Render } from './render';
import {
  handleFiberMount,
  handleFiberUnmount,
  handleFiberUpdate,
} from './operations';

export interface Commit {
  root: FiberRoot;
  renders: Set<Render>;
  previous: Commit | null;
  count: number;
  updates: number;
  mounts: number;
  unmounts: number;
  profilerTimings: {
    actualDuration: number;
    actualStartTime: number;
    selfBaseDuration: number;
    treeBaseDuration: number;
  };
}

export function create(root: FiberRoot, unmounts: Fiber[]): Commit {
  const current = root.current;
  const alternate = current.alternate;
  const renders = new Set<Render>();

  if (alternate) {
    const wasMounted =
      alternate.memoizedState != null &&
      alternate.memoizedState.element != null;
    const isMounted =
      current.memoizedState != null && current.memoizedState.element != null;

    if (!wasMounted && isMounted) {
      handleFiberMount(current, renders, true);
    } else if (wasMounted && isMounted) {
      handleFiberUpdate(current, alternate, renders);
    }
  } else {
    handleFiberMount(current, renders, true);
  }

  // unmounts come from a different event
  unmounts.forEach((fiber) => {
    handleFiberUnmount(fiber, renders);
  });

  return createCommit(root, renders);
}

const currentCommits = new Map<FiberRoot, Commit>();

function createCommit(root: FiberRoot, renders: Set<Render>): Commit {
  const { updates, mounts, unmounts } = countPhases(renders);
  const previous = currentCommits.get(root) || null;
  const fiber = root.current;
  const commit = {
    root,
    renders,
    previous,
    updates,
    mounts,
    unmounts,
    profilerTimings: {
      actualDuration: fiber.actualDuration ? fiber.actualDuration : -1,
      actualStartTime: fiber.actualStartTime ? fiber.actualStartTime : -1,
      selfBaseDuration: fiber.selfBaseDuration ? fiber.selfBaseDuration : -1,
      treeBaseDuration: fiber.treeBaseDuration ? fiber.treeBaseDuration : -1,
    },
    count: 1 + (previous ? previous.count : 0),
  };

  currentCommits.set(root, commit);

  return commit;
}

export function getCurrentCommits() {
  return currentCommits;
}

function countPhases(
  renders: Set<Render>,
): { updates: number; mounts: number; unmounts: number } {
  let updates = 0;
  let mounts = 0;
  let unmounts = 0;

  for (const render of renders) {
    switch (render.phase) {
      case 'update':
        updates++;
        break;

      case 'mount':
        mounts++;
        break;

      case 'unmount':
        unmounts++;
        break;
    }
  }

  return { updates, mounts, unmounts };
}
