interface MockPerformanceEntryInit {
  duration: number;
  name: string;
  startTime: number;
  entryType: string;
}

export class MockPerformanceEntry {
  public readonly duration: number;
  public readonly name: string;
  public readonly startTime: number;
  public readonly entryType: string;

  private constructor(init: MockPerformanceEntryInit) {
    this.duration = init.duration;
    this.name = init.name;
    this.startTime = init.startTime;
    this.entryType = init.entryType;
  }

  static default(
    payload: Partial<PerformanceEntry> = {},
  ): MockPerformanceEntry {
    return new MockPerformanceEntry({
      duration: 1,
      name: 'example',
      startTime: 0,
      entryType: 'measure',
      ...payload,
    });
  }

  static fromDuration(
    duration: number,
    payload: Partial<PerformanceEntry> = {},
  ): MockPerformanceEntry {
    return new MockPerformanceEntry({
      duration,
      name: 'example',
      startTime: 0,
      entryType: 'measure',
      ...payload,
    });
  }

  static fromSeries(
    series: number[],
    payload: Partial<PerformanceEntry> = {},
  ): MockPerformanceEntry {
    return new MockPerformanceEntry({
      duration: series.reduce((a, b) => a + b, 0),
      name: 'example',
      startTime: 0,
      entryType: 'measure',
      ...payload,
    });
  }

  toJSON() {
    return {
      duration: this.duration,
      name: this.name,
      startTime: this.startTime,
      entryType: this.entryType,
    };
  }
}
