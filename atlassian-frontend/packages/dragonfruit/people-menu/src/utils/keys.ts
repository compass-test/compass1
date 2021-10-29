export const isModifiedEvent = (event: { [key: string]: any }) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
