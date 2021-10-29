export default class Performance {
  _performance: any;

  constructor() {
    this._performance = window.performance;
  }

  clearMarks(...args: any[]) {
    if (!this._performance || !this._performance.clearMarks) {return;}
    this._performance.clearMarks(...args);
  }

  mark(...args: any[]) {
    if (!this._performance || !this._performance.mark) {return;}
    this._performance.mark(...args);
  }

  getEntriesByName(...args: any[]) {
    if (!this._performance || !this._performance.getEntriesByName) {return [];}
    return this._performance.getEntriesByName(...args);
  }

  getTimeOrigin() {
    if (
      !this._performance
      || (!this._performance.timeOrigin && !this._performance.timing)
    ) {return 0;}
    return (
      this._performance.timeOrigin || this._performance.timing.navigationStart
    );
  }

  now() {
    if (!this._performance || !this._performance.now) {
      return Date.now ? Date.now() : +new Date();
    }
    return this._performance.now();
  }

  isAvailable() {
    return (
      !!this._performance
      && !!this._performance.clearMarks
      && !!this._performance.mark
      && !!this._performance.getEntriesByName
      && !!this._performance.timing
    );
  }
}
