import memoizeOne from 'memoize-one';

export const eventMemoryPlugin = memoizeOne(() => {
  // @ts-ignore: deviceMemory is exposed in some browsers
  if (!navigator.deviceMemory) {
    return null;
  }
  return {
    // @ts-ignore
    'event:memory': navigator.deviceMemory,
  };
});
