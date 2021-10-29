import filter from 'lodash/filter';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import omit from 'lodash/omit';

export const omitUndefined = <T extends object, K extends keyof T>(
  obj: T,
): Partial<T> => {
  const objectKeys = keys(obj) as K[];
  return omit<T, K>(
    obj,
    filter(objectKeys, (key) => {
      return isUndefined(obj[key]);
    }),
  ) as Partial<T>;
};
