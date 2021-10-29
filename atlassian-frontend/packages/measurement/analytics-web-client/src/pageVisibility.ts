declare global {
  interface Document {
    msHidden?: any;
    webkitHidden?: any;
  }
}

export default class PageVisibility {
  _callbacks: any;

  _hidden: any;

  _isHidden: any;

  _visibilityChange: any;

  constructor() {
    this._isHidden = false;
    this._callbacks = new Map();
    this._hidden = undefined;
    this._visibilityChange = undefined;

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this._isHidden = document.hidden;
      this._hidden = 'hidden';
      this._visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this._isHidden = document.msHidden;
      this._hidden = 'msHidden';
      this._visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this._isHidden = document.webkitHidden;
      this._hidden = 'webkitHidden';
      this._visibilityChange = 'webkitvisibilitychange';
    }

    if (
      typeof document.addEventListener !== 'undefined'
      && this._hidden !== undefined
    ) {
      this._bindEventListeners();
    }
  }

  addCallback(name: any, fn: any) {
    if (typeof name !== 'string') {
      throw new Error('Invalid name, must be string');
    }
    if (typeof fn !== 'function') {
      throw new Error('Invalid callback, must be function');
    }
    this._callbacks.set(name, fn);
  }

  removeCallback(name: any) {
    if (this._callbacks.has(name)) {
      this._callbacks.delete(name);
    }
  }

  getIsHidden() {
    return this._isHidden;
  }

  _bindEventListeners = () => {
    document.addEventListener(
      this._visibilityChange,
      this._handleVisibilityChange,
      false,
    );
  };

  _handleVisibilityChange = () => {
    const isHidden = document[this._hidden as 'hidden' | 'msHidden' | 'webkitHidden'];

    this._isHidden = isHidden;

    this._callbacks.forEach((callbackFn: any) => callbackFn(isHidden));
  };
}
