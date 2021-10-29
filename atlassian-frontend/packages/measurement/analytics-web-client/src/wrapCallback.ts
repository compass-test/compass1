export default function wrapCallback(
  callback?: any,
  event?: any,
): null | (() => void) {
  if (!callback || typeof callback !== 'function') {
    return null;
  }

  return () => {
    callback(event);
  };
}
