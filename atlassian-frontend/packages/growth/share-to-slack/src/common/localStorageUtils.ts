import type { AtlassianProduct } from './types';

function getLocalStorageKey(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
}

function updateLocalStorageKey(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function getDefaultSlackWorkSpace(
  product: AtlassianProduct,
): string | null {
  const key = `defaultSlackWorkspace-${product}`;

  return getLocalStorageKey(key);
}

export function setDefaultSlackWorkSpace(
  product: AtlassianProduct,
  value: string,
): void {
  const key = `defaultSlackWorkspace-${product}`;

  return updateLocalStorageKey(key, value);
}
