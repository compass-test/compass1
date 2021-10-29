/**
 * Call the specified callback if not running in a jsdom environment.
 *
 * This is for behaviour that interferes with tests. Use sparingly to avoid
 * false positives/negatives in tests.
 *
 * @param callback - the callback to call
 */
export default function skipIfJsdom(callback: () => void) {
  if (
    typeof window === 'undefined' ||
    !window.navigator.userAgent.includes('jsdom')
  ) {
    callback();
  }
}
