const TAB_ID_STORAGE_KEY = 'awc.tab.id';
export const SESSION_ID_STORAGE_KEY = 'awc.session.id';
export const SESSION_EXPIRY_STORAGE_KEY = 'awc.session.expiry';

/* eslint-disable import/prefer-default-export */
export function setTabId(tabId: any) {
  sessionStorage.setItem(TAB_ID_STORAGE_KEY, tabId);
}

export function setSessionId(sessionId: any) {
  localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
  localStorage.setItem(SESSION_EXPIRY_STORAGE_KEY, `${Date.now() + 999999999}`);
}
