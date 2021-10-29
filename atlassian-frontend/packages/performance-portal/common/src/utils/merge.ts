import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';

// NOTE: Unlike lodash.merge, this one doesn't mutate original object.
export const deepMergeWithArrayOverwrite = <TObject, TSource>(
  o: TObject,
  s: TSource,
): TObject & TSource => {
  return mergeWith({}, o, s, (_, srcValue) =>
    isArray(srcValue) ? srcValue : undefined,
  );
};
