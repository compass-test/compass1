export function readJsonFromLocalStorage(key: string, fallback: any = null) {
  try {
    const item = localStorage.getItem(key);
    const result = item ? JSON.parse(item) : fallback;
    return result;
  } catch (e) {
    // Ignore localStorage value if it is invalid JSON
    console.warn('Could not load from localStorage', e);
    return fallback;
  }
}

export function writeToLocalStorage(key: string, item: unknown) {
  try {
    const stringifiedItem = JSON.stringify(item);
    localStorage.setItem(key, stringifiedItem);
  } catch (e) {
    console.warn('Error writing to localStorage', e);
  }
}
