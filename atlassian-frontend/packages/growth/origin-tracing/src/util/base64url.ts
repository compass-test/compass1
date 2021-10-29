/**
 * This file converts between Base64 and Base 64 Encoding with URL and Filename Safe Alphabet,
 * the latter of which has URL-safe characters only (drops =, + and /).
 *
 * Why not use a library? The popular libs use Buffer to be able to
 * encode any data to base64. We don't need this capability, and it causes
 * Webpack to include 30KB of a Buffer polyfill.
 * Webpack's/UglifyJS's Tree Shaking seems to be unable to drop it.
 *
 * See: RFC 4648 section 5 (https://tools.ietf.org/html/rfc4648#section-5)
 */
export function base64ToBase64Url(base64: string | null): string {
  if (base64 == null) {
    return '';
  }
  return String(base64)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function base64UrlToBase64(base64url: string | null): string {
  if (base64url == null) {
    return '';
  }
  const base64 = String(base64url).replace(/-/g, '+').replace(/_/g, '/');

  const padLength = (4 - (base64url.length % 4)) % 4;
  const pad = '==='.slice(0, padLength);
  return base64 + pad;
}
