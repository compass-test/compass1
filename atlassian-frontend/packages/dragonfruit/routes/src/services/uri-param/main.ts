import { ARI_PREFIX, BASE_64_ENCODED_PREFIX } from '../../constants';

export function encodeURIParam(data: string): string {
  // Base 64 encode the data if it's an ARI
  const encoded = data.startsWith(ARI_PREFIX) ? base64encode(data) : data;

  // URI encode the final result
  return encodeURIComponent(encoded);
}

export function decodeURIParam(encoded: string): string | undefined {
  try {
    // Decode the URI component
    const decoded = decodeURIComponent(encoded);

    // Decode the data from base64 back to normal if necessary
    return base64decode(decoded);
  } catch (e) {
    return undefined;
  }
}

// Base 64 encode, and add the prefix
function base64encode(data: string): string {
  return `${BASE_64_ENCODED_PREFIX}${window.btoa(data)}`;
}

// Base 64 decode if the prefix exists
function base64decode(data: string): string {
  // Only decode if the prefix is present
  if (!data.startsWith(BASE_64_ENCODED_PREFIX)) {
    return data;
  }

  const withoutPrefix = data.slice(BASE_64_ENCODED_PREFIX.length);

  return window.atob(withoutPrefix);
}
