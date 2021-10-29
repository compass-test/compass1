import memoizeOne from 'memoize-one';

export const eventCpusPlugin = memoizeOne(() => {
  if (!navigator.hardwareConcurrency) {
    return null;
  }
  return {
    'event:cpus': navigator.hardwareConcurrency,
  };
});
