/**
 * Helper util class to merge a forward and callback ref.
 * The implementation to do this is not clean and so it's isolated here until React has a better solution.
 */

const callRef = <T extends Element>(
  callbackOrForwardRef: React.Ref<T> | null | undefined,
  ref: T | null,
) => {
  if (!callbackOrForwardRef) {
    return;
  }

  if (typeof callbackOrForwardRef === 'function') {
    callbackOrForwardRef(ref);
  } else if (
    typeof callbackOrForwardRef === 'object' &&
    Object.prototype.hasOwnProperty.call(callbackOrForwardRef, 'current')
  ) {
    // `#current` is technically read only, but we will force an assignment here.
    /* eslint-disable-next-line no-param-reassign */
    (callbackOrForwardRef.current as any) = ref;
  } else {
    // This should never happen
    throw new Error(
      'unsupported ref format, currently only callback and forward refs are supported',
    );
  }
};

type MergeRefCallbackType = <T extends Element>(
  ...refs: (React.Ref<T> | undefined)[]
) => React.Ref<T>;

export const mergeRefCallback: MergeRefCallbackType = (...refs) => {
  return (ref) => {
    refs.forEach((r) => callRef(r, ref));
  };
};
