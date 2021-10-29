import { MockStore } from './types';

// We expect our fake factory resolvers to be callbacks that return
// a possibly incomplete version of an item.
type Fake<T = unknown> = (override?: Partial<T>) => Partial<T>;

/**
 * Create a factory function for a given item type.
 */
export function fake<T = unknown>(data?: Partial<T>): Fake<T> {
  return (override) => ({
    ...data,
    ...override,
  });
}

/**
 * Create a resolver function.
 * This utility function just shortens your resolvers and avoids you having to constantly type-hint.
 */
export function resolver<TInput = any, TReturn = void>(
  resolverFunction: (store: MockStore) => (input: TInput) => TReturn,
) {
  return resolverFunction;
}

/**
 * Create an empty array of a random size.
 * Indicates the desired length of a mock list.
 *
 * eg:
 * {
 *   CompassComponent: () => ({
 *     // a list of length between 2 and 6
 *     links: fakeChildren(2, 6),
 *   })
 * }
 */
export function fakeChildren(minOrMax: number, max?: number) {
  const min = max ? minOrMax : 0;
  const numOfChildren = randomIntBetween(min, max ?? minOrMax);

  return [...new Array(numOfChildren)];
}

function randomIntBetween(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
