import { Fiber } from 'react-reconciler';
import { Diff, DiffKind, shallowDiff } from './shallow-diff';
import {
  getDisplayNameForFiber,
  getFiberContext,
  getFiberContextType,
  getFiberOwners,
  getPrimaryFiber,
} from './fiber';
import { ContextType } from './constants';
import { hasOwnProperty } from './util';

export type Change = Diff;

export type Phase = 'mount' | 'unmount' | 'update';

export interface Render {
  fiber: Fiber;
  phase: Phase;
  renderCount: number;
  profilerTimings: {
    actualDuration: number;
    actualStartTime: number;
    selfBaseDuration: number;
    treeBaseDuration: number;
    actualDurationSum: number;
  };
  changes: Set<Change> | null;
  owners: Fiber[] | null;
  displayName: string;
}

const renderCounts = new Map<Fiber, number>();
const renderDurations = new Map<Fiber, number>();

export function createRender(fiber: Fiber, phase: Phase): Render {
  const render = {
    fiber,
    phase,
    renderCount: markRenderCount(fiber),
    profilerTimings: {
      actualDuration: fiber.actualDuration ? fiber.actualDuration : -1,
      actualStartTime: fiber.actualStartTime ? fiber.actualStartTime : -1,
      selfBaseDuration: fiber.selfBaseDuration ? fiber.selfBaseDuration : -1,
      treeBaseDuration: fiber.treeBaseDuration ? fiber.treeBaseDuration : -1,
      actualDurationSum: markDurationSum(fiber),
    },
  };

  // defer changes
  Object.defineProperty(render, 'changes', {
    enumerable: true,
    get: phase === 'update' ? fiberChangesGetter(fiber) : nullFiberChanges,
  });

  // displayName
  Object.defineProperty(render, 'displayName', {
    enumerable: true,
    get() {
      return getDisplayNameForFiber(fiber);
    },
  });

  Object.defineProperty(render, 'owners', {
    enumerable: true,
    get() {
      return getFiberOwners(fiber);
    },
  });

  // @ts-ignore changes defined in `defineProperty` method
  return render;
}

function fiberChangesGetter(fiber: Fiber & { _debugHookTypes?: string[] }) {
  // current fiber snapshot
  const { alternate, memoizedProps: props, memoizedState: state } = fiber;
  const contextType = getFiberContextType(fiber);
  const context =
    contextType !== ContextType.NoContext ? getFiberContext(fiber) : null;

  // alternate fiber snapshot
  const altProps = alternate ? alternate.memoizedProps : null;
  const altState = alternate ? alternate.memoizedState : null;
  const altContext =
    alternate && contextType !== ContextType.NoContext
      ? getFiberContext(alternate)
      : null;

  let memoizedChanges: Set<Change> | null | undefined;

  return function getFiberChanges(): Set<Change> | null {
    if (typeof memoizedChanges !== 'undefined') {
      return memoizedChanges;
    }

    const changes = new Set<Diff>();

    // props
    if (props !== altProps) {
      for (const diff of shallowDiff(altProps, props)) {
        diff.path.unshift('props');
        changes.add(diff);
      }
    }

    // state
    const stateForHooks =
      state &&
      hasOwnProperty(state, 'baseState') &&
      hasOwnProperty(state, 'memoizedState') &&
      hasOwnProperty(state, 'next') &&
      hasOwnProperty(state, 'queue');

    if (stateForHooks) {
      // hooks state
      let current = state;
      let previous = altState || null;
      let index = 0;
      const counters: { [type: string]: number } = {};

      while (current) {
        // hooks are constant, we can use the current fiber
        const type = fiber._debugHookTypes
          ? fiber._debugHookTypes[index]
          : 'unknown';

        if (!counters[type]) {
          counters[type] = 0;
        }

        const path = ['hooks', type, counters[type]];

        if (!previous) {
          changes.add({
            path,
            kind: DiffKind.New,
            lhs: undefined,
            rhs: current.memoizedState,
          });
        } else if (previous.memoizedState !== current.memoizedState) {
          changes.add({
            path,
            kind: DiffKind.Edited,
            lhs: previous.memoizedState,
            rhs: current.memoizedState,
          });
        }

        counters[type]++;
        index++;
        current = current.next;
        previous = previous ? previous.next : null;
      }
    } else if (altState !== state) {
      // Class state
      const stateDiff = shallowDiff(altState, state);
      if (stateDiff.size === 0) {
        changes.add({
          path: ['state'],
          kind: DiffKind.Edited,
          lhs: altState,
          rhs: state,
        });
      } else {
        for (const diff of stateDiff) {
          diff.path.unshift('state');
          changes.add(diff);
        }
      }
    }

    // context
    if (contextType !== ContextType.NoContext) {
      if (altContext !== context) {
        switch (contextType) {
          // shallow diff the legacy context objects to see what changed
          case ContextType.Legacy:
            for (const diff of shallowDiff(altContext, context)) {
              diff.path.unshift('context');
              changes.add(diff);
            }
            break;

          // standard context values have changed
          case ContextType.Standard:
            changes.add({
              path: ['context'],
              kind: DiffKind.Edited,
              lhs: altContext,
              rhs: context,
            });
            break;
        }
      }
    }

    memoizedChanges = changes.size > 0 ? (changes as Set<Change>) : null;

    return memoizedChanges;
  };
}

function nullFiberChanges() {
  return null;
}

function markRenderCount(fiber: Fiber): number {
  const primary = getPrimaryFiber(fiber);
  if (!primary) {
    return NaN;
  }

  let count = renderCounts.get(primary) || 0;
  renderCounts.set(primary, ++count);

  return count;
}

function markDurationSum(fiber: Fiber): number {
  const primary = getPrimaryFiber(fiber);
  if (!primary) {
    return NaN;
  }

  // no profile durations, production-mode
  if (!fiber.actualDuration) {
    return -1;
  }

  let sum = renderDurations.get(primary) || 0;
  renderDurations.set(primary, sum + fiber.actualDuration);

  return sum;
}

export function getAverageRenderDuration(render: Render): number {
  const { actualDurationSum } = render.profilerTimings;
  return actualDurationSum !== -1 ? actualDurationSum / render.renderCount : -1;
}
