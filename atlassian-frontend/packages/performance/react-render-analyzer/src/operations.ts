import { Fiber } from 'react-reconciler';
import { setPrimaryFiber } from './fiber';
import {
  ClassComponent,
  ContextConsumer,
  FunctionComponent,
  MemoComponent,
  PerformedWork,
  SimpleMemoComponent,
  SuspenseComponent,
} from './constants';
import { createRender, Render } from './render';

/**
 * !!! WARNING !!!!
 *
 * After here is code that has been copied and simplified from React Dev Tools.
 * It handles the traversing of the RootFiber, looking for mounts, updates and
 * unmounts. The reason why it is copied is due to the lack of domain knowledge
 * around suspense components. A standard fiber traverse did not work in previous
 * attempts so resulted in copying and simplifying for our needs.
 *
 */

// BEGIN COPY & SIMPLIFY //////////////////////////////////////////////////////

function didFiberUpdate(fiber: Fiber, alternate: Fiber): boolean {
  switch (fiber.tag) {
    // user components
    case ClassComponent:
    case FunctionComponent:
    case ContextConsumer:
    case MemoComponent:
    case SimpleMemoComponent:
      // check the effectTag to see if React performed any work
      return (fiber.effectTag & PerformedWork) === PerformedWork;

    // host and other components
    default:
      return (
        alternate !== null &&
        (alternate.memoizedProps !== fiber.memoizedProps ||
          alternate.memoizedState !== fiber.memoizedState ||
          alternate.ref !== fiber.ref)
      );
  }
}

export function handleFiberMount(
  fiber: Fiber,
  renders: Set<Render>,
  traverseSiblings: boolean,
) {
  setPrimaryFiber(fiber);
  renders.add(createRender(fiber, 'mount'));

  if (fiber.tag === SuspenseComponent) {
    // For lack of suspense knowledge the following was copied and simplified from React Devtools
    const isTimedOut = fiber.memoizedState !== null;
    if (isTimedOut) {
      const primaryChildFragment = fiber.child;
      const fallbackChildFragment = primaryChildFragment
        ? primaryChildFragment.sibling
        : null;
      const fallbackChild = fallbackChildFragment
        ? fallbackChildFragment.child
        : null;
      if (fallbackChild !== null) {
        handleFiberMount(fallbackChild, renders, true);
      }
    } else {
      const primaryChild: Fiber | null = fiber.child;
      if (primaryChild !== null) {
        handleFiberMount(primaryChild, renders, true);
      }
    }
  } else {
    if (fiber.child !== null) {
      handleFiberMount(fiber.child, renders, true);
    }
  }

  if (traverseSiblings && fiber.sibling !== null) {
    handleFiberMount(fiber.sibling, renders, true);
  }
}

export function handleFiberUnmount(fiber: Fiber, renders: Set<Render>) {
  renders.add(createRender(fiber, 'unmount'));
}

export function handleFiberUpdate(
  fiber: Fiber,
  alternate: Fiber,
  renders: Set<Render>,
): boolean {
  // debugger;
  // For lack of suspense knowledge the following was copied and simplified from React Devtools
  const isSuspense = fiber.tag === SuspenseComponent;
  let shouldResetChildren = false;

  const prevDidTimeout = isSuspense && alternate.memoizedState !== null;
  const nextDidTimeOut = isSuspense && fiber.memoizedState !== null;

  if (prevDidTimeout && nextDidTimeOut) {
    // Fallback -> Fallback:
    // 1. Reconcile fallback set.
    const nextFiberChild = fiber.child;
    const nextFallbackChildSet = nextFiberChild ? nextFiberChild.sibling : null;
    // Note: We can't use nextFiber.child.sibling.alternate
    // because the set is special and alternate may not exist.
    const prevFiberChild = alternate.child;
    const prevFallbackChildSet = prevFiberChild ? prevFiberChild.sibling : null;
    if (
      nextFallbackChildSet != null &&
      prevFallbackChildSet != null &&
      handleFiberUpdate(nextFallbackChildSet, prevFallbackChildSet, renders)
    ) {
      shouldResetChildren = true;
    }
  } else if (prevDidTimeout && !nextDidTimeOut) {
    // Fallback -> Primary:
    // 1. Unmount fallback set
    // Note: don't emulate fallback unmount because React actually did it.
    // 2. Mount primary set
    const nextPrimaryChildSet = fiber.child;
    if (nextPrimaryChildSet !== null) {
      handleFiberMount(nextPrimaryChildSet, renders, true);
    }
    shouldResetChildren = true;
  } else if (!prevDidTimeout && nextDidTimeOut) {
    // Primary -> Fallback:
    // 1. Hide primary set
    // This is not a real unmount, so it won't get reported by React.
    // We need to manually walk the previous tree and record unmounts.
    handleSuspenseFiberUnmounts(alternate, renders);
    // 2. Mount fallback set
    const nextFiberChild = fiber.child;
    const nextFallbackChildSet = nextFiberChild ? nextFiberChild.sibling : null;
    if (nextFallbackChildSet != null) {
      handleFiberMount(nextFallbackChildSet, renders, true);
      shouldResetChildren = true;
    }
  } else {
    // Common case: Primary -> Primary.
    // This is the same code path as for non-Suspense fibers.
    if (fiber.child !== alternate.child) {
      // If the first child is different, we need to traverse them.
      // Each next child will be either a new child (mount) or an alternate (update).
      let nextChild = fiber.child;
      let prevChildAtSameIndex = alternate.child;
      while (nextChild) {
        // We already know children will be referentially different because
        // they are either new mounts or alternates of previous children.
        // Schedule updates and mounts depending on whether alternates exist.
        // We don't track deletions here because they are reported separately.
        if (nextChild.alternate) {
          const prevChild = nextChild.alternate;
          if (handleFiberUpdate(nextChild, prevChild, renders)) {
            // If a nested tree child order changed but it can't handle its own
            // child order invalidation (e.g. because it's filtered out like host nodes),
            // propagate the need to reset child order upwards to this Fiber.
            shouldResetChildren = true;
          }
          // However we also keep track if the order of the children matches
          // the previous order. They are always different referentially, but
          // if the instances line up conceptually we'll want to know that.
          if (prevChild !== prevChildAtSameIndex) {
            shouldResetChildren = true;
          }
        } else {
          handleFiberMount(nextChild, renders, false);
          shouldResetChildren = true;
        }
        // Try the next child.
        nextChild = nextChild.sibling;
        // Advance the pointer in the previous list so that we can
        // keep comparing if they line up.
        if (!shouldResetChildren && prevChildAtSameIndex !== null) {
          prevChildAtSameIndex = prevChildAtSameIndex.sibling;
        }
      }
      // If we have no more children, but used to, they don't line up.
      if (prevChildAtSameIndex !== null) {
        shouldResetChildren = true;
      }
    }
  }

  if (didFiberUpdate(fiber, alternate)) {
    renders.add(createRender(fiber, 'update'));
  }

  if (shouldResetChildren) {
    // Normally, search for children from the rendered child.
    let nextChildSet = fiber.child;
    if (nextDidTimeOut) {
      // Special case: timed-out Suspense renders the fallback set.
      const nextFiberChild = fiber.child;
      nextChildSet = nextFiberChild ? nextFiberChild.sibling : null;
    }
    if (nextChildSet != null) {
      // re-order children what are we suppose to do here
    }
  }

  return false;
}

function handleSuspenseFiberUnmounts(fiber: Fiber, renders: Set<Render>) {
  const isTimedOutSuspense =
    fiber.tag === SuspenseComponent && fiber.memoizedState !== null;

  let child = fiber.child;
  if (isTimedOutSuspense) {
    // If it's showing fallback tree, let's traverse it instead.
    const primaryChildFragment = fiber.child;
    const fallbackChildFragment = primaryChildFragment
      ? primaryChildFragment.sibling
      : null;
    // Skip over to the real Fiber child.
    child = fallbackChildFragment ? fallbackChildFragment.child : null;
  }

  while (child !== null) {
    // Record simulated unmounts children-first.
    // We skip nodes without return because those are real unmounts.
    if (child.return !== null) {
      handleSuspenseFiberUnmounts(child, renders);
      handleFiberUnmount(child, renders);
    }
    child = child.sibling;
  }
}

// END COPY & SIMPLIFY ////////////////////////////////////////////////////////
