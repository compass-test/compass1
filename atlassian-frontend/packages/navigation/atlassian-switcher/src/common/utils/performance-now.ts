export const performanceNow =
  (typeof window !== 'undefined' &&
    window.performance &&
    window.performance.now.bind(performance)) ||
  Date.now;
