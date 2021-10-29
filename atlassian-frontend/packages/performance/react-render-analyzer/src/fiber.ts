import { Fiber, FiberRoot } from 'react-reconciler';
import { hasOwnProperty } from './util';
import {
  ClassComponent,
  CONTEXT_NUMBER,
  CONTEXT_SYMBOL_STRING,
  ContextType,
  FORWARD_REF_NUMBER,
  FORWARD_REF_SYMBOL_STRING,
  ForwardRef,
  FunctionComponent,
  IncompleteClassComponent,
  IndeterminateComponent,
  MEMO_NUMBER,
  MEMO_SYMBOL_STRING,
  MemoComponent,
  PROVIDER_NUMBER,
  PROVIDER_SYMBOL_STRING,
  SimpleMemoComponent,
  SuspenseComponent,
} from './constants';

const primaryFibers = new Map<Fiber, Fiber>();

export function setPrimaryFiber(fiber: Fiber): void {
  primaryFibers.set(fiber, fiber);
}

export function deletePrimaryFiber(fiber: Fiber): void {
  const primary = getPrimaryFiber(fiber);
  if (primary) {
    primaryFibers.delete(primary);
  }
}

/**
 * React uses two fibers (current, alternate). This method ensures that we
 * maintain referential integrity of a Fiber instance regardless of the
 * current Fiber node React gives us.
 *
 * @example
 *   const alternate = {};
 *   const primary = { alternate };
 *
 *   console.assert(getPrimaryFiber(primary) === primary);
 *   console.assert(getPrimaryFiber(alternate) === primary);
 *
 * @param {Fiber} fiber
 * @returns {Fiber|undefined}
 */
export function getPrimaryFiber(fiber: Fiber): Fiber | undefined {
  const primary = primaryFibers.get(fiber);
  if (primary) {
    return primary;
  }
  return fiber.alternate ? primaryFibers.get(fiber.alternate) : undefined;
}

/**
 * Create an iterator for a given fiber root node.
 *
 * @example
 *   for (const fiber of iterator(root)) {
 *     // ...
 *   }
 *
 * @param {FiberRoot} root
 * @returns {IterableIterator<Fiber>}
 */
export function* iterator(root: FiberRoot): IterableIterator<Fiber> {
  const { current } = root;
  let node = current;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield node;

    if (node.child) {
      node = node.child;
      continue;
    }

    if (node === current) {
      return;
    }

    while (!node.sibling) {
      if (!node.return || node.return === current) {
        return;
      }
      node = node.return;
    }

    node = node.sibling;
  }
}

export function isFiberWithKeyInRoot(root: FiberRoot, key: string): boolean {
  for (const fiber of iterator(root)) {
    if (fiber.key === key) {
      return true;
    }
  }
  return false;
}

export function getFiberOwners(fiber: Fiber): Fiber[] | null {
  if (!hasOwnProperty(fiber, '_debugOwner')) {
    return null;
  }

  const owners = [];
  let owner = fiber._debugOwner;
  while (owner) {
    owners.unshift(owner);
    owner = owner._debugOwner;
  }

  return owners;
}

/**
 * Returns the context type of a given fiber node.
 *
 * @example
 *   const contextType = getContextType(fiber);
 *   if (contextType) {
 *     // get the fiber context
 *   }
 *
 * @param {Fiber} fiber
 * @returns {ContextType}
 */
export function getFiberContextType(fiber: Fiber): ContextType {
  switch (fiber.tag) {
    case ClassComponent:
    case IncompleteClassComponent: {
      const instance = fiber.stateNode;
      if (instance) {
        const context = instance.context;

        // check for standard context
        if (instance.constructor && instance.constructor.contextType != null) {
          return ContextType.Standard;
        } else if (context && Object.keys(context).length) {
          return ContextType.Legacy;
        }
      }
    }
  }

  return ContextType.NoContext;
}

/**
 * Returns a fiber's context value, if it has one.
 *
 * @param {Fiber} fiber
 * @returns {*|undefined}
 */
export function getFiberContext(fiber: Fiber): unknown | undefined {
  return getFiberContextType(fiber) !== ContextType.NoContext
    ? fiber.stateNode.context
    : undefined;
}

function getDisplayName(type: any, fallback: string = 'Anonymous'): string {
  if (!type) {
    return fallback;
  }

  return (
    type.displayName ||
    (type.type && getDisplayName(type.type)) ||
    (type.render && getDisplayName(type.render)) ||
    (typeof type.name === 'string' && type.name) ||
    (typeof type === 'string' ? type : fallback)
  );
}

function getTypeSymbol(type: any): string | number {
  const symbolOrNumber =
    typeof type === 'object' && type !== null ? type.$$typeof : type;

  return typeof symbolOrNumber === 'symbol'
    ? symbolOrNumber.toString()
    : symbolOrNumber;
}

function resolveFiberType(type: any): any {
  const typeSymbol = getTypeSymbol(type);

  switch (typeSymbol) {
    case MEMO_NUMBER:
    case MEMO_SYMBOL_STRING:
      return resolveFiberType(type.type);

    case FORWARD_REF_NUMBER:
    case FORWARD_REF_SYMBOL_STRING:
      return type.render;

    default:
      return type;
  }
}

export function getDisplayNameForFiber(fiber: Fiber): string {
  const tag = fiber.tag;
  let type = fiber.type;
  if (typeof type === 'object' && type !== null) {
    type = resolveFiberType(type);
  }

  switch (tag) {
    case ClassComponent:
    case IncompleteClassComponent:
    case FunctionComponent:
    case IndeterminateComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      return getDisplayName(type);

    case SuspenseComponent:
      return 'Suspense';

    default:
      const typeSymbol = getTypeSymbol(type);

      switch (typeSymbol) {
        case PROVIDER_NUMBER:
        case PROVIDER_SYMBOL_STRING: {
          const context = fiber.type._context || fiber.type.context;
          return `${getDisplayName(context)}.Provider`;
        }

        case CONTEXT_NUMBER:
        case CONTEXT_SYMBOL_STRING: {
          const context = fiber.type._context || fiber.type;
          return `${getDisplayName(context)}.Consumer`;
        }

        default:
          return getDisplayName(type);
      }
  }
}
