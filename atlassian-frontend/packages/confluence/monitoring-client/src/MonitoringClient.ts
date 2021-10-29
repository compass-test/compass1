export interface MonitoringClient {
  /**
   * Reports a performance metric. All metric names will be suffixed with ".performance" (e.g. the resulting name will be in the form of "<ORIGINAL_NAME>.performance").
   *
   * Choose a metric name that will be more or less compile-time known (e.g. don't put content id or stuff like that in a name).
   * Same applies to tags.
   *
   * Good example: your component submits under 5 events per life, there's only one of this component on the page.
   * Bad example:  your component submits under 5 events per life, there are dozens of components on a page.
   * Bad example:  your component submits indefinite number of events (e.g. on interval, or on clicks).
   *
   * @param {string} name the name of the metric.
   * @param {number} duration duration in milliseconds
   * @param {Tags} [tags] Optional. Keep the cardinality in mind and apply buckets where needed.
   */
  submitPerformanceMetric(name: string, duration: number, tags?: Tags): void;

  /**
   * Increments the counter with the given name.
   *
   * @param {string} counterName
   * @param {Tags} [tags]
   */
  incrementCounter(counterName: string, tags?: Tags): void;

  /**
   * Identifies a browser error occurrence.
   * Please note, that this method only captures the fact that an error did occur, and does
   * not capture any other error information (e.g. stack trace or error message).
   * Please submit this kind of information to other systems (like Sentry or GASv3).
   *
   * @param {Error} error the error that occurred
   * @param {Tags} [tags]
   */
  captureErrorOccurrence(error: Error, tags?: Tags): void;

  /**
   * @param {string} routeName - The page view name. Use compile-time values (e.g. not user-generated content, page IDs, or such). The given `routeName` will also be a part of `globalTags`, with the tag name of `"page"`.
   */
  captureTransition(routeName: string): void;

  /**
   * Global tags are sent along with every event.
   *
   * @param {Tags} tags the set of tags to merge into the current tags. This is additive-only, with latest values taking precedence.
   */
  updateGlobalTags(tags: Tags): void;
  /**
   * Global tags are sent along with every event.
   *
   * @param {(current: Tags) => Tags} tags the function to update the whole set of global tags. The returned result ends up being the new global tags set.
   */
  updateGlobalTags(tags: (current: Tags) => Tags): void;
  /**
   * Global tags are sent along with every event.
   *
   * @param {(Tags | ((current: Tags) => Tags))} tags
   */
  updateGlobalTags(tags: Tags | ((current: Tags) => Tags)): void;
}

export type Tags = { [tagName: string]: string };
