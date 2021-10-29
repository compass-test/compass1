const CONNECTED_SLACK_WORKSPACE_KEY_PREFIX = 'infi-slack-workspace-';

const getLocalStorageKey = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};
const updateLocalStorageKey = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    return null;
  }
};

const removeLocalStorageKey = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    return;
  }
};

export const getConnectedSlackWorkSpace = (product: string) =>
  getLocalStorageKey(`${CONNECTED_SLACK_WORKSPACE_KEY_PREFIX}${product}`);

export const setConnectedSlackWorkSpace = (product: string, value: string) =>
  updateLocalStorageKey(
    `${CONNECTED_SLACK_WORKSPACE_KEY_PREFIX}${product}`,
    value,
  );

export const disconnectSlackWorkSpace = (product: string) =>
  removeLocalStorageKey(`${CONNECTED_SLACK_WORKSPACE_KEY_PREFIX}${product}`);
