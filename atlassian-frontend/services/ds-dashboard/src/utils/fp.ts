import type { Predicate } from '../types/util';
import type { Maybe } from 'monet';

export const id = <T>(value: T) => value;

export const always = <T>(value: T) => () => value;

export const and = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
  if (predicates.length === 0) {
    return always(true);
  }
  const head = predicates[0];
  const tail = predicates.slice(1);
  return (x: T) => head(x) && and(...tail)(x);
};

export const or = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
  if (predicates.length === 0) {
    return always(false);
  }
  const head = predicates[0];
  const tail = predicates.slice(1);
  return (x: T) => head(x) || or(...tail)(x);
};

export const catMaybes = <T>(xs: Maybe<T>[]): T[] =>
  xs.reduce<T[]>((acc, x) => (x.isJust() ? acc.concat(x.just()) : acc), []);
