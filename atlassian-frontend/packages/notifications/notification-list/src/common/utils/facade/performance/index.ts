/**
 * An incomplete facade for the browser performance API.
 */
class PerformanceFacade {
  readonly _performance?: Performance;

  constructor(performance?: Performance) {
    this._performance = performance;
  }

  get isAvailable(): boolean {
    return Boolean(this._performance);
  }

  now() {
    return this._performance ? this._performance.now() : Date.now();
  }

  getEntriesByName(name: string, type?: string): PerformanceEntryList {
    return this._performance
      ? this._performance.getEntriesByName(name, type)
      : [];
  }
}

export default PerformanceFacade;
