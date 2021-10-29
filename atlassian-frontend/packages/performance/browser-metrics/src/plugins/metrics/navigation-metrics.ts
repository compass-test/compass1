export const navigationMetrics = () => {
  const entries = performance.getEntriesByType('navigation');
  if (entries.length === 0) {
    return null;
  }
  const navigation = entries[0] as PerformanceNavigationTiming;

  const metrics = {
    // From https://www.w3.org/TR/resource-timing/
    redirectStart: Math.round(navigation.redirectStart),
    redirectEnd: Math.round(navigation.redirectEnd),
    fetchStart: Math.round(navigation.fetchStart),
    domainLookupStart: Math.round(navigation.domainLookupStart),
    domainLookupEnd: Math.round(navigation.domainLookupEnd),
    connectStart: Math.round(navigation.connectStart),
    connectEnd: Math.round(navigation.connectEnd),
    secureConnectionStart: Math.round(navigation.secureConnectionStart),
    requestStart: Math.round(navigation.requestStart),
    responseStart: Math.round(navigation.responseStart),
    responseEnd: Math.round(navigation.responseEnd),
    encodedBodySize: Math.round(navigation.encodedBodySize),

    // From https://www.w3.org/TR/navigation-timing-2/
    redirectCount: navigation.redirectCount,
    type: navigation.type,
    unloadEventEnd: Math.round(navigation.unloadEventEnd),
    unloadEventStart: Math.round(navigation.unloadEventStart),
    workerStart: Math.round(navigation.workerStart),

    // The following properties are ignored because they provided limited value on a modern stack (e.g. the content
    // is usually rendered and interactive before the dom is fully parsed, dont't play well with streamed content...)
    //   * domComplete
    //   * domContentLoadedEventEnd
    //   * domContentLoadedEventStart
    //   * domInteractive
    //   * loadEventEnd
    //   * loadEventStart
  };
  return {
    'metrics:navigation': metrics,
  };
};
