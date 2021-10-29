import { getOwnEnumerablePropertyNames } from './util';

type ObjectLike = { [key: string]: unknown };

export enum DiffKind {
  New = 'N',
  Deleted = 'D',
  Edited = 'E',
}

export interface Diff {
  kind: DiffKind;
  path: Array<string | number>;
  lhs: unknown;
  rhs: unknown;
}

/**
 * Performs a shallow diff between to given values. The returning Set of Diff's
 * have the same interface as of "deep-diff".
 *
 * @see {@link https://www.npmjs.com/package/deep-diff}
 *
 * @param {*} left
 * @param {*} right
 * @return {Set<Diff>}
 */
export function shallowDiff(left: unknown, right: unknown): Set<Diff> {
  const diffs = new Set<Diff>();

  // same value
  if (left === right || (Number.isNaN(left) && Number.isNaN(right))) {
    return diffs;
  }

  const type = typeof right;
  const leftType = typeof left;

  // type has changed
  if (type !== leftType) {
    diffs.add({
      // we will label undefined > non-undefined as new values
      kind: leftType === 'undefined' ? DiffKind.New : DiffKind.Edited,
      path: [],
      lhs: left,
      rhs: right,
    });
  } else {
    switch (type) {
      // objects (inc. arrays)
      case 'object': {
        if (left === null || right === null) {
          diffs.add({
            path: [],
            kind: DiffKind.Edited,
            lhs: left,
            rhs: right,
          });

          // end the switch statement
          break;
        }

        const isArray = Array.isArray(right);
        const rightKeys = getOwnEnumerablePropertyNames(right as object);
        const leftKeys = getOwnEnumerablePropertyNames(left as object);

        // check the right value for additions and edits
        rightKeys.forEach((key) => {
          // skip length property for arrays
          if (isArray && key === 'length') {
            return;
          }

          const kind = leftKeys.includes(key) ? DiffKind.Edited : DiffKind.New;
          const rhs = (right as ObjectLike)[key];
          const lhs =
            kind === DiffKind.Edited ? (left as ObjectLike)[key] : undefined;

          // same value
          if (kind === DiffKind.Edited && rhs === lhs) {
            return;
          }

          diffs.add({
            path: [isArray ? Number(key) : key],
            kind,
            lhs,
            rhs,
          });
        });

        // deletions
        leftKeys.forEach((key) => {
          // key exists in the right object or is length key of an array
          if (rightKeys.includes(key) || (isArray && key === 'length')) {
            return;
          }

          diffs.add({
            kind: DiffKind.Deleted,
            path: [isArray ? Number(key) : key],
            lhs: (left as ObjectLike)[key],
            rhs: undefined,
          });
        });

        break;
      }

      // non-objects
      default:
        diffs.add({
          kind: DiffKind.Edited,
          path: [],
          lhs: left,
          rhs: right,
        });
    }
  }

  return diffs;
}
