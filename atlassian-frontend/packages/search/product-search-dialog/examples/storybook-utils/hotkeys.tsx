const keyListeners: any = {};

export const bindHotkeyToDocument = (
  key: string,
  cb: (e: KeyboardEvent) => any,
) => {
  const callback = (e: KeyboardEvent) => {
    if (e.key === key && !e.defaultPrevented) {
      cb(e);
    }
  };
  keyListeners[key] = callback;
  removeHotkeyFromDocument(key);
  window.document.addEventListener('keypress', callback);
};

export const removeHotkeyFromDocument = (key: string) => {
  window.document.removeEventListener('keypress', keyListeners[key]);
};
