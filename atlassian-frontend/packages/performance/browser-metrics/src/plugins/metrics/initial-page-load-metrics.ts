export const initialPageLoadMetrics = () => {
  const metrics: { [key: string]: number } = {};
  performance.getEntriesByType('paint').forEach((entry) => {
    if (entry.name === 'first-paint') {
      metrics['metric:fp'] = Math.round(entry.startTime);
    }
    if (entry.name === 'first-contentful-paint') {
      metrics['metric:fcp'] = Math.round(entry.startTime);
    }
  });

  return metrics;
};
