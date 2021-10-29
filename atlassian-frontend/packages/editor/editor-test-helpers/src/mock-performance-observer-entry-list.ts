import { MockPerformanceEntry } from './mock-performance-entry';
import { EVENT_NAME_STATE_APPLY } from '@atlaskit/editor-core/src/utils/performance/track-transactions';

export class MockPerformanceObserverEntryList
  implements PerformanceObserverEntryList {
  constructor(private readonly entries: PerformanceEntry[]) {}

  public static fromSeries(series: number[]): MockPerformanceObserverEntryList {
    const applyEntry = MockPerformanceEntry.fromSeries(series, {
      name: EVENT_NAME_STATE_APPLY,
    });

    const entries = series.map((item, index) =>
      MockPerformanceEntry.default({
        duration: item,
        name: `🦉${index}::apply`,
      }),
    );

    return new MockPerformanceObserverEntryList([applyEntry, ...entries]);
  }

  public static fromNames(names: string[]): MockPerformanceObserverEntryList {
    const applyEntry = MockPerformanceEntry.default({
      name: EVENT_NAME_STATE_APPLY,
    });

    const entries = names.map((name) => MockPerformanceEntry.default({ name }));

    return new MockPerformanceObserverEntryList([applyEntry, ...entries]);
  }

  public addEntries(...entries: PerformanceEntryList) {
    this.entries.push(...entries);
  }

  public getEntries(): PerformanceEntryList {
    return this.entries.map((e) => ({ ...e, toJSON() {} }));
  }

  public getEntriesByName(name: string): PerformanceEntryList {
    return this.getEntries().filter((e) => e.name === name);
  }

  public getEntriesByType(type: string): PerformanceEntryList {
    return this.getEntries().filter((e) => e.entryType === type);
  }
}
