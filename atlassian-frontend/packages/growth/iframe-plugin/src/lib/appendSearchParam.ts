/**
 * Appends key-value to url and returns new url
 *
 * Remove this once IE11 is removed
 *
 * @param src
 * @param key
 * @param value
 */
export function appendSearchParam(src: string, key: string, value: string) {
  const [baseUrl, hash] = src.split('#');
  const glue = baseUrl.indexOf('?') === -1 ? '?' : '&';
  return `${baseUrl}${glue}${encodeURIComponent(key)}=${encodeURIComponent(
    value,
  )}${hash ? `#${hash}` : ''}`;
}
