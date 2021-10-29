export const STICKY_SEARCH_KEY = 'atlassian.search-dialog-sticky';
export const SEARCH_QUERY_KEY = 'atlassian.search-dialog-query';
export const SEARCH_FILTERS_KEY = 'atlassian.search-dialog-filters';

export const getSessionItem = (key: string) => {
  return window.sessionStorage.getItem(key);
};

export const setSessionItem = (key: string, value: string) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (error) {
    if (error.code === DOMException.QUOTA_EXCEEDED_ERR) {
      // Do nothing if the sessionStorage capacity is reached
    } else {
    }
  }
};

export const deleteSessionItem = (key: string) => {
  window.sessionStorage.removeItem(key);
};
