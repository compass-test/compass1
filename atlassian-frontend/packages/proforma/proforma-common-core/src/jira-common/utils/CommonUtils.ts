export const notUndefined = <T>(x: T | undefined): x is T => {
  return !!x;
};

export const clearAllFocus = (): void => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

export const debounce = (func: any, wait: number, immediate?: boolean): any => {
  var timeout: any;
  return function (this: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context: any = this;
    const args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

export const convertDateFormatToSlashes = (date: string): string => {
  return date.replace(/-/g, '/');
};
